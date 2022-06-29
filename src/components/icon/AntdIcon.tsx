const icons = new Map();

function getIcon(type: string) {
  if (icons.has(type)) {
    return icons.get(type);
  } else {
    const icon = defineAsyncComponent(
      () => import(/* @vite-ignore */ `/node_modules/@ant-design/icons-vue/${type}.js`),
    );
    icons.set(type, icon);
    return icons.get(type);
  }
}

const AntdIcon = (props: { type: string }) => {
  const { type, ..._props } = props;
  const icon = getIcon(type);
  return h(icon, _props);
};

export default AntdIcon;
