import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import { IDBHtmlPortletPart } from '@ibiz/model-core';
import { HtmlPortletController } from '@ibiz-template/runtime';
import './html-portlet.scss';

export const HtmlPortlet = defineComponent({
  name: 'IBizHtmlPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBHtmlPortletPart>,
      required: true,
    },
    controller: {
      type: HtmlPortletController,
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

    return { ns, semanticClass, semanticStyle };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        <iframe
          class={this.semanticClass('portlet.html', { html: this.controller })}
          style={this.semanticStyle('portlet.html', { html: this.controller })}
          src={this.modelData.pageUrl}
        ></iframe>
      </iBizPortletLayout>
    );
  },
});
