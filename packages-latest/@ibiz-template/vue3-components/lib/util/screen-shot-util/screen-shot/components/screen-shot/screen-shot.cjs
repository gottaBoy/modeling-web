'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../../controller/index.cjs');
var index = require('../../type/index.cjs');
var screenShotToolbar = require('../screen-shot-toolbar/screen-shot-toolbar.cjs');
require('./screen-shot.css');
var screenShot_controller = require('../../controller/screen-shot.controller.cjs');

"use strict";
const ScreenShot = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScreenShot",
  props: {
    /**
     * 生成Canvas的画布元素
     */
    element: {
      type: Object,
      required: true
    },
    /**
     * dom中的滚动容器
     */
    container: {
      type: Object
    },
    /**
     * 滚动项类名，用于排除不在滚动容器的项绘制
     */
    itemClassName: {
      type: String
    }
  },
  emits: {
    complete: (_base64) => true,
    cancel: () => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("screen-shot");
    const c = new screenShot_controller.ScreenShotController();
    const {
      isLoading,
      history,
      textStatus,
      toolbarStatus,
      canvasElement,
      textInputElement
    } = c.store;
    const handleClose = () => {
      emit("cancel");
    };
    const handleToolBarClick = (type, opt) => {
      if (type === index.ToolbarItemType.CLOSE) {
        handleClose();
        return;
      }
      c.onToolClick(type, opt);
      if (type === index.ToolbarItemType.AI)
        emit("complete", canvasElement.value.toDataURL("png"));
    };
    const keydownHandle = (e) => {
      if (e.code === "Escape")
        handleClose();
      if (e.ctrlKey && e.code === "KeyZ") {
        c.goBackToHistory();
      }
      if (e.ctrlKey && e.code === "KeyY") {
        c.goForwardToHistory();
      }
    };
    vue.onMounted(() => {
      c.domToCanvas(props.element, {
        container: props.container,
        itemClassName: props.itemClassName
      });
      document.addEventListener("keydown", keydownHandle);
    });
    vue.onUnmounted(() => {
      document.removeEventListener("keydown", keydownHandle);
    });
    return {
      c,
      ns,
      history,
      isLoading,
      textStatus,
      toolbarStatus,
      canvasElement,
      textInputElement,
      handleToolBarClick
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.c.store.toolbarName.value ? this.ns.m(this.c.store.toolbarName.value.toLowerCase()) : ""],
      "id": "screenShotContainer",
      "onMouseup": () => this.c.mouseUpEvent()
    }, [this.isLoading && vue.createVNode("div", {
      "class": "el-loading-mask"
    }, [vue.createVNode("div", {
      "class": "el-loading-spinner"
    }, [vue.createVNode("svg", {
      "class": "circular",
      "viewBox": "0 0 50 50"
    }, [vue.createVNode("circle", {
      "class": "path",
      "cx": "25",
      "cy": "25",
      "r": "20",
      "fill": "none"
    }, null)]), vue.createVNode("p", {
      "class": "el-loading-text"
    }, [ibiz.i18n.t("util.screenShotUtil.prepareCanvas")])])]), this.toolbarStatus && vue.createVNode(screenShotToolbar.ScreenShotToolbar, {
      "history": this.history,
      "class": this.ns.e("toolber"),
      "onItemClick": this.handleToolBarClick
    }, null), vue.createVNode("canvas", {
      "ref": "canvasElement",
      "id": "canvasContainer",
      "class": this.ns.e("canvas"),
      "onMousedown": (evt) => this.c.mouseDownEvent(evt),
      "onMousemove": (evt) => this.c.mouseMoveEvent(evt)
    }, null), vue.createVNode("div", {
      "ref": "textInputElement",
      "id": "textInputContainer",
      "spellcheck": false,
      "contenteditable": true,
      "class": [this.ns.e("text"), this.ns.is("show", this.textStatus)]
    }, null)]);
  }
});

exports.ScreenShot = ScreenShot;
