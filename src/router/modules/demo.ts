import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from '../contant';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  meta: {
    // orderNo menu 排序字段
    orderNo: 30,
    icon: 'icon:svg|banquan',
    title: 'demo',
  },
  children: [
    {
      path: 'demo1',
      name: 'demo1',
      component: () => import('src/pages/demo/demo1.vue'),
      meta: {
        title: 'demo1',
      },
    },
    {
      path: 'demo2',
      name: 'demo2',
      component: () => import('src/pages/demo/demo2.vue'),
      meta: {
        title: 'demo2',
      },
    },
  ],
};

export default demo;
