import { CTX } from '@ibiz-template/runtime';
import { defineComponent, inject, PropType } from 'vue';

export const ControlLoadingPlaceholder = defineComponent({
  name: 'ControlLoadingPlaceholder',
  props: {
    modelData: { type: Object as PropType<IData>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
  },
  setup(props) {
    // 上下文里提前预告部件
    const ctx = inject('ctx') as CTX;

    ctx.evt.emit('onForecast', props.modelData.name!);

    return {};
  },
  render() {
    return null;
  },
});
