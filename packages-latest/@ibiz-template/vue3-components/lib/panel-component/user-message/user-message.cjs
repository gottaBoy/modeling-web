'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var devtool = require('@ibiz-template/devtool');
var asyncActionTab = require('./async-action/async-action-tab/async-action-tab.cjs');
require('./internal-message/index.cjs');
require('./internal-message/common/index.cjs');
require('./user-message.css');
var internalMessageTab = require('./internal-message/internal-message-tab/internal-message-tab.cjs');
var internalMessageDefault_provider = require('./internal-message/common/internal-message-default/internal-message-default.provider.cjs');

"use strict";
const UserMessage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizUserMessage",
  props: {
    /**
     * @description 用户消息组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 用户消息组件控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("user-message");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const noticeController = ibiz.hub.notice;
    const showPopover = vue.ref(false);
    let hiddenTime = 0;
    noticeController.internalMessage.ns = ns;
    noticeController.internalMessage.provider = new internalMessageDefault_provider.InternalMessageDefaultProvider();
    const currentTab = vue.ref("notification");
    const sysImage = props.modelData.sysImage || {
      imagePath: "svg/message.svg"
    };
    const popoverRef = vue.ref();
    const hiddenPopover = () => {
      popoverRef.value.hide();
    };
    const noticeNum = vue.ref(noticeController.total);
    const onNumChange = (total) => {
      noticeNum.value = total;
    };
    noticeController.evt.on("totalChange", onNumChange);
    const onBatchReadClick = () => {
      noticeController.internalMessage.batchMarkRead();
    };
    const verifyAuthentication = async () => {
      const bol = await ibiz.auth.loadAppData(ibiz.appUtil.getAppContext());
      if (bol) {
        devtool.updateDevToolConfig();
      }
    };
    const handleVisibleChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenTime = (/* @__PURE__ */ new Date()).getTime();
      } else {
        const currentTime = (/* @__PURE__ */ new Date()).getTime();
        const elapsedTime = (currentTime - hiddenTime) / 1e3;
        if (elapsedTime > 5 * 60) {
          verifyAuthentication();
        }
      }
    };
    vue.onMounted(() => {
      document.addEventListener("visibilitychange", handleVisibleChange);
    });
    vue.onUnmounted(() => {
      noticeController.evt.off("totalChange", onNumChange);
      document.removeEventListener("visibilitychange", handleVisibleChange);
    });
    return {
      ns,
      c,
      noticeController,
      noticeNum,
      popoverRef,
      showPopover,
      sysImage,
      currentTab,
      hiddenPopover,
      onBatchReadClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "title": core.showTitle(ibiz.i18n.t("panelComponent.userMessage.notice")),
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "ref": "popoverRef",
      "popper-class": [this.ns.b("popover"), this.semanticClass("popup")],
      "popper-style": this.semanticStyle("popup"),
      "placement": "bottom",
      "trigger": "click",
      "visible": this.showPopover,
      "onUpdate:visible": ($event) => this.showPopover = $event
    }, {
      reference: () => {
        return vue.createVNode(vue.resolveComponent("el-badge"), {
          "class": [this.ns.e("badge"), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "value": this.noticeNum,
          "hidden": this.noticeNum === 0
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("i-biz-icon"), {
            "id": runtime.PresetIdentifier.MESSAGE,
            "class": [this.ns.e("image")],
            "icon": this.sysImage
          }, null)]
        });
      },
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns.b("popover-content-box")
        }, [vue.createVNode(vue.resolveComponent("el-tabs"), {
          "class": this.ns.b("popover-content"),
          "modelValue": this.currentTab,
          "onUpdate:modelValue": ($event) => this.currentTab = $event
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("el-tab-pane"), {
            "label": ibiz.i18n.t("panelComponent.userMessage.notice"),
            "name": "notification"
          }, {
            default: () => [vue.createVNode(internalMessageTab.InternalMessageTab, {
              "class": this.semanticClass("notification"),
              "style": this.semanticStyle("notification"),
              "controller": this.noticeController.internalMessage,
              "showPopover": this.showPopover,
              "onHiddenPopover": this.hiddenPopover
            }, null)]
          }), vue.createVNode(vue.resolveComponent("el-tab-pane"), {
            "label": ibiz.i18n.t("panelComponent.userMessage.backendTasks"),
            "name": "async-action"
          }, {
            default: () => [vue.createVNode(asyncActionTab.AsyncActionTab, {
              "class": this.semanticClass("asyncaction"),
              "style": this.semanticStyle("asyncaction"),
              "controller": this.noticeController.asyncAction,
              "showPopover": this.showPopover,
              "onHiddenPopover": this.hiddenPopover
            }, null)]
          })]
        }), vue.createVNode("div", {
          "class": [this.ns.b("popover-icons"), this.semanticClass("read")],
          "style": this.semanticStyle("read")
        }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": this.ns.b("popover-icons-read"),
          "icon": {
            imagePath: "svg/read.svg"
          },
          "baseDir": "iconfont",
          "title": core.showTitle(ibiz.i18n.t("panelComponent.userMessage.allRead")),
          "onClick": this.onBatchReadClick
        }, null)])]);
      }
    })]);
  }
});

exports.UserMessage = UserMessage;
