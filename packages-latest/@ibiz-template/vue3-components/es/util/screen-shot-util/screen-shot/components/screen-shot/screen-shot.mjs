import { defineComponent, createVNode, onMounted, onUnmounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../../controller/index.mjs';
import { ToolbarItemType } from '../../type/index.mjs';
import { ScreenShotToolbar } from '../screen-shot-toolbar/screen-shot-toolbar.mjs';
import './screen-shot.css';
import { ScreenShotController } from '../../controller/screen-shot.controller.mjs';

"use strict";
const ScreenShot = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("screen-shot");
    const c = new ScreenShotController();
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
      if (type === ToolbarItemType.CLOSE) {
        handleClose();
        return;
      }
      c.onToolClick(type, opt);
      if (type === ToolbarItemType.AI)
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
    onMounted(() => {
      c.domToCanvas(props.element, {
        container: props.container,
        itemClassName: props.itemClassName
      });
      document.addEventListener("keydown", keydownHandle);
    });
    onUnmounted(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.c.store.toolbarName.value ? this.ns.m(this.c.store.toolbarName.value.toLowerCase()) : ""],
      "id": "screenShotContainer",
      "onMouseup": () => this.c.mouseUpEvent()
    }, [this.isLoading && createVNode("div", {
      "class": "el-loading-mask"
    }, [createVNode("div", {
      "class": "el-loading-spinner"
    }, [createVNode("svg", {
      "class": "circular",
      "viewBox": "0 0 50 50"
    }, [createVNode("circle", {
      "class": "path",
      "cx": "25",
      "cy": "25",
      "r": "20",
      "fill": "none"
    }, null)]), createVNode("p", {
      "class": "el-loading-text"
    }, [ibiz.i18n.t("util.screenShotUtil.prepareCanvas")])])]), this.toolbarStatus && createVNode(ScreenShotToolbar, {
      "history": this.history,
      "class": this.ns.e("toolber"),
      "onItemClick": this.handleToolBarClick
    }, null), createVNode("canvas", {
      "ref": "canvasElement",
      "id": "canvasContainer",
      "class": this.ns.e("canvas"),
      "onMousedown": (evt) => this.c.mouseDownEvent(evt),
      "onMousemove": (evt) => this.c.mouseMoveEvent(evt)
    }, null), createVNode("div", {
      "ref": "textInputElement",
      "id": "textInputContainer",
      "spellcheck": false,
      "contenteditable": true,
      "class": [this.ns.e("text"), this.ns.is("show", this.textStatus)]
    }, null)]);
  }
});

export { ScreenShot };
