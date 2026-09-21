import { defineComponent, createVNode, resolveComponent, mergeProps, ref } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './panel-static-carousel.css';

"use strict";
const PanelStaticCarousel = /* @__PURE__ */ defineComponent({
  name: "IBizPanelStaticCarousel",
  props: {
    /**
     * @description 静态轮播组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 静态轮播组件控制器
     */
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("panel-static-carousel");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const model = props.modelData;
    const carouselData = ref([]);
    const isAuto = ref(true);
    const timeSpan = ref(3e3);
    const showMode = ref("DEFAULT");
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
      showMode,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const attrs = this.$attrs.attrs || {};
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("iBizCarouselComponent"), mergeProps({
      "carouselData": this.carouselData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan,
      "showMode": this.showMode,
      "semantic": {
        semanticClass: this.semanticClass,
        semanticStyle: this.semanticStyle
      }
    }, attrs), null)]);
  }
});

export { PanelStaticCarousel };
