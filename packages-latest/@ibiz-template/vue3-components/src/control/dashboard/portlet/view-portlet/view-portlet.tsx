import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  resolveComponent,
} from 'vue';
import { IDBAppViewPortletPart } from '@ibiz/model-core';
import { ViewPortletController } from '@ibiz-template/runtime';

export const ViewPortlet = defineComponent({
  name: 'IBizViewPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBAppViewPortletPart>,
      required: true,
    },
    controller: {
      type: ViewPortletController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.dashboard,
    );
    const view = props.modelData.portletAppView;

    let timerTag: NodeJS.Timeout | undefined;

    onMounted(() => {
      const timer = props.controller.model.timer;
      if (timer && timer > 0) {
        timerTag = setInterval(() => {
          props.controller.refresh();
        }, timer);
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timerTag);
    });
    return { ns, view, semanticClass, semanticStyle };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    const { context, params } = this.controller;
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        {h(resolveComponent('IBizViewShell'), {
          class: this.semanticClass('portlet.view', { view: this.controller }),
          style: this.semanticStyle('portlet.view', { view: this.controller }),
          context,
          params,
          modelData: this.view,
        })}
      </iBizPortletLayout>
    );
  },
});
