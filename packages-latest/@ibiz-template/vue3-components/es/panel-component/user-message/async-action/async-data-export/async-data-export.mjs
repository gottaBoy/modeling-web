import { isVNode, defineComponent, createVNode, resolveComponent, createTextVNode, reactive } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './async-data-export.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AsyncDataExport = /* @__PURE__ */ defineComponent({
  name: "IBizAsyncDataExport",
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
    const ns = useNamespace("async-data-export");
    const finishedStates = [30, 40];
    const onClose = () => {
      props.modal.dismiss();
    };
    const info = reactive({
      title: "",
      beginTime: "",
      endTime: "",
      fileUrl: "",
      fileName: "",
      isFinish: false
    });
    info.title = ibiz.i18n.t("panelComponent.userMessage.asyncDataExport.exportDetailPrompt", {
      name: props.asyncAction.asyncacitonname
    });
    info.beginTime = props.asyncAction.begintime;
    info.endTime = props.asyncAction.endtime;
    if (props.asyncAction.asyncresultdownloadurl) {
      const asyncResultDownloadObj = JSON.parse(props.asyncAction.asyncresultdownloadurl);
      info.fileUrl = "".concat(ibiz.env.baseUrl, "/").concat(ibiz.env.appId).concat(ibiz.env.downloadFileUrl, "/").concat(asyncResultDownloadObj.folder, "/").concat(asyncResultDownloadObj.fileid).replace("/{cat}", "");
      info.fileName = asyncResultDownloadObj.filename;
    }
    if (!finishedStates.includes(props.asyncAction.actionstate)) {
      info.isFinish = false;
    } else {
      info.isFinish = true;
    }
    const onDownLoad = () => {
      ibiz.util.file.fileDownload(info.fileUrl, info.fileName, void 0, false);
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
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.b("header")
    }, [createVNode("div", {
      "class": this.ns.e("title")
    }, [this.info.title]), createVNode("div", {
      "class": this.ns.b("toolbar")
    }, [this.info.fileUrl && createVNode(resolveComponent("el-button"), {
      "onClick": this.onDownLoad
    }, _isSlot(_slot = ibiz.i18n.t("panelComponent.userMessage.asyncDataExport.downloadFile")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.onClose
    }, _isSlot(_slot2 = ibiz.i18n.t("app.close")) ? _slot2 : {
      default: () => [_slot2]
    })])]), createVNode("div", {
      "class": this.ns.b("time")
    }, [this.info.isFinish ? createVNode(resolveComponent("el-form-item"), {
      "label": ibiz.i18n.t("panelComponent.userMessage.asyncDataExport.excuteTime")
    }, {
      default: () => [this.info.beginTime, createTextVNode(" ~ "), this.info.endTime]
    }) : createVNode("span", {
      "class": this.ns.be("time", "executing")
    }, [ibiz.i18n.t("panelComponent.userMessage.asyncDataExport.executing")])])]);
  }
});

export { AsyncDataExport };
