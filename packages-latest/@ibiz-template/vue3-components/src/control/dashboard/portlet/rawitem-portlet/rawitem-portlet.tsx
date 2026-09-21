import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import {
  h,
  ref,
  PropType,
  onMounted,
  defineComponent,
  resolveComponent,
} from 'vue';
import { IDBRawItemPortletPart, IHtmlItem, ITextItem } from '@ibiz/model-core';
import { RawItemPortletController } from '@ibiz-template/runtime';

export const RawItemPortlet = defineComponent({
  name: 'IBizRawItemPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBRawItemPortletPart>,
      required: true,
    },
    controller: {
      type: Object as PropType<RawItemPortletController>,
      required: true,
    },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace(`portlet-${c.model.portletType?.toLowerCase()}`);
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.dashboard,
    );
    const content = ref<string>();

    const onInit = async (): Promise<void> => {
      const rawItemModel = c.model.rawItem;
      if (!rawItemModel) return;
      let rawItemContent: string | undefined;
      if (rawItemModel.contentType === 'RAW') {
        rawItemContent = (rawItemModel as ITextItem).caption;
      } else if (rawItemModel.contentType === 'HTML') {
        rawItemContent = (rawItemModel as IHtmlItem).content;
      }
      const data = (c.dashboard.view as IData).srfactiveviewdata || {};
      if (rawItemContent && rawItemModel.templateMode)
        rawItemContent = await ibiz.util.hbs.render(
          rawItemContent.replaceAll('//n', '\n'),
          {
            data: { ...data },
            context: props.controller.context,
            params: props.controller.params,
          },
        );
      content.value = rawItemContent;
    };

    onMounted(() => {
      onInit();
    });

    return { ns, content, semanticClass, semanticStyle };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        {h(resolveComponent('iBizRawItem'), {
          class: this.semanticClass('portlet.rawitem', {
            rawitem: this.controller,
          }),
          style: this.semanticStyle('portlet.rawitem', {
            rawitem: this.controller,
          }),
          rawItem: this.modelData,
          content: this.content,
        })}
      </iBizPortletLayout>
    );
  },
});
