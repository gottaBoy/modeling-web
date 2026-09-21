'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./data-import.css');
var runtime = require('@ibiz-template/runtime');

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
    const ns = vue3Util.useNamespace("data-import");
    const message = vue.ref({
      state: "ready",
      message: ""
    });
    const errorMessage = vue.ref("");
    const isLoading = vue.ref(false);
    const onCancelButtonClick = () => {
      props.dismiss();
    };
    const onLinkClick = async () => {
      runtime.downloadImportTemplate(props.appDataEntity, props.dataImport, props.context, props.params);
    };
    const selectFile = async () => {
      isLoading.value = true;
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
        if (result.errorMessage) {
          errorMessage.value = result.errorMessage;
        } else {
          const {
            success,
            total,
            message: _message
          } = result;
          const totalNum = total ? Number(total) : 0;
          const successNum = success ? Number(success) : 0;
          const errorNum = total - success;
          message.value.state = _message ? "error" : "over";
          message.value.message = _message || ibiz.i18n.t("component.dataImport.importSuccess", {
            totalNum,
            successNum,
            errorNum
          });
        }
      }
      isLoading.value = false;
      if (result.isAsync) {
        onCancelButtonClick();
      }
    };
    return {
      ns,
      onLinkClick,
      selectFile,
      onCancelButtonClick,
      isLoading,
      message,
      errorMessage
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
    }, [ibiz.i18n.t("component.dataImport.importResults")]), vue.createVNode("div", {
      "class": [this.ns.be("message", "content"), this.ns.is("error", this.message.state === "error")]
    }, [this.message.message])]), this.errorMessage && vue.createVNode("div", {
      "class": this.ns.b("error-message")
    }, [this.errorMessage]), vue.createVNode("div", {
      "class": this.ns.e("template-container")
    }, [vue.createVNode("div", {
      "class": this.ns.e("template-description")
    }, [ibiz.i18n.t("component.dataImport.downloadTemplate")]), vue.createVNode("div", {
      "class": this.ns.e("template-link"),
      "onClick": this.onLinkClick
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.e("link-icon"),
      "name": "link"
    }, null), this.appDataEntity.logicName, ibiz.i18n.t("component.dataImport.templateFile")])]), vue.createVNode("div", {
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
