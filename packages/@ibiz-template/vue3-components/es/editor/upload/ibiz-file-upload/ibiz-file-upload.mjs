import { isVNode, defineComponent, computed, createVNode, resolveComponent, mergeProps } from 'vue';
import { getUploadProps, getEditorEmits, useNamespace, useAutoFocusBlur, useFocusAndBlur } from '@ibiz-template/vue3-util';
import './ibiz-file-upload.css';
import { useIViewUpload } from '../use/use-iview-upload.mjs';

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
      beforeUpload
    } = useIViewUpload(props, (value) => {
      emit("change", value);
      useInValueChange();
    }, c);
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
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "componentRef"
    }, [createVNode(resolveComponent("el-upload"), mergeProps({
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
      default: () => [this.noUploadIcon ? null : createVNode(resolveComponent("el-button"), {
        "class": [this.ns.b("button")],
        "size": this.isGridEditor ? "small" : "default"
      }, _isSlot(_slot = ibiz.i18n.t("editor.upload.uploadFiles")) ? _slot : {
        default: () => [_slot]
      })]
    })]);
  }
});

export { IBizFileUpload };
