import { defineComponent, createVNode, resolveComponent, ref, computed, nextTick, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getInputProps } from '@ibiz-template/vue3-util';
import { getAppCookie, CoreConst, base64ToBlob } from '@ibiz-template/core';
import './signature.css';

"use strict";
const IBizSignature = /* @__PURE__ */ defineComponent({
  name: "IBizSignature",
  props: getInputProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = useNamespace("signature");
    const c = props.controller;
    const editorModel = c.model;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const headers = ref({
      ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(getAppCookie(CoreConst.TOKEN))
    });
    const uploadUrl = ref("");
    const downloadUrl = ref("");
    const signatureRef = ref();
    const fullScreen = ref(false);
    const currentDataURL = ref("");
    const currentVal = ref("");
    let enableNoAccess = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.enablenoaccess) === "true";
    let globalDownloadPrifix = false;
    if (c == null ? void 0 : c.editorParams.globaldownloadprifix) {
      globalDownloadPrifix = c.editorParams.globaldownloadprifix === "true";
    } else {
      globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
    let saveMode = "img";
    let buttons = [{
      label: ibiz.i18n.t("editor.signature.undo"),
      type: "undo"
    }, {
      label: ibiz.i18n.t("editor.signature.rewrite"),
      type: "rewrite"
    }, {
      label: ibiz.i18n.t("editor.signature.confirm"),
      type: "confirm",
      buttonType: "primary"
    }];
    if (editorModel.editorParams) {
      if (editorModel.editorParams.mode) {
        saveMode = editorModel.editorParams.mode;
      }
      if (editorModel.editorParams.buttons) {
        try {
          buttons = JSON.parse(editorModel.editorParams.buttons);
          buttons.forEach((button) => {
            button.label = ibiz.appUtil.resolveI18nText(button.label);
          });
        } catch (error) {
          ibiz.log.error(error);
        }
      }
      if (editorModel.editorParams.enablenoaccess) {
        enableNoAccess = editorModel.editorParams.enablenoaccess === "true";
      }
    }
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const restCavans = () => {
      var _a2;
      (_a2 = signatureRef.value) == null ? void 0 : _a2.updateSignaturePad(() => {
        nextTick(() => {
          var _a3, _b;
          if (currentDataURL.value) {
            (_a3 = signatureRef.value) == null ? void 0 : _a3.signaturePad.fromDataURL(currentDataURL.value);
          } else {
            (_b = signatureRef.value) == null ? void 0 : _b.signaturePad.clear();
          }
        });
      });
    };
    const handleCurrentVal = async () => {
      var _a2, _b;
      if (currentVal.value) {
        ibiz.loading.showRedirect();
        if (saveMode === "img") {
          currentDataURL.value = currentVal.value;
        } else if (downloadUrl.value) {
          const fileData = JSON.parse(currentVal.value)[0];
          const _url = downloadUrl.value.replace("%fileId%", fileData.id);
          try {
            const editorParams = {
              ...c.editorParams,
              enableNoAccess,
              globalDownloadPrifix
            };
            if (editorParams.exportparams) {
              editorParams.exportParams = JSON.parse(editorParams.exportparams);
            }
            const fileBlob = await ibiz.util.file.requestFile(_url, void 0, {
              context: c.context,
              params: c.params,
              data: props.data,
              file: {
                fileId: fileData.id
              },
              extraParams: editorParams,
              downloadTicketParams: c.downloadTicketParams
            }, void 0, enableNoAccess);
            const dataUrl = await ((_a2 = signatureRef.value) == null ? void 0 : _a2.signaturePad.blobToDataURL(fileBlob));
            currentDataURL.value = dataUrl;
          } catch (error) {
            ibiz.log.error(error);
          }
        }
        restCavans();
        (_b = signatureRef.value) == null ? void 0 : _b.signaturePad.loadImage(currentDataURL.value, () => {
          ibiz.loading.hideRedirect();
        });
      }
    };
    watch(() => props.data, (newVal) => {
      if (newVal) {
        const editorParams = {
          ...c.editorParams,
          enableNoAccess,
          globalDownloadPrifix
        };
        if (editorParams.uploadparams) {
          editorParams.uploadParams = JSON.parse(editorParams.uploadparams);
        }
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, editorParams);
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    watch(() => props.value, async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (!newVal) {
          currentVal.value = "";
        } else {
          currentVal.value = "".concat(newVal || "");
        }
        await handleCurrentVal();
      }
    }, {
      immediate: true
    });
    const handleEmit = (_value) => {
      emit("change", _value);
    };
    const getFileType = (dataURL) => {
      const parts = dataURL.split(",");
      const mime = parts[0].split(":")[1].split(";")[0];
      return {
        type: mime
      };
    };
    const handleUpload = async (dataURL) => {
      const {
        type
      } = getFileType(dataURL);
      const blob = base64ToBlob(dataURL);
      const fileName = "signature_".concat(Date.now(), ".png");
      const file = new File([blob], fileName, {
        type
      });
      const fileInfo = await ibiz.util.file.fileUpload(uploadUrl.value, file, headers.value);
      return fileInfo;
    };
    const handleRemove = () => {
      var _a2;
      (_a2 = signatureRef.value) == null ? void 0 : _a2.signaturePad.clear();
      currentDataURL.value = "";
      handleEmit(null);
    };
    const handleFileChange = async (dataURL) => {
      const file = await handleUpload(dataURL);
      handleEmit(JSON.stringify([{
        name: file.name,
        id: file.id
      }]));
    };
    const handleConfirm = () => {
      var _a2, _b, _c;
      fullScreen.value = false;
      if (!((_a2 = signatureRef.value) == null ? void 0 : _a2.signaturePad.isRedrawn()))
        return;
      if ((_b = signatureRef.value) == null ? void 0 : _b.signaturePad.isEmpty()) {
        handleRemove();
        return;
      }
      const dataURL = (_c = signatureRef.value) == null ? void 0 : _c.signaturePad.toDataURL();
      if (dataURL === currentDataURL.value)
        return;
      currentDataURL.value = dataURL;
      switch (saveMode) {
        case "file":
          handleFileChange(dataURL);
          break;
        case "img":
        default:
          handleEmit(dataURL);
          break;
      }
    };
    const handleButtonClick = (_type) => {
      var _a2, _b;
      switch (_type) {
        case "undo":
          (_a2 = signatureRef.value) == null ? void 0 : _a2.signaturePad.undoLastStep();
          break;
        case "rewrite":
          (_b = signatureRef.value) == null ? void 0 : _b.signaturePad.clear();
          break;
        case "confirm":
          handleConfirm();
          break;
        default:
          break;
      }
    };
    return {
      c,
      ns,
      buttons,
      fullScreen,
      signatureRef,
      semanticClass,
      semanticStyle,
      currentDataURL,
      showFormDefaultContent,
      handleButtonClick
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [createVNode(resolveComponent("iBizSignaturePad"), {
      "ref": "signatureRef",
      "class": [this.ns.e("pad"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "options": {
        ...this.c.model.editorParams,
        ...this.$attrs
      }
    }, null), !this.readonly && createVNode("div", {
      "class": [this.ns.e("toolbar"), this.semanticClass("editor.toolbar")],
      "style": this.semanticStyle("editor.toolbar")
    }, [this.buttons.map((_btn) => {
      return createVNode(resolveComponent("el-button"), {
        "disabled": this.disabled,
        "type": _btn.buttonType && _btn.buttonType.toLowerCase() || "default",
        "class": [this.ns.em("toolber", "button"), this.semanticClass("editor.toolbar.item")],
        "style": this.semanticStyle("editor.toolbar.item"),
        "onClick": () => this.handleButtonClick(_btn.type)
      }, {
        default: () => [_btn.label]
      });
    })])]);
  }
});

export { IBizSignature };
