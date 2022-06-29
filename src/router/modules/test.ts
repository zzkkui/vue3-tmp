import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from '../contant';

const test: AppRouteModule = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/test1',
  meta: {
    // orderNo menu 排序字段
    orderNo: 20,
    icon: 'icon:weixiu',
    title: 'test',
  },
  children: [
    {
      path: 'test1',
      name: 'test1',
      component: () => import('src/pages/test/test1.vue'),
      meta: {
        title: 'test1',
      },
    },
    {
      path: 'test2',
      name: 'test2',
      component: () => import('src/pages/test/test2.vue'),
      meta: {
        title: 'test2',
      },
    },
  ],
};

export default test;
