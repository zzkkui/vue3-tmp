import AntdIcon from './AntdIcon';
import SvgIcon from './SvgIcon.vue';

const MenuIcon = (props) => {
  const { icon, _props } = props;
  const arr = icon.split(':');
  switch (arr[0]) {
    case 'antd':
      return h(AntdIcon, {
        type: arr[1],
        ..._props,
      });
    case 'icon':
      return h(SvgIcon, {
        type: arr[1],
        ..._props,
      });
  }
};

export default MenuIcon;
