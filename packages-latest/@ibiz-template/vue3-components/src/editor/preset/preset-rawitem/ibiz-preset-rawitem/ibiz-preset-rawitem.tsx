import { defineComponent, ref, Ref, watch } from 'vue';
import {
  getEditorEmits,
  getRawProps,
  useFocusAndBlur,
  useNamespace,
} from '@ibiz-template/vue3-util';
import './ibiz-preset-rawitem.scss';
import { PresetRawitemEditorController } from '../preset-rawitem.controller';

/**
 * 直接内容
 *
 * @description 用于展示直接内容。此为平台预置标准编辑器组件
 * @primary
 * @ignoreprops autoFocus | overflowMode | controlParams
 * @ignoreemits change | enter | infoTextChange
 */
export const IBizPresetRawitem = defineComponent({
  name: 'IBizPresetRawitem',
  props: getRawProps<PresetRawitemEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('preset-rawitem');

    const c = props.controller;

    const editorModel = c.model;

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => emit('blur'),
    );

    // 预置类型
    const type = c.model.predefinedType;

    // 传入内容
    const content: Ref<string | number | undefined> = ref('');

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          content.value = newVal as string;
        }
      },
      {
        immediate: true,
      },
    );

    return {
      ns,
      editorModel,
      editorRef,
      type,
      content,
    };
  },
  render() {
    let content = null;
    if (this.type === 'FIELD_IMAGE') {
      content = (
        <iBizRawItem content={this.content} type={'IMAGE'}></iBizRawItem>
      );
    } else if (this.type === 'FIELD_TEXT_DYNAMIC') {
      content = (
        <iBizRawItem content={this.content} type={'TEXT'}></iBizRawItem>
      );
    } else {
      content = (
        <div>
          {ibiz.i18n.t('editor.preset.ibizPresetRawitem.noSupportType', {
            type: this.type,
          })}
        </div>
      );
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
        ]}
        ref='editorRef'
      >
        {content}
      </div>
    );
  },
});
