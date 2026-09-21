'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var useIviewUpload = require('../use/use-iview-upload.cjs');
require('./ibiz-image-cropping.css');

"use strict";
const IBizImageCropping = /* @__PURE__ */ vue.defineComponent({
  name: "IBizImageCropping",
  props: vue3Util.getUploadProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d;
    const ns = vue3Util.useNamespace("image-cropping-upload");
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
    const popupChildClass = [{
      class: semanticClass("editor.cropping"),
      selector: ".ibiz-cropping"
    }, {
      class: semanticClass("editor.cropping.image"),
      selector: ".ibiz-cropping__content--crop"
    }, {
      class: semanticClass("editor.cropping.scale"),
      selector: ".ibiz-cropping__content--scale-slider"
    }, {
      class: semanticClass("editor.cropping.cancel"),
      selector: ".ibiz-cropping__footer--cancel"
    }, {
      class: semanticClass("editor.cropping.confirm"),
      selector: ".ibiz-cropping__footer--confirm"
    }];
    const popupChildStyle = [{
      style: semanticStyle("editor.cropping"),
      selector: ".ibiz-cropping"
    }, {
      style: semanticStyle("editor.cropping.image"),
      selector: ".ibiz-cropping__content--crop"
    }, {
      style: semanticStyle("editor.cropping.scale"),
      selector: ".ibiz-cropping__content--scale-slider"
    }, {
      style: semanticStyle("editor.cropping.cancel"),
      selector: ".ibiz-cropping__footer--cancel"
    }, {
      style: semanticStyle("editor.cropping.confirm"),
      selector: ".ibiz-cropping__footer--confirm"
    }];
    const dialogImageUrl = vue.ref([]);
    const dialogImageUrlIndex = vue.ref(0);
    const dialogVisible = vue.ref(false);
    const uploadTag = vue.ref(false);
    const imageUpload = vue.ref();
    const cropRect = {};
    if ((_a = c.editorParams) == null ? void 0 : _a.cropWidth) {
      Object.assign(cropRect, {
        cropareaWidth: Number(c.editorParams.cropWidth)
      });
    }
    if ((_b = c.editorParams) == null ? void 0 : _b.cropwidth) {
      Object.assign(cropRect, {
        cropareaWidth: Number(c.editorParams.cropwidth)
      });
    }
    if ((_c = c.editorParams) == null ? void 0 : _c.cropHeight) {
      Object.assign(cropRect, {
        cropareaHeight: Number(c.editorParams.cropHeight)
      });
    }
    if ((_d = c.editorParams) == null ? void 0 : _d.cropheight) {
      Object.assign(cropRect, {
        cropareaHeight: Number(c.editorParams.cropheight)
      });
    }
    const tempFileList = vue.ref();
    const cropVisible = vue.ref(false);
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
    const onChange = (file) => {
      if (file.status === "ready" && !uploadTag.value) {
        tempFileList.value = file;
        uploadTag.value = true;
        cropVisible.value = true;
      }
    };
    const dataURLtoBlob = (dataURL) => {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], {
        type: mimeString
      });
    };
    const cropChange = (url) => {
      if (!url) {
        uploadTag.value = false;
        cropVisible.value = false;
        ibiz.message.info(ibiz.i18n.t("editor.upload.cancelUpload"));
        return;
      }
      const blob = dataURLtoBlob(url);
      const _tempFile = new File([blob], "cropimg.png", {
        type: blob.type
      });
      if (_tempFile) {
        vue.nextTick(() => {
          imageUpload.value.handleRemove(tempFileList.value);
          imageUpload.value.handleStart(_tempFile);
          tempFileList.value = void 0;
          imageUpload.value.submit();
          uploadTag.value = false;
          cropVisible.value = false;
        });
      }
    };
    const cropDialogClose = () => {
      if (tempFileList.value) {
        ibiz.message.info(ibiz.i18n.t("editor.upload.cancelUpload"));
        imageUpload.value.handleRemove(tempFileList.value);
      }
      uploadTag.value = false;
    };
    return {
      ns,
      c,
      files,
      limit,
      headers,
      cropRect,
      uploadUrl,
      imageUpload,
      cropVisible,
      tempFileList,
      noUploadIcon,
      componentRef,
      dialogVisible,
      semanticClass,
      semanticStyle,
      dialogImageUrl,
      popupChildClass,
      popupChildStyle,
      showFormDefaultContent,
      dialogImageUrlIndex,
      onError,
      onRemove,
      onChange,
      onSuccess,
      onPreview,
      cropChange,
      onDownload,
      beforeUpload,
      cropDialogClose,
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
      "multiple": false,
      "limit": this.limit,
      "show-file-list": false,
      "accept": this.c.accept,
      "list-type": "picture-card",
      "auto-upload": false,
      "onChange": this.onChange,
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
    }), vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.cropVisible,
      "onUpdate:modelValue": ($event) => this.cropVisible = $event,
      "title": ibiz.i18n.t("editor.upload.cropImg"),
      "class": [this.ns.e("upload-dialog"), this.semanticClass("editor.popup")],
      "style": this.semanticStyle("editor.popup"),
      "onClosed": this.cropDialogClose,
      "destroy-on-close": true,
      "width": 640
    }, {
      default: () => {
        return vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizCropping"), vue.mergeProps({
          "class": this.semanticClass("editor.cropping"),
          "style": this.semanticStyle("editor.cropping"),
          "img": this.tempFileList,
          "onChange": this.cropChange
        }, this.cropRect), null), [[vue.resolveDirective("child-class"), this.popupChildClass], [vue.resolveDirective("child-style"), this.popupChildStyle]]);
      }
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

exports.IBizImageCropping = IBizImageCropping;
