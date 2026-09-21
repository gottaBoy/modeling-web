import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType, ref } from 'vue';
import { ILanguageRes } from '@ibiz/model-core';
import './no-data.scss';

export const IBizNoData = defineComponent({
  name: 'IBizNoData',
  props: {
    text: {
      type: String,
    },
    emptyTextLanguageRes: {
      type: Object as PropType<ILanguageRes>,
      default: undefined,
    },
    hideNoDataImage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const ns = useNamespace('no-data');

    const label = ref(props.text || ibiz.i18n.t('app.noData'));

    if (props.emptyTextLanguageRes) {
      label.value = ibiz.i18n.t(
        props.emptyTextLanguageRes.lanResTag!,
        props.text,
      );
    }

    return { ns, label };
  },
  render() {
    return (
      <el-empty
        class={[this.ns.b(), this.hideNoDataImage ? 'hideImage' : '']}
        description={this.label}
      >
        {this.$slots.default?.()}
      </el-empty>
    );
  },
});
