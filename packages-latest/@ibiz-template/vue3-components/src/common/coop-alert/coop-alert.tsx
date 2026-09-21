import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import './coop-alert.scss';

export const IBizCoopAlert = defineComponent({
  name: 'IBizCoopAlert',
  props: {
    title: {
      type: String,
    },
    type: {
      type: String as PropType<'success' | 'warning' | 'info' | 'error'>,
      default: 'info',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const ns = useNamespace('coop-alert');

    return { ns };
  },
  render() {
    if (!this.title) {
      return;
    }
    return <el-alert class={this.ns.b()} {...this.$props}></el-alert>;
  },
});
