'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-image-upload.css');
var useIviewUpload = require('../use/use-iview-upload.cjs');

"use strict";
const IBizImageUpload = /* @__PURE__ */ vue.defineComponent({
  name: "IBizImageUpload",
  props: vue3Util.getUploadProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("image-upload");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
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
    }, c, emit);
    const dialogImageUrl = vue.ref([]);
    const dialogImageUrlIndex = vue.ref(0);
    const dialogVisible = vue.ref(false);
    const onDialogVisibleChange = (value) => {
      dialogVisible.value = value;
    };
    const onPreview = (file) => {
      dialogImageUrl.value = [];
      files.value.forEach((i) => {
        if (i.base64) {
          dialogImageUrl.value.push(i.base64);
        } else if (i.url) {
          dialogImageUrl.value.push(i.url);
        }
      });
      dialogImageUrlIndex.value = files.value.findIndex((item) => item.url === file.url);
      dialogVisible.value = true;
    };
    const noUploadIcon = vue.computed(() => {
      return limit.value === 1 && files.value.length === 1;
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
      files,
      limit,
      headers,
      uploadUrl,
      noUploadIcon,
      componentRef,
      dialogVisible,
      semanticClass,
      semanticStyle,
      dialogImageUrl,
      showFormDefaultContent,
      dialogImageUrlIndex,
      onError,
      onRemove,
      onSuccess,
      onPreview,
      onDownload,
      beforeUpload,
      onDialogVisibleChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.readonly && this.c.autoPreview && this.ns.m("autosize"), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "ref": "componentRef"
    }, [vue.createVNode("div", {
      "class": [this.ns.e("image-upload-list"), this.semanticClass("editor.list")],
      "style": this.semanticStyle("editor.list")
    }, [this.files.map((item) => vue.createVNode("div", {
      "key": item.id,
      "class": [this.ns.e("list-item"), this.semanticClass("editor.item")],
      "style": this.semanticStyle("editor.item")
    }, [vue.createVNode("img", {
      "src": item.base64 ? item.base64 : item.url
    }, null), vue.createVNode("div", {
      "class": this.ns.e("list-item-cover")
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.e("preview-icon"),
      "onClick": () => this.onPreview(item),
      "name": "search"
    }, null), vue.createVNode("ion-icon", {
      "class": this.ns.e("download-icon"),
      "onClick": () => this.onDownload(item),
      "name": "download"
    }, null), vue.createVNode("ion-icon", {
      "class": this.ns.e("remove-icon"),
      "onClick": () => this.onRemove(item),
      "name": "remove"
    }, null)])]))]), vue.createVNode(vue.resolveComponent("el-upload"), vue.mergeProps({
      "ref": "imageUpload",
      "class": [this.ns.b("icon"), this.ns.is("not-show", this.noUploadIcon), this.semanticClass("editor.trigger")],
      "style": this.semanticStyle("editor.trigger"),
      "file-list": this.files,
      "action": this.uploadUrl,
      "headers": this.headers,
      "disabled": this.disabled,
      "multiple": this.c.multiple,
      "limit": this.limit,
      "show-file-list": false,
      "accept": this.c.accept,
      "list-type": "picture-card",
      "before-upload": this.beforeUpload,
      "onSuccess": this.onSuccess,
      "onError": this.onError,
      "onRemove": this.onRemove,
      "onPreview": this.onDownload
    }, this.$attrs), {
      default: () => [vue.createVNode("ion-icon", {
        "name": "add-outline",
        "class": this.ns.e("image-upload-add")
      }, null)]
    }), this.dialogVisible ? vue.createVNode(vue.resolveComponent("el-image-viewer"), vue.mergeProps({
      "onClose": () => this.onDialogVisibleChange(false),
      "url-list": this.dialogImageUrl,
      "hide-on-click-modal": true,
      "close-on-press-escape": true,
      "teleported": true,
      "z-index": 9999,
      "initial-index": this.dialogImageUrlIndex
    }, this.$attrs), null) : null]);
  }
});

exports.IBizImageUpload = IBizImageUpload;
