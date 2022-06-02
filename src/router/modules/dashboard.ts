import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from '../contant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  // component: () => import('src/layouts/index.vue'),
  component: LAYOUT,
  meta: {
    // orderNo menu 排序字段
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
  },
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('src/pages/dashboard/index.vue'),
      meta: {
        title: '首页',
      },
    },
  ],
};

export default dashboard;
