'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./virtual-list.css');

"use strict";
const VirtualList = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("virtual-list");
    const container = vue.ref();
    const scrollTop = vue.ref(0);
    const totalHeight = vue.computed(() => props.items.length * props.itemSize);
    const height = vue.computed(() => {
      if (totalHeight.value > props.maxHeight)
        return props.maxHeight;
      return totalHeight.value;
    });
    const visibleCount = vue.computed(() => Math.ceil(height.value / props.itemSize) + props.buffer);
    const startIndex = vue.computed(() => Math.floor(scrollTop.value / props.itemSize));
    const endIndex = vue.computed(() => Math.min(startIndex.value + visibleCount.value, props.items.length));
    const visibleData = vue.computed(() => props.items.slice(startIndex.value, endIndex.value));
    const offsetY = vue.computed(() => startIndex.value * props.itemSize);
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
    return vue.createVNode("div", {
      "ref": "container",
      "class": this.ns.b(),
      "style": {
        height: "".concat(this.height, "px")
      },
      "onScroll": this.handleScroll
    }, [vue.createVNode("div", {
      "class": this.ns.e("phantom"),
      "style": {
        height: "".concat(this.totalHeight, "px")
      }
    }, null), vue.createVNode("div", {
      "class": this.ns.e("content"),
      "style": {
        transform: "translateY(".concat(this.offsetY, "px)")
      }
    }, [this.visibleData.map((item) => {
      var _a, _b;
      return vue.createVNode("div", {
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

exports.VirtualList = VirtualList;
