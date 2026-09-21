'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-carousel.css');

"use strict";
const IBizCarousel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCarousel",
  props: vue3Util.getEditorProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("carousel");
    const c = props.controller;
    const editorModel = c.model;
    const enableNoAccess = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.enablenoaccess) === "true";
    const carouselData = vue.ref([]);
    const isAuto = vue.ref(true);
    const timeSpan = vue.ref(3e3);
    vue.watch(() => props.value, (newVal) => {
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
    vue.watch(carouselData, (newVal) => {
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
