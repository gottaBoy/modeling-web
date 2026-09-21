'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./panel-static-carousel.css');

"use strict";
const PanelStaticCarousel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelStaticCarousel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("panel-static-carousel");
    const model = props.modelData;
    const carouselData = vue.ref([]);
    const isAuto = vue.ref(true);
    const timeSpan = vue.ref(3e3);
    const showMode = vue.ref("DEFAULT");
    const getSwipeConfig = (swipeData) => {
      const autoPlay = swipeData.find((item) => Object.is(item.key, "autoplay"));
      if (autoPlay) {
        isAuto.value = !!Object.is(autoPlay.value, "1");
      }
      const span = swipeData.find((item) => Object.is(item.key, "timespan"));
      if (span) {
        timeSpan.value = Number(span.value) || 0;
      }
      const showModeItem = swipeData.find((item) => Object.is(item.key, "showMode"));
      if (showModeItem && showModeItem.value) {
        showMode.value = showModeItem.value;
      }
    };
    if ((_a = model.rawItem) == null ? void 0 : _a.rawItemParams) {
      let swipeData = [];
      const imgData = model.rawItem.rawItemParams;
      const autoplayIndex = imgData.findIndex((item) => Object.is(item.key, "autoplay"));
      const timespanIndex = imgData.findIndex((item) => Object.is(item.key, "timespan"));
      const showModeIndex = imgData.findIndex((item) => Object.is(item.key, "showMode"));
      let number = 0;
      if (autoplayIndex >= 0) {
        number += 1;
      }
      if (timespanIndex >= 0) {
        number += 1;
      }
      if (showModeIndex >= 0) {
        number += 1;
      }
      if (number > 0) {
        swipeData = imgData.slice(0, -number);
        getSwipeConfig(imgData.slice(-number));
      } else {
        swipeData = imgData;
        getSwipeConfig(imgData);
      }
      carouselData.value = swipeData.map((item) => {
        const {
          id,
          key,
          sysImage
        } = item;
        return {
          id,
          name: key,
          imgUrl: (sysImage == null ? void 0 : sysImage.imagePath) || (sysImage == null ? void 0 : sysImage.rawContent),
          cssClass: sysImage == null ? void 0 : sysImage.cssClass,
          linkPath: item.linkPath
        };
      });
    }
    return {
      ns,
      carouselData,
      isAuto,
      timeSpan,
      showMode
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("iBizCarouselComponent"), {
      "carouselData": this.carouselData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan,
      "showMode": this.showMode
    }, null)]);
  }
});

exports.PanelStaticCarousel = PanelStaticCarousel;
