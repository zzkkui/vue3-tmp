import type { Router } from 'vue-router';
import { Modal, notification } from 'ant-design-vue';
import { useAppStoreWithOut } from 'src/store/modules/app';
import projectSetting from 'src/projectSetting';
import { AxiosCanceler } from 'src/utils/axios/axiosCancel';
import { createPermissionGuard } from './permissionGuard';

// Don't change the order of creation
export function createGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createMessageGuard(router);
  createPermissionGuard(router);
  createStateGuard(router);
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
 * @param router
 */
function createHttpGuard(router: Router) {
  // 路由跳转后是否取消所有 pending ajax
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending();
    return true;
  });
}

/**
 * @param router
 */
export function createMessageGuard(router: Router) {
  // 路由跳转后是否销毁所有 弹窗
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

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // 跳转到登录页需要清掉的一些数据
    if (to.path === '/login') {
    }
  });
}
