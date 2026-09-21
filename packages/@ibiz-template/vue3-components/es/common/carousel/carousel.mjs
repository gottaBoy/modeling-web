import { isVNode, defineComponent, ref, watch, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './carousel.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizCarouselComponent = /* @__PURE__ */ defineComponent({
  name: "IBizCarouselComponent",
  props: {
    carouselData: {
      type: Array,
      required: true
    },
    isAuto: {
      type: Boolean,
      default: true
    },
    timeSpan: {
      type: Number,
      default: 3e3
    },
    showMode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("carousel-component");
    const swipeData = ref([]);
    watch(() => props.carouselData, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        swipeData.value = newVal;
      }
    }, {
      immediate: true
    });
    return {
      ns,
      swipeData
    };
  },
  render() {
    let _slot;
    const renderPic = (item) => {
      if (item.cssClass) {
        if (item.cssClass.indexOf("fa-") !== -1) {
          return createVNode("i", {
            "class": [item.cssClass]
          }, null);
        }
        return createVNode("ion-icon", {
          "name": item.cssClass
        }, null);
      }
      if (item.imgUrl) {
        return createVNode("img", {
          "src": item.imgUrl,
          "alt": item.name
        }, null);
      }
    };
    return createVNode("div", null, [this.showMode === "CARD" ? createVNode(resolveComponent("IBizCarousel-card"), {
      "swipeData": this.swipeData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan
    }, null) : createVNode(resolveComponent("el-carousel"), {
      "class": this.ns.b(),
      "autoplay": this.isAuto,
      "interval": this.timeSpan
    }, _isSlot(_slot = this.swipeData.map((item) => {
      return createVNode(resolveComponent("el-carousel-item"), {
        "key": item.id
      }, {
        default: () => [item.linkPath ? createVNode("a", {
          "href": item.linkPath
        }, [renderPic(item)]) : renderPic(item)]
      });
    })) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

export { IBizCarouselComponent };
