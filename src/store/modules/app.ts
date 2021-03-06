import { AppRouteModule } from './../../router/interface';
import { defineStore } from 'pinia';
import { store } from 'src/store';
import { resetRouter } from 'src/router';

interface AppState {
  // Page loading status
  pageLoading: boolean;
  // 是否已经动态加载路由
  isDynamicAddedRoute: boolean;
  hasPermissionRouter: AppRouteModule[];
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    isDynamicAddedRoute: false,
    hasPermissionRouter: [],
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getHasPermissionRouter(): AppRouteModule[] {
      return this.hasPermissionRouter;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },

    setHasPermissionRouter(router: AppRouteModule[]) {
      this.hasPermissionRouter = router;
    },

    async resetAllState() {
      resetRouter();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
