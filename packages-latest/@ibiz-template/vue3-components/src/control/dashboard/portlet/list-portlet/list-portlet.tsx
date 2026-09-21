import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import {
  defineComponent,
  PropType,
  resolveComponent,
  h,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { IDBListPortletPart } from '@ibiz/model-core';
import { ControlType, ListPortletController } from '@ibiz-template/runtime';

export const ListPortlet = defineComponent({
  name: 'IBizListPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBListPortletPart>,
      required: true,
    },
    controller: {
      type: ListPortletController,
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

    const list = props.modelData.controls?.find(item => {
      return item.controlType === ControlType.LIST;
    });

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

    return { ns, list, semanticClass, semanticStyle };
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
        {h(resolveComponent('IBizControlShell'), {
          class: this.semanticClass('portlet.list', { list: this.controller }),
          style: this.semanticStyle('portlet.list', { list: this.controller }),
          context,
          params,
          modelData: this.list,
        })}
      </iBizPortletLayout>
    );
  },
});
