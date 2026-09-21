import { defineComponent, createVNode, resolveComponent, mergeProps, ref, watch } from 'vue';
import { useNamespace, getEditorEmits, getEditorProps } from '@ibiz-template/vue3-util';
import './ibiz-carousel.css';

"use strict";
const IBizCarousel = /* @__PURE__ */ defineComponent({
  name: "IBizCarousel",
  props: getEditorProps(),
  emits: getEditorEmits(),
  setup(props) {
    var _a;
    const ns = useNamespace("carousel");
    const c = props.controller;
    const editorModel = c.model;
    const enableNoAccess = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.enablenoaccess) === "true";
    const carouselData = ref([]);
    const isAuto = ref(true);
    const timeSpan = ref(3e3);
    watch(() => props.value, (newVal) => {
      if (typeof newVal === "string") {
        carouselData.value = !newVal ? [] : JSON.parse(newVal);
      }
    }, {
      immediate: true
    });
    const getDownloadUrl = (data, file) => {
      const editorParams = {
        ...c.editorParams,
        enableNoAccess
      };
      if (editorParams.exportparams) {
        editorParams.exportParams = JSON.parse(editorParams.exportparams);
      }
      if (editorParams.globaldownloadprifix) {
        editorParams.globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
      } else {
        editorParams.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
      }
      if (file && file.folder) {
        editorParams.osscat = file.folder;
      }
      const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, data, editorParams);
      return urls.downloadUrl;
    };
    watch(carouselData, (newVal) => {
      if (newVal == null ? void 0 : newVal.length) {
        newVal.forEach((carousel) => {
          const downloadUrl = getDownloadUrl(props.data, carousel);
          carousel.imgUrl = carousel.imgUrl || downloadUrl.replace("%fileId%", carousel.id);
          if (ibiz.config.common.enableDownloadTicket && !enableNoAccess) {
            ibiz.util.file.getDownloadTicket(c.context, c.params, props.data, {
              fileId: carousel.id
            }, c.downloadTicketParams).then((downloadTicket) => {
              if (downloadTicket && downloadTicket.ticket) {
                carousel.imgUrl = downloadUrl.replace("%fileId%", downloadTicket.ticket);
              }
            });
          }
        });
      }
    }, {
      immediate: true
    });
    return {
      ns,
      c,
      editorModel,
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
