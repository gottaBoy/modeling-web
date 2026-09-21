import { computed, defineComponent, ref, Ref, watch } from 'vue';
import {
  getSpanProps,
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  useFocusAndBlur,
} from '@ibiz-template/vue3-util';
import { SpanEditorController } from '../span-editor.controller';
import './span-link.scss';

/**
 * 标签链接
 *
 * @description 直接呈现文本内容，可配置数据链接视图用于视图跳转。支持编辑器类型包含：`标签（数据链接）`
 * @primary
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits change | blur | focus | enter | infoTextChange
 */
export const IBizSpanLink = defineComponent({
  name: 'IBizSpanLink',
  props: getSpanProps<SpanEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('span-link');

    const c = props.controller!;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const curValue: Ref<string> = ref('');

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          curValue.value = `${newVal}`;
        }
      },
      { immediate: true },
    );

    // 打开数据链接视图
    const openLinkView = async () => {
      await c.openLinkView(props.data);
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => emit('blur'),
    );

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    return {
      ns,
      curValue,
      editorRef,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      openLinkView,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='editorRef'
        style={this.semanticStyle('editor.root')}
      >
        <a
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          onClick={this.openLinkView}
        >
          {this.curValue}
        </a>
      </div>
    );
  },
});
