// import { createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';

const AntdIcon = (props: { type: string }) => {
  const { type, ..._props } = props;
  return h($Icon[type], _props);
};

export default AntdIcon;
