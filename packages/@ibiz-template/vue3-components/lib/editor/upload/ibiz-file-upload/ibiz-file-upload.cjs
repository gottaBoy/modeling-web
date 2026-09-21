'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-file-upload.css');
var useIviewUpload = require('../use/use-iview-upload.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizFileUpload = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFileUpload",
  props: vue3Util.getUploadProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("file-upload");
    const c = props.controller;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const {
      uploadUrl,
      headers,
      files,
      limit,
      onDownload,
      onError,
      onRemove,
      onSuccess,
      beforeUpload
    } = useIviewUpload.useIViewUpload(props, (value) => {
      emit("change", value);
      useInValueChange();
    }, c);
    const noUploadIcon = vue.computed(() => {
      var _a;
      return limit.value === 1 && ((_a = files.value) == null ? void 0 : _a.length) === 1;
    });
    const isGridEditor = vue.computed(() => {
      return !!c.parent.model.columnType;
    });
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const {
      componentRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      c,
      uploadUrl,
      headers,
      files,
      limit,
      noUploadIcon,
      onDownload,
      onError,
      onRemove,
      onSuccess,
      beforeUpload,
      isGridEditor,
      componentRef,
      showFormDefaultContent
    };
  },
  render() {
    let _slot;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "componentRef"
    }, [vue.createVNode(vue.resolveComponent("el-upload"), vue.mergeProps({
      "class": [this.ns.b("icon"), this.ns.is("not-show", this.noUploadIcon)],
      "file-list": this.files,
      "action": this.uploadUrl,
      "headers": this.headers,
      "disabled": this.disabled,
      "multiple": this.c.multiple,
      "limit": this.limit,
      "drag": !!this.c.isDrag,
      "accept": this.c.accept,
      "before-upload": this.beforeUpload,
      "onSuccess": this.onSuccess,
      "onError": this.onError,
      "onRemove": this.onRemove,
      "onPreview": this.onDownload
    }, this.$attrs), {
      default: () => [this.noUploadIcon ? null : vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [this.ns.b("button")],
        "size": this.isGridEditor ? "small" : "default"
      }, _isSlot(_slot = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot : {
        default: () => [_slot]
      })]
    })]);
  }
});

exports.IBizFileUpload = IBizFileUpload;
