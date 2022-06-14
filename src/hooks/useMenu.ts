import { AppRouteModule } from 'src/router/interface';

export interface Menu {
  name: string;
  path: string;
  title: string;
  icon?: string | JSX.Element;
  children?: Menu;
}

function generateMenus(router): Menu[] {
  return router.map((n) => {
    const { name, meta, children, path } = n;
    const { title, icon } = meta;
    // 如果有 children 但是只有 一条数据 且 没有 path
    if (children && children.length === 1 && !children[0].path) {
      const child = children[0];
      return {
        name,
        path,
        title,
        icon,
        ...(child.meta || {}),
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
    };
  });
}

export default function useMenu(router: AppRouteModule[]): Menu[] {
  const _router = [...router]
    .filter((n) => !n.meta.hideMenu)
    .sort((a, b) => (a.meta.orderNo || 0) - (b.meta.orderNo || 0));
  const menus = generateMenus(_router);
  return menus;
}
