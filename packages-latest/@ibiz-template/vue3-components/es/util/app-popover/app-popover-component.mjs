import { defineComponent, createVNode, ref, reactive, onUnmounted } from 'vue';
import { offset, flip, shift, arrow, computePosition, autoUpdate } from '@floating-ui/dom';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { useNamespace, useUIStore, OverlayPopoverContainer } from '@ibiz-template/vue3-util';
import './app-popover-component.css';
import { isNumber } from 'lodash-es';
import { calcOpenModeStyle } from '@ibiz-template/core';

"use strict";
async function computePos(element, el, arrEl, opts) {
  const middlewareArr = [offset(opts.offsetOpts || 6), flip(), shift()];
  if (!opts.noArrow) {
    middlewareArr.push(arrow({
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
  const options = await computePosition(element, el, config);
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
      arrEl.setAttribute("data-placement", placement);
    }
  }
}
const AppPopoverComponent = /* @__PURE__ */ defineComponent({
  props: {
    opts: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const ns = useNamespace("popover");
    const isShow = ref(false);
    const el = ref();
    const arrEl = ref();
    const {
      zIndex
    } = useUIStore();
    const popoverZIndex = zIndex.increment();
    const customStyle = reactive({});
    const {
      width,
      height
    } = props.opts;
    if (width) {
      if (isNumber(width)) {
        customStyle.width = calcOpenModeStyle(width, "popover");
      } else {
        customStyle.width = width;
      }
    }
    if (height) {
      if (isNumber(height)) {
        customStyle.height = calcOpenModeStyle(height, "popover");
      } else {
        customStyle.height = height;
      }
    }
    const modal = new Modal({
      mode: ViewMode.POPOVER,
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
    onUnmounted(() => {
      cleanUpAutoUpdate();
    });
    async function present(target) {
      isShow.value = true;
      const updatePosition = () => {
        return computePos(target, el.value, arrEl.value, props.opts);
      };
      cleanUpAutoUpdate = autoUpdate(target, el.value, updatePosition);
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
    const content = createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show", this.isShow), this.opts.modalClass || ""],
      "ref": "el",
      "style": this.customStyle,
      "onClick": (e) => {
        e.stopPropagation();
      }
    }, [!this.opts.noArrow && createVNode("div", {
      "class": [this.ns.e("arrow")],
      "ref": "arrEl"
    }, null), (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, this.modal)]);
    if (this.opts.autoClose === true) {
      return createVNode("div", {
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
  return new OverlayPopoverContainer(AppPopoverComponent, render, opts);
}

export { createPopover };
