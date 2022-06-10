import { AppRouteModule } from './../interface';
import { useAppStoreWithOut } from 'src/store/modules/app';
import type { Router, RouteRecordRaw } from 'vue-router';
import { asyncRoutes, PAGE_NOT_FOUND_ROUTE } from './../routes';

// 这里可以通过权限控制来动态生成路由
export function createPermissionGuard(router: Router) {
  const appStore = useAppStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    const routes = asyncRoutes;
    const hasPermissionRouter: AppRouteModule[] = [];
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
      hasPermissionRouter.push(route);
    });

    if (appStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    appStore.setDynamicAddedRoute(true);
    appStore.setHasPermissionRouter(hasPermissionRouter);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
