import {
  useNamespace,
  useSemanticNode,
  useControlController,
} from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType, resolveComponent } from 'vue';
import { IAppDEGridView, IDEPickupViewPanel } from '@ibiz/model-core';
import {
  EventBase,
  IViewController,
  IControlProvider,
  IPickupGridViewEvent,
  IPickupGridViewState,
  PickupViewPanelController,
} from '@ibiz-template/runtime';
import './pickup-view-panel.scss';

export const PickupViewPanelControl = defineComponent({
  name: 'IBizPickupViewPanelControl',
  props: {
    /**
     * @description 选择视图面板模型数据
     */
    modelData: { type: Object as PropType<IDEPickupViewPanel>, required: true },
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
    /**
     * @description 是否单选
     * @default true
     */
    singleSelect: { type: Boolean, default: true },
    /**
     * @description 默认不加载数据
     * @default false
     */
    noLoadDefault: { type: Boolean, default: false },
  },
  setup() {
    const c = useControlController(
      (...args) => new PickupViewPanelController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const onCreated = (event: EventBase): void => {
      c.setEmbedView(
        event.view as IViewController<
          IAppDEGridView,
          IPickupGridViewState,
          IPickupGridViewEvent
        >,
      );
    };
    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      onCreated,
    };
  },
  render() {
    return (
      <iBizControlBase
        controller={this.c}
        class={this.semanticClass('root')}
        style={this.semanticStyle('root')}
      >
        {this.c.state.isCreated &&
          (this.$slots.default
            ? this.$slots.default({
                context: this.c.state.context,
                params: this.c.state.params,
                state: {
                  singleSelect: this.c.state.singleSelect,
                  noLoadDefault: this.noLoadDefault,
                },
                onCreated: this.onCreated,
              })
            : h(resolveComponent('IBizViewShell'), {
                class: [this.ns.e('content'), this.semanticClass('content')],
                style: this.semanticStyle('content'),
                context: this.c.state.context,
                params: this.c.state.params,
                viewId: this.c.model.embeddedAppDEViewId,
                state: {
                  singleSelect: this.c.state.singleSelect,
                  noLoadDefault: this.noLoadDefault,
                },
                onCreated: this.onCreated,
              }))}
      </iBizControlBase>
    );
  },
});
