import { defineComponent, ref, watch } from 'vue';
import {
  getRawProps,
  useNamespace,
  getEditorEmits,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import { RawEditorController } from '../raw-editor.controller';
import './ibiz-qrcode.scss';

/**
 * 二维码阅读器
 * @primary
 * @description 支持将指定的值转换为二维码图片。
 * @ignoreprops  autoFocus | overflowMode
 * @ignoreemits  infoTextChange | enter | change | focus | blur
 */
export const IBizQrcode = defineComponent({
  name: 'IBizQrcode',
  props: getRawProps<RawEditorController>(),
  emits: getEditorEmits(),
  setup(props, { attrs }) {
    const ns = useNamespace('qrcode');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);
    // 转换的二维码图片路径
    const dataUrl = ref('');

    watch(
      () => props.value,
      async (newVal, oldVal) => {
        let text = '';
        if (newVal !== oldVal) {
          if (isNil(newVal)) {
            text = '';
          } else {
            text = `${newVal}`;
          }
        }
        if (text) {
          const qrCode = ibiz.qrcodeUtil.createQrcode(text, {
            margin: 8,
            ...attrs,
          });
          const element = await qrCode._getElement();
          dataUrl.value = element.toDataURL();
        }
      },
      {
        immediate: true,
      },
    );
    return {
      ns,
      dataUrl,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    let content = (
      <van-icon
        class={[
          this.ns.e('no-img'),
          this.ns.e('content'),
          this.semanticClass('editor.content'),
        ]}
        size={this.$attrs.width || 100}
        style={this.semanticStyle('editor.content')}
        name='photo-fail'
      />
    );
    if (this.dataUrl) {
      content = (
        <img
          class={[
            this.ns.e('img'),
            this.ns.e('content'),
            this.semanticClass('editor.content'),
          ]}
          style={this.semanticStyle('editor.content')}
          src={this.dataUrl}
          alt=''
        />
      );
    }
    return (
      <div
        class={[this.ns.b(), this.semanticClass('editor.root')]}
        style={this.semanticStyle('editor.root')}
      >
        {content}
      </div>
    );
  },
});
