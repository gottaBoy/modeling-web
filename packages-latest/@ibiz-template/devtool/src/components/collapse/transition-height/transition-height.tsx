import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './transition-height.scss';

export const TransitionHeight = defineComponent({
  name: 'TransitionHeight',
  props: {
    // 布尔值show标识关闭还是展开
    show: Boolean,
  },
  setup(props) {
    const ns = useNamespace('transition-height');
    const transitionWrap = ref();
    const height = ref<number>(0);
    onMounted(() => {
      nextTick(() => {
        height.value = transitionWrap.value.offsetHeight;
        transitionWrap.value.style.height = props.show
          ? `${height.value}px`
          : 0;
      });
    });

    watch(
      () => props.show,
      newVal => {
        if (transitionWrap.value) {
          transitionWrap.value.style.height = newVal ? `${height.value}px` : 0;
        }
      },
    );
    return { ns, transitionWrap, height };
  },
  render() {
    return (
      <div class={this.ns.b()} ref='transitionWrap'>
        {this.$slots.default?.()}
      </div>
    );
  },
});
export default TransitionHeight;
