import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// vite-plugin-pages 自动生成的路由
import autoBasicRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

import { basicRoutes } from './routes';
import { createGuard } from './guard';

const isUseHash = import.meta.env.VITE_APP_HTTP_ENV === 'hash';

export function createRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return setupLayouts(routes);
}

const routes = import.meta.env.VITE_APP_ROUTES === 'auto' ? createRoutes(autoBasicRoutes) : [...basicRoutes];

const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

// app router
export const router = createRouter({
  history: isUseHash
    ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
    : createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  routes: routes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export async function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
  await router.isReady();
}
