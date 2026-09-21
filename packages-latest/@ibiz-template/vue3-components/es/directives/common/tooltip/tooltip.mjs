import { defineComponent, createVNode, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { offset, flip, shift, arrow, computePosition, autoUpdate } from '@floating-ui/dom';
import { useNamespace, TooltipTrigger, TooltipPlacement } from '@ibiz-template/vue3-util';
import { NOOP, listenJSEvent } from '@ibiz-template/core';
import './tooltip.css';

"use strict";
const IBizTooltip = /* @__PURE__ */ defineComponent({
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
      default: TooltipPlacement.TOP
    },
    trigger: {
      type: String,
      default: TooltipTrigger.HOVER
    },
    virtualRef: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("tooltip");
    const isShow = ref(false);
    const el = ref();
    const arrEl = ref();
    const hasRendered = ref(false);
    let cleanUpAutoUpdate = NOOP;
    let cleanMouseenter = NOOP;
    let cleanMouseleave = NOOP;
    let closeTimer;
    const popperStyle = computed(() => {
      return {
        visibility: isShow.value ? "visible" : "hidden"
      };
    });
    const computePos = async () => {
      const middlewareArr = [offset(props.offset), flip(), shift({
        padding: 12
      })];
      if (props.showArrow)
        middlewareArr.push(arrow({
          element: arrEl.value
        }));
      const config = {
        placement: props.placement,
        strategy: "absolute",
        middleware: middlewareArr
      };
      const options = await computePosition(props.virtualRef, el.value, config);
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
    watch(() => props.virtualRef, (elment) => {
      if (!elment)
        return;
      cleanMouseenter = listenJSEvent(elment, "mouseenter", onShowTooltip);
      cleanMouseleave = listenJSEvent(elment, "mouseleave", onHiddenTooltip);
    }, {
      immediate: true
    });
    onMounted(() => {
      cleanUpAutoUpdate = autoUpdate(props.virtualRef, el.value, () => computePos(), {
        animationFrame: true
      });
    });
    onBeforeUnmount(() => {
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
    return createVNode("div", {
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
    }, [this.showArrow && createVNode("div", {
      "class": this.ns.e("arrow"),
      "ref": "arrEl"
    }, null), this.hasRendered && createVNode("div", {
      "class": this.ns.e("content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

export { IBizTooltip };
