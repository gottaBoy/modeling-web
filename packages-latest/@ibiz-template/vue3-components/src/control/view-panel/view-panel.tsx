import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType, resolveComponent } from 'vue';
import { IDEViewPanel } from '@ibiz/model-core';
import {
  EventBase,
  IControlProvider,
  ViewPanelController,
} from '@ibiz-template/runtime';
import './view-panel.scss';

export const ViewPanelControl = defineComponent({
  name: 'IBizViewPanelControl',
  props: {
    /**
     * @description 视图面板模型数据
     */
    modelData: { type: Object as PropType<IDEViewPanel>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
  },
  setup() {
    const c = useControlController(
      (...args) => new ViewPanelController(...args),
    );

    const ns = useNamespace(`control-${c.model.controlType?.toLowerCase()}`);

    // 视图创建完成事件
    const onCreated = (event: EventBase): void => {
      if (event && event.view) {
        c.setEmbedView(event.view);
      }
    };

    return {
      c,
      ns,
      onCreated,
    };
  },
  render() {
    return (
      <iBizControlBase controller={this.c}>
        {this.c.state.isCreated &&
          (this.$slots.default
            ? this.$slots.default({
                context: this.c.context,
                params: this.c.params,
                onCreated: this.onCreated,
              })
            : h(resolveComponent('IBizViewShell'), {
                context: this.c.context,
                params: this.c.params,
                viewId: this.c.model.embeddedAppDEViewId,
                onCreated: this.onCreated,
              }))}
      </iBizControlBase>
    );
  },
});
