import { defineComponent, createVNode, resolveComponent, ref, onMounted, onUnmounted } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { PresetIdentifier } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import { updateDevToolConfig } from '@ibiz-template/devtool';
import { AsyncActionTab } from './async-action/async-action-tab/async-action-tab.mjs';
import './internal-message/index.mjs';
import './internal-message/common/index.mjs';
import './user-message.css';
import { InternalMessageTab } from './internal-message/internal-message-tab/internal-message-tab.mjs';
import { InternalMessageDefaultProvider } from './internal-message/common/internal-message-default/internal-message-default.provider.mjs';

"use strict";
const UserMessage = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("user-message");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const noticeController = ibiz.hub.notice;
    const showPopover = ref(false);
    let hiddenTime = 0;
    noticeController.internalMessage.ns = ns;
    noticeController.internalMessage.provider = new InternalMessageDefaultProvider();
    const currentTab = ref("notification");
    const sysImage = props.modelData.sysImage || {
      imagePath: "svg/message.svg"
    };
    const popoverRef = ref();
    const hiddenPopover = () => {
      popoverRef.value.hide();
    };
    const noticeNum = ref(noticeController.total);
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
        updateDevToolConfig();
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
    onMounted(() => {
      document.addEventListener("visibilitychange", handleVisibleChange);
    });
    onUnmounted(() => {
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
    return createVNode("div", {
      "title": showTitle(ibiz.i18n.t("panelComponent.userMessage.notice")),
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("el-popover"), {
      "ref": "popoverRef",
      "popper-class": [this.ns.b("popover"), this.semanticClass("popup")],
      "popper-style": this.semanticStyle("popup"),
      "placement": "bottom",
      "trigger": "click",
      "visible": this.showPopover,
      "onUpdate:visible": ($event) => this.showPopover = $event
    }, {
      reference: () => {
        return createVNode(resolveComponent("el-badge"), {
          "class": [this.ns.e("badge"), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "value": this.noticeNum,
          "hidden": this.noticeNum === 0
        }, {
          default: () => [createVNode(resolveComponent("i-biz-icon"), {
            "id": PresetIdentifier.MESSAGE,
            "class": [this.ns.e("image")],
            "icon": this.sysImage
          }, null)]
        });
      },
      default: () => {
        return createVNode("div", {
          "class": this.ns.b("popover-content-box")
        }, [createVNode(resolveComponent("el-tabs"), {
          "class": this.ns.b("popover-content"),
          "modelValue": this.currentTab,
          "onUpdate:modelValue": ($event) => this.currentTab = $event
        }, {
          default: () => [createVNode(resolveComponent("el-tab-pane"), {
            "label": ibiz.i18n.t("panelComponent.userMessage.notice"),
            "name": "notification"
          }, {
            default: () => [createVNode(InternalMessageTab, {
              "class": this.semanticClass("notification"),
              "style": this.semanticStyle("notification"),
              "controller": this.noticeController.internalMessage,
              "showPopover": this.showPopover,
              "onHiddenPopover": this.hiddenPopover
            }, null)]
          }), createVNode(resolveComponent("el-tab-pane"), {
            "label": ibiz.i18n.t("panelComponent.userMessage.backendTasks"),
            "name": "async-action"
          }, {
            default: () => [createVNode(AsyncActionTab, {
              "class": this.semanticClass("asyncaction"),
              "style": this.semanticStyle("asyncaction"),
              "controller": this.noticeController.asyncAction,
              "showPopover": this.showPopover,
              "onHiddenPopover": this.hiddenPopover
            }, null)]
          })]
        }), createVNode("div", {
          "class": [this.ns.b("popover-icons"), this.semanticClass("read")],
          "style": this.semanticStyle("read")
        }, [createVNode(resolveComponent("iBizIcon"), {
          "class": this.ns.b("popover-icons-read"),
          "icon": {
            imagePath: "svg/read.svg"
          },
          "baseDir": "iconfont",
          "title": showTitle(ibiz.i18n.t("panelComponent.userMessage.allRead")),
          "onClick": this.onBatchReadClick
        }, null)])]);
      }
    })]);
  }
});

export { UserMessage };
