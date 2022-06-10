import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from './contant';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

export const RootRoute: AppRouteModule = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: '首页',
  },
};

export const LoginRoute: AppRouteModule = {
  path: '/login',
  name: 'Login',
  component: () => import('src/pages/login/index.vue'),
  meta: {
    title: '登录',
    hideMenu: true,
  },
};

export const PAGE_NOT_FOUND_ROUTE: AppRouteModule = {
  path: '/:path(.*)*',
  name: 'NotFound',
  component: LAYOUT,
  meta: {
    title: '404',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      component: () => import('src/pages/sys/[...404].vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteModule = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: 'Redirect',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('src/pages/sys/redirect.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true,
      },
    },
  ],
};

// 不需要权限路由信息
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
