import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from '../contant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  // component: () => import('src/layouts/index.vue'),
  component: LAYOUT,
  meta: {
    // orderNo menu 排序字段
    // 在菜单展示必须需要，没有默认 0
    orderNo: 10,
    // icon 如果是 antdv 的直接引入组件，如果是自定义icon用字符串
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
