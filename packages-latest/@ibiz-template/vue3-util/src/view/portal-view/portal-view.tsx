import { IModal, ViewController } from '@ibiz-template/runtime';
import { IAppPortalView } from '@ibiz/model-core';
import { defineComponent, h, PropType, resolveComponent } from 'vue';
import { useNamespace, useViewController } from '../../use';

export const PortalView = defineComponent({
  name: 'IBizPortalView',
  props: {
    context: Object as PropType<IContext>,
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modelData: { type: Object as PropType<IAppPortalView>, required: true },
    modal: { type: Object as PropType<IModal> },
    state: { type: Object as PropType<IData> },
  },
  setup() {
    const ns = useNamespace('view');
    const c = useViewController((...args) => new ViewController(...args));
    // 视图部件模型在viewlayoutPanel里面。
    const controls = c.model.viewLayoutPanel?.controls || c.model.controls;

    const { viewType, sysCss, codeName } = c.model;
    const typeClass = viewType!.toLowerCase();
    const sysCssName = sysCss?.cssName;
    const viewClassNames = [
      ns.b(),
      true && ns.b(typeClass),
      true && ns.m(codeName),
      true && sysCssName,
    ];

    return { c, ns, controls, viewClassNames };
  },
  render() {
    let content = null;
    if (this.c.state.isCreated) {
      // 绘制部件插槽，外部插槽优先
      const slots: IData = {
        ...this.$slots,
      };
      if (this.controls?.length) {
        this.controls.forEach(ctrl => {
          const slotKey = ctrl.name || ctrl.id!;
          const ctrlProps = {
            context: this.c.context,
            params: this.c.params,
          };
          if (this.c.slotProps[slotKey]) {
            Object.assign(ctrlProps, this.c.slotProps[slotKey]);
          }
          // 已经有插槽的不用自己绘制了。
          const outCtrlSlot = slots[slotKey];
          if (outCtrlSlot) {
            slots[slotKey] = () => {
              return outCtrlSlot({
                modelData: ctrl,
                ...ctrlProps,
              });
            };
            return;
          }
          const provider = this.c.providers[slotKey];
          if (provider) {
            slots[slotKey] = () => {
              const comp = resolveComponent(provider.component) as string;
              return h(comp, {
                modelData: ctrl,
                ...ctrlProps,
                provider,
              });
            };
          }
        });
      }

      // 绘制内容区
      if (slots.dashboard) {
        content = slots.dashboard();
      }
    }

    return <div class={this.viewClassNames}>{content}</div>;
  },
});
