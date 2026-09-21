'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var useIviewUpload = require('../use/use-iview-upload.cjs');
var useCustomUpload = require('../use/use-custom-upload.cjs');
require('./ibiz-file-upload.css');

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
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.list"),
      selector: ".el-upload-list"
    }, {
      class: semanticClass("editor.item"),
      selector: ".el-upload-list__item"
    }, {
      class: semanticClass("editor.dragger"),
      selector: ".el-upload-dragger"
    }, {
      class: semanticClass("editor.trigger"),
      selector: ".".concat(ns.b("button"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.list"),
      selector: ".el-upload-list"
    }, {
      style: semanticStyle("editor.item"),
      selector: ".el-upload-list__item"
    }, {
      style: semanticStyle("editor.dragger"),
      selector: ".el-upload-dragger"
    }, {
      style: semanticStyle("editor.trigger"),
      selector: ".".concat(ns.b("button"))
    }];
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
      beforeUpload,
      addCacheCount,
      drainCacheCount
    } = useIviewUpload.useIViewUpload(props, (value) => {
      emit("change", value);
      useInValueChange();
    }, c, emit);
    const {
      customUpload,
      folderInputRef,
      selectFolder,
      handleFolderSelect
    } = useCustomUpload.useCustomUpload(c, {
      action: uploadUrl.value,
      headers: headers.value,
      onSuccess,
      onError,
      addCacheCount,
      drainCacheCount
    }, emit);
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
      c,
      ns,
      files,
      limit,
      headers,
      uploadUrl,
      childClass,
      childStyle,
      noUploadIcon,
      isGridEditor,
      componentRef,
      semanticClass,
      semanticStyle,
      folderInputRef,
      showFormDefaultContent,
      onError,
      onRemove,
      onSuccess,
      onDownload,
      beforeUpload,
      customUpload,
      selectFolder,
      handleFolderSelect
    };
  },
  render() {
    let _slot3;
    if (this.c.uploadmode === "ALL" || this.c.uploadmode === "FOLDER") {
      let _slot, _slot2;
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.be("uploadmode", this.c.uploadmode.toLowerCase()), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
        "ref": "componentRef",
        "style": this.semanticStyle("editor.root")
      }, [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-upload"), vue.mergeProps({
        "class": [this.ns.b("icon"), this.ns.e("content"), this.semanticClass("editor.content"), this.ns.is("not-show", this.noUploadIcon)],
        "style": this.semanticStyle("editor.content"),
        "file-list": this.files,
        "action": this.uploadUrl,
        "headers": this.headers,
        "disabled": this.disabled || this.readonly,
        "multiple": this.c.multiple,
        "limit": this.limit,
        "drag": !!this.c.isDrag,
        "accept": this.c.accept,
        "before-upload": this.beforeUpload,
        "onSuccess": this.onSuccess,
        "onError": this.onError,
        "onRemove": this.onRemove,
        "onPreview": this.onDownload,
        "http-request": this.customUpload,
        "showFileList": this.c.showfilelist
      }, this.$attrs), {
        default: () => [this.noUploadIcon ? null : vue.createVNode(vue.resolveComponent("el-button"), {
          "class": [this.ns.b("button"), this.semanticClass("editor.trigger"), this.ns.be("button", this.c.uploadmode.toLowerCase())],
          "style": this.semanticStyle("editor.trigger"),
          "size": this.isGridEditor ? "small" : "default"
        }, _isSlot(_slot = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot : {
          default: () => [_slot]
        })]
      }), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]), vue.createVNode("div", {
        "class": this.ns.be("folder", this.c.uploadmode.toLowerCase())
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [this.ns.b("button"), this.semanticClass("editor.trigger")],
        "style": this.semanticStyle("editor.trigger"),
        "size": this.isGridEditor ? "small" : "default",
        "onClick": (event) => {
          event.stopPropagation();
          this.selectFolder();
        }
      }, _isSlot(_slot2 = ibiz.i18n.t("editor.upload.uploadfolders")) ? _slot2 : {
        default: () => [_slot2]
      }), vue.createVNode("input", vue.mergeProps({
        "ref": "folderInputRef",
        "type": "file",
        "style": {
          display: "none"
        }
      }, {
        webkitdirectory: true,
        directory: true
      }, {
        "onChange": this.handleFolderSelect
      }), null)])]);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "ref": "componentRef"
    }, [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-upload"), vue.mergeProps({
      "class": [this.ns.b("icon"), this.ns.e("content"), this.ns.is("not-show", this.noUploadIcon), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "file-list": this.files,
      "action": this.uploadUrl,
      "headers": this.headers,
      "disabled": this.disabled || this.readonly,
      "multiple": this.c.multiple,
      "limit": this.limit,
      "drag": !!this.c.isDrag,
      "accept": this.c.accept,
      "before-upload": this.beforeUpload,
      "onSuccess": this.onSuccess,
      "onError": this.onError,
      "onRemove": this.onRemove,
      "onPreview": this.onDownload,
      "http-request": this.customUpload,
      "showFileList": this.c.showfilelist
    }, this.$attrs), {
      default: () => [this.noUploadIcon ? null : vue.createVNode(vue.resolveComponent("el-button"), {
        "style": this.semanticStyle("editor.trigger"),
        "class": [this.ns.b("button"), this.semanticClass("editor.trigger")],
        "size": this.isGridEditor ? "small" : "default"
      }, _isSlot(_slot3 = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot3 : {
        default: () => [_slot3]
      })]
    }), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])]);
  }
});

exports.IBizFileUpload = IBizFileUpload;
