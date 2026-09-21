'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./carousel.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizCarouselComponent = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("carousel-component");
    const swipeData = vue.ref([]);
    vue.watch(() => props.carouselData, (newVal, oldVal) => {
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
          return vue.createVNode("i", {
            "class": [item.cssClass]
          }, null);
        }
        return vue.createVNode("ion-icon", {
          "name": item.cssClass
        }, null);
      }
      if (item.imgUrl) {
        return vue.createVNode("img", {
          "src": item.imgUrl,
          "alt": item.name
        }, null);
      }
    };
    return vue.createVNode("div", null, [this.showMode === "CARD" ? vue.createVNode(vue.resolveComponent("IBizCarousel-card"), {
      "swipeData": this.swipeData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan
    }, null) : vue.createVNode(vue.resolveComponent("el-carousel"), {
      "class": this.ns.b(),
      "autoplay": this.isAuto,
      "interval": this.timeSpan
    }, _isSlot(_slot = this.swipeData.map((item) => {
      return vue.createVNode(vue.resolveComponent("el-carousel-item"), {
        "key": item.id
      }, {
        default: () => [item.linkPath ? vue.createVNode("a", {
          "href": item.linkPath
        }, [renderPic(item)]) : renderPic(item)]
      });
    })) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

exports.IBizCarouselComponent = IBizCarouselComponent;
