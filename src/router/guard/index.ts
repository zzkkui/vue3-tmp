import type { Router } from 'vue-router';
import { useAppStoreWithOut } from 'src/store/modules/app';
import projectSetting from 'src/settings/projectSetting';
// import { useUserStoreWithOut } from '/@/store/modules/user';
// import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
// import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
// import { warn } from '/@/utils/log';
// import { unref } from 'vue';
// import { setRouteChange } from '/@/logics/mitt/routeChange';
// import { createPermissionGuard } from './permissionGuard';
// import { createStateGuard } from './stateGuard';
// import nProgress from 'nprogress';
// import projectSetting from '/@/settings/projectSetting';
// import { createParamMenuGuard } from './paramMenuGuard';

// Don't change the order of creation
export function createGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  // createHttpGuard(router);
  createMessageGuard(router);
  // createPermissionGuard(router);
  // createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  // createStateGuard(router);
}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

// Used to handle page loading status
function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut();
  const { openPageLoading } = projectSetting;
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }

    if (openPageLoading) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (openPageLoading) {
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 220);
    }
    return true;
  });
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
// function createHttpGuard(router: Router) {
//   const { removeAllHttpPending } = projectSetting;
//   let axiosCanceler: Nullable<AxiosCanceler>;
//   if (removeAllHttpPending) {
//     axiosCanceler = new AxiosCanceler();
//   }
//   router.beforeEach(async () => {
//     // Switching the route will delete the previous request
//     axiosCanceler?.removeAllPending();
//     return true;
//   });
// }

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll();
        notification.destroy();
      }
    } catch (error) {
      console.warn('message guard error:' + error);
    }
    return true;
  });
}
