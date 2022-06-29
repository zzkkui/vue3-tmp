import { AppRouteModule, CusRouteMeta } from 'src/router/interface';
import { isUrl } from 'src/utils/is';
import cloneDeep from 'lodash/cloneDeep';
import { deepMerge } from 'src/utils';

export interface Menu {
  name: string;
  path: string;
  title: string;
  meta: CusRouteMeta;
  icon?: string | JSX.Element;
  children?: Menu[];
}

export function findPath<T = any>(tree: any, func: Fn): T | T[] | null {
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node.children && list.unshift(...node.children);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
    }
  }
}

function generateMenus(router): Menu[] {
  return router.map((n) => {
    const { name, meta = {}, children, path } = n;
    const { title, icon } = meta;
    // 如果有 children 但是只有 一条数据 且 没有 path
    if (children && children.length === 1 && !children[0].path) {
      const child = children[0];
      const _meta = deepMerge(meta, child || {});
      return {
        name,
        path,
        title,
        icon,
        ..._meta,
      };
    }
    let _children;
    if (children) {
      _children = generateMenus(children);
    }

    return {
      name,
      path,
      title,
      icon,
      children: _children ? _children : null,
      ...meta,
    };
  });
}

export default function useMenu(routers: AppRouteModule[]): Menu[] {
  const cloneRouteModList = cloneDeep(routers)
    .filter((n) => !n.meta.hideMenu)
    .sort((a, b) => (a.meta.orderNo || 0) - (b.meta.orderNo || 0));
  const routeList: AppRouteModule[] = [];

  cloneRouteModList.forEach((item) => {
    if (item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect;
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  const menus = generateMenus(cloneRouteModList);
  joinParentPath(menus);
  return menus;
}
