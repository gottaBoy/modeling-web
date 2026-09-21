import { computed, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { highlight } from './high-light-code-util';
import './high-light-code.scss';

export const IBizHighLightCode = defineComponent({
  name: 'IBizHighLightCode',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('high-light-code');

    const highlighted = computed(() => highlight(props.code));

    return {
      ns,
      highlighted,
    };
  },
  render() {
    return <div class={this.ns.b()} v-html={this.highlighted}></div>;
  },
});
