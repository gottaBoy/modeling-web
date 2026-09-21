import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';
import './editor-empty-text.scss';

export const IBizEditorEmptyText = defineComponent({
  name: 'IBizEditorEmptyText',
  props: {
    showPlaceholder: {
      type: Boolean,
      default: false,
    },
    placeHolder: {
      type: String,
      default: '',
    },
  },
  setup() {
    const ns = useNamespace('editor-empty-text');
    return { ns };
  },
  render() {
    return (
      <span
        class={[this.ns.b(), this.ns.is('placeholder', this.showPlaceholder)]}
      >
        {this.showPlaceholder && this.placeHolder
          ? this.placeHolder
          : ibiz.config.common.emptyText}
      </span>
    );
  },
});
