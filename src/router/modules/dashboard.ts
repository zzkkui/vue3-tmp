import type { AppRouteModule } from 'src/router/interface';
import { LAYOUT } from '../contant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    // orderNo menu 排序字段
    // 在菜单展示必须需要，没有默认 0
    orderNo: 10,
    // antd 自带 'antd:***'
    // 自定义 icon 'icon:***'  iconfont 中生成的， 'icon:svg|***' 本地 assets/icons 文件内的 svg
    icon: 'antd:HomeOutlined',
    title: '首页',
    single: true,
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
