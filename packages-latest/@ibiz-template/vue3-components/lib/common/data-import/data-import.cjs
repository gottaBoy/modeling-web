'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./data-import.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const DataImport = /* @__PURE__ */ vue.defineComponent({
  name: "DataImport",
  props: {
    dismiss: {
      type: Function,
      required: true
    },
    appDataEntity: {
      type: Object,
      required: true
    },
    dataImport: {
      type: Object,
      required: false
    },
    context: {
      type: Object,
      required: false
    },
    params: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("data-import");
    const message = vue.ref({
      state: "ready",
      message: "",
      errorfile: void 0,
      messageTitle: "",
      errorMessage: ""
    });
    const isLoading = vue.ref(false);
    const importTemplName = ibiz.config.common.importTemplNameMode === "custom" ? "".concat((_a = props.dataImport) == null ? void 0 : _a.name).concat(ibiz.i18n.t("component.dataImport.template")) : "".concat(props.appDataEntity.logicName).concat(ibiz.i18n.t("component.dataImport.templateFile"));
    const onCancelButtonClick = () => {
      props.dismiss();
    };
    const onLinkClick = async () => {
      runtime.downloadImportTemplate(props.appDataEntity, props.dataImport, props.context, props.params, ibiz.config.common.importTemplNameMode === "custom" ? importTemplName : void 0);
    };
    const onErrorInfoClick = async () => {
      if (!message.value.errorfile)
        return;
      let {
        downloadUrl
      } = ibiz.util.file.calcFileUpDownUrl(props.context, props.params, {}, {
        osscat: message.value.errorfile.folder
      });
      downloadUrl = downloadUrl.replace("%fileId%", message.value.errorfile.fileid);
      ibiz.util.file.fileDownload(downloadUrl, "".concat(ibiz.i18n.t("component.dataImport.importError"), ".xlsx"));
    };
    const selectFile = async () => {
      isLoading.value = true;
      message.value.message = "";
      message.value.state = "ready";
      message.value.errorfile = void 0;
      message.value.messageTitle = "";
      message.value.errorMessage = "";
      const result = await runtime.selectAndImport({
        appDataEntity: props.appDataEntity,
        dataImport: props.dataImport,
        context: props.context,
        params: props.params
      });
      if (result.cancel) {
        isLoading.value = false;
        return;
      }
      if (!result.isAsync) {
        const {
          success,
          total,
          message: _message,
          errormessage,
          showTitle,
          errorfile
        } = result;
        const totalNum = total ? Number(total) : 0;
        const successNum = success ? Number(success) : 0;
        const errorNum = totalNum - successNum;
        message.value.state = errormessage ? "error" : "over";
        if (showTitle) {
          message.value.messageTitle = ibiz.i18n.t("component.dataImport.importSuccess", {
            totalNum,
            successNum,
            errorNum
          });
        }
        if (_message) {
          message.value.message = _message;
        }
        if (errormessage) {
          message.value.errorMessage = errormessage;
        }
        if (errorfile) {
          message.value.errorfile = errorfile;
        }
      }
      isLoading.value = false;
      if (result.isAsync) {
        onCancelButtonClick();
      }
    };
    return {
      ns,
      message,
      isLoading,
      importTemplName,
      selectFile,
      onLinkClick,
      onCancelButtonClick,
      onErrorInfoClick
    };
  },
  render() {
    let _slot, _slot2;
    return vue.withDirectives(vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("caption")
    }, [ibiz.i18n.t("component.dataImport.importData")]), this.message.state === "ready" ? vue.createVNode("div", {
      "class": this.ns.b("upload"),
      "onClick": this.selectFile
    }, [vue.createVNode("img", {
      "class": this.ns.be("upload", "img"),
      "src": "./assets/images/icon-import.svg"
    }, null), vue.createVNode("span", {
      "class": this.ns.be("upload", "text")
    }, [ibiz.i18n.t("component.dataImport.clickToUpload")])]) : vue.createVNode("div", {
      "class": [this.ns.b("message")]
    }, [vue.createVNode("div", {
      "class": this.ns.be("message", "title")
    }, [vue.createVNode("div", null, [ibiz.i18n.t("component.dataImport.importResults")]), this.message.errorfile && vue.createVNode("div", {
      "class": this.ns.e("file-link"),
      "onClick": this.onErrorInfoClick
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.e("link-icon"),
      "name": "link"
    }, null), ibiz.i18n.t("component.dataImport.detailedLogs")])]), vue.createVNode("div", {
      "class": [this.ns.be("message", "content")]
    }, [this.message.messageTitle && vue.createVNode("div", {
      "class": this.ns.be("content", "title")
    }, [this.message.messageTitle]), this.message.message && vue.createVNode("div", {
      "class": this.ns.be("content", "message")
    }, [this.message.message]), this.message.errorMessage && vue.createVNode("div", {
      "class": this.ns.be("content", "error")
    }, [this.message.errorMessage])])]), vue.createVNode("div", {
      "class": this.ns.e("template-container")
    }, [vue.createVNode("div", {
      "class": this.ns.e("template-description")
    }, [ibiz.i18n.t("component.dataImport.downloadTemplate")]), vue.createVNode("div", {
      "class": this.ns.e("file-link"),
      "onClick": this.onLinkClick
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.e("link-icon"),
      "name": "link"
    }, null), this.importTemplName])]), vue.createVNode("div", {
      "class": this.ns.e("button-bar")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onCancelButtonClick
    }, _isSlot(_slot = ibiz.i18n.t("app.cancel")) ? _slot : {
      default: () => [_slot]
    }), this.message.state !== "ready" && vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.selectFile
    }, _isSlot(_slot2 = ibiz.i18n.t("component.dataImport.continue")) ? _slot2 : {
      default: () => [_slot2]
    })])]), [[vue.resolveDirective("loading"), this.isLoading]]);
  }
});

exports.DataImport = DataImport;
