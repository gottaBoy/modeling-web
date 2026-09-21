'use strict';

var vue = require('vue');
var dom = require('@floating-ui/dom');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('./tooltip.css');

"use strict";
const IBizTooltip = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTooltip",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 8
    },
    popperClass: {
      type: String,
      required: false
    },
    placement: {
      type: String,
      default: vue3Util.TooltipPlacement.TOP
    },
    trigger: {
      type: String,
      default: vue3Util.TooltipTrigger.HOVER
    },
    virtualRef: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("tooltip");
    const isShow = vue.ref(false);
    const el = vue.ref();
    const arrEl = vue.ref();
    const hasRendered = vue.ref(false);
    let cleanUpAutoUpdate = core.NOOP;
    let cleanMouseenter = core.NOOP;
    let cleanMouseleave = core.NOOP;
    let closeTimer;
    const popperStyle = vue.computed(() => {
      return {
        visibility: isShow.value ? "visible" : "hidden"
      };
    });
    const computePos = async () => {
      const middlewareArr = [dom.offset(props.offset), dom.flip(), dom.shift({
        padding: 12
      })];
      if (props.showArrow)
        middlewareArr.push(dom.arrow({
          element: arrEl.value
        }));
      const config = {
        placement: props.placement,
        strategy: "absolute",
        middleware: middlewareArr
      };
      const options = await dom.computePosition(props.virtualRef, el.value, config);
      {
        const {
          x,
          y,
          placement,
          middlewareData
        } = options;
        const {
          style
        } = el.value;
        style.left = "".concat(x, "px");
        style.top = "".concat(y, "px");
        if (props.showArrow) {
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
          Object.assign(arrEl.value.style, {
            left: arrowX != null ? "".concat(arrowX, "px") : "",
            top: arrowY != null ? "".concat(arrowY, "px") : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px"
          });
          arrEl.value.setAttribute("data-placement", placement);
        }
      }
    };
    const clearCloseTimer = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = void 0;
      }
    };
    const onShowTooltip = () => {
      clearCloseTimer();
      isShow.value = true;
      hasRendered.value = true;
    };
    const onHiddenTooltip = () => {
      clearCloseTimer();
      closeTimer = setTimeout(() => {
        isShow.value = false;
      }, 300);
    };
    vue.watch(() => props.virtualRef, (elment) => {
      if (!elment)
        return;
      cleanMouseenter = core.listenJSEvent(elment, "mouseenter", onShowTooltip);
      cleanMouseleave = core.listenJSEvent(elment, "mouseleave", onHiddenTooltip);
    }, {
      immediate: true
    });
    vue.onMounted(() => {
      cleanUpAutoUpdate = dom.autoUpdate(props.virtualRef, el.value, () => computePos(), {
        animationFrame: true
      });
    });
    vue.onBeforeUnmount(() => {
      cleanUpAutoUpdate();
      cleanMouseenter();
      cleanMouseleave();
    });
    return {
      ns,
      el,
      arrEl,
      isShow,
      popperStyle,
      hasRendered,
      onShowTooltip,
      onHiddenTooltip
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "ref": "el",
      "style": this.popperStyle,
      "class": [this.ns.b(), this.popperClass || ""],
      "onMouseenter": (evt) => {
        evt.stopPropagation();
        this.onShowTooltip();
      },
      "onMouseleave": (evt) => {
        evt.stopPropagation();
        this.onHiddenTooltip();
      },
      "onClick": (e) => {
        e.stopPropagation();
      }
    }, [this.showArrow && vue.createVNode("div", {
      "class": this.ns.e("arrow"),
      "ref": "arrEl"
    }, null), this.hasRendered && vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

exports.IBizTooltip = IBizTooltip;
