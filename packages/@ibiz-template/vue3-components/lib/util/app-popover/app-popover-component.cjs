'use strict';

var vue = require('vue');
var dom = require('@floating-ui/dom');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./app-popover-component.css');
var lodashEs = require('lodash-es');
var core = require('@ibiz-template/core');

"use strict";
async function computePos(element, el, arrEl, opts) {
  const middlewareArr = [dom.offset(opts.offsetOpts || 6), dom.flip(), dom.shift()];
  if (!opts.noArrow) {
    middlewareArr.push(dom.arrow({
      element: arrEl
    }));
  }
  const config = {
    placement: opts.placement,
    strategy: "absolute",
    middleware: middlewareArr
  };
  if (opts.options) {
    Object.assign(config, opts.options);
  }
  const options = await dom.computePosition(element, el, config);
  {
    const {
      x,
      y,
      placement,
      middlewareData
    } = options;
    const {
      style
    } = el;
    style.left = "".concat(x, "px");
    style.top = "".concat(y, "px");
    if (!opts.noArrow) {
      const {
        x: arrowX,
        y: arrowY
      } = middlewareData.arrow;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[placement.split("-")[0]];
      Object.assign(arrEl.style, {
        left: arrowX != null ? "".concat(arrowX, "px") : "",
        top: arrowY != null ? "".concat(arrowY, "px") : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px"
      });
    }
  }
}
const AppPopoverComponent = /* @__PURE__ */ vue.defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = vue3Util.useNamespace("popover");
    const isShow = vue.ref(false);
    const el = vue.ref();
    const arrEl = vue.ref();
    const {
      zIndex
    } = vue3Util.useUIStore();
    const popoverZIndex = zIndex.increment();
    const customStyle = vue.reactive({});
    const {
      width,
      height
    } = props.opts;
    if (width) {
      if (lodashEs.isNumber(width)) {
        customStyle.width = core.calcOpenModeStyle(width, "popover");
      } else {
        customStyle.width = width;
      }
    }
    if (height) {
      if (lodashEs.isNumber(height)) {
        customStyle.height = core.calcOpenModeStyle(height, "popover");
      } else {
        customStyle.height = height;
      }
    }
    const modal = new runtime.Modal({
      mode: runtime.ViewMode.POPOVER,
      viewUsage: 2,
      dismiss: (data) => {
        zIndex.decrement();
        ctx.emit("dismiss", data);
      }
    });
    async function dismiss(data) {
      await modal.dismiss(data);
    }
    let cleanUpAutoUpdate = () => {
    };
    vue.onUnmounted(() => {
      cleanUpAutoUpdate();
    });
    async function present(target) {
      isShow.value = true;
      const updatePosition = () => {
        return computePos(target, el.value, arrEl.value, props.opts);
      };
      cleanUpAutoUpdate = dom.autoUpdate(target, el.value, updatePosition);
    }
    const onMaskClick = () => {
      if (props.opts.autoClose === true) {
        dismiss();
      }
    };
    return {
      ns,
      el,
      arrEl,
      isShow,
      modal,
      popoverZIndex,
      onMaskClick,
      present,
      dismiss,
      customStyle
    };
  },
  render() {
    var _a, _b;
    const content = vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show", this.isShow), this.opts.modalClass || ""],
      "ref": "el",
      "style": this.customStyle,
      "onClick": (e) => {
        e.stopPropagation();
      }
    }, [!this.opts.noArrow && vue.createVNode("div", {
      "class": [this.ns.e("arrow")],
      "ref": "arrEl"
    }, null), (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal)]);
    if (this.opts.autoClose === true) {
      return vue.createVNode("div", {
        "class": [this.ns.e("overlay")],
        "style": {
          zIndex: this.popoverZIndex
        },
        "onClick": () => {
          this.onMaskClick();
        }
      }, [content]);
    }
    return content;
  }
});
function createPopover(render, opts) {
  return new vue3Util.OverlayPopoverContainer(AppPopoverComponent, render, opts);
}

exports.createPopover = createPopover;
