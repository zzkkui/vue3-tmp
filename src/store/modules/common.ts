import { defineStore } from 'pinia';
import { store } from 'src/store';

export type BreadCrumbType = {
  prev?: string;
  paths?: { name: string; path?: string }[];
};

interface CommonState {
  hideHeader: boolean;
  hideBreadCrumb: boolean;
  collapsible: boolean;
  collapsed: boolean;
  breadCrumbs: BreadCrumbType[];
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): CommonState => ({
    hideHeader: true,
    hideBreadCrumb: true,
    collapsible: true,
    collapsed: false,
    breadCrumbs: [],
  }),
  getters: {
    getHideHeader(): boolean {
      return this.hideHeader;
    },
    getCollapsible(): boolean {
      return this.collapsible;
    },
    getBreadCrumbs(): BreadCrumbType[] {
      return this.breadCrumbs;
    },
    getHideBreadCrumb(): boolean {
      return this.hideBreadCrumb;
    },
    getCollapsed(): boolean {
      return this.collapsed;
    },
  },
  actions: {
    setHideHeader(hideHeader: boolean): void {
      this.hideHeader = hideHeader;
    },

    setCollapsible(collapsible: boolean): void {
      this.collapsible = collapsible;
    },

    setBreadCrumbs(breadCrumbs: BreadCrumbType[]) {
      this.breadCrumbs = breadCrumbs;
    },

    setHideBreadCrumb(hideBreadCrumb: boolean) {
      this.hideBreadCrumb = hideBreadCrumb;
    },
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },
  },
});

export function useCommonStoreWithOut() {
  return useCommonStore(store);
}
