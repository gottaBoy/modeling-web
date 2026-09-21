import { isVNode, defineComponent, ref, withDirectives, createVNode, resolveComponent, resolveDirective } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './data-import.css';
import { downloadImportTemplate, selectAndImport } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DataImport = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("data-import");
    const message = ref({
      state: "ready",
      message: ""
    });
    const errorMessage = ref("");
    const isLoading = ref(false);
    const onCancelButtonClick = () => {
      props.dismiss();
    };
    const onLinkClick = async () => {
      downloadImportTemplate(props.appDataEntity, props.dataImport, props.context, props.params);
    };
    const selectFile = async () => {
      isLoading.value = true;
      const result = await selectAndImport({
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
    return withDirectives(createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("caption")
    }, [ibiz.i18n.t("component.dataImport.importData")]), this.message.state === "ready" ? createVNode("div", {
      "class": this.ns.b("upload"),
      "onClick": this.selectFile
    }, [createVNode("img", {
      "class": this.ns.be("upload", "img"),
      "src": "./assets/images/icon-import.svg"
    }, null), createVNode("span", {
      "class": this.ns.be("upload", "text")
    }, [ibiz.i18n.t("component.dataImport.clickToUpload")])]) : createVNode("div", {
      "class": [this.ns.b("message")]
    }, [createVNode("div", {
      "class": this.ns.be("message", "title")
    }, [ibiz.i18n.t("component.dataImport.importResults")]), createVNode("div", {
      "class": [this.ns.be("message", "content"), this.ns.is("error", this.message.state === "error")]
    }, [this.message.message])]), this.errorMessage && createVNode("div", {
      "class": this.ns.b("error-message")
    }, [this.errorMessage]), createVNode("div", {
      "class": this.ns.e("template-container")
    }, [createVNode("div", {
      "class": this.ns.e("template-description")
    }, [ibiz.i18n.t("component.dataImport.downloadTemplate")]), createVNode("div", {
      "class": this.ns.e("template-link"),
      "onClick": this.onLinkClick
    }, [createVNode("ion-icon", {
      "class": this.ns.e("link-icon"),
      "name": "link"
    }, null), this.appDataEntity.logicName, ibiz.i18n.t("component.dataImport.templateFile")])]), createVNode("div", {
      "class": this.ns.e("button-bar")
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.onCancelButtonClick
    }, _isSlot(_slot = ibiz.i18n.t("app.cancel")) ? _slot : {
      default: () => [_slot]
    }), this.message.state !== "ready" && createVNode(resolveComponent("el-button"), {
      "onClick": this.selectFile
    }, _isSlot(_slot2 = ibiz.i18n.t("component.dataImport.continue")) ? _slot2 : {
      default: () => [_slot2]
    })])]), [[resolveDirective("loading"), this.isLoading]]);
  }
});

export { DataImport };
