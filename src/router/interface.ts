import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface CusRouteMeta extends RouteMeta {
  // 是否为单级菜单
  single?: boolean;
  title?: string;
  hideBreadcrumb?: boolean;
  hideMenu?: boolean;
  orderNo?: number;
  icon?: string | JSX.Element;
}

// @ts-ignore
export interface AppRouteModule extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: CusRouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteModule[];
  props?: Recordable;
}
