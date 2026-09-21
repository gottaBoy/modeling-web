import { isVNode, defineComponent, createVNode, withDirectives, resolveComponent, mergeProps, resolveDirective, ref, watch } from 'vue';
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
    },
    semantic: {
      type: Object,
      default: () => ({
        semanticClass: () => "",
        semanticStyle: () => ""
      })
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
    const childClass = [{
      class: props.semantic.semanticClass("arrowleft"),
      selector: ".el-carousel__arrow--left"
    }, {
      class: props.semantic.semanticClass("arrowright"),
      selector: ".el-carousel__arrow--right"
    }, {
      class: props.semantic.semanticClass("indicator"),
      selector: ".el-carousel__indicator"
    }];
    const childStyle = [{
      style: props.semantic.semanticStyle("arrowleft"),
      selector: ".el-carousel__arrow--left"
    }, {
      style: props.semantic.semanticStyle("arrowright"),
      selector: ".el-carousel__arrow--right"
    }, {
      class: props.semantic.semanticStyle("indicator"),
      selector: ".el-carousel__indicator"
    }];
    return {
      ns,
      swipeData,
      childClass,
      childStyle
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
      "timeSpan": this.timeSpan,
      "semantic": this.semantic
    }, null) : withDirectives(createVNode(resolveComponent("el-carousel"), mergeProps({
      "class": [this.ns.b(), this.semantic.semanticClass("content")],
      "style": this.semantic.semanticStyle("content"),
      "autoplay": this.isAuto,
      "interval": this.timeSpan
    }, this.$attrs), _isSlot(_slot = this.swipeData.map((item) => {
      return createVNode(resolveComponent("el-carousel-item"), {
        "key": item.id,
        "class": this.semantic.semanticClass("item", {
          item
        }),
        "style": this.semantic.semanticStyle("item", {
          item
        })
      }, {
        default: () => [item.linkPath ? createVNode("a", {
          "href": item.linkPath
        }, [renderPic(item)]) : renderPic(item)]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
  }
});

export { IBizCarouselComponent };
