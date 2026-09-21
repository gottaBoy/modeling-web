import { computed, defineComponent, ref } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './virtual-list.scss';

export const VirtualList = defineComponent({
  name: 'IBizVirtualList',
  props: {
    items: {
      type: Array<IData>,
      required: true,
    },
    itemSize: {
      type: Number,
      default: 34,
    },
    maxHeight: {
      type: Number,
      default: 300,
    },
    buffer: {
      type: Number,
      default: 5,
    },
    getKey: {
      type: Function,
      default: (item: IData) => item.id,
    },
  },
  emits: ['scroll', 'reach-bottom'],
  setup(props, { emit }) {
    const ns = useNamespace('virtual-list');

    const container = ref<HTMLElement>();
    const scrollTop = ref(0);

    const totalHeight = computed(() => props.items.length * props.itemSize);

    const height = computed(() => {
      if (totalHeight.value > props.maxHeight) return props.maxHeight;
      return totalHeight.value;
    });

    const visibleCount = computed(
      () => Math.ceil(height.value / props.itemSize) + props.buffer,
    );

    const startIndex = computed(() =>
      Math.floor(scrollTop.value / props.itemSize),
    );
    const endIndex = computed(() =>
      Math.min(startIndex.value + visibleCount.value, props.items.length),
    );

    const visibleData = computed(() =>
      props.items.slice(startIndex.value, endIndex.value),
    );

    const offsetY = computed(() => startIndex.value * props.itemSize);

    const handleScroll = (): void => {
      if (container.value) {
        const { scrollHeight, clientHeight } = container.value;
        scrollTop.value = container.value.scrollTop;
        emit('scroll', {
          scrollTop: scrollTop.value,
          scrollHeight: container.value.scrollHeight,
          clientHeight: container.value.clientHeight,
        });
        if (scrollHeight - (scrollTop.value + clientHeight) < 50) {
          emit('reach-bottom');
        }
      }
    };

    const scrollTo = (position: number): void => {
      if (container.value) {
        container.value.scrollTop = position;
        scrollTop.value = position;
      }
    };

    const scrollToIndex = (index: number): void => {
      const position = index * props.itemSize;
      scrollTo(position);
    };

    return {
      ns,
      height,
      offsetY,
      container,
      scrollTop,
      totalHeight,
      visibleData,
      scrollTo,
      handleScroll,
      scrollToIndex,
    };
  },
  render() {
    return (
      <div
        ref='container'
        class={this.ns.b()}
        style={{ height: `${this.height}px` }}
        onScroll={this.handleScroll}
      >
        <div
          class={this.ns.e('phantom')}
          style={{ height: `${this.totalHeight}px` }}
        ></div>
        <div
          class={this.ns.e('content')}
          style={{ transform: `translateY(${this.offsetY}px)` }}
        >
          {this.visibleData.map(item => {
            return (
              <div
                key={this.getKey(item)}
                style={{ height: `${this.itemSize}px` }}
                class={this.ns.em('content', 'item')}
              >
                {this.$slots.default?.({ item })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
