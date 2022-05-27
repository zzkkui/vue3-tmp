import { defineStore } from 'pinia';
import { store } from 'src/store';
import { resetRouter } from 'src/router';

interface AppState {
  // Page loading status
  pageLoading: boolean;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
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
