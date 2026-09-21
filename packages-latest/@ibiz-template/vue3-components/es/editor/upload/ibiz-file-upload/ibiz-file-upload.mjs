import { isVNode, defineComponent, createVNode, withDirectives, resolveComponent, mergeProps, resolveDirective, computed } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useFocusAndBlur, getEditorEmits, getUploadProps } from '@ibiz-template/vue3-util';
import { useIViewUpload } from '../use/use-iview-upload.mjs';
import { useCustomUpload } from '../use/use-custom-upload.mjs';
import './ibiz-file-upload.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizFileUpload = /* @__PURE__ */ defineComponent({
  name: "IBizFileUpload",
  props: getUploadProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("file-upload");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
    } = useAutoFocusBlur(props, emit);
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
    } = useIViewUpload(props, (value) => {
      emit("change", value);
      useInValueChange();
    }, c, emit);
    const {
      customUpload,
      folderInputRef,
      selectFolder,
      handleFolderSelect
    } = useCustomUpload(c, {
      action: uploadUrl.value,
      headers: headers.value,
      onSuccess,
      onError,
      addCacheCount,
      drainCacheCount
    }, emit);
    const noUploadIcon = computed(() => {
      var _a;
      return limit.value === 1 && ((_a = files.value) == null ? void 0 : _a.length) === 1;
    });
    const isGridEditor = computed(() => {
      return !!c.parent.model.columnType;
    });
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const {
      componentRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
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
      return createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.be("uploadmode", this.c.uploadmode.toLowerCase()), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
        "ref": "componentRef",
        "style": this.semanticStyle("editor.root")
      }, [withDirectives(createVNode(resolveComponent("el-upload"), mergeProps({
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
        default: () => [this.noUploadIcon ? null : createVNode(resolveComponent("el-button"), {
          "class": [this.ns.b("button"), this.semanticClass("editor.trigger"), this.ns.be("button", this.c.uploadmode.toLowerCase())],
          "style": this.semanticStyle("editor.trigger"),
          "size": this.isGridEditor ? "small" : "default"
        }, _isSlot(_slot = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot : {
          default: () => [_slot]
        })]
      }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]), createVNode("div", {
        "class": this.ns.be("folder", this.c.uploadmode.toLowerCase())
      }, [createVNode(resolveComponent("el-button"), {
        "class": [this.ns.b("button"), this.semanticClass("editor.trigger")],
        "style": this.semanticStyle("editor.trigger"),
        "size": this.isGridEditor ? "small" : "default",
        "onClick": (event) => {
          event.stopPropagation();
          this.selectFolder();
        }
      }, _isSlot(_slot2 = ibiz.i18n.t("editor.upload.uploadfolders")) ? _slot2 : {
        default: () => [_slot2]
      }), createVNode("input", mergeProps({
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "ref": "componentRef"
    }, [withDirectives(createVNode(resolveComponent("el-upload"), mergeProps({
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
      default: () => [this.noUploadIcon ? null : createVNode(resolveComponent("el-button"), {
        "style": this.semanticStyle("editor.trigger"),
        "class": [this.ns.b("button"), this.semanticClass("editor.trigger")],
        "size": this.isGridEditor ? "small" : "default"
      }, _isSlot(_slot3 = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot3 : {
        default: () => [_slot3]
      })]
    }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
  }
});

export { IBizFileUpload };
