import { useNamespace } from '@ibiz-template/vue3-util';
import { IFlexLayout, ILayout } from '@ibiz/model-core';
import { defineComponent, PropType } from 'vue';
import './row.scss';

export const IBizRow = defineComponent({
  name: 'IBizRow',
  props: {
    layout: Object as PropType<ILayout>,
  },
  setup() {
    const ns = useNamespace('row');
    return { ns };
  },
  render() {
    const defaultSlot = this.$slots.default?.();
    if (this.layout?.layout === 'FLEX') {
      const { dir, align, valign } = this.layout as IFlexLayout;
      const _dir = dir as 'row' | 'column';
      return (
        <div
          class={[this.ns.b(), this.ns.m('flex'), this.ns.m(_dir)]}
          style={{
            flexDirection: _dir,
            justifyContent: align,
            alignItems: valign,
          }}
        >
          {defaultSlot}
        </div>
      );
    }
    return (
      <el-row class={[this.ns.b(), this.ns.m('grid')]}>{defaultSlot}</el-row>
    );
  },
});
