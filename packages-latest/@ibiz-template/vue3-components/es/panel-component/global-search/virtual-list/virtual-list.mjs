import { defineComponent, createVNode, ref, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './virtual-list.css';

"use strict";
const VirtualList = /* @__PURE__ */ defineComponent({
  name: "IBizVirtualList",
  props: {
    items: {
      type: Array,
      required: true
    },
    itemSize: {
      type: Number,
      default: 34
    },
    maxHeight: {
      type: Number,
      default: 300
    },
    buffer: {
      type: Number,
      default: 5
    },
    getKey: {
      type: Function,
      default: (item) => item.id
    }
  },
  emits: ["scroll", "reach-bottom"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("virtual-list");
    const container = ref();
    const scrollTop = ref(0);
    const totalHeight = computed(() => props.items.length * props.itemSize);
    const height = computed(() => {
      if (totalHeight.value > props.maxHeight)
        return props.maxHeight;
      return totalHeight.value;
    });
    const visibleCount = computed(() => Math.ceil(height.value / props.itemSize) + props.buffer);
    const startIndex = computed(() => Math.floor(scrollTop.value / props.itemSize));
    const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, props.items.length));
    const visibleData = computed(() => props.items.slice(startIndex.value, endIndex.value));
    const offsetY = computed(() => startIndex.value * props.itemSize);
    const handleScroll = () => {
      if (container.value) {
        const {
          scrollHeight,
          clientHeight
        } = container.value;
        scrollTop.value = container.value.scrollTop;
        emit("scroll", {
          scrollTop: scrollTop.value,
          scrollHeight: container.value.scrollHeight,
          clientHeight: container.value.clientHeight
        });
        if (scrollHeight - (scrollTop.value + clientHeight) < 50) {
          emit("reach-bottom");
        }
      }
    };
    const scrollTo = (position) => {
      if (container.value) {
        container.value.scrollTop = position;
        scrollTop.value = position;
      }
    };
    const scrollToIndex = (index) => {
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
      scrollToIndex
    };
  },
  render() {
    return createVNode("div", {
      "ref": "container",
      "class": this.ns.b(),
      "style": {
        height: "".concat(this.height, "px")
      },
      "onScroll": this.handleScroll
    }, [createVNode("div", {
      "class": this.ns.e("phantom"),
      "style": {
        height: "".concat(this.totalHeight, "px")
      }
    }, null), createVNode("div", {
      "class": this.ns.e("content"),
      "style": {
        transform: "translateY(".concat(this.offsetY, "px)")
      }
    }, [this.visibleData.map((item) => {
      var _a, _b;
      return createVNode("div", {
        "key": this.getKey(item),
        "style": {
          height: "".concat(this.itemSize, "px")
        },
        "class": this.ns.em("content", "item")
      }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, {
        item
      })]);
    })])]);
  }
});

export { VirtualList };
