'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-carousel.css');

"use strict";
const IBizCarousel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCarousel",
  props: vue3Util.getDatePickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props) {
    const ns = vue3Util.useNamespace("carousel");
    const c = props.controller;
    const editorModel = c.model;
    const carouselData = vue.ref([]);
    const isAuto = vue.ref(true);
    const timeSpan = vue.ref(3e3);
    const downloadUrl = vue.ref("");
    vue.watch(() => props.value, (newVal) => {
      if (typeof newVal === "string") {
        carouselData.value = !newVal ? [] : JSON.parse(newVal);
      }
    }, {
      immediate: true
    });
    vue.watch(() => props.data, (newVal) => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, c.editorParams);
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(carouselData, (newVal) => {
      if ((newVal == null ? void 0 : newVal.length) && downloadUrl.value) {
        newVal.forEach((carousel) => {
          carousel.imgUrl = carousel.imgUrl || downloadUrl.value.replace("%fileId%", carousel.id);
        });
      }
    }, {
      immediate: true
    });
    return {
      ns,
      c,
      editorModel,
      downloadUrl,
      carouselData,
      isAuto,
      timeSpan
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.e(this.editorModel.editorType)]
    }, [vue.createVNode(vue.resolveComponent("iBizCarouselComponent"), vue.mergeProps({
      "carouselData": this.carouselData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan
    }, this.$attrs), null)]);
  }
});

exports.IBizCarousel = IBizCarousel;
