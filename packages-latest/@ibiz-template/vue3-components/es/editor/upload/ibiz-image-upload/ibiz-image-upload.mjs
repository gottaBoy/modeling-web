import { defineComponent, createVNode, resolveComponent, mergeProps, ref, computed } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useFocusAndBlur, getEditorEmits, getUploadProps } from '@ibiz-template/vue3-util';
import './ibiz-image-upload.css';
import { useIViewUpload } from '../use/use-iview-upload.mjs';

"use strict";
const IBizImageUpload = /* @__PURE__ */ defineComponent({
  name: "IBizImageUpload",
  props: getUploadProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("image-upload");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
    }, c, emit);
    const dialogImageUrl = ref([]);
    const dialogImageUrlIndex = ref(0);
    const dialogVisible = ref(false);
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
    const noUploadIcon = computed(() => {
      return limit.value === 1 && files.value.length === 1;
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.readonly && this.c.autoPreview && this.ns.m("autosize"), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "ref": "componentRef"
    }, [createVNode("div", {
      "class": [this.ns.e("image-upload-list"), this.semanticClass("editor.list")],
      "style": this.semanticStyle("editor.list")
    }, [this.files.map((item) => createVNode("div", {
      "key": item.id,
      "class": [this.ns.e("list-item"), this.semanticClass("editor.item")],
      "style": this.semanticStyle("editor.item")
    }, [createVNode("img", {
      "src": item.base64 ? item.base64 : item.url
    }, null), createVNode("div", {
      "class": this.ns.e("list-item-cover")
    }, [createVNode("ion-icon", {
      "class": this.ns.e("preview-icon"),
      "onClick": () => this.onPreview(item),
      "name": "search"
    }, null), createVNode("ion-icon", {
      "class": this.ns.e("download-icon"),
      "onClick": () => this.onDownload(item),
      "name": "download"
    }, null), createVNode("ion-icon", {
      "class": this.ns.e("remove-icon"),
      "onClick": () => this.onRemove(item),
      "name": "remove"
    }, null)])]))]), createVNode(resolveComponent("el-upload"), mergeProps({
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
      default: () => [createVNode("ion-icon", {
        "name": "add-outline",
        "class": this.ns.e("image-upload-add")
      }, null)]
    }), this.dialogVisible ? createVNode(resolveComponent("el-image-viewer"), mergeProps({
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

export { IBizImageUpload };
