'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var qs = require('qs');
require('./async-action-preview.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function fileDownload(file) {
  ibiz.net.request(file.url, {
    method: "get",
    responseType: "blob",
    baseURL: ""
    // 已经有baseURL了，这里无需再写
  }).then((response) => {
    let filename = qs.parse(response.headers["content-disposition"], {
      delimiter: ";"
    }).filename;
    if (filename) {
      if (filename.startsWith('"') && filename.endsWith('"')) {
        filename = filename.substring(1, filename.length - 1);
      }
      file.name += ".".concat(filename.split(".")[1]);
    }
    if (response.status !== 200) {
      throw new core.RuntimeError(ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.downloadFailedErr"));
    }
    if (!response.data) {
      throw new core.RuntimeError(ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.noExistentErr"));
    } else {
      const fileName = file.name;
      core.downloadFileFromBlob(response.data, fileName);
    }
  });
}
const AsyncActionPreview = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAsyncActionPreview",
  props: {
    asyncAction: {
      type: Object,
      required: true
    },
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("async-action-preview");
    const onClose = () => {
      props.modal.dismiss();
    };
    const info = vue.reactive({
      title: "",
      beginTime: "",
      endTime: "",
      total: 0,
      success: 0,
      error: 0,
      errorDetails: [{
        row: 0,
        reason: ""
      }],
      errorFileUrl: ""
    });
    info.title = ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.importDetailPrompt", {
      name: props.asyncAction.asyncacitonname
    });
    info.beginTime = props.asyncAction.begintime;
    info.endTime = props.asyncAction.endtime;
    if (props.asyncAction.actionresult) {
      let actionResult = props.asyncAction.actionresult;
      if (typeof actionResult === "string") {
        try {
          actionResult = JSON.parse(actionResult);
        } catch (error) {
          throw new core.RuntimeError(ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.parseImportInfoErr"));
        }
      }
      info.total = actionResult.total || 0;
      info.success = actionResult.success || 0;
      info.error = info.total - info.success;
      if (actionResult.errorinfo) {
        info.errorDetails = Object.keys(actionResult.errorinfo).map((key) => {
          return {
            row: Number(key),
            reason: actionResult.errorinfo[key].errorInfo
          };
        });
      } else {
        info.errorDetails = [];
      }
      if (actionResult.errorfile) {
        info.errorFileUrl = "".concat(ibiz.env.baseUrl, "/").concat(ibiz.env.appId).concat(ibiz.env.downloadFileUrl, "/").concat(actionResult.errorfile.folder, "/").concat(actionResult.errorfile.fileid).replace("/{cat}", "");
      }
    }
    const onDownLoad = () => {
      fileDownload({
        url: info.errorFileUrl,
        name: info.title
      });
    };
    return {
      ns,
      info,
      onClose,
      onDownLoad
    };
  },
  render() {
    let _slot, _slot2;
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [vue.createVNode("div", {
      "class": this.ns.e("title")
    }, [this.info.title]), vue.createVNode("div", {
      "class": this.ns.b("toolbar")
    }, [this.info.errorFileUrl && vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onDownLoad
    }, _isSlot(_slot = ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.downloadErrFile")) ? _slot : {
      default: () => [_slot]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onClose
    }, _isSlot(_slot2 = ibiz.i18n.t("app.close")) ? _slot2 : {
      default: () => [_slot2]
    })])]), vue.createVNode("div", {
      "class": this.ns.b("time")
    }, [vue.createVNode(vue.resolveComponent("el-form-item"), {
      "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.importTime")
    }, {
      default: () => [this.info.beginTime, vue.createTextVNode(" ~ "), this.info.endTime]
    })]), vue.createVNode(vue.resolveComponent("el-row"), {
      "class": this.ns.b("count")
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 8
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.importTotal")
        }, {
          default: () => [this.info.total]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 8
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.successImport")
        }, {
          default: () => [this.info.success]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 8
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionPreview.ImportFailed")
        }, {
          default: () => [this.info.error]
        })]
      })]
    }), this.info.errorDetails.length > 0 && vue.createVNode("div", {
      "class": this.ns.b("detail")
    }, [this.info.errorDetails.map((detail) => {
      return vue.createVNode("div", {
        "class": this.ns.b("detail-item")
      }, [vue.createVNode("div", {
        "class": this.ns.be("detail-item", "index")
      }, [detail.row]), vue.createVNode("div", {
        "class": this.ns.be("detail-item", "error")
      }, [vue.createVNode("div", {
        "class": this.ns.be("detail-item", "error-title")
      }, [ibiz.i18n.t("app.error")]), vue.createVNode("div", {
        "class": this.ns.be("detail-item", "error-reason")
      }, [detail.reason])])]);
    })])]);
  }
});

exports.AsyncActionPreview = AsyncActionPreview;
