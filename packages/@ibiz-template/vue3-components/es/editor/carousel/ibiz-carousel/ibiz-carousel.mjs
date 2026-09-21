import { defineComponent, ref, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getDatePickerProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-carousel.css';

"use strict";
const IBizCarousel = /* @__PURE__ */ defineComponent({
  name: "IBizCarousel",
  props: getDatePickerProps(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace("carousel");
    const c = props.controller;
    const editorModel = c.model;
    const carouselData = ref([]);
    const isAuto = ref(true);
    const timeSpan = ref(3e3);
    const downloadUrl = ref("");
    watch(() => props.value, (newVal) => {
      if (typeof newVal === "string") {
        carouselData.value = !newVal ? [] : JSON.parse(newVal);
      }
    }, {
      immediate: true
    });
    watch(() => props.data, (newVal) => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, c.editorParams);
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    watch(carouselData, (newVal) => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.e(this.editorModel.editorType)]
    }, [createVNode(resolveComponent("iBizCarouselComponent"), mergeProps({
      "carouselData": this.carouselData,
      "isAuto": this.isAuto,
      "timeSpan": this.timeSpan
    }, this.$attrs), null)]);
  }
});

export { IBizCarousel };
