import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import './not-supported-editor.scss';
import { IEditor } from '@ibiz/model-core';

export const NotSupportedEditor = defineComponent({
  name: 'NotSupportedEditor',
  props: {
    modelData: {
      type: Object as PropType<IEditor>,
      required: true,
    },
    context: {
      type: Object as PropType<IContext>,
    },
  },
  setup(props) {
    const ns = useNamespace('not-supported-editor');

    // 是否处于设计预览状态
    const isDesignPreview = props.context?.srfrunmode === 'DESIGN';

    return { ns, isDesignPreview };
  },
  render() {
    if (this.isDesignPreview) {
      return (
        <div class={this.ns.b()}>
          <div class={this.ns.b('preview-content')}></div>
        </div>
      );
    }
    return (
      <div class={this.ns.b()}>
        {ibiz.i18n.t('editor.notSupportedEditor.unsupportedType', {
          type: this.modelData.editorType,
        })}
      </div>
    );
  },
});
