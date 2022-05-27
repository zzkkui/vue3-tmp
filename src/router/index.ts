import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// vite-plugin-pages 自动生成的路由
import autoBasicRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { basicRoutes } from './routes';
import NotFound from 'src/components/[...404].vue';

const isUseHash = import.meta.env.VITE_APP_HTTP_ENV === 'hash';

export function createRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { layout: 'RouterView' } });
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
  // history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: isUseHash
    ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
    : createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  routes: routes,
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
  await router.isReady();
}
