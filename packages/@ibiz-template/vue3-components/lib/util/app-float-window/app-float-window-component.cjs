'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var interact = require('interactjs');
require('./app-float-window-component.css');

"use strict";
const AppFloatWindowComponent = /* @__PURE__ */ vue.defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = vue3Util.useNamespace("float-window");
    const containerRef = vue.ref();
    const isShow = vue.ref(false);
    let data;
    const {
      zIndex
    } = vue3Util.useUIStore();
    const modalZIndex = zIndex.increment();
    const options = vue.ref({
      width: 500,
      height: 600,
      x: 100,
      y: 100
    });
    if (props.opts) {
      Object.assign(options.value, props.opts);
    }
    const state = vue.reactive({
      x: window.innerWidth - 600,
      y: 100,
      width: 500,
      height: 600,
      minWidth: 300,
      minHeight: 300
    });
    const calcStyle = () => {
      return {
        left: "".concat(state.x, "px"),
        top: "".concat(state.y, "px"),
        height: "".concat(state.height, "px"),
        width: "".concat(state.width, "px"),
        zIndex: modalZIndex
      };
    };
    const setStyle = () => {
      Object.assign(containerRef.value, calcStyle());
    };
    vue.onMounted(() => {
      const dragHandles = containerRef.value.getElementsByClassName(ns.b("drag-handle"));
      const dragHandle = dragHandles[0] ? dragHandles[0] : containerRef.value;
      interact(dragHandle).draggable({
        modifiers: [interact.modifiers.restrictRect({
          restriction: document.body,
          endOnly: true
        })],
        cursorChecker: () => {
          return "move";
        },
        listeners: {
          move: (event) => {
            state.x += event.dx;
            state.y += event.dy;
            setStyle();
          }
        }
      });
      interact(containerRef.value).resizable({
        // 可拖拽的边缘
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true
        },
        margin: 6,
        modifiers: [
          // 保持在父对象内部
          interact.modifiers.restrictEdges({
            outer: document.body
          }),
          // 缩放最小宽度
          interact.modifiers.restrictSize({
            min: {
              width: state.minWidth,
              height: state.minHeight
            }
          })
        ],
        inertia: true,
        listeners: {
          move: (event) => {
            state.x += event.deltaRect.left;
            state.y += event.deltaRect.top;
            state.width = event.rect.width;
            state.height = event.rect.height;
            setStyle();
          }
        }
      });
    });
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.MODAL,
      viewUsage: 2,
      dismiss: (_data) => {
        zIndex.decrement();
        isShow.value = false;
        data = _data;
      }
    });
    const dismiss = (_data) => {
      modal.dismiss(_data);
    };
    const present = () => {
      isShow.value = true;
    };
    const onClosed = () => {
      ctx.emit("dismiss", data);
    };
    return {
      ns,
      isShow,
      options,
      modalZIndex,
      modal,
      calcStyle,
      present,
      dismiss,
      onClosed,
      containerRef
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show", this.isShow), this.options.windowClass],
      "style": this.calcStyle(),
      "z-index": this.modalZIndex,
      "ref": "containerRef"
    }, [vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [vue.createVNode("div", {
      "class": this.ns.be("header", "caption")
    }, null), vue.createVNode("div", {
      "class": this.ns.b("actions")
    }, [vue.createVNode("i", {
      "class": this.ns.b("action-item"),
      "onClick": () => {
        this.dismiss();
      }
    }, null)])]), vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal), vue.createTextVNode("+")])]);
  }
});
function createFloatWindow(render, opts) {
  return new vue3Util.OverlayContainer(AppFloatWindowComponent, render, opts);
}

exports.AppFloatWindowComponent = AppFloatWindowComponent;
exports.createFloatWindow = createFloatWindow;
