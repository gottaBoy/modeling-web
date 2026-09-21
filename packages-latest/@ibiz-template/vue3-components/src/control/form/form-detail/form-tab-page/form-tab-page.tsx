import { defineComponent, PropType, VNode } from 'vue';
import {
  useController,
  useNamespace,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import './form-tab-page.scss';
import { IDEFormTabPage } from '@ibiz/model-core';
import { FormTabPageController } from '@ibiz-template/runtime';

export const FormTabPage = defineComponent({
  name: 'IBizFormTabPage',
  props: {
    modelData: {
      type: Object as PropType<IDEFormTabPage>,
      required: true,
    },
    controller: {
      type: FormTabPageController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-tab-page');
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.form,
    );
    useController(props.controller);

    return {
      ns,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    return (
      <iBizRow
        class={[
          this.ns.b(),
          this.semanticClass('tabpage', { tabPage: this.controller }),
          this.ns.m(this.modelData.codeName),
          ...this.controller.containerClass,
        ]}
        style={this.semanticStyle('tabpage', { tabPage: this.controller })}
        layout={this.modelData.layout}
        v-loading={this.controller.state.loading}
        element-loading-text={this.controller.state.loadingText}
        onClick={(event: MouseEvent) => this.controller.onClick(event)}
      >
        {defaultSlots.map(slot => {
          const props = slot.props as IData;
          if (!props || !props.controller) {
            return slot;
          }
          const c = props.controller;
          return (
            <iBizCol layoutPos={c.model.layoutPos} state={c.state}>
              {slot}
            </iBizCol>
          );
        })}
      </iBizRow>
    );
  },
});
export default FormTabPage;
