import './style.css';
var Ri = Object.defineProperty;
var Ni = (o, t, e) => t in o ? Ri(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var M = (o, t, e) => (Ni(o, typeof t != "symbol" ? t + "" : t, e), e);
import { reactive as mt, onBeforeUnmount as Ke, getCurrentInstance as Bi, defineComponent as V, computed as k, createVNode as r, ref as F, watch as W, onMounted as _e, nextTick as we, resolveComponent as S, createTextVNode as R, isVNode as me, h as te, onUnmounted as He, mergeProps as Pi, provide as zi, withDirectives as Ze, resolveDirective as Qe } from "vue";
import { Namespace as $i, RuntimeError as ne, listenJSEvent as ki, NOOP as at, plus as Gi, clone as Vi, IBizContext as Ui } from "@ibiz-template/core";
import { clone as $ } from "ramda";
import { ValueOP as L, calcSearchConds as ji, getEditorProvider as Ie, getUIActionById as Hi, UIActionUtil as gt, ButtonContainerState as _i, UIActionButtonState as qi, calcResPath as Xi, ViewController as Ji, PanelItemController as yt, calcDeCodeNameById as bt, registerPanelItemProvider as vt, PanelItemState as Wi } from "@ibiz-template/runtime";
import ot from "vuedraggable";
import Yi from "dayjs";
function U(o) {
  return new $i(o);
}
function Ki() {
  return Bi().proxy.$props;
}
function Zi(o) {
  const t = Ki(), e = o(
    t.context,
    t.viewParams,
    t.config,
    t.dismiss,
    t.measureToolbar,
    t.dimensionToolbar
  );
  return e.state = mt(e.state), e.created(), Ke(() => e.destroyed()), e;
}
function K(o, t) {
  const e = o(t.mode, t.context, t.viewParams, $(t.config));
  return e.state = mt(e.state), e.created(), Ke(() => e.destroyed()), e;
}
const Qi = /* @__PURE__ */ V({
  name: "IBizSplitTrigger",
  props: {
    mode: String
  },
  setup(o) {
    const t = U("split-trigger"), e = k(() => o.mode === "vertical"), i = k(() => [t.b(), e.value ? t.m("vertical") : t.m("horizontal")]), a = k(() => [t.b("bar-con"), e.value ? t.bm("bar-con", "vertical") : t.bm("bar-con", "horizontal")]), s = Array(8).fill(0);
    return {
      ns: t,
      classes: i,
      barConClasses: a,
      items: s
    };
  },
  render() {
    return r("div", {
      class: this.classes
    }, [r("div", {
      class: this.barConClasses
    }, [this.items.map((o, t) => r("i", {
      class: this.ns.b("bar"),
      key: "trigger-".concat(t)
    }, null))])]);
  }
}), ea = /* @__PURE__ */ V({
  name: "BISplit",
  components: {
    IBizSplitTrigger: Qi
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: 0.5
    },
    mode: {
      validator: (o) => ["horizontal", "vertical"].includes(o),
      default: "horizontal"
    },
    min: {
      type: [Number, String],
      // 例如是竖直放置，min指的就是上半部分最小有多高
      default: "30px"
    },
    max: {
      type: [Number, String],
      // 例如是竖直放置，max指的就是下半部分最小有多高，可以理解为100%-减去这个最小的高度就是整体最大的高度
      default: "30px"
    }
  },
  emits: ["update:modelValue", "on-move-start", "on-moving", "on-move-end"],
  setup(o, {
    emit: t
  }) {
    const e = U("split"), i = F(null), a = F(0), s = F(0), n = F(!1), l = F(0), p = F(0), d = F(0.5), u = F(0), c = k(() => [e.b("wrapper"), e.is("no-select", n.value)]), C = k(() => [e.b("pane"), n.value ? e.bm("pane", "moving") : ""]), w = k(() => o.mode === "horizontal"), y = k(() => 100 - a.value), m = k(() => typeof o.modelValue == "string"), g = k(() => w.value ? "offsetWidth" : "offsetHeight"), b = (O, N) => parseFloat(O) / parseFloat(N), v = (O) => {
      const N = i.value[g.value];
      return m.value ? typeof o[O] == "string" ? o[O] : N * o[O] : typeof o[O] == "string" ? b(o[O], N) : o[O];
    }, h = (O, N) => m.value ? "".concat(Math.max(parseFloat(O), parseFloat(N)), "px") : Math.max(O, N), f = (O) => {
      let N = 0;
      return m.value ? N = "".concat(i.value[g.value] - parseFloat(O), "px") : N = 1 - O, N;
    }, T = (O) => {
      const P = (w.value ? O.pageX : O.pageY) - u.value, H = i.value[g.value];
      let j = m.value ? "".concat(parseFloat(s.value) + P, "px") : b(H * s.value + P, H);
      const q = f(j);
      parseFloat(j) <= parseFloat(l.value) && (j = h(j, l.value)), parseFloat(q) <= parseFloat(p.value) && (j = f(h(q, p.value))), Object.assign(O, {
        atMin: o.modelValue === l.value,
        atMax: m.value ? f(o.modelValue) === p.value : f(o.modelValue).toFixed(5) === p.value.toFixed(5)
      }), t("update:modelValue", j), t("on-moving", O);
    }, I = () => {
      n.value = !1, document.removeEventListener("mousemove", T), document.removeEventListener("mouseup", I), t("on-move-end");
    }, x = (O) => {
      u.value = w.value ? O.pageX : O.pageY, s.value = o.modelValue, n.value = !0, document.addEventListener("mousemove", T), document.addEventListener("mouseup", I), t("on-move-start");
    }, A = () => {
      we(() => {
        l.value = v("min"), p.value = v("max"), a.value = (m.value ? b(o.modelValue, i.value[g.value]) : o.modelValue) * 1e4 / 100;
      });
    };
    return W(() => o.modelValue, (O) => {
      O !== d.value && (d.value = O, A());
    }), _e(() => {
      we(() => {
        A();
      }), window.addEventListener("resize", A);
    }), Ke(() => {
      window.removeEventListener("resize", A);
    }), {
      ns: e,
      outerWrapper: i,
      offset: a,
      wrapperClasses: c,
      paneClasses: C,
      isHorizontal: w,
      anotherOffset: y,
      handleMousedown: x
    };
  },
  render() {
    var o, t, e, i, a, s, n, l, p, d, u, c;
    return r("div", {
      class: this.wrapperClasses,
      ref: "outerWrapper"
    }, [this.isHorizontal ? r("div", {
      class: this.ns.m("horizontal")
    }, [r("div", {
      style: {
        right: "".concat(this.anotherOffset, "%")
      },
      class: [this.paneClasses, this.ns.bm("pane", "left")]
    }, [(t = (o = this.$slots).left) == null ? void 0 : t.call(o)]), r("div", {
      style: {
        left: "".concat(this.offset, "%")
      },
      class: this.ns.b("trigger-con"),
      onMousedown: (C) => this.handleMousedown(C)
    }, [((i = (e = this.$slots).trigger) == null ? void 0 : i.call(e)) || r(S("iBizSplitTrigger"), {
      mode: "vertical"
    }, null)]), r("div", {
      style: {
        left: "".concat(this.offset, "%")
      },
      class: [this.paneClasses, this.ns.bm("pane", "right")]
    }, [(s = (a = this.$slots).right) == null ? void 0 : s.call(a)])]) : r("div", {
      class: this.ns.m("vertical")
    }, [r("div", {
      style: {
        bottom: "".concat(this.anotherOffset, "%")
      },
      class: [this.paneClasses, this.ns.bm("pane", "top")]
    }, [(l = (n = this.$slots).top) == null ? void 0 : l.call(n)]), r("div", {
      style: {
        top: "".concat(this.offset, "%")
      },
      class: this.ns.b("trigger-con"),
      onMousedown: (C) => this.handleMousedown(C)
    }, [((d = (p = this.$slots).trigger) == null ? void 0 : d.call(p)) || r(S("iBizSplitTrigger"), {
      mode: "horizontal"
    }, null)]), r("div", {
      style: {
        top: "".concat(this.offset, "%")
      },
      class: [this.paneClasses, this.ns.bm("pane", "bottom")]
    }, [(c = (u = this.$slots).bottom) == null ? void 0 : c.call(u)])])]);
  }
}), ta = /* @__PURE__ */ V({
  name: "BISelectGroup",
  props: {
    caption: {
      type: String,
      required: !0
    },
    items: {
      type: Array,
      default: () => []
    },
    isSearch: {
      // 是否是搜索状态
      type: Boolean,
      default: !1
    },
    searchValue: {
      // 搜索值
      type: String,
      default: ""
    },
    collapse: {
      // 是否收缩
      type: Boolean,
      default: !1
    },
    controller: {
      type: Object,
      required: !0
    },
    type: {
      // 是否是指标
      type: String,
      required: !0
    }
  },
  emits: ["add", "collapse"],
  setup(o, {
    emit: t
  }) {
    const e = U("select-group"), i = F({}), a = F(!1), s = F({}), n = (f) => {
      const T = {
        ...f,
        dragTypes: o.type === "measure" ? ["measure"] : ["dimension", "filter", "period", "group"]
      };
      a.value = !0, i.value[f.codename] = !1, o.controller.evt.emit("onDragTarget", T);
    }, l = () => {
      a.value = !1, o.controller.evt.emit("onDragTarget", null);
    }, p = (f) => f.bimeasuretype === "COMMON" ? r("svg", {
      class: e.em("content", "item-icon-com"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "alzeditor/hashtag",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M4.236 9.9l.422-3.8H2.6a.6.6 0 1 1 0-1.2h2.19l.372-3.347a.6.6 0 1 1 1.192.133L5.998 4.9h4.793l.37-3.347a.6.6 0 0 1 1.193.133L11.998 4.9h2.459a.6.6 0 0 1 0 1.2h-2.592l-.421 3.8h2.013a.6.6 0 0 1 0 1.2H11.31l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H5.311l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H1.6a.6.6 0 0 1 0-1.2h2.636zm1.208 0h4.792l.422-3.8H5.865l-.421 3.8z",
      id: "alz形状结合"
    }, null)])]) : r("svg", {
      class: e.em("content", "item-icon-fx"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "alheditor/formula",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z",
      id: "alh形状结合"
    }, null)])]), d = (f) => f.bidimensiontype === "COMMON" ? r("svg", {
      class: e.em("content", "item-icon-fx"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "bbd1.Base基础/1.icon图标/2.normal/View-report-fill",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M9 1.2v4.974h1V3.2h2v2.974h1.5a1.5 1.5 0 0 1 1.5 1.5v5.784a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V7.674a1.5 1.5 0 0 1 1.5-1.5H4V3.2h2v2.974h1V1.2h2zM6 6.636H4v4.038h2V6.636zm1 4.038h2V6.636H7v4.038zm5-4.053h-2v4.053h2V6.621z",
      id: "bbd形状结合"
    }, null)])]) : r("svg", {
      class: e.em("content", "item-icon-fx"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "alheditor/formula",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z",
      id: "alh形状结合"
    }, null)])]), u = (f) => r("div", {
      class: e.b("item-pop")
    }, [r("div", {
      class: e.be("item-pop", "title")
    }, [o.type === "measure" ? p(f) : d(f), r("span", {
      class: e.em("content", "text")
    }, [f.pssysbicubemeasurename || f.pssysbicubedimensionname])]), f.memo && r("div", {
      class: e.be("item-pop", "mome")
    }, [f.memo])]), c = (f, T) => {
      s.value[f.codename] = setTimeout(() => {
        i.value = {}, a.value === !1 && (i.value[f.codename] = !0);
      }, 1e3);
    }, C = (f, T) => {
      clearTimeout(s.value[f.codename]), i.value = {};
    }, w = (f, T, I) => {
      o.controller.evt.emit("onActionClick", {
        detail: f,
        item: T,
        event: I
      });
    }, y = (f) => {
      if (!f.dynamodelflag)
        return;
      let T;
      if (o.type === "measure" && f.bimeasuretype === "CALCULATED" && (T = o.controller.measureToolbar), o.type === "dimension" && f.bidimensiontype === "CALCULATED" && (T = o.controller.dimensionToolbar), T)
        return r(S("iBizActionToolbar"), {
          class: e.e("action"),
          "action-details": T.detoolbarItems,
          "actions-state": o.controller.getOptItemAction(f, T.detoolbarItems || []),
          groupLevelKeys: [50, 100],
          onActionClick: (I, x) => w(I, f, x)
        }, null);
    }, m = (f) => {
      const T = y(f), I = r("div", {
        class: e.em("content", "item"),
        draggable: !0,
        onDragstart: () => n(f),
        onDragend: l,
        onMouseenter: (A) => c(f),
        onMouseleave: (A) => C(f)
      }, [r("div", {
        class: e.em("content", "item-icon")
      }, [o.type === "measure" ? p(f) : d(f), r("svg", {
        class: e.em("content", "item-icon-move"),
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false"
      }, [r("g", {
        id: "aitaction/drag--",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("g", {
        id: "ait拖动",
        transform: "translate(5 1)",
        "fill-rule": "nonzero"
      }, [r("path", {
        d: "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
        id: "ait形状结合"
      }, null)])])])]), r("span", {
        class: e.em("content", "text")
      }, [f.pssysbicubemeasurename || f.pssysbicubedimensionname])]), x = r(S("el-popover"), {
        visible: (i.value[f.codename] || !1) && !a.value,
        trigger: "hover",
        placement: "right",
        width: 230
      }, {
        default: () => u(f),
        reference: () => I
      });
      return o.isSearch ? (f.pssysbicubemeasurename || f.pssysbicubedimensionname).indexOf(o.searchValue) >= 0 ? o.type === "measure" ? [x, T] : [I, T] : null : o.type === "measure" ? [x, T] : [I, T];
    };
    return {
      ns: e,
      renderItem: (f) => m(f),
      switchCollapse: () => {
        t("collapse", !o.collapse);
      },
      onAdd: () => {
        t("add");
      },
      computeNumber: () => o.isSearch ? o.items.filter((f) => (f.pssysbicubemeasurename || f.pssysbicubedimensionname).indexOf(o.searchValue) > -1).length : o.items.length
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: [this.ns.e("header"), this.ns.is("collapse", this.collapse)]
    }, [r("div", {
      class: this.ns.em("header", "caption")
    }, [r("span", null, [this.caption]), r("span", null, [R("·")]), r("span", null, [this.computeNumber()])]), r("div", {
      class: this.ns.em("header", "icons")
    }, [r("div", {
      class: this.ns.em("header", "icons-add"),
      onClick: this.onAdd
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false"
    }, [r("g", {
      id: "ars1.Base基础/1.icon图标/1.-action/plus",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z",
      id: "arsFill-1"
    }, null)])])]), r("div", {
      class: this.ns.em("header", "icons-collapse"),
      onClick: this.switchCollapse
    }, [this.collapse ? r("i", {
      class: "fa fa-angle-right",
      "aria-hidden": "true"
    }, null) : r("i", {
      class: "fa fa-angle-up",
      "aria-hidden": "true"
    }, null)])])]), !this.collapse && r("div", {
      class: this.ns.e("content")
    }, [this.items.map((o) => this.renderItem(o))])]);
  }
});
function ia(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const aa = /* @__PURE__ */ V({
  name: "BIReportSelect",
  components: {
    "bi-split": ea,
    "bi-select-group": ta
  },
  props: {
    controller: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = U("select"), e = o.controller, i = F({
      searchState: !1,
      // 是否搜索,
      searchValue: "",
      // 搜索值
      popoverVisible: !1,
      // 数据集切换popover是否显示
      splitValue: 0.5,
      // 分割比例
      measureCollapse: !1,
      // 指标是否收缩
      dimensionCollapse: !1
      // 纬度是否收缩
    }), a = F(), s = () => {
      i.value.searchState = !i.value.searchState, i.value.searchState ? we(() => {
        a.value.focus();
      }) : i.value.searchValue = "";
    }, n = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "aubnormal/search",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M6.751 12.303A5.557 5.557 0 0 1 1.2 6.751C1.2 3.691 3.69 1.2 6.751 1.2a5.558 5.558 0 0 1 5.551 5.551 5.557 5.557 0 0 1-5.551 5.552M6.751 0a6.751 6.751 0 1 0 4.309 11.949l3.855 3.855a.6.6 0 1 0 .849-.849l-3.854-3.853A6.751 6.751 0 0 0 6.751 0",
      id: "aubFill-1"
    }, null)])]), l = () => r("div", {
      class: t.em("header", "switch-data")
    }, [r(S("el-tooltip"), {
      effect: "dark",
      content: "切换数据集",
      placement: "top"
    }, {
      default: () => r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "adqnormal/arrow-right-left",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.473 1.027a.6.6 0 0 1 .778.573v12.99a.6.6 0 0 1-1.2 0V3.707L2.617 6.182a.6.6 0 1 1-1.04-.6l2.47-4.262a.599.599 0 0 1 .426-.293zm7.156 14.051a.6.6 0 0 1-.778-.573V1.7a.6.6 0 1 1 1.2 0v10.723l1.523-2.594a.6.6 0 1 1 1.04.6l-2.558 4.357a.599.599 0 0 1-.427.292z",
        id: "adq形状结合",
        transform: "rotate(90 8.095 8.095)"
      }, null)])])
    })]), p = async (T) => {
      e.switchCube(T.pssysbicubeid);
    }, d = (T) => {
      e.state.selectedScheme = T, e.state.cube = [], e.switchScheme(T.id);
    }, u = (T) => {
      T.code === "Escape" && (T.stopPropagation(), s());
    }, c = (T = []) => T.map((I) => e.state.cube && e.state.cube.length > 0 && e.state.selectedScheme.id === I.id ? i.value.popoverVisible && r(S("el-popover"), {
      placement: "right-start",
      width: "200px",
      trigger: "hover",
      offset: 0,
      "popper-class": t.em("header", "cascader-list")
    }, {
      reference: () => r("div", {
        class: t.e("select-item"),
        onClick: () => d(I)
      }, [r("div", {
        class: t.em("select-item", "label")
      }, [I.name]), r("div", {
        class: t.em("select-item", "icon")
      }, [r("i", {
        class: "fa fa-angle-right",
        "aria-hidden": "true"
      }, null)])]),
      default: () => e.state.cube.map((x) => r("div", {
        class: [t.e("select-item"), t.is("selected", e.state.selectCube.pssysbicubeid === x.pssysbicubeid)],
        onClick: () => p(x)
      }, [x.pssysbicubename]))
    }) : r("div", {
      class: t.e("select-item"),
      onClick: () => d(I)
    }, [r("div", {
      class: t.em("select-item", "label")
    }, [I.name]), r("div", {
      class: t.em("select-item", "icon")
    }, [r("i", {
      class: "fa fa-angle-right",
      "aria-hidden": "true"
    }, null)])])), C = k(() => e.state.scheme && e.state.scheme.length > 0), w = () => {
      var I;
      let T;
      return r("div", {
        class: t.e("header")
      }, [r("div", {
        class: t.em("header", "caption")
      }, [(I = e.state.selectedScheme) == null ? void 0 : I.name]), r("div", {
        class: t.em("header", "select-icon")
      }, [r("div", {
        class: t.em("header", "search"),
        onClick: s
      }, [r(S("el-tooltip"), {
        effect: "dark",
        content: "搜索",
        placement: "top"
      }, ia(T = n()) ? T : {
        default: () => [T]
      })]), r("div", {
        class: t.em("header", "select")
      }, [C.value ? r(S("el-popover"), {
        visible: i.value.popoverVisible,
        "onUpdate:visible": (x) => i.value.popoverVisible = x,
        trigger: "click",
        width: "200px",
        "popper-class": t.em("header", "cascader-list")
      }, {
        reference: () => l(),
        default: () => {
          var x;
          return c((x = e.state) == null ? void 0 : x.scheme);
        }
      }) : l()])])]);
    }, y = () => r("div", {
      class: t.e("header")
    }, [r(S("el-input"), {
      ref: "searchInput",
      class: t.em("header", "search-input"),
      modelValue: i.value.searchValue,
      "onUpdate:modelValue": (T) => i.value.searchValue = T,
      onKeydown: u,
      placeholder: "搜索"
    }, {
      prefix: () => n()
    }), r("div", {
      class: t.em("header", "close"),
      onClick: s
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "agqaction/close",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z",
      id: "agq形状结合",
      transform: "rotate(45 8.056 8.056)"
    }, null)])])])]), m = () => i.value.searchState ? y() : w(), g = async (T) => {
      const I = "ps_sys_bi_cube_".concat(T.toLowerCase(), "_quick_create_").concat(T.toLowerCase()), x = await ibiz.hub.config.view.get(I), A = await ibiz.openView.modal(x.id, e.context, e.viewParams);
      A && A.ok && e.refreshCubeDetails(T);
    }, b = (T, I) => {
      T === "measure" ? i.value.measureCollapse = I : i.value.dimensionCollapse = I;
    }, v = k(() => i.value.measureCollapse || i.value.dimensionCollapse), h = (T, I, x, A) => r(S("bi-select-group"), {
      class: [{
        [t.em("content", "index")]: I
      }, t.is("collapse", I)],
      caption: T,
      searchValue: i.value.searchValue,
      isSearch: i.value.searchState,
      collapse: I,
      type: A,
      items: x,
      controller: e,
      onAdd: () => {
        g(A);
      },
      onCollapse: (O) => b(A, O)
    }, null);
    return {
      ns: t,
      searchInput: a,
      renderSelectHeader: m,
      renderSelectContent: () => {
        var T, I;
        return v.value ? r("div", {
          class: [t.e("content"), t.is("collapse", v.value)]
        }, [[h("指标", i.value.measureCollapse, ((T = e.state) == null ? void 0 : T.measure) || [], "measure"), h("维度", i.value.dimensionCollapse, ((I = e.state) == null ? void 0 : I.dimension) || [], "dimension")]]) : r("div", {
          class: t.e("content")
        }, [r(S("bi-split"), {
          modelValue: i.value.splitValue,
          "onUpdate:modelValue": (x) => i.value.splitValue = x,
          mode: "vertical",
          min: "48px",
          max: "48px"
        }, {
          top: () => {
            var x;
            return h("指标", i.value.measureCollapse, ((x = e.state) == null ? void 0 : x.measure) || [], "measure");
          },
          bottom: () => {
            var x;
            return h("维度", i.value.dimensionCollapse, ((x = e.state) == null ? void 0 : x.dimension) || [], "dimension");
          }
        })]);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b("container")
    }, [this.renderSelectHeader(), this.renderSelectContent()]);
  }
}), Ct = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "period",
        caption: "同环比",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "period",
            caption: "时间维度",
            subCaption: "同环比",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            disableCalcField: !1,
            typeLimit: {
              tag: "IN",
              types: ["DATE"]
            },
            actions: [
              { id: "CONFIG", caption: "配置" },
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            disableCalcField: !0,
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "font",
        caption: "字体设置",
        type: "GROUP",
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            // font | border
            mode: "FONT",
            fontMax: 300
          }
        ]
      },
      {
        id: "yoy",
        caption: "同比",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "yoy",
            caption: "同比",
            showCaption: !1,
            type: "ITEM",
            editorType: "CHECKBOXS",
            items: [
              { id: "orgin", label: "显示原始值" },
              { id: "difference", label: "显示差异值" }
            ]
          }
        ]
      },
      {
        id: "qoq",
        caption: "环比",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "qoq",
            caption: "环比",
            showCaption: !1,
            type: "ITEM",
            editorType: "CHECKBOXS",
            items: [
              { id: "orgin", label: "显示原始值" },
              { id: "difference", label: "显示差异值" }
            ]
          }
        ]
      }
    ]
  }
}, It = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    period: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    font: {
      show: !0,
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 100,
        // 字体颜色
        color: "#000"
      }
    },
    // 同比
    yoy: {
      show: !1,
      yoy: ["orgin", "difference"]
    },
    // 环比
    qoq: {
      show: !1,
      qoq: ["orgin", "difference"]
    }
  },
  extend: {}
}, wt = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        // 是否显示清空按钮
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEM"
          }
        ]
      },
      {
        id: "fontSetting",
        caption: "字体设置",
        type: "GROUP",
        show: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            // font | border
            mode: "FONT"
          }
        ]
      },
      {
        id: "featureSetting",
        caption: "功能设置",
        type: "GROUP",
        details: [
          {
            id: "endpoint",
            caption: "设置终点值：",
            showCaption: !0,
            type: "ITEM",
            editorType: "ENDPOINT"
          }
        ]
      }
    ]
  }
}, Tt = {
  dechartLegend: {
    showLegend: !1,
    id: "legend",
    appId: "srfAppId"
  },
  dechartTitle: {
    showTitle: !1,
    id: "title",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      seriesType: "pie",
      valueField: "srfValue",
      id: "gauge",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "srfAppDEDataSetId",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  appDataEntityId: "srfAppDataEntityId",
  id: "srfAppId.srfAppDataEntityId.chart",
  appId: "srfAppId",
  name: "chart",
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "chart",
  controlType: "CHART",
  logicName: "srfCaption"
}, Et = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 筛选
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: "#6698FF"
    },
    // 字体设置
    fontSetting: {
      show: !0,
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 20,
        // 字体颜色
        color: "#000"
      }
    },
    // 功能设置
    featureSetting: {
      // 终点值
      endpoint: 100
    }
  },
  extend: {}
}, St = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标 / 纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度 / 横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        // 显示空数据
        showEmptyData: !1,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [{ id: "REMOVE", caption: "删除" }]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        // 是否显示清空按钮
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "置顶" },
              { id: "inside", label: "居中" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, Dt = {
  dechartLegend: {
    showLegend: !1,
    id: "legend",
    appId: "srfAppId"
  },
  dechartTitle: {
    showTitle: !1,
    id: "title",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      catalogField: "srfCatalogField",
      seriesType: "bar",
      valueField: "is_leaf",
      id: "bar_1",
      appId: "srfAppId",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        id: "0",
        appId: "srfAppId"
      }
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  appDataEntityId: "srfAppDataEntityId",
  id: "srfAppId.srfAppDataEntityId.chart",
  appId: "srfAppId",
  name: "chart",
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "ChartView_Chart",
  controlType: "CHART",
  logicName: "Chart"
}, xt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 筛选
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#666"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#666"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#eee"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#eee"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#666"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#666"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#eee"
      },
      showGridline: !1,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#eee"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#666"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, Ot = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[bar_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "bar_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "STACKCOL_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.STACKCOL_Chart",
  appId: "srfAppId"
}, Mt = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "置顶" },
              { id: "inside", label: "居中" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, At = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, Ft = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "置顶" },
              { id: "inside", label: "居中" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, Lt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 网格线样式
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, Rt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[bar_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "bar_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "STACKCOL_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.STACKCOL_Chart",
  appId: "srfAppId"
}, Nt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[bar_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "bar_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "MULTI_SERIES_BAR_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.MULTI_SERIES_BAR_Chart",
  appId: "srfAppId"
}, Bt = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "right", label: "置顶" },
              { id: "inside", label: "居中" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, Pt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      }
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "right",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, zt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[bar_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "bar_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[bar_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "STACK_BAR_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.STACK_BAR_Chart",
  appId: "srfAppId"
}, $t = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "right", label: "置顶" },
              { id: "inside", label: "居中" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, kt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      }
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "right",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, Gt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[line_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "line_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "MULTI_SERIES_LINE_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.MULTI_SERIES_LINE_Chart",
  appId: "srfAppId"
}, Vt = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            // 最多允许拖入项的数量 0表示不做限制，其余数字表示限制
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            // tag: IN:允许拖入类型范围 NOTIN：不允许拖入类型范围，types:类型范围 DATE,NUMBER,STRING,DROPDOWN
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "线上方" },
              { id: "bottom", label: "线下方" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, Ut = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, jt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[line_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "line_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "MULTI_SERIES_LINE_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.MULTI_SERIES_LINE_Chart",
  appId: "srfAppId"
}, Ht = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "线上方" },
              { id: "bottom", label: "线下方" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, _t = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, qt = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[line_1]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    showDataGrid: !1,
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "line_1",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "柱状图",
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartGrids: [
    {
      chartGridXAxis0Id: "0",
      chartGridYAxis0Id: "0",
      chartCoordinateSystemId: "0",
      type: "grid",
      name: "[line_1]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "AREA_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "A1BCD468-3027-4DAF-A36E-F8900BF586DA",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.AREA_Chart",
  appId: "srfAppId"
}, Xt = {
  data: {
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        required: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "group",
        caption: "分组",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "group",
            caption: "分组",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            typeLimit: {
              tag: "NOTIN",
              types: ["DATE"]
            },
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "标签位置",
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "线上方" },
              { id: "bottom", label: "线下方" }
            ]
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, Jt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 分组
    group: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      position: "top",
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, Wt = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 5,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        required: !1,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 5,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "gridFont",
        caption: "表格字体",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "gridHeader",
            caption: "表头",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "gridHeaderAlign",
            caption: "表头对齐",
            showCaption: !1,
            type: "ITEM",
            editorType: "POSITION",
            editorStyle: "CENTER",
            showCenter: !0
          },
          {
            id: "gridBody",
            caption: "表身",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "gridBodyAlign",
            caption: "表身对齐",
            showCaption: !1,
            type: "ITEM",
            editorType: "POSITION",
            editorStyle: "CENTER",
            showCenter: !0
          }
        ]
      },
      {
        id: "agg",
        caption: "合计行",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "position",
            caption: "合计行位置",
            showCaption: !1,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "顶部" },
              { id: "bottom", label: "底部" }
            ]
          }
        ]
      },
      {
        id: "function",
        caption: "功能设置",
        type: "GROUP",
        details: [
          {
            id: "function",
            caption: "功能设置",
            showCaption: !1,
            type: "ITEM",
            editorType: "CHECKBOXS",
            items: [
              { id: "dimensionMerge", label: "同维度合并" },
              { id: "fixedGridHeader", label: "固定表头" },
              { id: "fixedDimension", label: "固定维度列" },
              { id: "showPercent", label: "显示百分比" }
            ]
          }
        ]
      }
    ]
  }
}, Yt = {
  aggMode: "NONE",
  columnEnableFilter: 2,
  columnEnableLink: 2,
  groupMode: "NONE",
  pagingMode: 1,
  pagingSize: 20,
  sortMode: "REMOTE",
  enableCustomized: !1,
  enablePagingBar: !1,
  fetchControlAction: {
    appDEMethodId: "srfAppDEDataSetId",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  autoLoad: !0,
  showBusyIndicator: !0,
  singleSelect: !0,
  codeName: "PIVOT_TABLE",
  controlType: "GRID",
  logicName: "主表格",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: { id: "grid", appId: "srfAppId" },
  modelId: "9db1aa2be35a58b18c1974ca7cb64cc1",
  modelType: "PSDEGRID",
  name: "grid",
  id: "srfAppId.srfAppDataEntityId.PIVOT_TABLE",
  appId: "srfAppId"
}, Kt = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 过滤
    filter: []
  },
  style: {
    // 表格字体
    gridFont: {
      show: !0,
      // 标题字体
      gridHeader: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#555b61"
      },
      gridHeaderAlign: "center",
      // 标签字体
      gridBody: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#1d1f23"
      },
      gridBodyAlign: "left"
    },
    // 标签
    agg: {
      // 是否显示标签
      show: !1,
      // 聚合位置
      position: "top"
    },
    // 功能设置
    function: {
      show: !0,
      function: ["dimensionMerge", "fixedGridHeader"]
    }
  },
  extend: {}
}, Zt = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 5,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度(行)",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        required: !1,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 5,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension_col",
        caption: "维度(列)",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        required: !1,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        allowClear: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "gridFont",
        caption: "表格字体",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "gridHeader",
            caption: "表头",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "gridHeaderAlign",
            caption: "表头对齐",
            showCaption: !1,
            type: "ITEM",
            editorType: "POSITION",
            editorStyle: "CENTER",
            showCenter: !0
          },
          {
            id: "gridBody",
            caption: "表身",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "gridBodyAlign",
            caption: "表身对齐",
            showCaption: !1,
            type: "ITEM",
            editorType: "POSITION",
            editorStyle: "CENTER",
            showCenter: !0
          }
        ]
      },
      {
        id: "agg",
        caption: "合计行/列",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "rowPosition",
            caption: "行位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "top", label: "顶部" },
              { id: "bottom", label: "底部" }
            ]
          },
          {
            id: "colPosition",
            caption: "列位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "left", label: "左侧" },
              { id: "right", label: "右侧" }
            ]
          }
        ]
      },
      {
        id: "function",
        caption: "功能设置",
        type: "GROUP",
        details: [
          {
            id: "function",
            caption: "功能设置",
            showCaption: !1,
            type: "ITEM",
            editorType: "CHECKBOXS",
            items: [
              { id: "dimensionMerge", label: "同维度合并" },
              { id: "fixedGridHeader", label: "固定表头" },
              { id: "fixedDimension", label: "固定维度列" },
              { id: "showPercent", label: "显示百分比" }
            ]
          }
        ]
      }
    ]
  }
}, Qt = {
  aggMode: "NONE",
  columnEnableFilter: 2,
  columnEnableLink: 2,
  gridStyle: "USER",
  groupMode: "NONE",
  pagingMode: 1,
  pagingSize: 20,
  sortMode: "REMOTE",
  enableCustomized: !1,
  enablePagingBar: !1,
  singleSelect: !0,
  fetchControlAction: {
    appDEMethodId: "srfAppDEDataSetId",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "PIVOT_TABLE",
  controlType: "GRID",
  logicName: "主表格",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: { id: "grid", appId: "srfAppId" },
  modelId: "9db1aa2be35a58b18c1974ca7cb64cc1",
  modelType: "PSDEGRID",
  name: "grid",
  id: "srfAppId.srfAppDataEntityId.PIVOT_TABLE",
  appId: "srfAppId"
}, ei = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度行
    dimension: void 0,
    // 维度列
    dimension_col: void 0,
    // 过滤
    filter: [],
    // 显示条数
    size: 50
  },
  style: {
    // 表格字体
    gridFont: {
      show: !0,
      // 标题字体
      gridHeader: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#555b61"
      },
      gridHeaderAlign: "center",
      // 标签字体
      gridBody: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#1d1f23"
      },
      gridBodyAlign: "left"
    },
    // 标签
    agg: {
      // 是否显示标签
      show: !1,
      // 行位置
      rowPosition: "top",
      // 列位置
      colPosition: "left"
    },
    // 功能设置
    function: {
      show: !0,
      function: ["dimensionMerge", "fixedGridHeader"]
    }
  },
  extend: {}
}, ti = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "percentage",
            caption: "显示百分比",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            // font | border
            mode: "FONT"
          },
          {
            id: "scope",
            caption: "显示数据范围",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION",
            showCenter: !0
          }
        ]
      }
    ]
  }
}, ii = {
  coordinateSystem: "NONE",
  chartCoordinateSystems: [
    {
      echartsType: "none",
      type: "NONE",
      name: "[pie]无坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      catalogCodeListId: "srfAppCodeListId",
      echartsType: "pie",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        category: "srfCatalogField",
        value: "srfValue",
        type: "NONE",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "pie",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "pie_0",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "srfCaption",
    showTitle: !1,
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  fetchControlAction: {
    appDEMethodId: "srfAppDEDataSetId",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "PIE_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "B5AC8AE3-2186-497C-B6E8-BDBAE218B618",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.PIE_Chart",
  appId: "srfAppId"
}, ai = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 是否显示百分比
      percentage: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#000"
      },
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "left-top"
    }
  },
  extend: {}
}, oi = {
  coordinateSystem: "RADAR",
  chartCoordinateSystems: [
    {
      chartRadar: {
        chartCoordinateSystemId: "0",
        type: "radar",
        name: "[radar_0]雷达坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "radar",
      type: "RADAR",
      name: "[radar_0]雷达坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "radar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      seriesField: "srfSeriesField",
      seriesLayoutBy: "column",
      seriesType: "radar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "radar_0",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "srfCaption",
    titlePos: "TOP",
    showTitle: !0,
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartRadars: [
    {
      chartCoordinateSystemId: "0",
      type: "radar",
      name: "[radar_0]雷达坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "srfAppDEDataSetId",
    appDataEntityId: "srfAppDataEntityId",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "Radar_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "0517D092-EB9B-4300-91CA-906647294254",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.Radar_Chart",
  appId: "srfAppId"
}, si = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#000"
      },
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "left-top"
    }
  },
  extend: {}
}, ri = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            // font | border
            mode: "FONT"
          },
          {
            id: "scope",
            caption: "显示数据范围",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION",
            showCenter: !0
          }
        ]
      }
    ]
  },
  extend: {}
}, ni = {
  data: {
    pagination: !0,
    details: [
      {
        id: "measure",
        caption: "指标/纵轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        // 是否显示清空按钮
        enableRemove: !0,
        details: [
          {
            id: "measure",
            caption: "指标/纵轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !1,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "AXIS", caption: "应用轴" },
              { id: "CORDON", caption: "设置警戒线" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "dimension",
        caption: "维度/横轴",
        type: "GROUP",
        isCollapse: !1,
        required: !0,
        enableRemove: !0,
        details: [
          {
            id: "dimension",
            caption: "维度/横轴",
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            max: 3,
            actions: [
              { id: "UPDATE", caption: "设置显示名" },
              { id: "SORT", caption: "排序" },
              { id: "REMOVE", caption: "删除" }
            ]
          }
        ]
      },
      {
        id: "filter",
        caption: "筛选",
        type: "GROUP",
        isCollapse: !1,
        enableRemove: !0,
        // 转换编辑模式按钮
        switchEditMode: !0,
        details: [
          {
            id: "filter",
            caption: "筛选项",
            subCaption: "筛选",
            disableCalcField: !0,
            showCaption: !1,
            type: "ITEM",
            editorType: "DRAG",
            multiple: !0,
            actions: [
              { id: "FILTER", caption: "过滤" },
              { id: "REMOVE", caption: "删除" }
            ],
            expandActions: [{ id: "FILTER", caption: "过滤" }]
          }
        ]
      }
    ]
  },
  style: {
    details: [
      {
        id: "graphics",
        caption: "绘图",
        type: "GROUP",
        isCollapse: !1,
        details: [
          {
            id: "color",
            caption: "当前配色",
            showCaption: !0,
            type: "ITEM",
            editorType: "COLOR",
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: "ITEMS"
          }
        ]
      },
      {
        id: "xAxis",
        caption: "横轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "enableLabelInterval",
            caption: "开启轴标签间隔",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelInterval",
            caption: "标签间隔",
            showCaption: !0,
            type: "ITEM",
            editorType: "NUMBER"
          }
        ]
      },
      {
        id: "yAxis",
        caption: "纵轴",
        type: "GROUP",
        enableSwitch: !1,
        details: [
          {
            id: "showTitle",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "titleFont",
            caption: "显示轴标题",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showLabel",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "labelFont",
            caption: "显示轴标签",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "showAxisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "axisline",
            caption: "显示轴线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          },
          {
            id: "showGridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "CHECKBOX"
          },
          {
            id: "gridline",
            caption: "显示网格线",
            type: "ITEM",
            editorType: "FONT",
            mode: "BORDER"
          }
        ]
      },
      {
        id: "label",
        caption: "标签",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "scope",
            caption: "显示数据",
            showCaption: !0,
            type: "ITEM",
            editorType: "RADIO",
            items: [
              { id: "all", label: "全部数据" },
              { id: "max_min", label: "最大值/最小值" }
            ]
          }
        ]
      },
      {
        id: "legend",
        caption: "图例",
        type: "GROUP",
        enableSwitch: !0,
        details: [
          {
            id: "font",
            caption: "文字",
            showCaption: !0,
            type: "ITEM",
            editorType: "FONT",
            mode: "FONT"
          },
          {
            id: "position",
            caption: "数据位置",
            showCaption: !0,
            type: "ITEM",
            editorType: "POSITION",
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: "DIRECTION"
          }
        ]
      }
    ]
  }
}, li = {
  caption: "",
  data: {
    // 指标
    measure: void 0,
    // 维度
    dimension: void 0,
    // 过滤
    filter: void 0
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: "default",
      // 配色列表
      color: []
    },
    // 横轴
    xAxis: {
      show: !0,
      showTitle: !0,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      showGridline: !1,
      // 标签字体
      gridline: {
        // border风格
        borderStyle: "solid",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#000"
      },
      // 启用标签间隔控制
      enableLabelInterval: !1,
      // 标签间隔
      labelInterval: 1
    },
    // 纵轴
    yAxis: {
      show: !0,
      showTitle: !0,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showLabel: !0,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      showAxisline: !0,
      // 轴线
      axisline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      },
      showGridline: !0,
      // 网格线
      gridline: {
        // border风格
        borderStyle: "dashed",
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: "#dddddd"
      }
    },
    // 标签
    label: {
      // 是否显示标签
      show: !1,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 显示数据范围
      scope: "all"
    },
    // 图例
    legend: {
      // 是否显示图例
      show: !0,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: "normal",
        // 字体风格
        fontStyle: "normal",
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: "#000"
      },
      // 图例位置
      position: "right-top"
    }
  },
  extend: {}
}, di = {
  coordinateSystem: "XY",
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: "0",
        chartGridYAxis0Id: "0",
        chartCoordinateSystemId: "0",
        type: "grid",
        name: "[scatter_0]直角坐标系[0]",
        id: "0",
        appId: "srfAppId"
      },
      echartsType: "cartesian2d",
      type: "XY",
      name: "[scatter_0]直角坐标系[0]",
      id: "0",
      appId: "srfAppId"
    }
  ],
  dechartDataGrid: {
    id: "0",
    appId: "srfAppId"
  },
  dechartLegend: {
    showLegend: !0,
    id: "0",
    appId: "srfAppId"
  },
  dechartSerieses: [
    {
      catalogField: "srfCatalogField",
      // catalogCodeListId: 'srfCatalogField',
      echartsType: "scatter",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        // todo
        y: ["srfValue"],
        // todo
        itemId: "srfValue",
        itemName: "srfValue",
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesField: "srfValue",
      seriesLayoutBy: "column",
      // seriesCodeListId: 'web.common__usrcodelist0129249258', // todo
      seriesType: "scatter",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "scatter_0",
      appId: "srfAppId"
    }
  ],
  dechartTitle: {
    title: "srfCaption",
    showTitle: !0,
    id: "0",
    appId: "srfAppId"
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: "srfAppDEDataSetId",
      appDataEntityId: "srfAppDataEntityId",
      name: "DEFAULT",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartDataSets: [],
  chartXAxises: [
    {
      echartsPos: "xAxis",
      echartsType: "category",
      position: "bottom",
      type: "category",
      name: "axis_xAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  chartYAxises: [
    {
      echartsPos: "yAxis",
      echartsType: "value",
      position: "left",
      type: "numeric",
      name: "axis_yAxis_0",
      id: "0",
      appId: "srfAppId"
    }
  ],
  fetchControlAction: {
    appDEMethodId: "fetchdefault",
    appDataEntityId: "web.reginfo",
    id: "fetch",
    appId: "srfAppId"
  },
  readOnly: !0,
  autoLoad: !0,
  showBusyIndicator: !0,
  codeName: "SCATTER_Chart",
  controlType: "CHART",
  logicName: "srfCaption",
  appDataEntityId: "srfAppDataEntityId",
  controlParam: {
    id: "chart",
    appId: "srfAppId"
  },
  modelId: "AF51908C-6D6F-4055-9E30-C6A599FB191C",
  modelType: "PSDECHART",
  name: "chart",
  id: "srfAppId.srfAppDataEntityId.PIE_Chart",
  appId: "srfAppId"
}, oa = [
  {
    type: "NUMBER",
    caption: "数字",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <title>数字</title>\n        <g id="数字" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <path d="M10.0753482,26.9089624 L10.0753482,9.01202017 L7.79185175,9.06345593 L5,10.535639 L5,12.9756265 L7.79185175,11.8852771 L7.79185175,26.9089624 L10.0753482,26.9089624 Z M21.3531141,26.9765798 L21.3797168,24.7390601 L16.4153132,24.7390601 L20.2938049,17.4858646 C20.5066262,17.0937659 20.6751097,16.7613345 20.7992555,16.4885701 C20.9234012,16.2158058 21.0120768,15.9430415 21.0652821,15.6702772 C21.1184874,15.3975129 21.1539576,15.1119628 21.1716927,14.8136268 C21.1894278,14.5152909 21.1982954,14.1445019 21.1982954,13.7012599 C21.1982954,13.0875402 21.1229212,12.5079161 20.9721728,11.9623874 C20.8214244,11.4168588 20.5864342,10.9309974 20.2672022,10.5048032 C19.9302352,10.078609 19.5090264,9.74191552 19.0035758,9.49472287 C18.4981252,9.24753022 17.8906978,9.12393389 17.1812934,9.12393389 C16.61377,9.12393389 16.0817167,9.23048245 15.5851337,9.44357956 C15.0885507,9.65667668 14.6629081,9.94222681 14.3082059,10.30023 C13.9357687,10.6582331 13.6431394,11.0759035 13.4303181,11.553241 C13.2174968,12.0305785 13.1110862,12.5420116 13.1110862,13.0875402 L13.1110862,14.5195528 L15.2259978,14.4939812 L15.2259978,12.7295371 C15.2259978,12.3033428 15.3457098,11.9794352 15.5851337,11.7578142 C15.8245577,11.5361932 16.3034056,11.1952378 17.1546908,11.1952378 C17.9492236,11.1952378 18.1617836,11.5627877 18.3307866,11.7157479 L18.3665311,11.7450284 C18.5438822,11.8728867 18.6768955,12.0305785 18.765571,12.218104 C18.8542466,12.4056294 18.9030181,12.6229885 18.9118857,12.8701812 C18.9207532,13.1173738 18.925187,13.3517806 18.925187,13.5734016 C18.925187,14.0677869 18.9074519,14.4811953 18.8719817,14.8136268 C18.8365115,15.1460583 18.6799553,15.7128967 18.4316638,16.1561386 L13.8185292,24.8413467 L13.8185292,26.9765798 L21.3531141,26.9765798 Z M27.1553491,26.9896583 C27.9996491,26.9896583 28.4890869,26.7867363 29.0079796,26.4802827 C29.5268723,26.173829 29.9534198,25.7886913 30.2876219,25.3248695 C30.4283385,25.1260888 30.5426708,24.9355905 30.6306187,24.7533749 C30.7185667,24.5711592 30.788925,24.3475308 30.8416937,24.0824898 C30.8944625,23.8340139 30.9340391,23.5192777 30.9604234,23.1382812 C30.9868078,22.7572848 31,22.2768979 31,21.6971207 C31,21.0676483 30.9912052,20.5499901 30.9736156,20.1441461 C30.956026,19.738302 30.8944625,19.3862945 30.788925,19.0881233 C30.6833875,18.8065173 30.5206838,18.5580413 30.300814,18.3426955 C30.0809442,18.1273497 29.952093,17.945134 29.5299429,17.696658 C29.9169138,17.4813122 29.9885989,17.3073791 30.2084687,17.1251634 C30.4283385,16.9429477 30.599837,16.7193193 30.7229641,16.4542783 C30.8285016,16.2058024 30.8944625,15.8910662 30.9208469,15.5100697 C30.9472312,15.1290733 30.9604234,14.6321214 30.9604234,14.0192141 C30.9604234,12.942485 30.8812703,12.1307969 30.7229641,11.5841498 C30.6350161,11.3025437 30.5250812,11.0623503 30.3931594,10.8635696 C30.2612375,10.6647888 30.1073286,10.4660081 29.9314328,10.2672273 C29.6851786,9.98562124 29.3201947,9.70815644 28.8364812,9.4348329 C28.3527676,9.16150936 27.9732648,9 27.2345022,9 C26.6716356,9 26.143948,9.09939038 25.6514397,9.29817113 C25.1589313,9.49695189 24.7279865,9.7619929 24.3586053,10.0932942 C23.989224,10.4245954 23.6989959,10.8221569 23.4879209,11.2859787 C23.2768459,11.7498004 23.1713084,12.2384698 23.1713084,12.7519868 L23.1713084,14.2179948 L25.3315282,14.2179948 L25.3315282,12.8265295 C25.3315282,12.5614885 25.4326683,12.288165 25.6349485,12.0065589 C25.8372287,11.7249529 26.4909861,11.2735549 27.1553491,11.2859787 C27.8197121,11.2984025 28.2040127,11.7001053 28.4414721,11.9320161 C28.6789314,12.163927 28.7976611,12.4620982 28.7976611,12.8265295 L28.7976611,15.1125082 C28.7976611,15.7751107 28.6437523,16.1975198 28.3359346,16.3797355 C28.0281168,16.5619512 27.1729387,16.6033639 26.3638178,16.6033639 L26.3638178,18.8396474 C26.8035574,18.8396474 27.1597465,18.8562124 27.4323851,18.8893426 C27.7050236,18.9224727 28.2172049,19.0549932 28.3755111,19.1875137 C28.6569445,19.4028595 28.7976611,19.8583988 28.7976611,20.5541314 L28.7976611,23.088586 C28.7976611,23.5192777 28.6789314,23.8630027 28.4414721,24.1197612 C28.2040127,24.3765197 27.9439519,24.80307 27.1553491,24.80307 C26.3667463,24.80307 25.8888991,24.3765197 25.6514397,24.1197612 C25.4139803,23.8630027 25.2952506,23.5358427 25.2952506,23.1382812 L25.2952506,21.8213587 L23.1713084,21.7716635 L23.1713084,23.212824 C23.1713084,23.9085566 23.2988328,24.4966164 23.5538818,24.9770032 C23.8089308,25.45739 24.1299407,25.846669 24.5169115,26.1448401 C24.9038824,26.4430113 25.3348272,26.6583571 25.8097459,26.7908776 C26.2846647,26.9233981 26.7331991,26.9896583 27.1553491,26.9896583 Z" id="形状结合" fill="#6698FF" fill-rule="nonzero"></path>\n        </g>\n    </svg>'
  },
  {
    type: "MULTI_SERIES_COL",
    caption: "多系列柱状图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>柱状图</title>\n    <g id="柱状图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(4.771362, 7.011523)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="26.9219971 21 26.9219971 22.5 0 22.5 0 21"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2.4786377 10.1428571 6.4786377 10.1428571 6.4786377 20 2.4786377 20"></polygon>\n            <polygon id="矩形" fill="#73D897" points="8.4786377 3.28571429 12.4786377 3.28571429 12.4786377 20 8.4786377 20"></polygon>\n            <polygon id="矩形" fill="#73D897" points="20.4786377 7.95238095 24.4786377 7.95238095 24.4786377 20 20.4786377 20"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="14.4786377 1.59164348e-12 18.4786377 1.59164348e-12 18.4786377 20 14.4786377 20"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "STACK_COL",
    caption: "堆叠柱状图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>堆叠柱状图</title>\n    <g id="堆叠柱状图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(4.771362, 8.011523)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="26.9219971 20 26.9219971 21.5 5.56690466e-14 21.5 5.56690466e-14 20"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2.4786377 10 8.4786377 10 8.4786377 19 2.4786377 19"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="10.4786377 9 16.4786377 9 16.4786377 19 10.4786377 19"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="18.4786377 14.0909091 24.4786377 14.0909091 24.4786377 19 18.4786377 19"></polygon>\n            <polygon id="矩形" fill="#73D897" points="2.4786377 4 8.4786377 4 8.4786377 9 2.4786377 9"></polygon>\n            <polygon id="矩形" fill="#73D897" points="10.4786377 -1.70530257e-13 16.4786377 -1.70530257e-13 16.4786377 8 10.4786377 8"></polygon>\n            <polygon id="矩形" fill="#73D897" points="18.4786377 8 24.4786377 8 24.4786377 13 18.4786377 13"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "ZONE_COL",
    caption: "分区柱状图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>分区柱状图</title>\n    <g id="分区柱状图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(5.000000, 6.000000)" id="编组-5">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="26 10 26 11.5 -2.70117262e-13 11.5 -2.70117262e-13 10"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2 4 8 4 8 9 2 9"></polygon>\n            <polygon id="矩形" fill="#5DCFFF" points="10 4.54761229e-13 16 4.54761229e-13 16 9 10 9"></polygon>\n            <polygon id="矩形" fill="#73D897" points="18 5 24 5 24 9 18 9"></polygon>\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="26 23 26 24.5 -2.70117262e-13 24.5 -2.70117262e-13 23"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2 17 8 17 8 22 2 22"></polygon>\n            <polygon id="矩形" fill="#5DCFFF" points="10 13 16 13 16 22 10 22"></polygon>\n            <polygon id="矩形" fill="#73D897" points="18 16 24 16 24 22 18 22"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "MULTI_SERIES_BAR",
    caption: "多系列条形图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>条形图</title>\n    <g id="条形图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="柱状图" transform="translate(17.625000, 18.125000) rotate(-270.000000) translate(-17.625000, -18.125000) translate(6.500000, 5.500000)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="22 23.75 22 25.25 2.27304287e-13 25.25 2.27304287e-13 23.75"></polygon>\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" transform="translate(21.500000, 12.500000) rotate(-90.000000) translate(-21.500000, -12.500000) " points="34 11.75 34 13.25 9 13.25 9 11.75"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2 8.75 6 8.75 6 20.75 2 20.75"></polygon>\n            <polygon id="矩形" fill="#73D897" points="8 0.75 12 0.75 12 20.75 8 20.75"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="14 3.75 18 3.75 18 20.75 14 20.75"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "STACK_BAR",
    caption: "堆积条形图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>条形柱状图</title>\n    <g id="条形柱状图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="柱状图" transform="translate(17.625000, 18.125000) rotate(-270.000000) translate(-17.625000, -18.125000) translate(6.500000, 5.500000)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="22 23.75 22 25.25 2.27304287e-13 25.25 2.27304287e-13 23.75"></polygon>\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" transform="translate(21.500000, 12.500000) rotate(-90.000000) translate(-21.500000, -12.500000) " points="34 11.75 34 13.25 9 13.25 9 11.75"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="2 12.75 6 12.75 6 20.75 2 20.75"></polygon>\n            <polygon id="矩形备份" fill="#73D897" points="2 8.75 6 8.75 6 12.75 2 12.75"></polygon>\n            <polygon id="矩形备份-3" fill="#73D897" points="14 3.75 18 3.75 18 10.75 14 10.75"></polygon>\n            <polygon id="矩形备份-2" fill="#73D897" points="8 0.75 12 0.75 12 8.75 8 8.75"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="8 8.75 12 8.75 12 20.75 8 20.75"></polygon>\n            <polygon id="矩形" fill="#6698FF" points="14 10.75 18 10.75 18 20.75 14 20.75"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "MULTI_SERIES_LINE",
    caption: "多系列折线图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>折线图</title>\n    <g id="折线图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(4.000000, 10.000000)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="0.00203182278 17.7107207 29.0020318 17.7892848 28.9979682 19.2892793 -0.00203182278 19.2107152"></polygon>\n            <polyline id="路径-4" stroke="#6698FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2 10 9.34200028 4.26308294e-13 18.2813753 10 26 0"></polyline>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "ZONE_LINE",
    caption: "分区折线图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>分区折线图</title>\n    <g id="分区折线图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(5.000000, 7.000000)">\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="0.00226626184 8.71072137 26.0022663 8.78928548 25.9977337 10.2892786 -0.00226626184 10.2107145"></polygon>\n            <polyline id="路径-4" stroke="#6698FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1 6.0115225 9.06435083 1.0115225 16.2813753 5 23.8500699 0"></polyline>\n            <polygon id="路径-6备份" fill="#73D897" fill-rule="nonzero" points="0.00226626184 21.7107214 26.0022663 21.7892855 25.9977337 23.2892786 -0.00226626184 23.2107145"></polygon>\n            <polyline id="路径-4" stroke="#6698FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1 19.0115225 9.06435083 14.0115225 16.2813753 18 23.8500699 13"></polyline>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "AREA",
    caption: "面积图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>面积图</title>\n    <g id="面积图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="1" transform="translate(5.000000, 8.000000)">\n            <polygon id="路径-2" fill="#6698FF" opacity="0.3" points="0 5.54307808 0 20.7537988 25.4330802 20.7537988 25.4330802 -2.95217236e-14 17.4581603 4 7.99182318 1"></polygon>\n            <polyline id="路径-4" stroke="#6698FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="1.45816027 6 9.5754251 1.00958368 16.8398039 4.99041632 24.4581603 0"></polyline>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "GRID",
    caption: "表格",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>表格</title>\n    <g id="表格" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组-7" transform="translate(6.000000, 7.000000)">\n            <polygon id="矩形" fill="#6698FF" points="0 0 24 0 24 4.4 0 4.4"></polygon>\n            <rect id="矩形" fill="#A1CBFF" x="0" y="6.6" width="10.9090909" height="6.6"></rect>\n            <polygon id="矩形" fill="#CEE7FF" points="12.940979 6.6 23.8500699 6.6 23.8500699 8.8 12.940979 8.8"></polygon>\n            <polygon id="矩形" fill="#CEE7FF" points="12.940979 9.9 23.8500699 9.9 23.8500699 13.2 12.940979 13.2"></polygon>\n            <polygon id="矩形" fill="#CEE7FF" points="12.940979 15.4 23.8500699 15.4 23.8500699 17.6 12.940979 17.6"></polygon>\n            <polygon id="矩形" fill="#CEE7FF" points="12.940979 18.7 23.8500699 18.7 23.8500699 22 12.940979 22"></polygon>\n            <rect id="矩形" fill="#A1CBFF" x="0" y="15.4" width="10.9090909" height="6.6"></rect>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "CROSSTABLE",
    caption: "交叉表",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>交叉表</title>\n    <g id="交叉表" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组-7" transform="translate(6.000000, 7.000000)">\n            <polygon id="矩形" fill="#6698FF" points="10 0 24 0 24 4 10 4"></polygon>\n            <polygon id="矩形" fill="#73D897" points="0 0 8 0 8 4 0 4"></polygon>\n            <polygon id="矩形" fill="#A1CBFF" points="0 6 8 6 8 22 0 22"></polygon>\n            <polygon id="矩形" fill="#CEE7FF" points="10 6 24 6 24 22 10 22"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "PIE",
    caption: "饼图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>饼图</title>\n    <g id="饼图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组" transform="translate(5.500000, 5.500000)">\n            <path d="M12.4991995,0 C5.62439962,0 0,5.62439962 0,12.5008005 C0,19.3756004 5.62439962,25 12.4991995,25 C19.3739994,25 25,19.3756004 25,12.5008005 L23.4357989,12.5008005 L12.4991995,12.5008005 L12.4991995,1.56260006 L12.4991995,0 Z" id="形状结合" fill="#6698FF"></path>\n            <path d="M14.3113139,1.73774039e-14 C14.2857143,0.446569002 14.2857143,10.7142857 14.2857143,10.7142857 C14.2857143,10.7142857 24.6330724,10.7142857 25,10.7092302 C24.6279525,4.96955467 20.1002367,0.446569002 14.3113139,1.73774039e-14" id="Fill-3" fill="#73D897"></path>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "RADAR",
    caption: "雷达图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>雷达图</title>\n    <g id="雷达图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组" transform="translate(2.000000, 2.000000)">\n            <polygon id="直线-6" fill="#E7E9EF" fill-rule="nonzero" points="17 1.82352941 17 30.1764706 15 30.1764706 15 1.82352941"></polygon>\n            <polygon id="直线-6" fill="#E7E9EF" fill-rule="nonzero" points="2.93652084 10.3420238 3.90940249 8.59459678 29.0634792 22.5991526 28.0905975 24.3465797"></polygon>\n            <polygon id="直线-6" fill="#E7E9EF" fill-rule="nonzero" points="28.0636231 8.58794213 29.0673438 10.3178395 4.87755337 24.3532343 3.87383271 22.623337"></polygon>\n            <path d="M16,0 L29.8564065,8 L29.8564065,24 L16,32 L2.14359354,24 L2.14359354,8 L16,0 Z M16,2.309 L4.143,9.155 L4.143,22.844 L16,29.69 L27.856,22.844 L27.856,9.155 L16,2.309 Z" id="多边形" fill="#D5DBE8" fill-rule="nonzero"></path>\n            <polygon id="路径-2" stroke="#6698FF" stroke-width="2" points="11.3546228 10.2353842 16.7477575 7.78749909 23.3257123 12.0160868 20.6419194 18.9280222 8.08095313 22.0474204"></polygon>\n            <polygon id="路径-6" stroke="#73D897" stroke-width="2" points="14.1432867 15.1736231 20.4984464 15.1736231 24.8525959 21.1110111 16.9848135 24.5853878"></polygon>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "GAUGE",
    caption: "仪表盘",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>仪表盘</title>\n    <g id="仪表盘" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组-3" transform="translate(2.545000, 4.545000)" fill-rule="nonzero">\n            <path d="M15.455,0 C23.9866074,0 30.91,6.83929667 30.91,15.2849471 C30.91,19.073914 29.5089944,22.6507734 27.0181092,25.4267311 C26.4814369,26.0248235 25.5615284,26.0746144 24.963436,25.5379421 C24.3653435,25.0012699 24.3155527,24.0813613 24.8522249,23.4832689 C26.8691825,21.235478 28,18.3484267 28,15.2849471 C28,8.45445974 22.3873656,2.91 15.455,2.91 C8.52263438,2.91 2.91,8.45445974 2.91,15.2849471 C2.91,18.0995868 3.86362095,20.7673275 5.59170383,22.932683 C6.09294927,23.5607631 5.99012943,24.4762624 5.36204927,24.9775078 C4.73396912,25.4787533 3.81846984,25.3759334 3.31722439,24.7478533 C1.18180528,22.0720896 0,18.7660065 0,15.2849471 C0,6.83929667 6.92339262,0 15.455,0 Z" id="路径" fill="#E7E9EF"></path>\n            <path d="M15.455,0 C19.6801543,0 23.6385369,1.68694318 26.5288532,4.62266937 C27.0926202,5.19529363 27.0854399,6.1165207 26.5128156,6.68028761 C25.9401913,7.24405452 25.0189643,7.23687422 24.4551974,6.66424996 C22.1073205,4.27948561 18.8938466,2.91 15.455,2.91 C8.52263438,2.91 2.91,8.45445974 2.91,15.2849471 C2.91,18.0995868 3.86362095,20.7673275 5.59170383,22.932683 C6.09294927,23.5607631 5.99012943,24.4762624 5.36204927,24.9775078 C4.73396912,25.4787533 3.81846984,25.3759334 3.31722439,24.7478533 C1.18180528,22.0720896 0,18.7660065 0,15.2849471 C0,6.83929667 6.92339262,0 15.455,0 Z" id="路径" fill="#6698FF"></path>\n            <g id="64%" transform="translate(5.835000, 11.539000)" fill="#6698FF">\n                <path d="M2.565,0 C1.7765,0 1.1495,0.342 0.6935,1.026 C0.228,1.71 0,2.603 0,3.7145 C0,4.75 0.209,5.5575 0.646,6.1465 C1.083,6.745 1.7195,7.049 2.5555,7.049 C3.23,7.049 3.8,6.821 4.256,6.384 C4.712,5.947 4.9495,5.3865 4.9495,4.7025 C4.9495,4.0375 4.75,3.4865 4.351,3.059 C3.952,2.6315 3.42,2.4225 2.755,2.4225 C2.413,2.4225 2.109,2.4795 1.843,2.6125 C1.558,2.7455 1.3205,2.945 1.1305,3.23 L1.083,3.23 L1.083,3.1445 C1.083,2.5175 1.2065,1.995 1.4725,1.577 C1.7385,1.1305 2.0995,0.912 2.5555,0.912 C3.2015,0.912 3.6005,1.2255 3.7335,1.8525 L4.8165,1.8525 C4.6455,0.6175 3.895,0 2.565,0 Z M2.5175,3.325 C2.926,3.325 3.249,3.4485 3.496,3.705 C3.724,3.952 3.8475,4.2845 3.8475,4.7025 C3.8475,5.1205 3.724,5.4625 3.477,5.7285 C3.23,5.9945 2.9165,6.1275 2.5175,6.1275 C2.128,6.1275 1.8145,6.004 1.5675,5.757 C1.3205,5.51 1.197,5.168 1.197,4.7405 C1.197,4.3035 1.311,3.952 1.5485,3.705 C1.7765,3.4485 2.0995,3.325 2.5175,3.325 Z" id="形状"></path>\n                <path d="M8.816,0.133 L5.5005,4.408 L5.5005,5.4625 L8.778,5.4625 L8.778,6.916 L9.8325,6.916 L9.8325,5.4625 L10.8395,5.4625 L10.8395,4.579 L9.8325,4.579 L9.8325,0.133 L8.816,0.133 Z M8.7495,1.539 L8.778,1.539 L8.778,4.579 L6.403,4.579 L8.7495,1.539 Z" id="形状"></path>\n                <path d="M18.2115,3.2015 C17.6795,3.2015 17.2615,3.382 16.9765,3.762 C16.7105,4.085 16.587,4.522 16.587,5.0635 C16.587,5.5955 16.7105,6.023 16.9765,6.365 C17.2615,6.726 17.6795,6.916 18.2115,6.916 C18.7435,6.916 19.152,6.726 19.437,6.365 C19.684,6.0325 19.817,5.5955 19.817,5.0635 C19.817,4.522 19.684,4.085 19.437,3.762 C19.152,3.382 18.7435,3.2015 18.2115,3.2015 Z M17.2425,0 L13.433,7.049 L14.2595,7.049 L18.069,0 L17.2425,0 Z M13.3095,0.133 C12.7775,0.133 12.3595,0.3135 12.0745,0.6935 C11.8085,1.0165 11.685,1.4535 11.685,1.995 C11.685,2.527 11.8085,2.9545 12.0745,3.2965 C12.3595,3.6575 12.7775,3.8475 13.3095,3.8475 C13.8415,3.8475 14.25,3.6575 14.535,3.2965 C14.782,2.964 14.915,2.527 14.915,1.995 C14.915,1.4535 14.782,1.0165 14.535,0.6935 C14.25,0.3135 13.8415,0.133 13.3095,0.133 Z M18.2115,3.895 C18.4395,3.895 18.601,4.0185 18.696,4.275 C18.772,4.465 18.81,4.7215 18.81,5.0635 C18.81,5.3865 18.772,5.643 18.7055,5.833 C18.601,6.0895 18.4395,6.2225 18.2115,6.2225 C17.974,6.2225 17.803,6.099 17.708,5.852 C17.632,5.662 17.594,5.396 17.594,5.0635 C17.594,4.7215 17.632,4.4555 17.708,4.2655 C17.803,4.0185 17.974,3.895 18.2115,3.895 Z M13.3095,0.8265 C13.5375,0.8265 13.699,0.95 13.794,1.2065 C13.87,1.3965 13.908,1.653 13.908,1.995 C13.908,2.318 13.87,2.5745 13.8035,2.7645 C13.699,3.021 13.5375,3.154 13.3095,3.154 C13.072,3.154 12.901,3.0305 12.806,2.7835 C12.73,2.5935 12.692,2.3275 12.692,1.995 C12.692,1.653 12.73,1.387 12.806,1.197 C12.901,0.95 13.072,0.8265 13.3095,0.8265 Z" id="形状"></path>\n            </g>\n        </g>\n    </g>\n</svg>'
  },
  {
    type: "SCATTER",
    caption: "散点图",
    icon: '<svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>散点图</title>\n    <g id="散点图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="编组-4" transform="translate(6.000000, 7.000000)">\n            <circle id="椭圆形" fill="#6698FF" cx="21.5" cy="2.5" r="2.5"></circle>\n            <circle id="椭圆形备份" fill="#73D897" cx="15.5" cy="6.5" r="2.5"></circle>\n            <circle id="椭圆形备份-2" fill="#6698FF" cx="7.5" cy="7.5" r="2.5"></circle>\n            <circle id="椭圆形备份-3" fill="#73D897" cx="8.5" cy="15.5" r="2.5"></circle>\n            <circle id="椭圆形备份-4" fill="#6698FF" cx="17.5" cy="14.5" r="2.5"></circle>\n            <circle id="椭圆形备份-5" fill="#6698FF" cx="2.5" cy="19.5" r="2.5"></circle>\n        </g>\n    </g>\n</svg>'
  }
];
var X = /* @__PURE__ */ ((o) => (o.FILTERMODE = "extend.filterMode", o.PQLVALUE = "extend.pqlValue", o.AGGMODE = "extend.aggmode", o.PERIOD = "extend.period", o.SORT = "extend.sort", o.AXIS = "extend.axis", o.CORDON = "extend.cordon", o))(X || {});
function je(o) {
  switch (o) {
    case "NUMBER":
      return {
        chartConfig: Ct,
        chartDefaultValue: It
      };
    case "GAUGE":
      return {
        chartConfig: wt,
        chartModel: Tt,
        chartDefaultValue: Et
      };
    case "MULTI_SERIES_COL":
      return {
        chartConfig: St,
        chartModel: Dt,
        chartDefaultValue: xt
      };
    case "STACK_COL":
      return {
        chartConfig: Mt,
        chartModel: Ot,
        chartDefaultValue: At
      };
    case "ZONE_COL":
      return {
        chartConfig: Ft,
        chartModel: Rt,
        chartDefaultValue: Lt
      };
    case "MULTI_SERIES_BAR":
      return {
        chartConfig: Bt,
        chartModel: Nt,
        chartDefaultValue: Pt
      };
    case "STACK_BAR":
      return {
        chartConfig: $t,
        chartModel: zt,
        chartDefaultValue: kt
      };
    case "MULTI_SERIES_LINE":
      return {
        chartConfig: Vt,
        chartModel: Gt,
        chartDefaultValue: Ut
      };
    case "ZONE_LINE":
      return {
        chartConfig: Ht,
        chartModel: jt,
        chartDefaultValue: _t
      };
    case "AREA":
      return {
        chartConfig: Xt,
        chartModel: qt,
        chartDefaultValue: Jt
      };
    case "GRID":
      return {
        chartConfig: Wt,
        chartModel: Yt,
        chartDefaultValue: Kt
      };
    case "CROSSTABLE":
      return {
        chartConfig: Zt,
        chartModel: Qt,
        chartDefaultValue: ei
      };
    case "PIE":
      return {
        chartConfig: ti,
        chartModel: ii,
        chartDefaultValue: ai
      };
    case "RADAR":
      return {
        chartConfig: ri,
        chartModel: oi,
        chartDefaultValue: si
      };
    case "SCATTER":
      return {
        chartConfig: ni,
        chartModel: di,
        chartDefaultValue: li
      };
    default:
      throw new ne("传入类型".concat(o, "未识别"));
  }
}
const sa = /* @__PURE__ */ V({
  name: "BIChartTypes",
  props: {
    chartType: {
      type: String,
      default: "NUMBER"
    }
  },
  emits: ["select"],
  setup(o, {
    emit: t
  }) {
    const e = U("chart-types"), i = F([]), a = F("");
    return W(() => o.chartType, (n) => {
      a.value = n;
    }, {
      immediate: !0
    }), _e(() => {
      i.value = oa;
    }), {
      ns: e,
      items: i,
      select: a,
      onSelect: (n) => {
        t("select", n);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [this.items.map((o) => r(S("el-tooltip"), {
      effect: "dark",
      content: o.caption,
      placement: "top",
      "show-after": 200,
      "hide-after": 0,
      "popper-class": this.ns.e("tooltip"),
      "show-arrow": !0
    }, {
      default: () => r("div", {
        class: [this.ns.e("item"), this.ns.is("selected", this.select === o.type)],
        onClick: () => this.onSelect(o),
        innerHTML: o.icon
      }, null)
    }))]);
  }
}), ra = /* @__PURE__ */ V({
  name: "BICollapseItem",
  props: {
    label: {
      type: String,
      required: !0
    },
    enableShowEmptyData: {
      type: Boolean,
      required: !1,
      default: !0
    },
    enableRemove: {
      type: Boolean,
      required: !1,
      default: !0
    },
    enableEditMode: {
      type: Boolean,
      required: !1,
      default: !0
    },
    enableSwitch: {
      type: Boolean,
      required: !1,
      default: !0
    },
    switchValue: {
      type: Boolean,
      required: !1,
      default: !0
    },
    name: {
      type: [String, Number],
      required: !0
    },
    required: {
      type: Boolean,
      default: !1
    },
    editMode: {
      type: String
    }
  },
  emits: ["switchChange", "svgClick"],
  setup(o, {
    emit: t
  }) {
    const e = U("collapse-item"), i = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "apm1.Base基础/1.icon图标/2.normal/more-vertical",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M8 4.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z",
      id: "apm形状结合"
    }, null)])]), a = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "akn1.Base基础/1.icon图标/2.normal/filter备份",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M1.6 2h12.8a.6.6 0 0 1 0 1.2H1.6a.6.6 0 1 1 0-1.2zm2.5 5.393h7.8a.6.6 0 0 1 0 1.2H4.1a.6.6 0 1 1 0-1.2zm2.5 5.416h2.8a.6.6 0 0 1 0 1.2H6.6a.6.6 0 1 1 0-1.2z",
      id: "akn形状结合"
    }, null)])]), s = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "aweaction/sweep",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M11.6 14.8h2.7v-4.7H1.7v4.7h2.7v-2.9h1.2v2.9h1.8v-3.9h1.2v3.9h1.8v-2.9h1.2v2.9zm2.7-5.9V6.2h-5v-5H6.7v5h-5v2.7h12.6zM5.5 5V1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4h4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z",
      id: "awe形状结合"
    }, null)])]), n = F(!1);
    return {
      ns: e,
      visible: n,
      showEmptyDataSvg: i,
      editModeSvg: a,
      removeSvg: s,
      checkSvg: () => r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        preserveAspectRatio: "xMidYMid meet",
        focusable: "false"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z"
      }, null)])]),
      ClickSvg: (u, c, C) => {
        t("svgClick", {
          event: u,
          mode: c,
          value: C
        });
      },
      switchChange: () => {
        t("switchChange", !o.switchValue);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r(S("el-collapse-item"), {
      name: this.name,
      class: this.ns.e("item-content")
    }, {
      default: () => {
        var o, t;
        return (t = (o = this.$slots).default) == null ? void 0 : t.call(o);
      },
      title: () => r("div", {
        class: this.ns.e("item")
      }, [r("div", {
        class: [this.ns.e("item-title"), this.ns.is("required", this.required)]
      }, [this.label]), r("div", {
        class: this.ns.e("item-wrapper")
      }, [this.enableShowEmptyData ? r("div", {
        class: [this.ns.e("item-showEmptyData"), this.ns.e("item-div")],
        onClick: (o) => {
          o.stopPropagation(), this.ClickSvg(o, "showEmptyData");
        }
      }, [this.showEmptyDataSvg()]) : null, this.enableEditMode ? r(S("el-tooltip"), {
        effect: "dark",
        content: "切换编辑模式",
        placement: "top",
        "popper-class": this.ns.e("tooltip")
      }, {
        default: () => [r("div", {
          class: [this.ns.e("item-editMode"), this.ns.e("item-div")],
          onClick: (o) => {
            o.stopPropagation(), this.visible = !0;
          }
        }, [r(S("el-popover"), {
          visible: this.visible,
          "onUpdate:visible": (o) => this.visible = o,
          placement: "bottom-start",
          "popper-class": this.ns.b("editMode-popover"),
          "show-arrow": !1,
          width: 240,
          trigger: "click"
        }, {
          reference: () => this.editModeSvg(),
          default: () => r("div", {
            class: this.ns.b("editMode-popover-content")
          }, [r("div", {
            class: this.ns.b("editMode-popover-item"),
            onClick: (o) => {
              o.stopPropagation(), this.visible = !1, this.ClickSvg(o, "editMode", "default");
            }
          }, [r("div", {
            class: this.ns.be("editMode-popover-item", "text")
          }, [R("基本")]), this.editMode !== "pql" && this.checkSvg()]), r("div", {
            class: this.ns.b("editMode-popover-item"),
            onClick: (o) => {
              o.stopPropagation(), this.visible = !1, this.ClickSvg(o, "editMode", "pql");
            }
          }, [r("div", {
            class: this.ns.be("editMode-popover-item", "text")
          }, [R("PQL")]), this.editMode === "pql" && this.checkSvg()])])
        })])]
      }) : null, this.enableRemove ? r(S("el-tooltip"), {
        effect: "dark",
        content: "清空",
        placement: "top",
        "popper-class": this.ns.e("tooltip")
      }, {
        default: () => [r("div", {
          class: [this.ns.e("item-remove"), this.ns.e("item-div")],
          onClick: (o) => {
            o.stopPropagation(), this.ClickSvg(o, "remove");
          }
        }, [this.removeSvg()])]
      }) : null, this.enableSwitch ? r("div", {
        class: [this.ns.e("item-switch")]
      }, [r(S("el-switch"), {
        "model-value": this.switchValue,
        onChange: this.switchChange,
        onClick: (o) => {
          o.stopPropagation();
        }
      }, null)]) : null])])
    })]);
  }
});
function na(o) {
  if (o instanceof Array)
    o && o.length > 0 && o.splice(0, o.length);
  else if (o instanceof Object && o)
    for (const t in o)
      Object.prototype.hasOwnProperty.call(o, t) && delete o[t];
}
class la {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.maxListeners = 100;
  }
  /**
   * 设置单个事件最大监听数量
   *
   * @param {number} num
   * @memberof QXEventEmitter
   */
  setMaxListeners(t) {
    this.maxListeners = t;
  }
  /**
   * 获取指定事件当前监听个数
   *
   * @author chitanda
   * @date 2022-10-26 19:10:54
   * @param {string} name
   * @return {*}  {number}
   */
  getSize(t) {
    return this.map.has(t) ? this.map.get(t).length : 0;
  }
  /**
   * 订阅事件
   *
   * @author chitanda
   * @date 2022-08-21 18:08:36
   * @param {string} name
   * @param {(...args: AsArray<any>) => unknown} fn
   */
  addListener(t, e) {
    if (e instanceof Function) {
      this.map.has(t) || this.map.set(t, []);
      const i = this.map.get(t);
      if (i.length < this.maxListeners)
        i.push(e);
      else
        throw new Error("事件监听已达最大上限[".concat(this.maxListeners, "]，无法新增监听!"));
    }
  }
  /**
   * 取消订阅
   *
   * @author chitanda
   * @date 2022-08-21 18:08:30
   * @param {string} name
   * @param {(...args: AsArray<any>) => unknown} fn
   */
  removeListener(t, e) {
    if (this.map.has(t)) {
      const i = this.map.get(t);
      if (i.length > 0) {
        for (let a = 0; a < i.length; a++)
          if (i[a] === e) {
            i.splice(a, 1);
            break;
          }
      }
    }
  }
  /**
   * 发送事件
   *
   * @author chitanda
   * @date 2022-08-21 18:08:00
   * @param {string} name
   * @param {...AsArray<any>} args
   */
  emit(t, ...e) {
    this.map.has(t) && this.map.get(t).forEach((a) => {
      a(...e);
    });
  }
  /**
   * 等待所有事件执行完毕
   *
   * @author chitanda
   * @date 2022-08-21 18:08:44
   * @template R
   * @param {string} name
   * @param {...AsArray<any>} args
   * @return {*}  {Promise<R[]>}
   */
  async asyncEmit(t, ...e) {
    if (this.map.has(t)) {
      const a = this.map.get(t).map((s) => s(...e));
      return Promise.all(a);
    }
    return [];
  }
  /**
   * 释放所有事件监听
   *
   * @author chitanda
   * @date 2022-08-30 17:08:04
   */
  reset() {
    this.map.forEach((t) => {
      na(t);
    }), this.map.clear();
  }
}
class da {
  /**
   * Creates an instance of QXEvent.
   * @param {number} [maxListeners] 最大单个事件监听个数
   * @memberof QXEvent
   */
  constructor(t) {
    this.e = new la(), this.e.setMaxListeners(t || 300);
  }
  /**
   * 获取指定事件当前监听个数
   *
   * @author chitanda
   * @date 2022-10-26 19:10:39
   * @template K
   * @param {K} name
   * @return {*}  {number}
   */
  getSize(t) {
    return this.e.getSize(t);
  }
  /**
   * 订阅事件
   *
   * @author chitanda
   * @date 2022-08-21 18:08:31
   * @template K
   * @param {K} name
   * @param {(...args: Parameters<T[K]>) => ReturnType<T[K]>} cb
   */
  on(t, e) {
    this.e.addListener(t, e);
  }
  /**
   * 取消订阅事件
   *
   * @author chitanda
   * @date 2022-08-21 18:08:46
   * @template K
   * @param {K} name
   * @param {(...args: Parameters<T[K]>) => ReturnType<T[K]>} cb
   */
  off(t, e) {
    this.e.removeListener(t, e);
  }
  /**
   * 发送事件
   *
   * @template K
   * @param {K} name
   * @param {T[K]} [arg]
   * @memberof QXEvent
   */
  emit(t, ...e) {
    this.e.emit(t, ...e);
  }
  /**
   * 发送事件，并等待所有监听器执行完毕
   *
   * @author chitanda
   * @date 2022-08-21 18:08:30
   * @template K
   * @param {K} name
   * @param {...Parameters<T[K]>} args
   * @return {*}  {(Promise<Awaited<ReturnType<T[K]>>[]>)}
   */
  asyncEmit(t, ...e) {
    return this.e.asyncEmit(t, ...e);
  }
  /**
   * 释放所有事件监听
   *
   * @author chitanda
   * @date 2022-08-30 17:08:09
   */
  reset() {
    this.e.reset();
  }
}
const { toString: ca } = Object.prototype;
function pa(o) {
  return Ee(o) === "object";
}
function ua(o) {
  return Ee(o) === "array";
}
function ha(o) {
  return Ee(o) === "map";
}
function fa(o) {
  return Ee(o) === "set";
}
function ma(o) {
  return Ee(o) === "string";
}
const ga = {
  "[object Boolean]": "boolean",
  "[object Number]": "number",
  "[object String]": "string",
  "[object Function]": "function",
  "[object Array]": "array",
  "[object Date]": "date",
  "[object RegExp]": "regExp",
  "[object Undefined]": "undefined",
  "[object Null]": "null",
  "[object Object]": "object",
  "[object Set]": "set",
  "[object Map]": "map",
  "[object WeakMap]": "weakmap"
};
function Ee(o) {
  return ga[ca.call(o)];
}
function re() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function Te() {
  return "".concat(re() + re(), "-").concat(re(), "-").concat(re(), "-").concat(re(), "-").concat(re()).concat(re()).concat(re());
}
function ya(o) {
  return o == null;
}
function ba(o) {
  if (ua(o) || ma(o))
    return o.length === 0;
  if (pa(o)) {
    for (const t in o)
      if (Object.prototype.hasOwnProperty.call(o, t))
        return !1;
    return !0;
  }
  return ha(o) || fa(o) ? o.size === 0 : o == null;
}
function va(o) {
  return !!(ya(o) || ba(o));
}
function Ca(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const Ia = /* @__PURE__ */ V({
  name: "BIColorScheme",
  props: {
    colorList: {
      type: Array
    },
    editorStyle: {
      type: String,
      default: "ITEM"
    },
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: {
    change: (o) => !0
  },
  setup(o, {
    emit: t
  }) {
    const e = U("color-scheme"), i = [{
      text: "系统配色",
      value: "default"
    }, {
      text: "模板配色",
      value: "template"
    }], a = F(i[0].value);
    let s = [{
      text: "简约蓝",
      value: o.editorStyle === "ITEM" ? "#6698FF" : ["#6698FF", "#73DEB3", "#7585A2", "#F7BE21", "#EE734A", "#83D0EE"]
    }, {
      text: "秋日橙",
      value: o.editorStyle === "ITEM" ? "#EE734A" : ["#EE734A", "#7585A2", "#FEC103", "#9EB411", "#CD8050", "#DAD5B5"]
    }, {
      text: "马卡龙",
      value: o.editorStyle === "ITEM" ? "#467CE6" : ["#467CE6", "#CD74CA", "#4997CC", "#BCBFE3", "#666CEB", "#82BC9A"]
    }, {
      text: "薄荷绿",
      value: o.editorStyle === "ITEM" ? "#118299" : ["#118299", "#13B3B3", "#73DEB3", "#FEC103", "#9EB411", "#83D0EE"]
    }];
    o.colorList && o.colorList.length && (s = o.colorList), s = s.map((u) => ({
      ...u,
      key: Te()
    }));
    const n = F(s[0].key), l = F(s[0].value), p = () => {
      const u = a.value;
      u === "default" && t("change", {
        colorScheme: "default",
        color: s[0].value
      }), u === "template" && (n.value = s[0].key, l.value = s[0].value, t("change", {
        colorScheme: "template",
        color: l.value
      }));
    }, d = () => {
      const u = s.find((c) => c.key === n.value);
      u && (l.value = u.value, t("change", {
        colorScheme: a.value,
        color: l.value
      }));
    };
    return W(() => o.value, (u) => {
      if (!u) {
        n.value = s[0].key, l.value = s[0].value;
        return;
      }
      const {
        colorScheme: c,
        color: C
      } = u;
      if (a.value = c, c === "default") {
        n.value = s[0].key, l.value = s[0].value;
        return;
      }
      if (typeof C == "string") {
        const w = s.find((y) => y.value === C);
        w && (n.value = w.key, l.value = w.value);
      } else {
        const w = s.find((y) => JSON.stringify(y.value) === JSON.stringify(C));
        w && (n.value = w.key, l.value = w.value);
      }
    }, {
      immediate: !0
    }), {
      ns: e,
      schemes: i,
      currentScheme: a,
      templateColorList: s,
      currentColorKey: n,
      currentColor: l,
      handleSchemeChange: p,
      handleTemplateColorChange: d
    };
  },
  render() {
    let o;
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.b("content")
    }, [r(S("el-select"), {
      class: this.ns.b("picker"),
      "popper-class": this.ns.b("popper"),
      modelValue: this.currentScheme,
      "onUpdate:modelValue": (t) => this.currentScheme = t,
      onChange: this.handleSchemeChange
    }, Ca(o = this.schemes.map((t) => r(S("el-option"), {
      key: t.value,
      label: t.text,
      value: t.value
    }, null))) ? o : {
      default: () => [o]
    }), this.currentScheme === "template" && r(S("el-select"), {
      class: this.ns.b("template-color-picker"),
      "popper-class": this.ns.b("popper"),
      modelValue: this.currentColorKey,
      "onUpdate:modelValue": (t) => this.currentColorKey = t,
      onChange: this.handleTemplateColorChange
    }, {
      default: () => this.templateColorList.map((t) => r(S("el-option"), {
        key: t.key,
        label: t.text,
        value: t.key
      }, {
        default: () => [r("div", {
          class: this.ns.b("template-color-picker-option")
        }, [Array.isArray(t.value) ? t.value.map((e) => r("div", {
          class: this.ns.be("template-color-picker", "icon"),
          style: {
            background: e
          }
        }, null)) : r("div", {
          class: this.ns.be("template-color-picker", "icon"),
          style: {
            background: t.value
          }
        }, null), r("div", {
          class: this.ns.be("template-color-picker", "text")
        }, [t.text])])]
      })),
      prefix: () => Array.isArray(this.currentColor) ? this.currentColor.map((t) => r("div", {
        class: this.ns.be("template-color-picker", "icon"),
        style: {
          background: t
        }
      }, null)) : r("div", {
        class: this.ns.be("template-color-picker", "icon"),
        style: {
          background: this.currentColor
        }
      }, null)
    })])]);
  }
});
function st(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const ci = /* @__PURE__ */ V({
  name: "BIFontBorderSelect",
  props: {
    disabled: {
      type: Boolean
    },
    mode: {
      type: String,
      default: "FONT"
    },
    value: {
      type: Object,
      default: () => {
      }
    },
    fontMax: {
      type: Number,
      default: 48
    },
    fontMin: {
      type: Number,
      default: 12
    },
    borderMax: {
      type: Number,
      default: 10
    },
    borderMin: {
      type: Number,
      default: 1
    },
    useDotted: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(o, {
    emit: t
  }) {
    const e = U("font-border-select"), i = F(""), a = F(""), s = F(!1), n = F(12), l = F(!1);
    W(() => o.value, (P) => {
      if (!l.value && P) {
        const {
          fontWeight: H,
          fontStyle: j,
          fontSize: q,
          color: le,
          borderSize: de,
          borderStyle: ce
        } = P;
        o.mode === "FONT" ? (a.value = (j === "italic" ? j : H) || "", n.value = q, i.value = le) : (a.value = ce, n.value = de, i.value = le);
      }
    }, {
      immediate: !0,
      deep: !0
    });
    const p = () => a.value === "solid" ? "solid" : a.value === "dashed" ? "dashed" : a.value === "doubleDashed" ? "doubleDashed" : a.value === "dotted" ? "dotted" : "solid", d = () => {
      const P = n.value;
      let H = P;
      o.mode === "FONT" ? ((P >= o.fontMin || P <= o.fontMax) && (H = P), P < o.fontMin && (H = o.fontMin), P > o.fontMax && (H = o.fontMax)) : ((P >= o.borderMin || P <= o.borderMax) && (H = P), P < o.borderMin && (H = o.borderMin), P > o.borderMax && (H = o.borderMax)), t("change", {
        fontSize: H,
        fontWeight: a.value !== "italic" ? a.value : "normal",
        fontStyle: a.value === "italic" ? "italic" : "normal",
        borderSize: H,
        borderStyle: p(),
        color: i.value
      });
    }, u = [{
      value: "normal",
      label: "常规"
    }, {
      value: "bold",
      label: "加粗"
    }, {
      value: "italic",
      label: "斜体"
    }], c = [{
      value: "solid",
      label: "normalBorder"
    }, {
      value: "dashed",
      label: "dashed"
    }, {
      value: "doubleDashed",
      label: "doubleDashed"
    }, {
      value: "dotted",
      label: "dotted"
    }], C = () => r("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "3",
      style: "font-family: Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif; font-size: 12px;"
    }, [r("desc", null, [R("Line Type")]), r("defs", null, null), r("path", {
      fill: "none",
      d: "M 0 0 L 150 0",
      "stroke-width": "3",
      stroke: "#cacaca",
      "stroke-dasharray": "none"
    }, null)]), w = () => r("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "3",
      style: "font-family: Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif; font-size: 12px;"
    }, [r("desc", null, [R("Line Type")]), r("defs", null, null), r("path", {
      fill: "none",
      d: "M 0 0 L 150 0",
      "stroke-width": "3",
      stroke: "#cacaca",
      "stroke-dasharray": "8,6"
    }, null)]), y = () => r("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "3",
      style: "font-family: Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif; font-size: 12px;"
    }, [r("desc", null, [R("Line Type")]), r("defs", null, null), r("path", {
      fill: "none",
      d: "M 0 0 L 150 0",
      "stroke-width": "3",
      stroke: "#cacaca",
      "stroke-dasharray": "16,6"
    }, null)]), m = () => r("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "3",
      style: "font-family: Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif; font-size: 12px;"
    }, [r("desc", null, [R("Line Type")]), r("defs", null, null), r("path", {
      fill: "none",
      d: "M 0 0 L 150 0",
      "stroke-width": "3",
      stroke: "#cacaca",
      "stroke-dasharray": "2,6"
    }, null)]), g = k({
      get: () => "".concat(n.value.toString(), " px"),
      set: (P) => {
        const H = parseInt(P, 10);
        Number.isNaN(H) ? n.value = 0 : n.value = H, d();
      }
    }), b = (P) => {
      var q;
      l.value = !1;
      const H = (q = P.target) == null ? void 0 : q.value, j = parseInt(H, 10);
      o.mode === "FONT" ? ((j >= o.fontMin || j <= o.fontMax) && (n.value = j), j < o.fontMin && (n.value = o.fontMin), j > o.fontMax && (n.value = o.fontMax)) : ((j >= o.borderMin || j <= o.borderMax) && (n.value = j), j < o.borderMin && (n.value = o.borderMin), j > o.borderMax && (n.value = o.borderMax)), d();
    }, v = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "abdnavigation/angle-up",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.978 11.498l-.005.005L2.3 5.831 3.13 5l4.848 4.848L12.826 5l.83.831-5.673 5.672-.005-.005z",
      id: "abd形状结合",
      transform: "rotate(180 7.978 8.252)"
    }, null)])]), h = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "aaynavigation/angle-down",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z",
      id: "aay形状结合"
    }, null)])]), f = (P) => {
      P === "add" ? (n.value += 1, o.mode === "FONT" ? n.value > o.fontMax && (n.value = o.fontMax) : n.value > o.borderMax && (n.value = o.borderMax)) : P === "minus" && (n.value -= 1, o.mode === "FONT" ? n.value < o.fontMin && (n.value = o.fontMin) : n.value < o.borderMin && (n.value = o.borderMin)), d();
    }, T = F(["#000000", "#2C2C2C", "#50555C", "#ACB3BF", "#D0D3D9", "#C4C4C4", "#DADADA", "#E5E5E5", "#F0F0F0", "#F24E1E", "#E99C58", "#FFC700", "#FF4D00", "#FF00D6", "#D82E57", "#8E1DE8", "#0ACF83", "#18A0FB", "#A259FF", "#907CFF"]);
    return {
      ns: e,
      fontItem: u,
      borderItem: c,
      normalBorder: C,
      dashed: w,
      doubleDashed: y,
      dotted: m,
      selectValue: a,
      number: n,
      numberPx: g,
      addNumber: v,
      minusNumber: h,
      handleColNumberChange: b,
      changeNumber: f,
      currentColor: i,
      selectChange: () => {
        d();
      },
      colorChange: () => {
        d();
      },
      predefineColors: T,
      onDropDownClick: (P) => {
        a.value = P.value, d();
      },
      arrowSvg: () => r("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [r("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      }, null)]),
      dropDownVisible: (P) => {
        s.value = P;
      },
      isVisible: s,
      isFocus: l
    };
  },
  render() {
    let o;
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("bottom-content")
    }, [this.mode === "FONT" ? r(S("el-select"), {
      modelValue: this.selectValue,
      "onUpdate:modelValue": (t) => this.selectValue = t,
      size: "large",
      style: "width: 95px",
      onChange: this.selectChange,
      disabled: this.disabled,
      "popper-class": this.ns.e("select-popper")
    }, st(o = this.fontItem.map((t) => r(S("el-option"), {
      key: t.value,
      label: t.label,
      value: t.value
    }, null))) ? o : {
      default: () => [o]
    }) : r(S("el-dropdown"), {
      class: [this.ns.e("dropdown")],
      disabled: this.disabled,
      "popper-class": this.ns.e("dropdown-popper"),
      onVisibleChange: (t) => {
        this.dropDownVisible(t);
      }
    }, {
      default: () => r("div", {
        class: [this.ns.e("dropdown-input"), this.isVisible ? "visible" : ""]
      }, [this.selectValue === "" && r("div", {
        class: [this.ns.e("dropdown-input-content")]
      }, [R("请选择")]), this.selectValue === "solid" && r("div", {
        class: [this.ns.e("dropdown-input-content")]
      }, [this.normalBorder()]), this.selectValue === "dashed" && r("div", {
        class: [this.ns.e("dropdown-input-content")]
      }, [this.dashed()]), this.selectValue === "doubleDashed" && r("div", {
        class: [this.ns.e("dropdown-input-content")]
      }, [this.doubleDashed()]), this.selectValue === "dotted" && this.useDotted && r("div", {
        class: [this.ns.e("dropdown-input-content")]
      }, [this.dotted()]), this.arrowSvg()]),
      dropdown: () => {
        let t;
        return r(S("el-dropdown-menu"), null, st(t = this.borderItem.map((e) => r(S("el-dropdown-item"), {
          class: [this.ns.e("dropdown-item")],
          onClick: () => this.onDropDownClick(e)
        }, {
          default: () => {
            if (e.label === "normalBorder")
              return this.normalBorder();
            if (e.label === "dashed")
              return this.dashed();
            if (e.label === "doubleDashed")
              return this.doubleDashed();
            if (e.label === "dotted")
              return this.dotted();
          }
        }))) ? t : {
          default: () => [t]
        });
      }
    }), r(S("el-input"), {
      class: this.ns.e("input-number"),
      modelValue: this.numberPx,
      "onUpdate:modelValue": (t) => this.numberPx = t,
      size: "large",
      onBlur: this.handleColNumberChange,
      onFocus: () => {
        this.isFocus = !0;
      },
      disabled: this.disabled
    }, {
      suffix: () => r("div", {
        class: [this.ns.e("input-number-suffix")]
      }, [r("span", {
        class: [this.ns.e("input-number-suffix-add"), this.number === (this.mode === "FONT" ? this.fontMax : this.borderMax) ? "readonly" : ""],
        onClick: () => this.changeNumber("add")
      }, [this.addNumber()]), r("span", {
        class: [this.ns.e("input-number-suffix-minus"), this.number === (this.mode === "FONT" ? this.fontMin : this.borderMin) ? "readonly" : ""],
        onClick: () => this.changeNumber("minus")
      }, [this.minusNumber()])])
    }), r(S("el-color-picker"), {
      modelValue: this.currentColor,
      "onUpdate:modelValue": (t) => this.currentColor = t,
      disabled: this.disabled,
      size: "large",
      predefine: this.predefineColors,
      onChange: this.colorChange,
      "show-alpha": !0
    }, null)])]);
  }
}), rt = [
  {
    value: "left-top",
    caption: "左上",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="p1.Base基础/1.icon图标/2.normal/top-left" stroke-width="1" fill-rule="evenodd"><path d="M13.977235,4.25342758 C14.5301173,4.25342758 14.978317,4.70114283 14.978317,5.25342758 L14.978317,14.0037895 C14.978317,14.5560742 14.5301173,15.0037895 13.977235,15.0037895 L2.07107951,15.0037895 C1.51819714,15.0037895 1.06999742,14.5560742 1.06999742,14.0037895 L1.06999742,5.25342758 C1.06999742,4.70114283 1.51819714,4.25342758 2.07107951,4.25342758 L13.977235,4.25342758 Z M13.7770185,5.45342758 L2.27129593,5.45342758 L2.27129593,13.8037895 L13.7770185,13.8037895 L13.7770185,5.45342758 Z M10.9897465,7.1 L11.9369524,7.83675029 L10.0780935,10.2265995 L7.045,10.2263751 L5.43000734,11.8868171 L4.56999266,11.0499332 L6.53890733,9.02659948 L9.491,9.02637515 L10.9897465,7.1 Z M6.39170146,1.03175939 L6.39170146,2.23175939 L1.4,2.23175939 L1.4,1.03175939 L6.39170146,1.03175939 Z" id="p形状结合"></path></g></svg>'
  },
  {
    value: "top",
    caption: "正上",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="m1.Base基础/1.icon图标/2.normal/top--middle" stroke-width="1" fill-rule="evenodd"><path d="M13.977235,4.25342758 C14.5301173,4.25342758 14.978317,4.70114283 14.978317,5.25342758 L14.978317,14.0037895 C14.978317,14.5560742 14.5301173,15.0037895 13.977235,15.0037895 L2.07107951,15.0037895 C1.51819714,15.0037895 1.06999742,14.5560742 1.06999742,14.0037895 L1.06999742,5.25342758 C1.06999742,4.70114283 1.51819714,4.25342758 2.07107951,4.25342758 L13.977235,4.25342758 Z M13.7770185,5.45342758 L2.27129593,5.45342758 L2.27129593,13.8037895 L13.7770185,13.8037895 L13.7770185,5.45342758 Z M10.9897465,7.1 L11.9369524,7.83675029 L10.0780935,10.2265995 L7.045,10.2263751 L5.43000734,11.8868171 L4.56999266,11.0499332 L6.53890733,9.02659948 L9.491,9.02637515 L10.9897465,7.1 Z M10.3917015,1.03175939 L10.3917015,2.23175939 L5.4,2.23175939 L5.4,1.03175939 L10.3917015,1.03175939 Z" id="m形状结合"></path></g></svg>'
  },
  {
    value: "right-top",
    caption: "右上",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="s1.Base基础/1.icon图标/2.normal/top-right" stroke-width="1" fill-rule="evenodd"><path d="M13.977235,4.25342758 C14.5301173,4.25342758 14.978317,4.70114283 14.978317,5.25342758 L14.978317,14.0037895 C14.978317,14.5560742 14.5301173,15.0037895 13.977235,15.0037895 L2.07107951,15.0037895 C1.51819714,15.0037895 1.06999742,14.5560742 1.06999742,14.0037895 L1.06999742,5.25342758 C1.06999742,4.70114283 1.51819714,4.25342758 2.07107951,4.25342758 L13.977235,4.25342758 Z M13.7770185,5.45342758 L2.27129593,5.45342758 L2.27129593,13.8037895 L13.7770185,13.8037895 L13.7770185,5.45342758 Z M10.9897465,7.1 L11.9369524,7.83675029 L10.0780935,10.2265995 L7.045,10.2263751 L5.43000734,11.8868171 L4.56999266,11.0499332 L6.53890733,9.02659948 L9.491,9.02637515 L10.9897465,7.1 Z M15.0030547,1.03175939 L15.0030547,2.23175939 L10.0113532,2.23175939 L10.0113532,1.03175939 L15.0030547,1.03175939 Z" id="s形状结合"></path></g></svg>'
  },
  {
    value: "left-bottom",
    caption: "左下",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="n1.Base基础/1.icon图标/2.normal/down-left" stroke-width="1" fill-rule="evenodd"><path d="M13.9621493,1.03175939 C14.5150317,1.03175939 14.9632314,1.47947464 14.9632314,2.03175939 L14.9632314,10.7821213 C14.9632314,11.334406 14.5150317,11.7821213 13.9621493,11.7821213 L2.05599385,11.7821213 C1.50311148,11.7821213 1.05491176,11.334406 1.05491176,10.7821213 L1.05491176,2.03175939 C1.05491176,1.47947464 1.50311148,1.03175939 2.05599385,1.03175939 L13.9621493,1.03175939 Z M13.7619329,2.23175939 L2.25621027,2.23175939 L2.25621027,10.5821213 L13.7619329,10.5821213 L13.7619329,2.23175939 Z M10.9746608,3.87833181 L11.9218667,4.6150821 L10.0630078,7.00493129 L7.02991434,7.00470696 L5.41492168,8.66514894 L4.55490701,7.82826498 L6.52382168,5.80493129 L9.47591434,5.80470696 L10.9746608,3.87833181 Z M6,13.8037895 L6,15.0037895 L1,15.0037895 L1,13.8037895 L6,13.8037895 Z" id="n形状结合"></path></g></svg>'
  },
  {
    value: "bottom",
    caption: "正下",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="l1.Base基础/1.icon图标/2.normal/down-middle" stroke-width="1" fill-rule="evenodd"><path d="M13.9621493,1.03175939 C14.5150317,1.03175939 14.9632314,1.47947464 14.9632314,2.03175939 L14.9632314,10.7821213 C14.9632314,11.334406 14.5150317,11.7821213 13.9621493,11.7821213 L2.05599385,11.7821213 C1.50311148,11.7821213 1.05491176,11.334406 1.05491176,10.7821213 L1.05491176,2.03175939 C1.05491176,1.47947464 1.50311148,1.03175939 2.05599385,1.03175939 L13.9621493,1.03175939 Z M13.7619329,2.23175939 L2.25621027,2.23175939 L2.25621027,10.5821213 L13.7619329,10.5821213 L13.7619329,2.23175939 Z M10.9746608,3.87833181 L11.9218667,4.6150821 L10.0630078,7.00493129 L7.02991434,7.00470696 L5.41492168,8.66514894 L4.55490701,7.82826498 L6.52382168,5.80493129 L9.47591434,5.80470696 L10.9746608,3.87833181 Z M10.3619415,13.8037895 L10.3619415,15.0037895 L5.37024,15.0037895 L5.37024,13.8037895 L10.3619415,13.8037895 Z" id="l形状结合"></path></g></svg>'
  },
  {
    value: "right-bottom",
    caption: "右下",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="q1.Base基础/1.icon图标/2.normal/down-right" stroke-width="1" fill-rule="evenodd"><path d="M13.9621493,1.03175939 C14.5150317,1.03175939 14.9632314,1.47947464 14.9632314,2.03175939 L14.9632314,10.7821213 C14.9632314,11.334406 14.5150317,11.7821213 13.9621493,11.7821213 L2.05599385,11.7821213 C1.50311148,11.7821213 1.05491176,11.334406 1.05491176,10.7821213 L1.05491176,2.03175939 C1.05491176,1.47947464 1.50311148,1.03175939 2.05599385,1.03175939 L13.9621493,1.03175939 Z M13.7619329,2.23175939 L2.25621027,2.23175939 L2.25621027,10.5821213 L13.7619329,10.5821213 L13.7619329,2.23175939 Z M10.9746608,3.87833181 L11.9218667,4.6150821 L10.0630078,7.00493129 L7.02991434,7.00470696 L5.41492168,8.66514894 L4.55490701,7.82826498 L6.52382168,5.80493129 L9.47591434,5.80470696 L10.9746608,3.87833181 Z M15,13.8037895 L15,15.0037895 L10,15.0037895 L10,13.8037895 L15,13.8037895 Z" id="q形状结合"></path></g></svg>'
  },
  {
    value: "left",
    caption: "正左",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="o1.Base基础/1.icon图标/2.normal/left-Legend" stroke-width="1" fill-rule="evenodd"><path d="M12.9805336,1.0501437 C13.533416,1.0501437 13.9816157,1.49785895 13.9816157,2.0501437 L13.9816157,10.8005056 C13.9816157,11.3527904 13.533416,11.8005056 12.9805336,11.8005056 L1.07437816,11.8005056 C0.521495788,11.8005056 0.0732960683,11.3527904 0.0732960683,10.8005056 L0.0732960683,2.0501437 C0.0732960683,1.49785895 0.521495788,1.0501437 1.07437816,1.0501437 L12.9805336,1.0501437 Z M12.7803172,2.2501437 L1.27459458,2.2501437 L1.27459458,10.6005056 L12.7803172,10.6005056 L12.7803172,2.2501437 Z M8.52746497,2.89772989 L9.36434893,3.75774457 L8.06378941,5.08165217 L8.06401374,8.11474565 L5.95999535,9.74124007 L5.22324506,8.79403417 L6.86378941,7.52765217 L6.86401374,4.57555951 L8.52746497,2.89772989 Z M10.0183843,13.8221738 L10.0183843,15.0221738 L5.01838431,15.0221738 L5.01838431,13.8221738 L10.0183843,13.8221738 Z" id="o形状结合" transform="translate(7.027456, 8.036159) scale(-1, 1) rotate(-90.000000) translate(-7.027456, -8.036159)"></path></g></svg>'
  },
  {
    value: "right",
    caption: "正右",
    icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em"  focusable="false"><g id="r1.Base基础/1.icon图标/2.normal/right-Legend" stroke-width="1" fill-rule="evenodd"><path d="M14.9805336,1.0501437 C15.533416,1.0501437 15.9816157,1.49785895 15.9816157,2.0501437 L15.9816157,10.8005056 C15.9816157,11.3527904 15.533416,11.8005056 14.9805336,11.8005056 L3.07437816,11.8005056 C2.52149579,11.8005056 2.07329607,11.3527904 2.07329607,10.8005056 L2.07329607,2.0501437 C2.07329607,1.49785895 2.52149579,1.0501437 3.07437816,1.0501437 L14.9805336,1.0501437 Z M14.7803172,2.2501437 L3.27459458,2.2501437 L3.27459458,10.6005056 L14.7803172,10.6005056 L14.7803172,2.2501437 Z M8.06012902,2.89772989 L9.72358024,4.57555951 L9.72380457,7.52765217 L11.3643489,8.79403417 L10.6275986,9.74124007 L8.52358024,8.11474565 L8.52380457,5.08165217 L7.22324506,3.75774457 L8.06012902,2.89772989 Z M12.0183843,13.8221738 L12.0183843,15.0221738 L7.01838431,15.0221738 L7.01838431,13.8221738 L12.0183843,13.8221738 Z" id="r形状结合" transform="translate(9.027456, 8.036159) rotate(-90.000000) translate(-9.027456, -8.036159)"></path></g></svg>'
  }
], nt = [
  {
    value: "left",
    caption: "靠左",
    icon: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="aameditor/align-left" stroke-width="1" fill-rule="evenodd"><path d="M0 1h8v1.2H0V1zm0 6.4h16v1.2H0V7.4zm0 6.4h13V15H0v-1.2z" id="aam合并形状"></path></g></svg>'
  },
  {
    value: "center",
    caption: "居中",
    icon: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="aakeditor/align-center" stroke-width="1" fill-rule="evenodd"><path d="M3 1h10v1.2H3V1zM0 7.4h16v1.2H0V7.4zm1 6.4h14V15H1v-1.2z" id="aak合并形状"></path></g></svg>'
  },
  {
    value: "right",
    caption: "靠右",
    icon: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" focusable="false"><g id="aaoeditor/align-right" stroke-width="1" fill-rule="evenodd"><path d="M16 2.2H8V1h8v1.2zm0 6.4H0V7.4h16v1.2zm0 6.4H3v-1.2h13V15z" id="aao合并形状"></path></g></svg>'
  }
], wa = /* @__PURE__ */ V({
  name: "BIPositionSelect",
  props: {
    value: {
      type: String
    },
    editorStyle: {
      type: String,
      default: "CENTER"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    showCenter: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(o, {
    emit: t
  }) {
    const e = U("position-select"), i = F("");
    return W(() => o.value, () => {
      o.value ? i.value = o.value : o.editorStyle === "CENTER" ? i.value = nt[0].value : i.value = rt[0].value;
    }, {
      immediate: !0
    }), {
      ns: e,
      selected: i,
      onSelect: (s) => {
        o.disabled || t("change", s.value);
      }
    };
  },
  render() {
    let o = [];
    return this.editorStyle === "CENTER" ? o = nt : o = rt, r("div", {
      class: this.ns.b()
    }, [o.map((t) => (t.value === "left" || t.value === "right") && !this.showCenter ? null : r(S("el-tooltip"), {
      effect: "dark",
      content: t.caption,
      placement: "top",
      "show-after": 200,
      "hide-after": 0,
      "popper-class": this.ns.e("tooltip"),
      "show-arrow": !0
    }, {
      default: () => r("div", {
        class: [this.ns.e("item"), this.ns.is("selected", this.selected === t.value), this.ns.is("disabled", this.disabled)],
        onClick: () => this.onSelect(t),
        innerHTML: t.icon
      }, null)
    }))]);
  }
});
function J(o, t) {
  Object.prototype.toString.call(o) === "[object Array]" ? o.forEach((e) => {
    J(e, t);
  }) : Object.prototype.toString.call(o) === "[object Object]" && Object.keys(o).forEach((e) => {
    const i = o[e];
    typeof i == "object" ? (Array.isArray(i), J(o[e], t)) : typeof i == "string" && (o[e] = t(i));
  });
}
function Z(o, t) {
  const {
    appId: e,
    appDataEntityId: i,
    caption: a,
    catalog: s,
    value: n,
    seriesField: l,
    catalogCodeListId: p = "",
    seriesCodeListId: d = "",
    serieText: u,
    catname: c,
    jsonFormat: C
  } = t;
  return o.replaceAll("srfAppId", e).replaceAll("srfAppDataEntityId", i).replaceAll("srfCaption", a).replaceAll("srfCatalogField", s).replaceAll("srfValue", n).replaceAll("srfSeriesField", l).replaceAll("srfCatalogCodeListId", p).replaceAll("srfSeriesCodeListId", d).replaceAll("srfCatalogName", c).replaceAll("srfSerieText", u).replaceAll("srfJsonFormat", C);
}
function fe(o, t) {
  try {
    if (t.reportUIModel)
      return JSON.parse(t.reportUIModel)[o];
  } catch (e) {
    ibiz.message.error("解析报表UI模型错误");
  }
}
function pi(o, t = []) {
  const e = [], i = fe("extend", o);
  return t.length > 0 && t.forEach((a) => {
    const s = {
      name: a.measureTag
    };
    a.measureParams && (s.param = a.measureParams), i && i["aggmode@".concat(a.measureTag)] && (s.aggmode = i["aggmode@".concat(a.measureTag)]), e.push(s);
  }), e;
}
function ui(o, t = []) {
  const e = [], i = fe("extend", o);
  return t.length > 0 && t.forEach((a) => {
    const s = {
      name: a.dimensionTag
    };
    a.dimensionParams && (s.param = a.dimensionParams), i && i["period@".concat(a.dimensionTag)] && (s.period = i["period@".concat(a.dimensionTag)]), e.push(s);
  }), e;
}
function hi(o, t = [], e = []) {
  const i = [], a = fe("extend", o);
  return t.length > 0 && t.forEach((n) => {
    a && a["sort@".concat(n.measureTag)] && i.push(
      "".concat(n.measureTag, ",").concat(a["sort@".concat(n.measureTag)])
    );
  }), e.length > 0 && e.forEach((n) => {
    a && a["sort@".concat(n.dimensionTag)] && (n.textAppDEFieldId ? i.push(
      "".concat(n.dimensionTag, "_text,").concat(a["sort@".concat(n.dimensionTag)])
    ) : i.push(
      "".concat(n.dimensionTag, ",").concat(a["sort@".concat(n.dimensionTag)])
    ));
  }), i.join(";") || void 0;
}
function ie(o, t, e, i) {
  const { appDataEntityId: a, caption: s, dimension: n } = e, l = [];
  return o.forEach((p, d) => {
    const u = $(t), c = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: s,
      catalog: n.dimensionTag,
      catname: n.dimensionName,
      value: p.measureTag,
      serieText: p.measureName,
      seriesCodeListId: p.appCodeListId,
      catalogCodeListId: n.appCodeListId,
      jsonFormat: p.jsonFormat
    };
    Object.assign(u, {
      id: "".concat(u.seriesType, "_").concat(d)
    }), c.catalogCodeListId && Object.assign(u, {
      catalogCodeListId: "srfCatalogCodeListId"
    }), c.seriesCodeListId && Object.assign(u, {
      seriesCodeListId: "srfSeriesCodeListId"
    }), c.jsonFormat && Object.assign(u, {
      jsonFormat: "srfJsonFormat"
    }), J(u, (C) => Z(C, c)), i && i(u, d), l.push(u);
  }), l;
}
function oe(o, t) {
  const e = [];
  if (o.length) {
    const i = o[0].split(".").pop(), a = t.findIndex((s) => s.dimensionTag === i);
    if (a >= 0) {
      const s = t[a];
      e.push({
        measureTag: s.dimensionTag,
        measureName: s.dimensionName,
        appCodeListId: s.appCodeListId,
        appId: ibiz.env.appId
      });
    }
  }
  return e;
}
function se(o, t, e = !1, i = !1) {
  if (!o || !o.length)
    return {
      "EC.name": t.serieText,
      "EC.tooltip": JSON.stringify({
        formatter: "function(param){\n          const tempdata = param.data[2];\n          const chartData = JSON.parse(localStorage.getItem(tempdata._chartid));\n          const names = param.name.split('_');\n          const catalogData =  tempdata._catalogLevelData;\n\n          let value = ".concat(i, " ? param.value[0] : param.value[1];\n          if('").concat(t.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(value), '").concat(t.jsonFormat, "') || value;\n          }\n          // 计算维度项分层\n          let dimcatalogs = '';\n          catalogData.forEach((item) => {\n            let text = item.valueText || '未定义'\n            if(chartData && Object.keys(chartData).length > 0 && chartData[item.codename] && chartData[item.codename][item.value]){\n              text = chartData[item.codename][item.value];\n            }\n            const dimitem = '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\"><div>' + item.name + ':</div><div style=\"flex:0;margin-left:4px;\">' +text + '</div></div>'\n            dimcatalogs += dimitem;\n          })\n\n          return  '<div style=\"min-width: 150px\">'+ dimcatalogs +'<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\"><div style=\"flex:0\">'+ param.marker + param.seriesName +':</div><div style=\"flex:1;margin-left:4px;\">'+ value +'</div></div></div>'            \n        }")
      })
    };
  const a = o[0], s = {
    "EC.tooltip": JSON.stringify({
      formatter: "function(param){\n        const {data} = param;        \n        const chartData = JSON.parse(localStorage.getItem(data[2]._chartid));\n        const catalogData = data[2]._catalogLevelData;\n\n        let tempName = param.seriesName;\n        const field = Object.keys(data[2]).find(key => {\n          return key !== '_groupName' && data[2][key] === param.seriesName;\n        })\n        if(field && chartData && chartData[field]){\n          tempName = chartData[field][param.seriesName];\n        }\n        // 计算维度项分层\n        let dimcatalogs = '';\n        catalogData.forEach((item) => {\n          let text = item.valueText || '未定义'\n          if(chartData && Object.keys(chartData).length > 0 && chartData[item.codename] && chartData[item.codename][item.value]){\n            text = chartData[item.codename][item.value];\n          }\n          const dimitem = '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\"><div>' + item.name + ':</div><div style=\"flex:0;margin-left:4px;\">' +text + '</div></div>'\n          dimcatalogs += dimitem;\n        })\n\n        let value = ".concat(i, " ? param.value[0] : param.value[1];\n        if('").concat(t.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(value), '").concat(t.jsonFormat, "') || value;\n        }\n        return  '<div style=\"min-width: 200px\">' + dimcatalogs +          \n        '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\">'+\n          '<div>").concat(a.measureName, ":</div>'+\n          '<div style=\"flex:0\">'+ tempName +'</div>'+\n        '</div>' + \n        '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\">'+ \n            '<div>' + param.marker + '").concat(t.serieText, ":</div>'+\n            '<div style=\"flex:0\">' + value + '</div>'+\n          '</div>'+\n        '</div>'\n       }")
    })
  };
  return e && Object.assign(s, { "EC.stack": t.serieText }), s;
}
function Ta(o, t, e) {
  return {
    "EC.tooltip": JSON.stringify({
      formatter: "function(param){\n        let tempName = param.name;\n        const { data } = param;\n        const getOrigin = (origin) => {\n          if (origin && origin.$origin) {\n            return getOrigin(origin.$origin);\n          }\n          return origin;\n        };\n        const origin = getOrigin(data.value[1].$origin);\n        const chartData = JSON.parse(localStorage.getItem(data.value[1]._chartid));\n        if(origin){\n          const field = Object.keys(origin).find(key => {\n            return origin[key] === param.name;\n          })\n          if(field && chartData && chartData[field]){\n            tempName = chartData[field][param.name];\n          }\n        }else if(chartData){\n          const _tempname = Object.keys(chartData).find(_chart => {\n            return  chartData[_chart][param.name]\n          })\n          if(_tempname){\n            tempName = chartData[_tempname][param.name]\n          }\n        }\n        \n        let value = param.value[0];\n        if('".concat(o.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(value), '").concat(o.jsonFormat, "') || value;\n        }\n        return '<div style=\"min-width: 150px\">' + \n        '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\">'+\n          '<div style=\"flex:0\">").concat(e.dimensionName, ":</div>' + \n          '<div style=\"flex:1;margin-left:4px;\">'+tempName+'</div>' +\n         '</div>' + \n        '<div style=\"width:100%;display:flex;justifyContent: left;alignItems:center;\">'+\n          '<div style=\"flex:0;\">'+ param.marker + '").concat(t[0].measureName, ":</div>'+\n          '<div style=\"flex:1;margin-left:4px;\">' + value + '</div>' + \n        '</div>'+\n        '</div>'\n      }")
    })
  };
}
function Ea(o) {
  var a;
  if (!o)
    return null;
  let t = [];
  if (o.reportUIModel) {
    const s = JSON.parse(o.reportUIModel);
    s && s.group && Array.isArray(s.group) && (t = oe(
      s.group,
      o.appBIReportDimensions
    ));
  }
  let e = !1;
  return (a = o.appBIReportDimensions) == null ? void 0 : a.filter((s) => {
    if (t.length && !e) {
      const n = t[0].measureTag;
      return s.dimensionTag !== n ? !0 : (e = !0, !1);
    }
    return !0;
  }).map((s) => ({
    codename: s.dimensionTag,
    name: s.dimensionName,
    mode: s.appCodeListId ? "codelist" : "field",
    textAppDEFieldId: s.textAppDEFieldId,
    codelistId: s.appCodeListId
  }));
}
function Sa(o, t, e, i, a, s) {
  const n = {
    color: o.lineColor,
    width: o.lineSize,
    type: o.lineStyle
  };
  o.lineStyle === "dotted" ? Object.assign(n, {
    type: [1, 5],
    dashOffset: 5,
    cap: "round"
  }) : o.lineStyle === "doubleDashed" && Object.assign(n, {
    type: [5, 5],
    dashOffset: 5,
    cap: "round"
  });
  const l = {
    name: o.name,
    lineStyle: n,
    label: {
      textBorderWidth: 0,
      color: o.lineColor,
      fontWeight: 400,
      position: "insideEndTop",
      formatter(d) {
        return "".concat(d.name, " : ").concat(d.value);
      }
    }
  };
  let p = 0;
  if (o.cordonType === "FIXED")
    p = o.cordonSize;
  else if (o.cordonType === "MAX") {
    let d = -1 / 0;
    e.forEach((u) => {
      a.findIndex((C) => !u[C] && u[C] !== 0) < 0 && Number(u[t.valueField]) > d && (d = Number(u[t.valueField]));
    }), p = d;
  } else if (o.cordonType === "MIN") {
    let d = 1 / 0;
    e.forEach((u) => {
      a.findIndex((C) => !u[C] && u[C] !== 0) < 0 && Number(u[t.valueField]) < d && (d = Number(u[t.valueField]));
    }), p = d;
  } else if (o.cordonType === "AVERAGE") {
    let d = 0;
    e.forEach((u) => {
      a.findIndex((C) => !u[C] && u[C] !== 0) < 0 && !Number.isNaN(Number(u[t.valueField])) && (d += Number(u[t.valueField]));
    }), i && (p = d / i);
  }
  return s ? Object.assign(l, {
    xAxis: p
  }) : Object.assign(l, {
    yAxis: p
  }), l;
}
const et = [
  L.IS_NULL,
  L.IS_NOT_NULL,
  L.EXISTS,
  L.NOT_EXISTS
], fi = [
  { valueOP: L.EQ, label: "等于" },
  { valueOP: L.NOT_EQ, label: "不等于" },
  { valueOP: L.GT, label: "大于" },
  { valueOP: L.GT_AND_EQ, label: "大于等于" },
  { valueOP: L.LT, label: "小于" },
  { valueOP: L.LT_AND_EQ, label: "小于等于" },
  { valueOP: L.IS_NULL, label: "为空" },
  { valueOP: L.IS_NOT_NULL, label: "非空" },
  { valueOP: L.IN, label: "属于" },
  { valueOP: L.NOT_IN, label: "不属于" },
  { valueOP: L.LIKE, label: "文本包含" },
  { valueOP: L.LIFT_LIKE, label: "文本左包含" },
  { valueOP: L.RIGHT_LIKE, label: "文本右包含" },
  { valueOP: L.EXISTS, label: "存在" },
  { valueOP: L.NOT_EXISTS, label: "不存在" }
], Da = {
  string: [
    L.EQ,
    L.NOT_EQ,
    L.IS_NULL,
    L.IS_NOT_NULL,
    L.USER_LIKE,
    L.LIKE,
    L.LIFT_LIKE,
    L.RIGHT_LIKE
  ],
  number: [
    L.EQ,
    L.GT,
    L.GT_AND_EQ,
    L.LT,
    L.LT_AND_EQ,
    L.NOT_EQ,
    L.IS_NULL,
    L.IS_NOT_NULL,
    L.IN,
    L.NOT_IN
  ],
  date: [
    L.EQ,
    L.GT,
    L.GT_AND_EQ,
    L.LT,
    L.LT_AND_EQ,
    L.NOT_EQ,
    L.IS_NULL,
    L.IS_NOT_NULL,
    L.IN,
    L.NOT_IN
  ],
  dropdown: [
    L.EQ,
    L.NOT_EQ,
    L.IS_NULL,
    L.IS_NOT_NULL,
    L.IN,
    L.NOT_IN
  ],
  dataPicker: [
    L.EQ,
    L.NOT_EQ,
    L.IS_NULL,
    L.IS_NOT_NULL,
    L.IN,
    L.NOT_IN
  ]
}, Xe = {
  string: {
    appId: "",
    editorType: "TEXTBOX"
  },
  number: {
    appId: "",
    editorType: "NUMBER"
  },
  date: {
    appId: "",
    editorType: "DATEPICKEREX",
    dateTimeFormat: "YYYY-MM-DD"
  },
  daterange: {
    appId: "",
    editorType: "DATERANGE_SWITCHUNIT",
    dateTimeFormat: "YYYY-MM-DD",
    editorParams: {
      defaultUnit: "DAY",
      switchUnit: "false"
    }
  },
  dropdown: {
    appId: "",
    valueType: "SIMPLE",
    editorType: "MDROPDOWNLIST",
    appCodeListId: "",
    editorParams: {
      overflowMode: "ellipsis"
    }
  },
  dataPicker: {
    appId: "",
    editorType: "ADDRESSPICKUP",
    appDEDataSetId: "fetchdefault",
    objectIdField: "srfkey",
    objectNameField: "srfmajortext",
    valueType: "OBJECTS",
    editorParams: {
      overflowMode: "ellipsis"
    }
  }
};
function Je(o) {
  const t = { ...Xe[o.type] };
  return o.type === "dropdown" && Object.assign(t, {
    appCodeListId: o.appCodeListId
  }), o.type === "dataPicker" && Object.assign(t, {
    appDataEntityId: o.appDataEntityId
  }), t;
}
function mi(o) {
  let t;
  const e = fe("filter", o), i = fe("extend", o), a = [];
  if (i && i.pqlValue && a.push({
    nodeType: "CUSTOM",
    customType: "PQL",
    customCond: i.pqlValue
  }), e && e.length > 0) {
    const s = e.map((n) => n.condition).filter((n) => !va(n));
    s && s.length > 0 && (s.forEach((n) => {
      Array.isArray(n.value) && (n.value = n.value.map((l) => l.srfkey).join(","));
    }), a.push(...s));
  }
  return a.length > 0 && (t = ji([
    {
      nodeType: "GROUP",
      logicType: "AND",
      children: a
    }
  ])), t;
}
async function gi(o) {
  const t = await ibiz.hub.getAppDataEntity(o, ibiz.env.appId);
  let e = "/jsonschema/".concat(t.name);
  return t.dynaSysMode === 0 && ibiz.appData && (e += "?dynamodeltag=".concat(ibiz.appData.dynamodeltag)), (await ibiz.net.get(e)).data;
}
async function yi(o) {
  if (!o.properties)
    return [];
  const { properties: t } = o;
  if (!(Object.keys(t).length > 0))
    return [];
  const e = [];
  return Object.keys(t).forEach((i) => {
    var n;
    let a = "string";
    const s = t[i].type;
    switch (t[i].type) {
      case "string":
        t[i].format === "date-time" && (a = "date"), t[i].$ref && (a = "dataPicker"), t[i].enumSource && (a = "dropdown");
        break;
      case "integer":
      case "number":
        a = "number", t[i].enumSource && (a = "dropdown");
        break;
      default:
        t[i].$ref && (a = "dataPicker");
        break;
    }
    e.push({
      type: a,
      originalType: s,
      appDEFieldId: i,
      valueOPs: Da[a],
      caption: t[i].description,
      appDataEntityId: (n = t[i].$ref) == null ? void 0 : n.split(".")[0],
      appCodeListId: t[i].enumSource
    });
  }), e;
}
async function xa(o) {
  if (o.parampsdeuiactiontag) {
    const [t, e] = o.parampsdeuiactiontag.split("@"), i = await ibiz.hub.getAppDataEntity(e, ibiz.env.appId);
    return "".concat(t, "@").concat(i.codeName);
  }
}
async function he(o, t) {
  var e, i;
  if (o.psdefid) {
    const a = (e = o.psdefid.split(".").pop()) == null ? void 0 : e.toLowerCase(), s = o.pssysbicubeid.split(".").pop();
    let n = t.find((l) => l.appDEFieldId === a);
    if (!n) {
      const l = await ibiz.hub.getAppDataEntity(
        s,
        ibiz.env.appId
      ), p = (i = l == null ? void 0 : l.minorAppDERSs) == null ? void 0 : i.find(
        (d) => d.parentAppDEFieldId === a
      );
      if (p && p.majorAppDataEntityId) {
        const [, d] = p.majorAppDataEntityId.split(".");
        n = { ...t.find((c) => c.appDEFieldId === d), appDEFieldId: a };
      }
    }
    return n;
  }
}
var Oa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ma(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
function Aa(o) {
  throw new Error('Could not dynamically require "' + o + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bi = { exports: {} };
(function(o, t) {
  (function(e, i) {
    typeof Aa == "function" ? o.exports = i() : e.pluralize = i();
  })(Oa, function() {
    var e = [], i = [], a = {}, s = {}, n = {};
    function l(m) {
      return typeof m == "string" ? new RegExp("^" + m + "$", "i") : m;
    }
    function p(m, g) {
      return m === g ? g : m === m.toLowerCase() ? g.toLowerCase() : m === m.toUpperCase() ? g.toUpperCase() : m[0] === m[0].toUpperCase() ? g.charAt(0).toUpperCase() + g.substr(1).toLowerCase() : g.toLowerCase();
    }
    function d(m, g) {
      return m.replace(/\$(\d{1,2})/g, function(b, v) {
        return g[v] || "";
      });
    }
    function u(m, g) {
      return m.replace(g[0], function(b, v) {
        var h = d(g[1], arguments);
        return p(b === "" ? m[v - 1] : b, h);
      });
    }
    function c(m, g, b) {
      if (!m.length || a.hasOwnProperty(m))
        return g;
      for (var v = b.length; v--; ) {
        var h = b[v];
        if (h[0].test(g))
          return u(g, h);
      }
      return g;
    }
    function C(m, g, b) {
      return function(v) {
        var h = v.toLowerCase();
        return g.hasOwnProperty(h) ? p(v, h) : m.hasOwnProperty(h) ? p(v, m[h]) : c(h, v, b);
      };
    }
    function w(m, g, b, v) {
      return function(h) {
        var f = h.toLowerCase();
        return g.hasOwnProperty(f) ? !0 : m.hasOwnProperty(f) ? !1 : c(f, f, b) === f;
      };
    }
    function y(m, g, b) {
      var v = g === 1 ? y.singular(m) : y.plural(m);
      return (b ? g + " " : "") + v;
    }
    return y.plural = C(
      n,
      s,
      e
    ), y.isPlural = w(
      n,
      s,
      e
    ), y.singular = C(
      s,
      n,
      i
    ), y.isSingular = w(
      s,
      n,
      i
    ), y.addPluralRule = function(m, g) {
      e.push([l(m), g]);
    }, y.addSingularRule = function(m, g) {
      i.push([l(m), g]);
    }, y.addUncountableRule = function(m) {
      if (typeof m == "string") {
        a[m.toLowerCase()] = !0;
        return;
      }
      y.addPluralRule(m, "$0"), y.addSingularRule(m, "$0");
    }, y.addIrregularRule = function(m, g) {
      g = g.toLowerCase(), m = m.toLowerCase(), n[m] = g, s[g] = m;
    }, [
      // Pronouns.
      ["I", "we"],
      ["me", "us"],
      ["he", "they"],
      ["she", "they"],
      ["them", "them"],
      ["myself", "ourselves"],
      ["yourself", "yourselves"],
      ["itself", "themselves"],
      ["herself", "themselves"],
      ["himself", "themselves"],
      ["themself", "themselves"],
      ["is", "are"],
      ["was", "were"],
      ["has", "have"],
      ["this", "these"],
      ["that", "those"],
      // Words ending in with a consonant and `o`.
      ["echo", "echoes"],
      ["dingo", "dingoes"],
      ["volcano", "volcanoes"],
      ["tornado", "tornadoes"],
      ["torpedo", "torpedoes"],
      // Ends with `us`.
      ["genus", "genera"],
      ["viscus", "viscera"],
      // Ends with `ma`.
      ["stigma", "stigmata"],
      ["stoma", "stomata"],
      ["dogma", "dogmata"],
      ["lemma", "lemmata"],
      ["schema", "schemata"],
      ["anathema", "anathemata"],
      // Other irregular rules.
      ["ox", "oxen"],
      ["axe", "axes"],
      ["die", "dice"],
      ["yes", "yeses"],
      ["foot", "feet"],
      ["eave", "eaves"],
      ["goose", "geese"],
      ["tooth", "teeth"],
      ["quiz", "quizzes"],
      ["human", "humans"],
      ["proof", "proofs"],
      ["carve", "carves"],
      ["valve", "valves"],
      ["looey", "looies"],
      ["thief", "thieves"],
      ["groove", "grooves"],
      ["pickaxe", "pickaxes"],
      ["passerby", "passersby"]
    ].forEach(function(m) {
      return y.addIrregularRule(m[0], m[1]);
    }), [
      [/s?$/i, "s"],
      [/[^\u0000-\u007F]$/i, "$0"],
      [/([^aeiou]ese)$/i, "$1"],
      [/(ax|test)is$/i, "$1es"],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
      [/(e[mn]u)s?$/i, "$1s"],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
      [/(seraph|cherub)(?:im)?$/i, "$1im"],
      [/(her|at|gr)o$/i, "$1oes"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
      [/sis$/i, "ses"],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
      [/([^aeiouy]|qu)y$/i, "$1ies"],
      [/([^ch][ieo][ln])ey$/i, "$1ies"],
      [/(x|ch|ss|sh|zz)$/i, "$1es"],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
      [/(pe)(?:rson|ople)$/i, "$1ople"],
      [/(child)(?:ren)?$/i, "$1ren"],
      [/eaux$/i, "$0"],
      [/m[ae]n$/i, "men"],
      ["thou", "you"]
    ].forEach(function(m) {
      return y.addPluralRule(m[0], m[1]);
    }), [
      [/s$/i, ""],
      [/(ss)$/i, "$1"],
      [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
      [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
      [/ies$/i, "y"],
      [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
      [/\b(mon|smil)ies$/i, "$1ey"],
      [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
      [/(seraph|cherub)im$/i, "$1"],
      [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
      [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
      [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
      [/(test)(?:is|es)$/i, "$1is"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
      [/(alumn|alg|vertebr)ae$/i, "$1a"],
      [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
      [/(matr|append)ices$/i, "$1ix"],
      [/(pe)(rson|ople)$/i, "$1rson"],
      [/(child)ren$/i, "$1"],
      [/(eau)x?$/i, "$1"],
      [/men$/i, "man"]
    ].forEach(function(m) {
      return y.addSingularRule(m[0], m[1]);
    }), [
      // Singular words with no plurals.
      "adulthood",
      "advice",
      "agenda",
      "aid",
      "aircraft",
      "alcohol",
      "ammo",
      "analytics",
      "anime",
      "athletics",
      "audio",
      "bison",
      "blood",
      "bream",
      "buffalo",
      "butter",
      "carp",
      "cash",
      "chassis",
      "chess",
      "clothing",
      "cod",
      "commerce",
      "cooperation",
      "corps",
      "debris",
      "diabetes",
      "digestion",
      "elk",
      "energy",
      "equipment",
      "excretion",
      "expertise",
      "firmware",
      "flounder",
      "fun",
      "gallows",
      "garbage",
      "graffiti",
      "hardware",
      "headquarters",
      "health",
      "herpes",
      "highjinks",
      "homework",
      "housework",
      "information",
      "jeans",
      "justice",
      "kudos",
      "labour",
      "literature",
      "machinery",
      "mackerel",
      "mail",
      "media",
      "mews",
      "moose",
      "music",
      "mud",
      "manga",
      "news",
      "only",
      "personnel",
      "pike",
      "plankton",
      "pliers",
      "police",
      "pollution",
      "premises",
      "rain",
      "research",
      "rice",
      "salmon",
      "scissors",
      "series",
      "sewage",
      "shambles",
      "shrimp",
      "software",
      "species",
      "staff",
      "swine",
      "tennis",
      "traffic",
      "transportation",
      "trout",
      "tuna",
      "wealth",
      "welfare",
      "whiting",
      "wildebeest",
      "wildlife",
      "you",
      /pok[eé]mon$/i,
      // Regexes.
      /[^aeiou]ese$/i,
      // "chinese", "japanese"
      /deer$/i,
      // "deer", "reindeer"
      /fish$/i,
      // "fish", "blowfish", "angelfish"
      /measles$/i,
      /o[iu]s$/i,
      // "carnivorous"
      /pox$/i,
      // "chickpox", "smallpox"
      /sheep$/i
    ].forEach(y.addUncountableRule), y;
  });
})(bi);
var Fa = bi.exports;
const vi = /* @__PURE__ */ Ma(Fa);
vi.addPluralRule(/(matr|vert|ind)ix|ex$/, "$1ices");
function La(o) {
  return vi(o);
}
const Ci = [
  { valueOP: L.EQ, label: "等于", sqlOP: "=" },
  { valueOP: L.NOT_EQ, label: "不等于", sqlOP: "<>" },
  { valueOP: L.GT, label: "大于", sqlOP: ">" },
  { valueOP: L.GT_AND_EQ, label: "大于等于", sqlOP: ">=" },
  { valueOP: L.LT, label: "小于", sqlOP: "<" },
  { valueOP: L.LT_AND_EQ, label: "小于等于", sqlOP: "<=" },
  { valueOP: L.IS_NULL, label: "为空", sqlOP: "IS NULL" },
  { valueOP: L.IS_NOT_NULL, label: "非空", sqlOP: "IS NOT NULL" },
  { valueOP: L.IN, label: "属于", sqlOP: "IN" },
  { valueOP: L.NOT_IN, label: "不属于", sqlOP: "NOT IN" },
  { valueOP: L.LIKE, label: "文本包含", sqlOP: "LIKE" }
  // { valueOP: ValueOP.EXISTS, label: '存在', sqlOP: 'EXISTS' },
  // { valueOP: ValueOP.NOT_EXISTS, label: '不存在', sqlOP: 'NOT EXISTS' },
], We = /* @__PURE__ */ new Map();
Ci.forEach((o) => {
  We.set(o.valueOP, o);
});
const ue = /* @__PURE__ */ new Map();
Ci.forEach((o) => {
  ue.set(o.sqlOP, o.valueOP);
});
const lt = (o) => {
  var t, e;
  try {
    const i = o.split("  "), a = [];
    for (let s = 0; s < i.length; s++) {
      if (s !== 0) {
        const p = i[s];
        if (p === "and" || p === "or") {
          if (s === i.length - 1)
            throw new ne("pql自定义条件解析错误");
          a.push({
            type: "connection",
            value: {
              label: p,
              value: p
            }
          });
        } else
          throw new ne("pql自定义条件解析错误");
      }
      const n = i[s !== 0 ? ++s : s], l = i[++s];
      if (n && /^\$/.test(n) && l) {
        const p = JSON.parse(n.slice(1));
        if (et.includes(ue.get(l))) {
          a.push({
            type: "condition",
            key: {
              label: p.caption,
              value: p.name
            },
            operator: {
              label: ((t = We.get(ue.get(l))) == null ? void 0 : t.label) || "",
              value: ue.get(l)
            }
          });
          continue;
        } else {
          const d = i[++s];
          if (d) {
            const u = /^\$/.test(d) ? JSON.parse(d.slice(1)) : { caption: d, value: d };
            a.push({
              type: "condition",
              key: {
                label: p.caption,
                value: p.name
              },
              operator: {
                label: ((e = We.get(ue.get(l))) == null ? void 0 : e.label) || "",
                value: ue.get(l)
              },
              value: {
                type: /^\$/.test(d) ? "pql-field-value" : void 0,
                label: u.caption,
                value: u.value
              }
            });
            continue;
          }
        }
      }
      throw new ne("pql自定义条件解析错误");
    }
    return a;
  } catch (i) {
    ibiz.log.error(i == null ? void 0 : i.message);
  }
};
function Ce(o) {
  return o === 5 || o === 27;
}
function Ra(o, t) {
  return o && o === "DAY" && t && /^\d{8}$/.test(t) ? "".concat(t.substring(0, 4), "年").concat(t.substring(
    4,
    6
  ), "月").concat(t.substring(6), "日") : o && o === "WEEK" && t && /^\d{4}W\d{1,2}$/.test(t) ? "".concat(t.substring(0, 4), "年").concat(t.substring(5), "周") : o && o === "MONTH" && t && /^\d{4}\d{2}$/.test(t) ? "".concat(t.substring(0, 4), "年").concat(t.substring(4), "月") : o && o === "QUARTER" && t && /^\d{4}Q\d{1}$/.test(t) ? "".concat(t.substring(0, 4), "年").concat(t.substring(5), "季度") : o && o === "YEAR" && t && /^\d{4}$/.test(t) ? "".concat(t.substring(0, 4), "年") : t;
}
const Na = [
  {
    unit: "DAY",
    tag: "TIMESTAMP"
  },
  {
    unit: "WEEK",
    tag: "STARTOFWEEK"
  },
  {
    unit: "MONTH",
    tag: "STARTOFMONTH"
  },
  {
    unit: "QUARTER",
    tag: "STARTOFQUARTER"
  },
  {
    unit: "YEAR",
    tag: "STARTOFYEAR"
  }
];
class Ba {
  /**
   * 处理时间转字符串 (name >= TIMESTAMP(starttime)) AND (name  <= TIMESTAMP(endtime))
   * starttime: YYYY-MM-DD  00:00:00
   * endtime: YYYY-MM-DD  23:59:59
   *
   * @param {IData} config
   * @return {*}  {string}
   * @memberof DateUtil
   */
  handleDateToString(t, e) {
    const { unit: i, type: a, start: s, end: n } = t, l = this.computedDynamicTimeToDate(i, a, s, n), p = this.completeTimeFormat(String(l[0]), "START"), d = this.completeTimeFormat(String(l[1]), "END");
    return i === "WEEK" ? "(".concat(e, " >= STARTOFWEEK('").concat(p, "')) AND (").concat(e, "  <= STARTOFWEEK('").concat(d, "'))") : i === "MONTH" ? "(".concat(e, " >=  STARTOFMONTH('").concat(p, "')) AND (").concat(e, "  <= STARTOFMONTH('").concat(d, "'))") : i === "QUARTER" ? "(".concat(e, " >= STARTOFQUARTER('").concat(p, "')) AND (").concat(e, "  <= STARTOFQUARTER('").concat(d, "'))") : i === "YEAR" ? "(".concat(e, " >= STARTOFYEAR('").concat(p, "')) AND (").concat(e, "  <= STARTOFYEAR('").concat(d, "'))") : "(".concat(e, " >= TIMESTAMP('").concat(p, "')) AND (").concat(e, "  <= TIMESTAMP('").concat(d, "'))");
  }
  /**
   * 处理字符串转时间
   *
   * @param {string} time
   * @return {*}
   * @memberof DateUtil
   */
  handleStringToDate(t, e = "DYNAMIC") {
    const i = /\w+\('(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'\)/g, a = [...t.matchAll(i)].map((s) => s[1]);
    if (a && a.length) {
      const s = this.computedDateUnit(t), { start: n, end: l } = this.computedDateTypesTime(
        s,
        e,
        a[0],
        a[1]
      );
      return {
        unit: s,
        type: e,
        start: n,
        end: l
      };
    }
  }
  /**
   * 计算时间单位
   *
   * @param {string} str
   * @return {*}
   * @memberof DateUtil
   */
  computedDateUnit(t) {
    const e = Na.find((i) => t.indexOf(i.tag) >= 0);
    return e != null && e.unit ? e.unit : "DAY";
  }
  /**
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {('DYNAMIC' | 'STATIC')} dateType
   * @param {number} _start
   * @param {number} _end
   * @return {*}  {(Array<string | number>)}
   * @memberof DateUtil
   */
  computedDynamicTimeToDate(t, e, i, a) {
    if (e === "STATIC") {
      const u = new Date(i * 1e3), c = new Date(a * 1e3);
      return t === "YEAR" ? [u.getFullYear(), c.getFullYear()] : [u.toLocaleDateString(), c.toLocaleDateString()];
    }
    const s = /* @__PURE__ */ new Date();
    if (s.setHours(0, 0, 0, 0), t === "WEEK") {
      const u = this.timeSpanConvertToWeek(s, i), c = this.timeSpanConvertToWeek(s, a);
      return [u, c];
    }
    if (t === "MONTH") {
      const u = this.timeSpanConvertToMonth(s, i), c = this.timeSpanConvertToMonth(s, a);
      return [u, c];
    }
    if (t === "QUARTER") {
      const u = this.timeSpanConvertToQuarter(s, i), c = this.timeSpanConvertToQuarter(s, a);
      return [u, c];
    }
    if (t === "YEAR") {
      const u = s.getFullYear() - i, c = s.getFullYear() - a;
      return [u, c];
    }
    const n = i * 24 * 60 * 60 * 1e3, l = a * 24 * 60 * 60 * 1e3, p = new Date(s.getTime() + n), d = new Date(s.getTime() + l);
    return [
      p.toLocaleDateString().replaceAll("/", "-"),
      d.toLocaleDateString().replaceAll("/", "-")
    ];
  }
  /**
   *时间间隔转季度
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @return {*}
   * @memberof DateUtil
   */
  timeSpanConvertToQuarter(t, e) {
    const i = Math.floor(e / 4), a = e % 4;
    let s = t.getFullYear() - i;
    const n = t.getMonth() + 1;
    let p = Math.ceil(n / 3) - a;
    return p < 0 && (s -= 1, p += 4), p > 4 && (s += 1, p -= 4), "".concat(s, "-").concat(p * 3);
  }
  /**
   * 时间转年周
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @return {*}
   * @memberof DateUtil
   */
  timeSpanConvertToWeek(t, e) {
    const i = t.getTime(), a = e * 7 * 24 * 60 * 60 * 1e3;
    return new Date(i - a).toLocaleDateString();
  }
  /**
   * 时间间隔转月份
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @return {*}
   * @memberof DateUtil
   */
  timeSpanConvertToMonth(t, e) {
    const i = Math.floor(e / 12), a = e % 12;
    let s = t.getFullYear() - i, n = t.getMonth() + 1 - a;
    return n < 0 && (s -= 1, n += 12), n > 12 && (s += 1, n -= 12), "".concat(s, "-").concat(n);
  }
  /**
   * 补全时间格式
   *
   * @private
   * @param {string} _date
   * @param {('START' | 'END')} _tag
   * @return {*}  {string}
   * @memberof DateUtil
   */
  completeTimeFormat(t, e) {
    const i = new Date(t);
    return e === "START" ? i.setHours(0, 0, 0, 0) : i.setHours(23, 59, 59, 0), Yi(i).format("YYYY-MM-DD HH:mm:ss");
  }
  /**
   * 计算在各个时间类型下的开始结束时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {('DYNAMIC' | 'STATIC')} dateType
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{
   *     start: number;
   *     end: number;
   *   }}
   * @memberof DateUtil
   */
  computedDateTypesTime(t, e, i, a) {
    return e === "STATIC" ? this.computedStaticTime(t, i, a) : this.computedDynamicTime(t, i, a);
  }
  /**
   * 计算动态类型时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedDynamicTime(t, e, i) {
    switch (t) {
      case "DAY":
        return this.computedDaysSpace(e, i);
      case "WEEK":
        return this.computedWeeksSpace(e, i);
      case "MONTH":
        return this.computedMonthsSpace(e, i);
      case "QUARTER":
        return this.computedQuartersSpace(e, i);
      case "YEAR":
        return this.computedYearsSpace(e, i);
      default:
        return this.computedDaysSpace(e, i);
    }
  }
  /**
   *计算年的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedYearsSpace(t, e) {
    const i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(t).getFullYear() - i, s = new Date(e).getFullYear() - i;
    return {
      start: a,
      end: s
    };
  }
  /**
   * 计算季度的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedQuartersSpace(t, e) {
    const i = /* @__PURE__ */ new Date(), a = new Date(t), s = new Date(e), n = (d, u) => {
      const c = d.getFullYear(), C = d.getMonth() + 1, w = Math.ceil(C / 3), y = u.getFullYear(), m = u.getMonth() + 1, g = Math.ceil(m / 3);
      return (y - c) * 4 - w + g;
    }, l = n(i, a), p = n(i, s);
    return {
      start: l,
      end: p
    };
  }
  /**
   * 计算天的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedDaysSpace(t, e) {
    const i = /* @__PURE__ */ new Date(), a = new Date(t), s = new Date(e);
    i.setHours(0, 0, 0, 0), a.setHours(0, 0, 0, 0), s.setHours(0, 0, 0, 0);
    const n = (a.getTime() - i.getTime()) / (24 * 60 * 60 * 1e3), l = (s.getTime() - i.getTime()) / (24 * 60 * 60 * 1e3);
    return {
      start: n,
      end: l
    };
  }
  /**
   * 计算周的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedWeeksSpace(t, e) {
    const i = /* @__PURE__ */ new Date(), a = new Date(t), s = new Date(e);
    i.setHours(0, 0, 0, 0), a.setHours(0, 0, 0, 0), s.setHours(0, 0, 0, 0);
    const n = (d, u) => {
      const c = this.getDateWeekMonday(d);
      return (this.getDateWeekMonday(u).getTime() - c.getTime()) / (7 * 24 * 60 * 60 * 1e3);
    }, l = n(i, a), p = n(i, s);
    return {
      start: l,
      end: p
    };
  }
  /**
   * 计算月的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedMonthsSpace(t, e) {
    const i = /* @__PURE__ */ new Date(), a = new Date(t), s = new Date(e), n = (d, u) => {
      const c = d.getFullYear(), C = d.getMonth() + 1, w = u.getFullYear(), y = u.getMonth() + 1;
      return (w - c) * 12 - C + y;
    }, l = n(i, a), p = n(i, s);
    return {
      start: l,
      end: p
    };
  }
  /**
   * 获取指定时间所在周的星期一
   *
   * @param {Date} date
   * @return {*}  {Date}
   * @memberof DateUtil
   */
  getDateWeekMonday(t) {
    const e = t.getDay();
    let i = e;
    e === 0 && (i = 7);
    const a = t.getTime() - (i - 1) * 24 * 60 * 60 * 1e3;
    return new Date(a);
  }
  /**
   * 计算静态类型时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedStaticTime(t, e, i) {
    switch (t) {
      case "DAY":
        return this.computedDaysTime(e, i);
      case "WEEK":
        return this.computedWeeksTime(e, i);
      case "MONTH":
        return this.computedMonthsTime(e, i);
      case "QUARTER":
        return this.computedQuartersTime(e, i);
      case "YEAR":
        return this.computedYearsTime(e, i);
      default:
        return this.computedDaysTime(e, i);
    }
  }
  /**
   *计算 天 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{
   *     start: number;
   *     end: number;
   *   }}
   * @memberof DateUtil
   */
  computedDaysTime(t, e) {
    const i = new Date(t), a = new Date(e);
    i.setHours(0, 0, 0, 0), a.setHours(23, 59, 59, 0);
    const s = i.getTime() / 1e3, n = a.getTime() / 1e3;
    return {
      start: s,
      end: n
    };
  }
  /**
   * 计算 周 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedWeeksTime(t, e) {
    const i = new Date(t), a = new Date(e);
    i.setHours(0, 0, 0, 0), a.setHours(23, 59, 59, 0);
    const s = i.getTime() / 1e3, n = a.getTime() / 1e3;
    return {
      start: s,
      end: n
    };
  }
  /**
   * 计算 月 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedMonthsTime(t, e) {
    const i = [1, 3, 5, 7, 8, 10, 12], a = new Date(t), s = new Date(e);
    a.setHours(0, 0, 0, 0), i.includes(s.getMonth() + 1) ? s.setDate(31) : s.getMonth() === 1 ? s.setDate(29) : s.setDate(30), s.setHours(23, 59, 59, 0);
    const n = a.getTime() / 1e3, l = s.getTime() / 1e3;
    return {
      start: n,
      end: l
    };
  }
  /**
   * 计算 季度 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedQuartersTime(t, e) {
    const i = new Date(t), a = new Date(e);
    i.setHours(0, 0, 0, 0), a.setHours(23, 59, 59, 0);
    const s = i.getTime() / 1e3, n = a.getTime() / 1e3;
    return {
      start: s,
      end: n
    };
  }
  /**
   * 计算 年 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateUtil
   */
  computedYearsTime(t, e) {
    const i = new Date(t), a = new Date(e);
    i.setHours(0, 0, 0, 0), a.setMonth(11), a.setDate(31), a.setHours(23, 59, 59, 0);
    const s = i.getTime() / 1e3, n = a.getTime() / 1e3;
    return {
      start: s,
      end: n
    };
  }
}
function Pa(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const za = /* @__PURE__ */ V({
  name: "BIFilterItem",
  props: {
    field: {
      type: Object,
      required: !0
    },
    condition: {
      type: Object
    },
    context: {
      type: Object,
      required: !0
    },
    type: {
      type: String
    },
    params: {
      type: Object,
      required: !0
    },
    modal: {
      type: Object,
      required: !0
    }
  },
  emits: {
    change: (o) => !0,
    mateChange: (o) => !0
  },
  setup(o, {
    emit: t
  }) {
    const e = U("bi-filter-item"), i = F(void 0), a = F(void 0), s = F(void 0), n = F({
      value: null,
      valueOP: null,
      nodeType: "FIELD",
      // nodeType: 'CUSTOM';
      // customType: 'PQL'
      // customCond: string;
      field: o.field.appDEFieldId
    }), l = F(!1), p = new Ba(), d = k(() => fi.filter((h) => o.field.valueOPs.includes(h.valueOP)));
    (async () => {
      o.condition && (n.value = {
        ...o.condition
      }), o.field.type === "date" && n.value.customType === "PQL" ? (l.value = !0, i.value = {
        ...Xe.daterange
      }, n.value.value = p.handleStringToDate(n.value.customCond, o.type), n.value.valueOP = "IN") : i.value = Je(o.field), a.value = await Ie(i.value), a.value && (s.value = await a.value.createController(i.value, {
        context: o.context,
        params: o.params
      }));
    })();
    const c = () => {
      o.modal.dismiss();
    }, C = () => {
      if (l.value) {
        const f = {
          nodeType: "CUSTOM",
          customType: "PQL",
          customCond: p.handleDateToString(n.value.value, o.field.appDEFieldId),
          field: o.field.appDEFieldId
        };
        t("mateChange", n.value.value.type), t("change", f);
      } else
        t("change", n.value);
      c();
    }, w = (h) => {
      n.value.value = h;
    }, y = async () => {
      s.value = void 0, i.value = {
        ...Xe.daterange
      }, a.value = await Ie(i.value), a.value && (s.value = await a.value.createController(i.value, {
        context: o.context,
        params: o.params
      }));
    }, m = async () => {
      s.value = void 0, i.value = Je(o.field), a.value = await Ie(i.value), a.value && (s.value = await a.value.createController(i.value, {
        context: o.context,
        params: o.params
      }));
    }, g = async (h) => {
      n.value.valueOP = h, w(null), l.value ? (o.field.type !== "date" || h !== "IN") && (l.value = !1, m()) : o.field.type === "date" && h === "IN" && (l.value = !0, y());
    }, b = () => {
      if (n.value.valueOP && et.includes(n.value.valueOP))
        return null;
      if (s.value) {
        const h = S(a.value.formEditor);
        return te(h, {
          value: n.value.value,
          controller: s.value,
          onChange: (f, T) => {
            w(f);
          }
        });
      }
    };
    return {
      ns: e,
      onClose: c,
      onConfirm: C,
      renderContent: () => {
        let h;
        return r("div", {
          class: e.e("content")
        }, [r("div", {
          class: e.em("content", "field")
        }, [r(S("el-select"), {
          "model-value": n.value.field
        }, {
          default: () => [r(S("el-option"), {
            key: o.field.appDEFieldId,
            value: o.field.appDEFieldId,
            label: o.field.caption
          }, null)]
        })]), r("div", {
          class: e.em("content", "option")
        }, [r(S("el-select"), {
          "model-value": n.value.valueOP,
          onChange: (f) => {
            g(f);
          }
        }, Pa(h = d.value.map((f) => r(S("el-option"), {
          key: f.valueOP,
          value: f.valueOP,
          label: f.label
        }, null))) ? h : {
          default: () => [h]
        })]), r("div", {
          class: e.em("content", "editor")
        }, [b()])]);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("header")
    }, [r("span", {
      class: this.ns.em("header", "caption")
    }, [R("筛选")]), r("span", {
      class: this.ns.em("header", "icon")
    }, [r(S("ion-icon"), {
      name: "close-outline",
      onClick: this.onClose
    }, null)])]), this.renderContent(), r("div", {
      class: this.ns.e("footer")
    }, [r(S("el-button"), {
      text: !0,
      onClick: this.onClose
    }, {
      default: () => [R("取消")]
    }), r(S("el-button"), {
      onClick: this.onConfirm
    }, {
      default: () => [R("确定")]
    })])]);
  }
}), $a = /* @__PURE__ */ V({
  name: "BITimeSelect",
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    modal: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      required: !0
    }
  },
  emits: ["change"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-time-select"), i = F(), a = F(), s = F(), n = F({
      unit: "DAY",
      type: "DYNAMIC",
      start: -7,
      end: 0
    }), l = (w) => {
      n.value = w;
    }, p = async () => {
      i.value = {
        appId: "",
        editorType: "DATERANGE_SWITCHUNIT",
        dateTimeFormat: "YYYY-MM-DD"
      }, a.value = await Ie(i.value), a.value && (s.value = await a.value.createController(i.value, {
        context: o.context,
        params: o.params
      }));
    };
    W(() => o.value, (w) => {
      w && (n.value = w);
    }, {
      immediate: !0
    }), p();
    const d = () => {
      if (s.value) {
        const w = S("IBizDateRangeSelect");
        return te(w, {
          value: o.value,
          controller: s.value,
          onChange: (y) => {
            l(y);
          }
        });
      }
    }, u = () => {
      t("change", n.value);
    };
    return {
      ns: e,
      renderEditor: d,
      onOK: () => {
        u(), o.modal.dismiss();
      },
      onCancel: () => {
        o.modal.dismiss();
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("header")
    }, [r("span", {
      class: this.ns.em("header", "caption")
    }, [R("配置")]), r("svg", {
      onClick: this.onCancel,
      class: this.ns.em("header", "close"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "agwaction/close",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z",
      id: "agw形状结合",
      transform: "rotate(45 8.056 8.056)"
    }, null)])])]), r("div", {
      class: this.ns.e("content")
    }, [this.renderEditor()]), r("div", {
      class: this.ns.e("footer")
    }, [r(S("el-button"), {
      link: !0,
      onClick: this.onCancel
    }, {
      default: () => [R("取消")]
    }), r(S("el-button"), {
      type: "primary",
      onClick: this.onOK
    }, {
      default: () => [R("确认")]
    })])]);
  }
}), Ii = [
  {
    name: "合计",
    value: "SUM"
  },
  {
    name: "平均",
    value: "AVG"
  },
  {
    name: "最大值",
    value: "MAX"
  },
  {
    name: "最小值",
    value: "MIN"
  },
  {
    name: "计数",
    value: "COUNT"
  }
], ka = /* @__PURE__ */ V({
  name: "BIAggmodeSelect",
  props: {
    item: {
      type: Object,
      required: !0
    },
    value: {
      type: String
    }
  },
  emit: ["change"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-aggmode-select"), i = F(!1);
    return {
      ns: e,
      aggModeList: Ii,
      aggmodeVisible: i,
      handleClick: (n) => {
        n.stopPropagation(), n.preventDefault();
      },
      aggModeClick: (n, l) => {
        l.stopPropagation(), l.preventDefault(), i.value = !1, t("change", n);
      }
    };
  },
  render() {
    return r(S("el-popover"), {
      visible: this.aggmodeVisible,
      "onUpdate:visible": (o) => this.aggmodeVisible = o,
      "popper-class": this.ns.e("aggmode-container"),
      placement: "right-start",
      width: 200
    }, {
      reference: () => r("div", {
        class: [this.ns.e("aggmode"), this.ns.em("aggmode", "group-item")],
        onPointerup: this.handleClick
      }, [r("span", null, [r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "ade1.Base基础/1.icon图标/1.-action/arithmetic",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("g", {
        id: "ade计算_arithmetic",
        transform: "translate(1.4 1.4)",
        "fill-rule": "nonzero"
      }, [r("path", {
        d: "M12.6 12.824a.6.6 0 0 1 .097 1.192l-.097.008H7.933a.6.6 0 0 1-.097-1.192l.097-.008H12.6zm.413-12.66a.6.6 0 0 1 .09.764l-.068.085-12 12.649a.6.6 0 0 1-.937-.741l.067-.085 12-12.649a.6.6 0 0 1 .848-.022zM12.6 9.663a.6.6 0 0 1 .097 1.192l-.097.008H7.933a.6.6 0 0 1-.097-1.192l.097-.008H12.6zM3.267 0a.6.6 0 0 1 .592.503L3.867.6l-.001 2.21h2.067a.6.6 0 0 1 .098 1.193l-.098.008-2.067-.001v2.212a.6.6 0 0 1-1.191.097l-.008-.097-.001-2.212H.6A.6.6 0 0 1 .503 2.82L.6 2.81l2.066-.001V.6a.6.6 0 0 1 .6-.6z",
        id: "ade形状结合"
      }, null)])])]), r("span", null, [R("计算")])]), r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "abbnavigation/angle-right",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M7.978 11.498l-.005.005L2.3 5.831 3.13 5l4.848 4.848L12.826 5l.83.831-5.673 5.672-.005-.005z",
        id: "abb形状结合",
        transform: "rotate(-90 7.978 8.252)"
      }, null)])])]),
      default: () => r("div", {
        class: [this.ns.e("aggmode-list")]
      }, [this.aggModeList.map((o) => r("div", {
        class: [this.ns.em("aggmode-list", "item"), this.ns.is("selected", this.value === o.value)],
        onPointerup: (t) => this.aggModeClick(o.value, t)
      }, [o.name]))])
    });
  }
}), Ga = /* @__PURE__ */ V({
  name: "BISort",
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    measures: {
      type: Array,
      default: []
    },
    dimension: {
      type: Object,
      default: () => {
      },
      required: !0
    },
    modal: {
      type: Object,
      required: !0
    }
  },
  emit: ["change"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-sort"), i = (c) => o.value["sort@".concat(c.id)] === "asc", a = (c) => o.value["sort@".concat(c.id)] === "desc", s = (c) => !o.value["sort@".concat(c.id)], n = (c) => {
      let C = null;
      o.value["sort@".concat(c.id)] === "asc" && (C = "desc"), o.value["sort@".concat(c.id)] === "desc" && (C = null), o.value["sort@".concat(c.id)] || (C = "asc"), t("change", c.id, C);
    }, l = (c) => r("div", {
      class: e.e("item"),
      onClick: () => n(c)
    }, [r("div", {
      class: e.em("item", "label")
    }, [c.name]), r("div", {
      class: [e.em("item", "icon"), e.is("no-sort", s(c)), e.is("asc", i(c)), e.is("desc", a(c))]
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "avt1.Base基础/1.icon图标/5.navigation/sort-positive-sequence",
      "stroke-width": "1",
      "fill-rule": "nonzero"
    }, [r("path", {
      d: "M7.173 2.605l-2.625 3A.6.6 0 0 0 5 6.6h5.25a.6.6 0 0 0 .452-.995l-2.625-3a.6.6 0 0 0-.904 0z",
      id: "avt路径"
    }, null), r("path", {
      d: "M10.25 9.108H5a.6.6 0 0 0-.452.995l2.625 3a.6.6 0 0 0 .904 0l2.625-3a.6.6 0 0 0-.452-.995z",
      id: "avtsecondary-color"
    }, null)])])])]);
    return {
      ns: e,
      renderDimension: () => {
        const c = {
          name: o.dimension.pssysbicubedimensionname,
          id: o.dimension.codename
        };
        return l(c);
      },
      renderMeasure: () => o.measures.map((c) => {
        const C = {
          name: c.pssysbicubemeasurename,
          id: c.codename
        };
        return l(C);
      }),
      onMouseLevel: () => {
        o.modal.dismiss();
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b(),
      onMouseleave: this.onMouseLevel
    }, [this.renderDimension(), this.renderMeasure()]);
  }
}), Va = /* @__PURE__ */ V({
  name: "BIAxis",
  props: {
    value: {
      type: String,
      default: "LEFT"
    },
    modal: {
      type: Object,
      required: !0
    }
  },
  emits: ["change"],
  setup(o, {
    emit: t
  }) {
    return {
      ns: U("bi-axis"),
      renderSelectIcon: () => r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "agctips/check",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        id: "agc路径-12",
        d: "M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z"
      }, null)])]),
      onClick: (n) => {
        t("change", n);
      },
      onMouseLevel: () => {
        o.modal.dismiss();
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b(),
      onMouseleave: this.onMouseLevel
    }, [r("div", {
      class: this.ns.e("item"),
      onClick: () => this.onClick("LEFT")
    }, [r("span", null, [R("左轴")]), this.value === "LEFT" && this.renderSelectIcon()]), r("div", {
      class: this.ns.e("item"),
      onClick: () => this.onClick("RIGHT")
    }, [r("span", null, [R("右轴")]), this.value === "RIGHT" && this.renderSelectIcon()])]);
  }
}), Ua = /* @__PURE__ */ V({
  props: {
    value: {
      type: Array,
      default: []
    },
    modal: {
      type: Object,
      required: !0
    }
  },
  components: {
    "bi-font-border-select": ci
  },
  emit: ["cordonChange"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-chart-cordon"), i = F([]), a = [{
      name: "固定值",
      value: "FIXED"
    }, {
      name: "最大值",
      value: "MAX"
    }, {
      name: "最小值",
      value: "MIN"
    }, {
      name: "平均值",
      value: "AVERAGE"
    }], s = (g) => {
      const b = i.value.findIndex((v) => v.id === g.id);
      b >= 0 && i.value.splice(b, 1);
    }, n = () => {
      i.value.push({
        id: Te(),
        name: "警戒线".concat(i.value.length + 1),
        lineStyle: "dashed",
        lineSize: 1,
        lineColor: "red",
        cordonType: "FIXED",
        cordonSize: 0
      });
    }, l = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "abdnavigation/angle-up",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.978 11.498l-.005.005L2.3 5.831 3.13 5l4.848 4.848L12.826 5l.83.831-5.673 5.672-.005-.005z",
      id: "abd形状结合",
      transform: "rotate(180 7.978 8.252)"
    }, null)])]), p = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      id: "aaynavigation/angle-down",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z",
      id: "aay形状结合"
    }, null)])]), d = (g, b) => {
      g === "ADD" ? b.cordonSize += 1 : b.cordonSize -= 1;
    }, u = (g, b) => {
      const {
        borderStyle: v,
        borderSize: h,
        color: f
      } = b;
      g.lineStyle = v, g.lineSize = h, g.lineColor = f;
    }, c = () => i.value.map((g, b) => r("div", {
      class: e.em("content", "item")
    }, [r("div", {
      class: e.em("content", "item-header")
    }, [r("div", {
      class: e.em("content", "item-index")
    }, [R("警戒线("), b + 1, R(")")]), r("div", {
      class: e.em("content", "item-delete"),
      onClick: () => s(g)
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "azkaction/trash",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z",
      id: "azk删除"
    }, null)])])])]), r("div", {
      class: e.em("content", "item-editor")
    }, [r("div", {
      class: e.em("content", "line-set")
    }, [r(S("el-input"), {
      modelValue: g.name,
      "onUpdate:modelValue": (v) => g.name = v
    }, null), r(S("bi-font-border-select"), {
      mode: "BORDER",
      borderMax: 10,
      borderMin: 1,
      useDotted: !0,
      value: {
        borderStyle: g.lineStyle,
        borderSize: g.lineSize,
        color: g.lineColor
      },
      onChange: (v) => u(g, v)
    }, null)]), r("div", {
      class: e.em("content", "line-type")
    }, [r(S("el-select"), {
      modelValue: g.cordonType,
      "onUpdate:modelValue": (v) => g.cordonType = v,
      class: e.em("content", "cordon-type"),
      size: "large"
    }, {
      default: () => a.map((v) => r(S("el-option"), {
        key: v.value,
        label: v.name,
        value: v.value
      }, {
        default: () => [v.name]
      }))
    }), g.cordonType === "FIXED" && r(S("el-input"), {
      class: e.e("input-number"),
      modelValue: g.cordonSize,
      "onUpdate:modelValue": (v) => g.cordonSize = v,
      size: "large"
    }, {
      suffix: () => r("div", {
        class: [e.e("input-number-suffix")]
      }, [r("span", {
        class: [e.e("input-number-suffix-add"), e.is("readonly", g.cordonSize >= 10)],
        onClick: () => d("ADD", g)
      }, [l()]), r("span", {
        class: [e.e("input-number-suffix-minus"), e.is("readonly", g.cordonSize <= 1)],
        onClick: () => d("REDUCE", g)
      }, [p()])])
    })])])])), C = () => r("div", {
      class: e.em("content", "add"),
      onClick: n
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "asg1.Base基础/1.icon图标/1.-action/plus",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z",
      id: "asgFill-1"
    }, null)])]), r("span", null, [R("新增警戒线")])]), w = () => {
      t("cordonChange", i.value);
    };
    return W(() => o.value, (g) => {
      g && Array.isArray(g) && g.length > 0 ? i.value = g : i.value = [];
    }, {
      immediate: !0
    }), {
      ns: e,
      onCancel: () => {
        o.modal.dismiss();
      },
      onOK: () => {
        w(), o.modal.dismiss();
      },
      renderContent: c,
      renderAddItem: C
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("header")
    }, [r("span", {
      class: this.ns.em("header", "caption")
    }, [R("警戒线")]), r("svg", {
      onClick: this.onCancel,
      class: this.ns.em("header", "close"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "agwaction/close",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z",
      id: "agw形状结合",
      transform: "rotate(45 8.056 8.056)"
    }, null)])])]), r("div", {
      class: this.ns.e("content")
    }, [this.renderContent(), this.renderAddItem()]), r("div", {
      class: this.ns.e("footer")
    }, [r(S("el-button"), {
      link: !0,
      onClick: this.onCancel
    }, {
      default: () => [R("取消")]
    }), r(S("el-button"), {
      type: "primary",
      onClick: this.onOK
    }, {
      default: () => [R("确认")]
    })])]);
  }
}), ja = /* @__PURE__ */ V({
  name: "BIDragElement",
  components: {
    draggable: ot,
    "bi-aggmode-select": ka
  },
  props: {
    controller: {
      type: Object,
      required: !0
    },
    multiple: {
      type: Boolean,
      default: !0
    },
    caption: {
      type: String,
      default: ""
    },
    subCaption: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "measure"
    },
    value: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    expandActions: {
      type: Array,
      default: () => []
    },
    error: {
      type: Object
    }
  },
  emits: ["change", "extendChange"],
  setup(o, {
    emit: t
  }) {
    const e = U("drag-element"), i = F([]), a = F(null), s = F(), n = F(), l = F(), p = F({
      visible: !1,
      currentId: ""
    }), d = Te(), u = F(), c = F(!1);
    let C = null, w = at;
    const y = F(/* @__PURE__ */ new Map()), m = F(!1), g = ["SORT", "AXIS"], b = F(), v = k(() => o.controller.state.propertyData), h = async () => {
      for (let E = 0; E < i.value.length; E++) {
        const D = i.value[E];
        if (!y.value.has(D.codename) && (D.parampsdeuiactiontag = await xa(D), D.parampsdeuiactiontag)) {
          const B = await Hi(D.parampsdeuiactiontag, ibiz.env.appId);
          B && y.value.set(D.codename, B);
        }
      }
    }, f = (E) => !E || E.dragTypes.indexOf(o.type) < 0 ? {
      ok: !1,
      msg: ""
    } : {
      ok: !0,
      msg: ""
    }, T = () => o.controller.verifyErrorState(o.type, i.value, ["MAXLIMIT", "TYPELIMIT"], {
      targetItem: a.value
    }), I = (E) => o.controller.verifyErrorState(o.type, i.value, ["MAXLIMIT", "TYPELIMIT"], {
      targetItem: E
    }).ok && f(E).ok, x = (E, D) => {
      p.value.visible = !1, E.condition = D, t("change", i.value);
    }, A = (E) => {
      const D = {
        ...E
      };
      return D.target = E.currentTarget, D;
    }, O = (E, D, B) => {
      if (p.value.visible = !1, o.type === "period" && B) {
        const z = {
          ...D,
          field: B.appDEFieldId,
          yoy: 1,
          pop: 1
        };
        E.value = z, t("change", i.value);
      } else
        t("extendChange", "".concat(X.PERIOD, "@").concat(E.codename), D);
    }, N = (E, D) => {
      E.dateType = D;
    }, P = async (E, D) => {
      const B = await he(D, o.controller.state.schemaFields);
      B ? (C = ibiz.overlay.createPopover((z) => te(za, {
        field: B,
        modal: z,
        condition: D.condition,
        type: D.dateType,
        context: o.controller.context,
        params: o.controller.viewParams,
        onChange: (_) => x(D, _),
        onMateChange: (_) => N(D, _)
      }), void 0, {
        placement: "right",
        autoClose: !0,
        noArrow: !0,
        width: 400
      }), await C.present(E.target), await C.onWillDismiss(), C = null) : ibiz.message.error("未找到 ".concat(D.codename, " 属性的Schema配置"));
    }, H = async (E, D) => {
      let B = D.value;
      o.type === "dimension" && (B = v.value.extend["period@".concat(D.codename)]);
      const z = await he(D, o.controller.state.schemaFields);
      C = ibiz.overlay.createPopover((_) => te($a, {
        value: B,
        context: o.controller.context,
        params: o.controller.viewParams,
        modal: _,
        onChange: (ae) => O(D, ae, z)
      }), void 0, {
        placement: "right",
        autoClose: !0,
        noArrow: !0,
        width: 400
      }), await C.present(E.target), await C.onWillDismiss(), C = null;
    }, j = (E, D) => {
      t("extendChange", "".concat(X.SORT, "@").concat(E), D);
    }, q = (E, D) => {
      t("extendChange", "".concat(X.CORDON, "@").concat(E.codename), D);
    }, le = (E, D) => {
      t("extendChange", "".concat(X.AXIS, "@").concat(E.codename), D);
    }, de = async (E, D) => {
      C = ibiz.overlay.createPopover((B) => te(Ga, {
        value: v.value.extend,
        dimension: D,
        measures: v.value.data.measure,
        modal: B,
        onChange: (z, _) => j(z, _)
      }), void 0, {
        placement: "right",
        autoClose: !0,
        noArrow: !1,
        width: 250
      }), await C.present(E.target), await C.onWillDismiss(), C = null;
    }, ce = async (E, D) => {
      C = ibiz.overlay.createModal((B) => te(Ua, {
        value: v.value.extend["cordon@".concat(D.codename)],
        modal: B,
        onCordonChange: (z) => q(D, z)
      }), void 0, {
        width: 660,
        modalClass: e.e("cordon"),
        footerHide: !0
      }), p.value.visible = !1, await C.present(E.target), await C.onWillDismiss(), C = null;
    }, Se = async (E, D) => {
      C = ibiz.overlay.createPopover((B) => te(Va, {
        value: v.value.extend["axis@".concat(D.codename)],
        modal: B,
        onChange: (z) => le(D, z)
      }), void 0, {
        placement: "right",
        autoClose: !0,
        noArrow: !1,
        width: 250
      }), await C.present(E.target), await C.onWillDismiss(), C = null;
    }, De = (E) => ({
      dataType: 25,
      enableCond: 3,
      labelPos: "NONE",
      noPrivDisplayMode: 1,
      editor: {
        editorType: "DATERANGE_SWITCHUNIT",
        valueType: "SIMPLE",
        editable: !0,
        id: "srfperiod",
        appId: ibiz.env.appId
      },
      allowEmpty: !1,
      codeName: "srfperiod",
      fieldName: "srfperiod",
      detailStyle: "DEFAULT",
      detailType: "FORMITEM",
      layoutPos: {
        colMD: 24,
        layout: "TABLE_24COL",
        appId: ibiz.env.appId
      },
      id: "srfperiod",
      appId: ibiz.env.appId
    }), xe = (E) => {
      if (o.type === "dimension" && Ce(E.stddatatype))
        return {
          srfperiod: v.value.extend["period@".concat(E.codename)],
          customeditormodel: De()
        };
    }, Oe = async (E, D) => {
      const B = {
        event: E,
        data: [D],
        context: o.controller.context,
        params: {
          ...o.controller.viewParams,
          ...JSON.parse(D.birepitemparams || "{}"),
          ...xe(D)
        }
      }, z = await gt.exec(D.parampsdeuiactiontag, B, ibiz.env.appId);
      !z.cancel && z.data && (p.value.visible = !1, o.type === "dimension" && Ce(D.stddatatype) && z.data[0].srfperiod && (t("extendChange", "".concat(X.PERIOD, "@").concat(D.codename), z.data[0].srfperiod), delete z.data[0].srfperiod), D.birepitemparams = JSON.stringify(z.data[0]), t("change", i.value));
    }, Me = (E) => {
      if (o.type === "dimension" && Ce(E.stddatatype)) {
        const D = {
          unit: "DAY",
          type: "DYNAMIC",
          start: -7,
          end: 0
        };
        t("extendChange", "".concat(X.PERIOD, "@").concat(E.codename), D);
      }
    }, Ae = async (E) => {
      const D = a.value;
      if (!I(D))
        return;
      const z = i.value.findIndex((ae) => {
        const it = ae.pssysbicubedimensionid || ae.pssysbicubemeasureid, Li = D.pssysbicubedimensionid || D.pssysbicubemeasureid;
        return it && it === Li;
      });
      let _ = [...i.value];
      if (D && z < 0) {
        if (o.type === "period") {
          const ae = await he(D, o.controller.state.schemaFields);
          ae && (D.value = {
            field: ae.appDEFieldId,
            unit: "DAY",
            type: "DYNAMIC",
            start: -7,
            end: 0,
            pop: 1,
            yoy: 1
          });
        }
        o.multiple ? _.push(D) : (_ = [D], i.value.length && (t("extendChange", "".concat(X.AGGMODE, "@").concat(i.value[0].codename), null), t("extendChange", "".concat(X.PERIOD, "@").concat(i.value[0].codename), null))), Me(D), t("change", _), o.type === "filter" && setTimeout(() => {
          u.value && P({
            target: u.value
          }, D);
        }, 0);
      }
      a.value = null;
    }, Fe = (E) => {
      p.value.currentId = "";
      const D = i.value.findIndex((B) => {
        const z = B.pssysbicubedimensionid || B.pssysbicubemeasureid, _ = E.pssysbicubedimensionid || E.pssysbicubemeasureid;
        return z && z === _;
      });
      D > -1 && i.value.splice(D, 1), t("extendChange", "".concat(X.AGGMODE, "@").concat(E.codename), null), t("extendChange", "".concat(X.PERIOD, "@").concat(E.codename), null), t("extendChange", "".concat(X.SORT, "@").concat(E.codename), null), t("extendChange", "".concat(X.CORDON, "@").concat(E.codename), null), t("extendChange", "".concat(X.AXIS, "@").concat(E.codename), null), t("change", i.value);
    }, ge = (E) => o.type === "measure" ? E.bimeasuretype === "COMMON" ? r("svg", {
      class: e.em("content", "item-icon-com"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "alzeditor/hashtag",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M4.236 9.9l.422-3.8H2.6a.6.6 0 1 1 0-1.2h2.19l.372-3.347a.6.6 0 1 1 1.192.133L5.998 4.9h4.793l.37-3.347a.6.6 0 0 1 1.193.133L11.998 4.9h2.459a.6.6 0 0 1 0 1.2h-2.592l-.421 3.8h2.013a.6.6 0 0 1 0 1.2H11.31l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H5.311l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H1.6a.6.6 0 0 1 0-1.2h2.636zm1.208 0h4.792l.422-3.8H5.865l-.421 3.8z",
      id: "alz形状结合"
    }, null)])]) : r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "aljeditor/formula",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z",
      id: "alj形状结合"
    }, null)])]) : E.bidimensiontype === "COMMON" ? r("svg", {
      class: e.em("content", "item-icon-fx"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "bbd1.Base基础/1.icon图标/2.normal/View-report-fill",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M9 1.2v4.974h1V3.2h2v2.974h1.5a1.5 1.5 0 0 1 1.5 1.5v5.784a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V7.674a1.5 1.5 0 0 1 1.5-1.5H4V3.2h2v2.974h1V1.2h2zM6 6.636H4v4.038h2V6.636zm1 4.038h2V6.636H7v4.038zm5-4.053h-2v4.053h2V6.621z",
      id: "bbd形状结合"
    }, null)])]) : r("svg", {
      class: e.em("content", "item-icon-fx"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "alheditor/formula",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z",
      id: "alh形状结合"
    }, null)])]), pe = async (E, D, B) => {
      if (!c.value || b.value && g.includes(b.value)) {
        await (C == null ? void 0 : C.dismiss());
        const z = A(E);
        c.value = !0;
        try {
          switch (b.value = D, D) {
            case "UPDATE":
              n.value = B, s.value = B.pssysbicubemeasurename || B.pssysbicubedimensionname, we(() => {
                l.value.focus();
              });
              break;
            case "REMOVE":
              Fe(B);
              break;
            case "FILTER":
              await P(z, B);
              break;
            case "CONFIG":
              await H(z, B);
              break;
            case "SORT":
              await de(z, B);
              break;
            case "CORDON":
              await ce(z, B);
              break;
            case "AXIS":
              await Se(z, B);
              break;
            default:
              await Oe(z, B);
          }
        } catch (_) {
          throw new ne(_);
        } finally {
          c.value = !1;
        }
      }
    }, Le = (E) => {
      if (y.value.has(E.codename)) {
        const D = y.value.get(E.codename);
        return r("div", {
          class: e.em("actions", "group-item"),
          onPointerup: (B) => pe(B, D.uiactionTag, E)
        }, [D.sysImage && r(S("iBizIcon"), {
          icon: D.sysImage
        }, null), r("span", null, [D.caption])]);
      }
    }, ye = (E, D, B = "group") => {
      let z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false"
      }, [r("g", {
        id: "baxnormal/vertical-view-lines",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.092 8.854v-2c0-.163-.138-.3-.3-.3-.163 0-.3.137-.3.3v2c0 .163.137.3.3.3.162 0 .3-.137.3-.3zM14.869 7.3a.6.6 0 1 1 0 1.2H5.292v.354c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5V8.5H1.1a.6.6 0 0 1 0-1.2h1.192v-.446c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5V7.3h9.577zm-4.07-3.8v-2c0-.163-.139-.3-.3-.3-.164 0-.3.137-.3.3v2c0 .163.136.3.3.3.161 0 .3-.137.3-.3zm4.07-1.6a.6.6 0 1 1 0 1.2H12v.4c0 .825-.676 1.5-1.5 1.5-.826 0-1.5-.675-1.5-1.5v-.4H1.1a.6.6 0 1 1 0-1.2h7.898v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h2.871zM12.55 14.208v-2c0-.162-.138-.3-.3-.3-.162 0-.3.138-.3.3v2c0 .163.138.3.3.3.162 0 .3-.137.3-.3zm2.319-1.6a.6.6 0 0 1 0 1.201H13.75v.399c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-.399H1.1a.6.6 0 0 1 0-1.201h9.65v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h1.119z",
        id: "bax形状结合"
      }, null)])]), _ = null;
      return E.id === "UPDATE" ? z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false"
      }, [r("g", {
        id: "aiwaction/edit",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M2 8.34L10.71 0 15 4.17 6.538 13H2V8.34zm1.2.512V11.8h2.826l7.283-7.6-2.606-2.533L3.2 8.852zM0 16v-1.2h16V16H0z",
        id: "aiw编辑"
      }, null)])]) : E.id === "REMOVE" ? z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "azaaction/trash",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z",
        id: "aza删除"
      }, null)])]) : E.id === "FILTER" ? z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        preserveAspectRatio: "xMidYMid meet",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "akp1.Base基础/1.icon图标/2.normal/filter备份",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M1.6 2h12.8a.6.6 0 0 1 0 1.2H1.6a.6.6 0 1 1 0-1.2zm2.5 5.393h7.8a.6.6 0 0 1 0 1.2H4.1a.6.6 0 1 1 0-1.2zm2.5 5.416h2.8a.6.6 0 0 1 0 1.2H6.6a.6.6 0 1 1 0-1.2z",
        id: "akp形状结合"
      }, null)])]) : E.id === "CONFIG" ? z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        preserveAspectRatio: "xMidYMid meet",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "bbhnormal/vertical-view-lines",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.092 8.854v-2c0-.163-.138-.3-.3-.3-.163 0-.3.137-.3.3v2c0 .163.137.3.3.3.162 0 .3-.137.3-.3zM14.869 7.3a.6.6 0 1 1 0 1.2H5.292v.354c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5V8.5H1.1a.6.6 0 0 1 0-1.2h1.192v-.446c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5V7.3h9.577zm-4.07-3.8v-2c0-.163-.139-.3-.3-.3-.164 0-.3.137-.3.3v2c0 .163.136.3.3.3.161 0 .3-.137.3-.3zm4.07-1.6a.6.6 0 1 1 0 1.2H12v.4c0 .825-.676 1.5-1.5 1.5-.826 0-1.5-.675-1.5-1.5v-.4H1.1a.6.6 0 1 1 0-1.2h7.898v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h2.871zM12.55 14.208v-2c0-.162-.138-.3-.3-.3-.162 0-.3.138-.3.3v2c0 .163.138.3.3.3.162 0 .3-.137.3-.3zm2.319-1.6a.6.6 0 0 1 0 1.201H13.75v.399c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-.399H1.1a.6.6 0 0 1 0-1.201h9.65v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h1.119z",
        id: "bbh形状结合"
      }, null)])]) : E.id === "SORT" ? (z = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "avq1.Base基础/1.icon图标/2.normal/sort-positive-sequence",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.7 1.068v11.93l2.182-2.18.848.849-3.515 3.515-.582-.583H3.5v-.133l-2.8-2.8.849-.848L3.5 12.77V1.068h1.2zm9.771 8.082v.972l-2.779 3.527h1.711v-1.33H14.6v2.53h-4.558v-1.026l2.725-3.474h-1.57v.921H10V9.15h4.471zM11.791 1l1.11.014 1.474 5.785.938.001V8h-2.62V6.8l.382-.001-.198-.918h-1.354l-.24.918.504.001V8H9.19V6.8l.756-.001L11.792 1zm.478 2.038l-.498 1.898h.904l-.406-1.898z",
        id: "avq形状结合"
      }, null)])]), _ = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "abbnavigation/angle-right",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M7.978 11.498l-.005.005L2.3 5.831 3.13 5l4.848 4.848L12.826 5l.83.831-5.673 5.672-.005-.005z",
        id: "abb形状结合",
        transform: "rotate(-90 7.978 8.252)"
      }, null)])])) : E.id === "CORDON" ? z = r("svg", {
        viewBox: "0 0 16 16",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "a1.Base基础/1.icon图标/6.chart/Analytical-line",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M3.1,0.9 L3.1,12.9 L16.1,12.9 L16.1,14.1 L3.1,14.1 L3.1,16.1 L1.9,16.1 L1.9,14.1 L-0.1,14.1 L-0.1,12.9 L1.9,12.9 L1.9,0.9 L3.1,0.9 Z M14.4906668,8.9 L14.4906668,10.1 L11.2906668,10.1 L11.2906668,8.9 L14.4906668,8.9 Z M10.4906668,8.9 L10.4906668,10.1 L7.29066679,10.1 L7.29066679,8.9 L10.4906668,8.9 Z M6.49066679,8.9 L6.49066679,10.1 L4.78461538,10.1 L4.78461538,8.9 L6.49066679,8.9 Z M14.4906668,3.9 L14.4906668,5.1 L11.2906668,5.1 L11.2906668,3.9 L14.4906668,3.9 Z M10.4906668,3.9 L10.4906668,5.1 L7.29066679,5.1 L7.29066679,3.9 L10.4906668,3.9 Z M6.49066679,3.9 L6.49066679,5.1 L4.78461538,5.1 L4.78461538,3.9 L6.49066679,3.9 Z",
        id: "a形状结合"
      }, null)])]) : E.id === "AXIS" && (z = r("svg", {
        viewBox: "0 0 16 16",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "b1.Base基础/1.icon图标/6.chart/Axis-settings",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.1,0.5 L4.099,11.5 L16,11.5 L16,12.7 L13.6,12.7 L13.6,14.9 L12.4,14.9 L12.4,12.7 L10.6,12.7 L10.6,14.9 L9.4,14.9 L9.4,12.7 L7.6,12.7 L7.6,14.9 L6.4,14.9 L6.4,12.7 L4.099,12.7 L4.1,15.7 L2.9,15.7 L2.899,12.7 L0,12.7 L0,11.5 L2.899,11.5 L2.899,9.7 L0.9,9.7 L0.9,8.5 L2.899,8.5 L2.899,6.7 L0.9,6.7 L0.9,5.5 L2.899,5.5 L2.899,3.7 L0.9,3.7 L0.9,2.5 L2.899,2.5 L2.9,0.5 L4.1,0.5 Z",
        id: "b形状结合"
      }, null)])]), _ = r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "abbnavigation/angle-right",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M7.978 11.498l-.005.005L2.3 5.831 3.13 5l4.848 4.848L12.826 5l.83.831-5.673 5.672-.005-.005z",
        id: "abb形状结合",
        transform: "rotate(-90 7.978 8.252)"
      }, null)])])), r("div", {
        class: [e.em("actions", "".concat(B, "-item")), e.is("delete", E.id === "REMOVE")],
        onPointerup: (ae) => pe(ae, E.id, D)
      }, [z, r("span", {
        class: e.em("actions", "item-text")
      }, [B === "group" && E.caption, B === "expand" && E.id === "FILTER" && D.condition ? 1 : ""]), _]);
    }, Re = (E, D) => {
      E.stopPropagation(), E.preventDefault(), p.value.currentId = D, p.value.visible = !0;
    }, be = () => {
      if (!s.value) {
        n.value = null;
        return;
      }
      const E = i.value.find((D) => {
        const B = D.pssysbicubedimensionid || D.pssysbicubemeasureid;
        return B === n.value.pssysbicubedimensionid || B === n.value.pssysbicubemeasureid;
      });
      E && (Object.prototype.hasOwnProperty.call(E, "pssysbicubedimensionname") ? E.pssysbicubedimensionname = s.value : E.pssysbicubemeasurename = s.value), n.value = null, s.value = "", t("change", i.value);
    }, Ne = (E) => {
      E && E.code === "Enter" ? be() : E && E.code === "Escape" && (E.stopPropagation(), n.value = null, s.value = "");
    }, Be = (E, D) => {
      we(() => {
        c.value = !1, p.value.visible = !1, E.aggtype = D, t("extendChange", "".concat(X.AGGMODE, "@").concat(E.codename), D);
      });
    }, Pe = (E) => {
      if (E.bimeasuretype === "COMMON" || E.aggtype) {
        const D = Ii.find((B) => B.value === E.aggtype);
        if (D)
          return r("span", {
            class: e.em("aggmode", "text")
          }, [D.name]);
      }
      return null;
    }, ze = (E) => [Pe(E)], $e = (E) => [r("div", {
      class: e.e("actions"),
      ref: u
    }, [o.expandActions.map((B) => ye(B, E, "expand"))])], ke = (E) => E.pssysbicubemeasureid ? ze(E) : $e(E), Ge = (E) => {
      const D = [];
      if (E.bimeasuretype === "COMMON" || E.aggtype) {
        const B = r(S("bi-aggmode-select"), {
          item: E,
          value: E.aggtype,
          onChange: (z) => Be(E, z)
        }, null);
        D.push(B);
      }
      return D;
    }, Ve = (E, D) => {
      o.type === "dimension" && pe(E, "CONFIG", D);
    }, Ue = (E) => {
      if (o.type === "dimension") {
        const D = r("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          height: "1em",
          width: "1em",
          preserveAspectRatio: "xMidYMid meet",
          focusable: "false",
          fill: "currentColor"
        }, [r("g", {
          id: "bbhnormal/vertical-view-lines",
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [r("path", {
          d: "M4.092 8.854v-2c0-.163-.138-.3-.3-.3-.163 0-.3.137-.3.3v2c0 .163.137.3.3.3.162 0 .3-.137.3-.3zM14.869 7.3a.6.6 0 1 1 0 1.2H5.292v.354c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5V8.5H1.1a.6.6 0 0 1 0-1.2h1.192v-.446c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5V7.3h9.577zm-4.07-3.8v-2c0-.163-.139-.3-.3-.3-.164 0-.3.137-.3.3v2c0 .163.136.3.3.3.161 0 .3-.137.3-.3zm4.07-1.6a.6.6 0 1 1 0 1.2H12v.4c0 .825-.676 1.5-1.5 1.5-.826 0-1.5-.675-1.5-1.5v-.4H1.1a.6.6 0 1 1 0-1.2h7.898v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h2.871zM12.55 14.208v-2c0-.162-.138-.3-.3-.3-.162 0-.3.138-.3.3v2c0 .163.138.3.3.3.162 0 .3-.137.3-.3zm2.319-1.6a.6.6 0 0 1 0 1.201H13.75v.399c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-.399H1.1a.6.6 0 0 1 0-1.201h9.65v-.4c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v.4h1.119z",
          id: "bbh形状结合"
        }, null)])]);
        return r("div", {
          class: [e.em("actions", "group-item")],
          onPointerup: (B) => Ve(B, E)
        }, [D, r("span", null, [R("配置")])]);
      }
    }, G = (E, D = !1) => {
      const B = [];
      if (o.type !== "period" && Ce(E.stddatatype) && !D) {
        const z = Ue(E);
        B.push(z);
      }
      return B;
    }, qe = (E) => o.actions.map((D) => ye(D, E)), Di = (E) => {
      const D = [], B = Le(E);
      E.pssysbicubemeasureid ? D.push(...Ge(E)) : D.push(...G(E, !!B));
      const z = qe(E);
      return [B, ...D, ...z];
    }, xi = (E) => {
      const D = E.pssysbicubedimensionid || E.pssysbicubemeasureid, B = r("div", {
        class: e.em("content", "item")
      }, [r("div", {
        class: e.em("content", "item-icon")
      }, [ge(E)]), r("div", {
        class: e.em("content", "text")
      }, [E.pssysbicubemeasurename || E.pssysbicubedimensionname]), ke(E), r("div", {
        class: e.em("content", "icon")
      }, [r(S("el-popover"), {
        visible: p.value.visible && D === p.value.currentId,
        width: 200,
        placement: "right",
        "popper-class": e.e("actions-pop")
      }, {
        default: () => r("div", {
          class: e.e("actions")
        }, [Di(E)]),
        reference: () => r("span", {
          onPointerup: (_) => Re(_, D)
        }, [r("svg", {
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          height: "1em",
          width: "1em",
          focusable: "false",
          fill: "currentColor"
        }, [r("g", {
          id: "apr1.Base基础/1.icon图标/2.normal/more-vertical",
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [r("path", {
          d: "M8 4.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z",
          id: "apr形状结合"
        }, null)])])])
      })])]), z = r("div", {
        class: e.e("ediotr")
      }, [r(S("el-input"), {
        ref: (_) => {
          l.value = _;
        },
        modelValue: s.value,
        "onUpdate:modelValue": (_) => s.value = _,
        autofocus: !0,
        onKeydown: Ne,
        onBlur: be
      }, {
        prefix: () => r("span", {
          class: e.em("editor", "icon")
        }, [ge(E)])
      })]);
      return n.value && (n.value.pssysbicubemeasureid === D || n.value.pssysbicubedimensionid === D) ? z : B;
    }, Oi = (E) => {
      E.preventDefault();
    }, Mi = (E) => {
      E.preventDefault();
    }, Ai = (E) => {
      E.preventDefault();
    };
    W(() => o.value, (E) => {
      E ? i.value = o.value : i.value = [], h();
    }, {
      immediate: !0,
      deep: !0
    });
    const tt = () => {
      c.value || (p.value.visible = !1);
    }, Fi = () => {
      t("change", i.value);
    };
    return _e(() => {
      o.controller.evt.on("onDragTarget", (E) => {
        a.value = E, m.value = f(E).ok;
      }), w = ki(window, "keydown", (E) => {
        E.keyCode === 27 && (C == null || C.dismiss());
      }), window.addEventListener("pointerup", tt);
    }), He(() => {
      w !== at && w(), C == null || C.dismiss(), window.removeEventListener("pointerup", tt);
    }), {
      ns: e,
      onDrop: Ae,
      onDragenter: Oi,
      onDragleave: Mi,
      onDragover: Ai,
      renderItemText: xi,
      checkType: f,
      checkState: T,
      onMoveEnd: Fi,
      showDrag: m,
      items: i,
      uuid: d
    };
  },
  render() {
    var e;
    const o = [r("div", {
      class: [this.ns.e("no-select"), this.ns.is("empty_error", this.error && !this.error.ok)]
    }, [R("拖入"), this.caption]), r("div", {
      class: [this.ns.e("empty"), this.ns.is("error", this.error && !this.error.ok)]
    }, [(e = this.error) == null ? void 0 : e.msg])], t = r(ot, {
      modelValue: this.items,
      "onUpdate:modelValue": (i) => this.items = i,
      draggable: ".".concat(this.ns.e("item")),
      filter: ".".concat(this.ns.e("empty")),
      onEnd: this.onMoveEnd,
      "force-fallback": !0,
      "chosen-class": "chosenClass",
      animation: "300",
      group: this.uuid,
      "fallback-class": !0,
      "fallback-on-body": !0,
      sort: !0
    }, {
      item: (i) => {
        const {
          element: a
        } = i;
        return r("div", {
          class: this.ns.e("item")
        }, [this.renderItemText(a)]);
      }
    });
    return r("div", {
      class: [this.ns.b()],
      onDrop: this.onDrop,
      onDragenter: this.onDragenter,
      onDragleave: this.onDragleave,
      onDragover: this.onDragover
    }, [r("div", {
      class: [this.ns.e("content"), this.ns.is("draging", this.showDrag), this.ns.is("success", this.checkState().ok)]
    }, [this.items.length > 0 ? t : o]), r("div", {
      class: [this.ns.e("error-tip"), this.ns.is("visible", this.showDrag && !this.checkState().ok)]
    }, [this.checkState().msg])]);
  }
}), Ha = /* @__PURE__ */ V({
  name: "BIChartPqlEditorModal",
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    fieldIconMap: {
      type: Object,
      default: () => /* @__PURE__ */ new Map()
    },
    value: {
      type: String,
      default: ""
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object
    }
  },
  emits: {
    cancel: () => !0,
    confirm: (o) => !0
  },
  setup(o, {
    emit: t
  }) {
    const e = U("chart-pql-editor-modal"), i = F(o.value), a = F();
    return {
      ns: e,
      currentValue: i,
      pqlEditor: a,
      handleChange: (d) => {
        i.value = d;
      },
      handleCancel: (d) => {
        d.stopPropagation(), t("cancel");
      },
      handleConfirm: (d) => {
        var u, c;
        d.stopPropagation();
        try {
          if (a.value && !((c = (u = a.value).verify) == null ? void 0 : c.call(u)))
            return;
          t("confirm", i.value);
        } catch (C) {
          ibiz.log.error(C == null ? void 0 : C.message);
        }
      },
      renderItem: (d) => [r("div", {
        class: e.be("item", "icon")
      }, [o.fieldIconMap.get(d.value) === "measure" ? r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.236 9.9l.422-3.8H2.6a.6.6 0 1 1 0-1.2h2.19l.372-3.347a.6.6 0 1 1 1.192.133L5.998 4.9h4.793l.37-3.347a.6.6 0 0 1 1.193.133L11.998 4.9h2.459a.6.6 0 0 1 0 1.2h-2.592l-.421 3.8h2.013a.6.6 0 0 1 0 1.2H11.31l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H5.311l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H1.6a.6.6 0 0 1 0-1.2h2.636zm1.208 0h4.792l.422-3.8H5.865l-.421 3.8z"
      }, null)])]) : r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M9 1.2v4.974h1V3.2h2v2.974h1.5a1.5 1.5 0 0 1 1.5 1.5v5.784a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V7.674a1.5 1.5 0 0 1 1.5-1.5H4V3.2h2v2.974h1V1.2h2zM6 6.636H4v4.038h2V6.636zm1 4.038h2V6.636H7v4.038zm5-4.053h-2v4.053h2V6.621z"
      }, null)])])]), r("div", {
        class: e.be("item", "text")
      }, [d.label || ""])]
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.b("header")
    }, [R("PQL 筛选编辑器")]), r("div", {
      class: this.ns.b("content")
    }, [r(S("iBizPqlEditor"), {
      ref: "pqlEditor",
      class: this.ns.e("pql-editor"),
      placeholder: "输入筛选条件",
      value: this.currentValue,
      fields: this.fields,
      context: this.context,
      params: this.params,
      renderItem: this.renderItem,
      onChange: this.handleChange
    }, null)]), r("div", {
      class: this.ns.b("footer")
    }, [r(S("el-button"), {
      text: !0,
      onClick: this.handleCancel
    }, {
      default: () => [R("取消")]
    }), r(S("el-button"), {
      onClick: this.handleConfirm
    }, {
      default: () => [R("确认")]
    })])]);
  }
}), _a = /* @__PURE__ */ V({
  name: "BIChartPqlEditor",
  props: {
    controller: {
      type: Object,
      required: !0
    },
    value: {
      type: String,
      default: ""
    }
  },
  emits: {
    change: (o) => !0
  },
  setup(o, {
    emit: t
  }) {
    const e = U("chart-pql-editor");
    let i;
    const a = F(""), s = ["COMMON"], n = k(() => {
      var C, w;
      return [...(C = o.controller.state.measure) == null ? void 0 : C.filter((y) => s.includes(y.bimeasuretype)), ...(w = o.controller.state.dimension) == null ? void 0 : w.filter((y) => s.includes(y.bidimensiontype))];
    }), l = F([]), p = F(/* @__PURE__ */ new Map());
    W(() => n.value, async () => {
      var y;
      const C = await Promise.all(n.value.map(async (m) => {
        const g = await he(m, o.controller.state.schemaFields || []);
        return g && p.value.set(g.appDEFieldId, m.bimeasuretype ? "measure" : "dimension"), g;
      }));
      l.value = C.filter((m) => !!m);
      const w = (y = o.controller.state.selectCube) == null ? void 0 : y.psdename;
      if (w) {
        const m = await ibiz.hub.getAppDataEntity(w, o.controller.context.srfappid);
        m && l.value.forEach((g) => {
          g.appDataEntityFullTag = m.defullTag;
        });
      }
    }, {
      immediate: !0
    }), W(() => o.value, () => {
      a.value = o.value || "";
    }, {
      immediate: !0
    });
    const d = () => {
      i == null || i.dismiss();
    }, u = (C) => {
      a.value = C, i == null || i.dismiss(), t("change", a.value);
    };
    return {
      ns: e,
      fields: l,
      currentValue: a,
      openModal: async () => {
        i || (i = ibiz.overlay.createModal(() => te(Ha, {
          value: a.value,
          fields: l.value,
          fieldIconMap: p.value,
          context: o.controller.context,
          params: o.controller.viewParams,
          onCancel: d,
          onConfirm: u
        }), void 0, {
          width: "40%",
          height: "70%"
        }), await i.present(), await i.onWillDismiss(), i = void 0);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r(S("iBizPqlEditor"), {
      fields: this.fields,
      value: this.currentValue,
      readonly: !0,
      placeholder: "点击此处输入筛选条件",
      context: this.controller.context,
      params: this.controller.viewParams,
      onClick: (o) => {
        o.stopPropagation(), this.openModal();
      }
    }, null)]);
  }
});
function ve(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const qa = /* @__PURE__ */ V({
  name: "BIReportProperty",
  components: {
    "bi-chart-types": sa,
    "bi-drag-element": ja,
    "bi-collapse-item": ra,
    "bi-color-scheme": Ia,
    "bi-font-border-select": ci,
    "bi-position-select": wa,
    "bi-chart-pql-editor": _a
  },
  props: {
    controller: {
      type: Object,
      required: !0
    }
  },
  emits: ["reportChartTypeChange"],
  setup(o, {
    emit: t
  }) {
    const e = U("property"), i = o.controller, a = F({
      // 分组伸缩配置
      data: [],
      style: "",
      // 显示数据条数配置
      paginationVisible: !1
    }), s = k(() => i.state.selectChartType), n = k(() => i.state.reportChart), l = F("data"), p = (h) => {
      t("reportChartTypeChange", h.type);
    }, d = k(() => i.state.propertyData), u = k(() => i.state.error), c = k(() => {
      var h, f;
      return ((f = (h = n.value) == null ? void 0 : h.state) == null ? void 0 : f.propertyConfig) || {};
    });
    W(() => c.value, (h) => {
      h && h.data && (a.value.data = [], h.data.details.forEach((f) => {
        f.type === "GROUP" && a.value.data.push(f.id);
      })), h && h.style && (a.value.style = "", h.style.details.length > 0 && (a.value.style = h.style.details[0].id));
    }, {
      immediate: !0,
      deep: !0
    });
    const C = (h, f) => {
      i.setData(h, f);
    }, w = (h) => {
      h && h.code === "Escape" && h.stopPropagation();
    }, y = (h, f, T, I) => {
      var x, A;
      switch (T) {
        case "editMode":
          C(X.FILTERMODE, I);
          break;
        case "remove":
          if (f === "filter" && ((A = (x = d.value) == null ? void 0 : x.extend) == null ? void 0 : A.filterMode) === "pql") {
            C(X.PQLVALUE, "");
            return;
          }
          C("".concat(h, ".").concat(f), null);
          break;
      }
    }, m = (h, f = [], T = "") => f.map((I) => {
      var O, N, P, H, j, q, le, de, ce, Se, De, xe, Oe, Me, Ae, Fe, ge, pe, Le, ye, Re, be, Ne, Be, Pe, ze, $e, ke, Ge, Ve, Ue;
      let x, A;
      switch (I.editorType) {
        case "DRAG":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "drag")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, T === "filter" && ((N = (O = d.value) == null ? void 0 : O.extend) == null ? void 0 : N.filterMode) === "pql" ? r(S("bi-chart-pql-editor"), {
            value: (H = (P = d.value) == null ? void 0 : P.extend) == null ? void 0 : H.pqlValue,
            controller: i,
            onChange: (G) => {
              C(X.PQLVALUE, G);
            }
          }, null) : r(S("bi-drag-element"), {
            value: (j = d.value) == null ? void 0 : j[h][T],
            controller: i,
            caption: I.caption,
            subCaption: I.subCaption,
            multiple: I.multiple,
            type: I.id,
            actions: I.actions,
            expandActions: I.expandActions,
            error: (q = u.value) == null ? void 0 : q[T],
            onChange: (G) => {
              C("".concat(h, ".").concat(T), G);
            },
            onExtendChange: (G, qe) => {
              C(G, qe);
            }
          }, null)]);
        case "COLOR":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "color")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("bi-color-scheme"), {
            editorStyle: I.editorStyle,
            value: (le = d.value) == null ? void 0 : le[h][T],
            onChange: (G) => C("".concat(h, ".").concat(T), G)
          }, null)]);
        case "FONT":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "font")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("bi-font-border-select"), {
            value: (ce = (de = d.value) == null ? void 0 : de[h][T]) == null ? void 0 : ce[I.id],
            mode: I.mode,
            disabled: !((De = (Se = d.value) == null ? void 0 : Se[h][T]) != null && De.show),
            fontMax: I.fontMax,
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, null)]);
        case "CHECKBOX":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "checkbox")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("el-checkbox"), {
            "model-value": (Oe = (xe = d.value) == null ? void 0 : xe[h][T]) == null ? void 0 : Oe[I.id],
            disabled: !((Ae = (Me = d.value) == null ? void 0 : Me[h][T]) != null && Ae.show),
            label: I.caption,
            size: "large",
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, null)]);
        case "CHECKBOXS":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "checkboxs")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("el-checkbox-group"), {
            "model-value": (ge = (Fe = d.value) == null ? void 0 : Fe[h][T]) == null ? void 0 : ge[I.id],
            disabled: !((Le = (pe = d.value) == null ? void 0 : pe[h][T]) != null && Le.show),
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, ve(x = I.items.map((G) => r(S("el-checkbox"), {
            value: G.id,
            label: G.id,
            size: "default"
          }, {
            default: () => [G.label]
          }))) ? x : {
            default: () => [x]
          })]);
        case "RADIO":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "radio")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("el-radio-group"), {
            "model-value": (Re = (ye = d.value) == null ? void 0 : ye[h][T]) == null ? void 0 : Re[I.id],
            disabled: !((Ne = (be = d.value) == null ? void 0 : be[h][T]) != null && Ne.show),
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, ve(A = I.items.map((G) => r(S("el-radio"), {
            value: G.id,
            label: G.id,
            size: "default"
          }, {
            default: () => [G.label]
          }))) ? A : {
            default: () => [A]
          })]);
        case "POSITION":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "pos")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("bi-position-select"), {
            value: (Pe = (Be = d.value) == null ? void 0 : Be[h][T]) == null ? void 0 : Pe[I.id],
            disabled: !(($e = (ze = d.value) == null ? void 0 : ze[h][T]) != null && $e.show),
            editorStyle: I.editorStyle,
            showCenter: I.showCenter,
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, null)]);
        case "ENDPOINT":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "endpoint")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("el-input-number"), {
            modelValue: (Ge = (ke = d.value) == null ? void 0 : ke[h][T]) == null ? void 0 : Ge[I.id],
            min: 1,
            "controls-position": "right",
            onkeydown: w,
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, null)]);
        case "NUMBER":
          return r("div", {
            class: [e.em("chart-setting", "item"), e.em("chart-setting", "label-interval")]
          }, [I.showCaption ? r("div", {
            class: e.em("chart-setting", "label")
          }, [I.caption]) : null, r(S("el-input-number"), {
            modelValue: (Ue = (Ve = d.value) == null ? void 0 : Ve[h][T]) == null ? void 0 : Ue[I.id],
            min: 0,
            step: 1,
            precision: 0,
            "controls-position": "right",
            onkeydown: w,
            onChange: (G) => C("".concat(h, ".").concat(T, ".").concat(I.id), G)
          }, null)]);
        default:
          return r("div", {
            class: e.e("no-support")
          }, ["".concat((I.caption, T), "暂未实现")]);
      }
    }), g = (h, f = []) => f.map((T) => {
      var I, x, A, O;
      if (T.type === "GROUP") {
        let N;
        return r(S("bi-collapse-item"), {
          label: T.caption,
          required: T.required,
          name: T.id,
          enableSwitch: T.enableSwitch || !1,
          switchValue: (x = (I = d.value) == null ? void 0 : I[h][T.id]) == null ? void 0 : x.show,
          enableShowEmptyData: T.showEmptyData || !1,
          enableRemove: T.enableRemove || !1,
          enableEditMode: T.switchEditMode || !1,
          onSwitchChange: (P) => C("".concat(h, ".").concat(T.id, ".show"), P),
          editMode: (O = (A = d.value) == null ? void 0 : A.extend) == null ? void 0 : O.filterMode,
          onSvgClick: (P) => {
            y(h, T.id, P.mode, P.value);
          }
        }, ve(N = m(h, T.details, T.id)) ? N : {
          default: () => [N]
        });
      }
      return null;
    }), b = (h) => {
      a.value.paginationVisible = !1, C("data.size", h);
    };
    return {
      ns: e,
      onReportChartTypeChange: p,
      chartType: s,
      propertyConfig: c,
      selectTabValue: l,
      groupConfig: a,
      renderDetails: g,
      renderPagination: () => r("div", {
        class: e.e("chart-pagination")
      }, [r("span", {
        class: e.em("chart-pagination", "caption")
      }, [R("显示条数:")]), r(S("el-popover"), {
        visible: a.value.paginationVisible,
        "onUpdate:visible": (h) => a.value.paginationVisible = h,
        trigger: "click",
        placement: "top-start",
        width: 240,
        "popper-class": e.em("chart-pagination", "list")
      }, {
        reference: () => {
          var h;
          return r("span", {
            class: e.em("chart-pagination", "size")
          }, [r("span", {
            class: e.em("chart-pagination", "pagination-number")
          }, [((h = d.value) == null ? void 0 : h.data.size) || 100]), r("span", {
            class: e.em("chart-pagination", "icon")
          }, [r("span", null, [R("条")]), r("svg", {
            viewBox: "0 0 16 16",
            xmlns: "http://www.w3.org/2000/svg",
            height: "1em",
            width: "1em",
            fill: "currentColor"
          }, [r("g", {
            id: "aaynavigation/angle-down",
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, [r("path", {
            d: "M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z",
            id: "aay形状结合"
          }, null)])])])]);
        },
        default: () => [10, 50, 100, 1e3, 5e3].map((h) => {
          var f;
          return r("div", {
            class: [e.em("chart-pagination", "pagination-item"), e.is("selected", h === ((f = d.value) == null ? void 0 : f.data.size))],
            onClick: () => {
              b(h);
            }
          }, [h]);
        })
      })])
    };
  },
  render() {
    return r("div", {
      class: this.ns.b("container")
    }, [r("div", {
      class: this.ns.e("caption")
    }, [R("图表类型")]), r("div", {
      class: this.ns.e("chart-types")
    }, [r(S("bi-chart-types"), {
      onSelect: this.onReportChartTypeChange,
      chartType: this.chartType
    }, null)]), r("div", {
      class: [this.ns.e("style-select"), this.ns.is("style", this.selectTabValue === "style")]
    }, [r(S("el-tabs"), {
      modelValue: this.selectTabValue,
      "onUpdate:modelValue": (o) => this.selectTabValue = o,
      type: "card"
    }, {
      default: () => [r(S("el-tab-pane"), {
        name: "data"
      }, {
        default: () => {
          var t, e;
          let o;
          return r("div", {
            class: this.ns.e("chart-setting")
          }, [r(S("el-collapse"), {
            class: this.ns.b("editor-collapse"),
            accordion: !1,
            modelValue: this.groupConfig.data,
            "onUpdate:modelValue": (i) => this.groupConfig.data = i
          }, ve(o = this.renderDetails("data", (e = (t = this.propertyConfig) == null ? void 0 : t.data) == null ? void 0 : e.details)) ? o : {
            default: () => [o]
          })]);
        },
        label: () => r("div", {
          class: this.ns.e("data")
        }, [R("数据")])
      }), r(S("el-tab-pane"), {
        name: "style"
      }, {
        default: () => {
          var t, e;
          let o;
          return r("div", {
            class: this.ns.e("chart-setting")
          }, [r(S("el-collapse"), {
            class: this.ns.b("editor-collapse"),
            accordion: !0,
            modelValue: this.groupConfig.style,
            "onUpdate:modelValue": (i) => this.groupConfig.style = i
          }, ve(o = this.renderDetails("style", (e = (t = this.propertyConfig) == null ? void 0 : t.style) == null ? void 0 : e.details)) ? o : {
            default: () => [o]
          })]);
        },
        label: () => r("div", {
          class: this.ns.e("style")
        }, [R("样式")])
      })]
    })])]);
  }
});
class Xa {
  constructor() {
    /**
     * 适配器存储Map
     *
     * @author tony001
     * @date 2024-05-21 15:05:30
     * @protected
     * @type {Map<string, NewProvider>}
     */
    M(this, "providers", /* @__PURE__ */ new Map());
  }
  /**
   * 注册适配器
   *
   * @author tony001
   * @date 2024-05-21 15:05:47
   * @param {string} key
   * @param {NewProvider} newProvider
   */
  register(t, e) {
    this.providers.set(t, e);
  }
  /**
   * 注销适配器
   *
   * @author tony001
   * @date 2024-05-21 15:05:22
   * @param {string} key
   */
  unRegister(t) {
    this.providers.delete(t);
  }
  /**
   * 获取注册器
   *
   * @author tony001
   * @date 2024-05-21 15:05:53
   * @param {string} key
   * @param {...Parameters<NewProvider>} args
   * @return {*}  {(IReportChartProvider | undefined)}
   */
  get(t, ...e) {
    const i = this.providers.get(t);
    if (i)
      return i(...e);
  }
}
const wi = "REPORT_CHART", Ti = new Xa();
function Y(o, t) {
  Ti.register("".concat(wi, "_").concat(o), t);
}
function dt(o) {
  return Ti.get(
    "".concat(wi, "_").concat(o)
  );
}
class Ja {
  /**
   * Creates an instance of BIVerifyController.
   * @param {ISchemaField[]} schemaFields
   * @param {IData[]} config 传递的是配置里的data.details
   * @memberof BIVerifyController
   */
  constructor() {
    /**
     * 校验规则Map
     *
     * @private
     * @memberof BIVerifyController
     */
    M(this, "verifyMap", /* @__PURE__ */ new Map());
    /**
     * 当前图表类型属性配置
     *
     * @private
     * @type {IData}
     * @memberof BIVerifyController
     */
    M(this, "config", {});
    /**
     * 当前Schema数据集
     *
     * @private
     * @type {Array<ISchemaField>}
     * @memberof BIVerifyController
     */
    M(this, "schemaFields", []);
    this.initVerifyMap();
  }
  /**
   * 初始化校验规则
   *
   * @private
   * @memberof BIVerifyController
   */
  initVerifyMap() {
    this.verifyMap.set("ENABLECALC", this.checkEnableDragCalcField), this.verifyMap.set("MAXLIMIT", this.checkLimit), this.verifyMap.set("TYPELIMIT", this.checkTypeLimit), this.verifyMap.set("REQUIRE", this.checkRequire);
  }
  /**
   * 初始化schemaFields属性和图表配置
   *
   * @param {Array<ISchemaField>} schemaFields
   * @param {IData} [config={}]
   * @memberof BIVerifyController
   */
  init(t, e = {}) {
    this.schemaFields = t, this.config = e;
  }
  /**
   * 根据传递的标识校验错误
   *
   * @param {string} name
   * @param {unknown} value
   * @param {string[]} tags
   * @return {*}
   * @memberof BIVerifyController
   */
  verifyState(t, e, i, a) {
    let s = ["ENABLECALC", "MAXLIMIT", "TYPELIMIT", "REQUIRE"], n = {
      ok: !0,
      msg: ""
    };
    return i && i.length !== 0 && (s = i), s.some((l) => {
      const p = this.verifyMap.get(l);
      if (p) {
        const d = p(t, e, this.schemaFields, this.config, {
          ...a,
          that: this
        });
        if (d && !d.ok)
          return n = d, !0;
      }
      return !1;
    }), n;
  }
  /**
   * 检查是否符合必填要求
   *
   * @private
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIVerifyController
   */
  checkRequire(t, e, i, a, s) {
    const n = a.details.find((l) => l.id === t);
    return n && n.required && (!e || e && Array.isArray(e) && e.length === 0) ? {
      ok: !1,
      msg: "".concat(n.caption.split("/")[0], "不能为空")
    } : {
      ok: !0,
      msg: ""
    };
  }
  /**
   * 检查是否达到最大选择数量
   *
   * @private
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}  {{
   *     ok: boolean;
   *     msg: string;
   *   }}
   * @memberof BIVerifyController
   */
  checkLimit(t, e, i, a, s) {
    const n = a.details.find((d) => d.id === t), l = {
      ok: !0,
      msg: ""
    };
    if (!n)
      return l;
    const p = n.details[0];
    return !p || !p.multiple ? l : e && Array.isArray(e) && e.length >= p.max ? {
      ok: !1,
      msg: "".concat(p.caption.split("/")[0], "最多支持").concat(p.max, "个")
    } : l;
  }
  /**
   * 校验拖入类型是否符合配置要求
   *
   * @private
   * @param {IData} args
   * @return {*}  {{
   *     ok: boolean;
   *     msg: string;
   *   }}
   * @memberof BIVerifyController
   */
  checkTypeLimit(t, e, i, a, s) {
    var b;
    const { targetItem: n, that: l } = s, p = a.details.find((v) => v.id === t), d = {
      ok: !0,
      msg: ""
    };
    if (!p || !n)
      return d;
    const u = p.details[0];
    if (!u.typeLimit)
      return d;
    const c = {
      ok: !1,
      msg: "该维度不支持".concat(u.subCaption || u.caption)
    }, C = (b = n == null ? void 0 : n.psdefid) == null ? void 0 : b.split(".").at(-1), { tag: w, types: y } = u.typeLimit;
    if (y.includes("DATE")) {
      const v = l.checkIsDate(n);
      if (w === "IN" && v)
        return d;
      if (w === "NOTIN" && v)
        return c;
    }
    const m = i.find((v) => v.appDEFieldId === C);
    if (!m)
      return c;
    let g = y.includes(m.type.toUpperCase());
    return w === "NOTIN" && (g = !g), g ? d : c;
  }
  /**
   * 判断的当前项是否为日期项
   *
   * @private
   * @param {IData} item
   * @return {*}
   * @memberof BIVerifyController
   */
  checkIsDate(t) {
    return !!(t && (t.stddatatype === 27 || t.stddatatype === 5));
  }
  /**
   * 检查是否允许拖入计算属性
   *
   * @private
   * @param {string} name
   * @param {unknown} _value
   * @param {ISchemaField[]} _schemaFields
   * @param {IData} _config
   * @param {IData} _opts
   * @memberof BIVerifyController
   */
  checkEnableDragCalcField(t, e, i, a, s) {
    const n = a.details.find((c) => c.id === t), l = {
      ok: !0,
      msg: ""
    };
    if (!n)
      return l;
    const p = n.details[0];
    if (!p.disableCalcField)
      return l;
    const d = {
      ok: !1,
      msg: "该维度不支持".concat(p.subCaption || p.caption)
    }, { targetItem: u } = s;
    return u && u.bidimensiontype && u.bidimensiontype !== "COMMON" && p.disableCalcField ? d : l;
  }
}
class Wa {
  /**
   * Creates an instance of BIReportDesignController.
   * @author tony001
   * @date 2024-06-04 23:06:51
   */
  constructor(t, e, i, a, s, n) {
    /**
     * 事件对象
     *
     * @author tony001
     * @date 2024-06-04 23:06:05
     */
    M(this, "evt", new da());
    /**
     * 当前环境全部数据
     *
     * @private
     * @type {IAppBICubeData[]}
     * @memberof BIReportDesignController
     */
    M(this, "allAppBICubes", []);
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-05-21 16:05:58
     * @type {IBIReportDesignState}
     */
    M(this, "state");
    /**
     * 备份数据
     *
     * @type {IData}
     * @memberof BIReportDesignController
     */
    M(this, "backupData", {});
    /**
     * 校验控制器
     *
     * @type {(BIVerifyController | undefined)}
     * @memberof BIReportDesignController
     */
    M(this, "verifyController");
    this.context = t, this.viewParams = e, this.config = i, this.dismiss = a, this.measureToolbar = s, this.dimensionToolbar = n, this.verifyController = new Ja(), this.initState();
  }
  /**
   * 获取默认值
   *
   * @private
   * @param {string} selectChartType
   * @param {IData | undefined} inputPropertyData
   * @return {*}  {IData}
   * @memberof BIReportDesignController
   */
  getDefaultValue(t, e) {
    const { chartDefaultValue: i, chartConfig: a } = je(t), s = $(i);
    return e && Object.keys(e).length > 0 && Object.keys(e).forEach((n) => {
      n === "data" ? Object.keys(e.data).forEach((l) => {
        var p;
        if (Object.prototype.hasOwnProperty.call(s.data, l)) {
          const d = a == null ? void 0 : a.data.details.find((u) => u.id === l);
          if (!d)
            return;
          d && d.details[0].multiple ? s.data[l] = e.data[l] : s.data[l] = (p = e.data[l]) == null ? void 0 : p.slice(0, 1);
        }
      }) : s[n] = e[n];
    }), s;
  }
  /**
   * 初始化状态
   *
   * @author tony001
   * @date 2024-06-05 14:06:54
   */
  initState() {
    const { selectChartType: t } = this.config;
    this.state = {}, this.state.isCreated = !1, this.state.scheme = [], this.state.selectedScheme = void 0, this.state.cube = [], this.state.selectCube = void 0, this.state.measure = [], this.state.dimension = [], this.state.selectChartType = t, this.state.propertyData = this.getDefaultValue(
      this.config.selectChartType,
      this.config.propertyData
    ), this.state.reportChart = void 0, this.state.schemaFields = [], this.state.dataChangeState = !1, this.state.reportModel = void 0, this.state.error = {};
  }
  /**
   * 校验各种错误状态
   *
   * @param {string} name
   * @param {unknown} value
   * @param {string[]} tag
   * @param {IData} [opts]
   * @return {*}  {IData}
   * @memberof BIReportDesignController
   */
  verifyErrorState(t, e, i, a) {
    return this.verifyController.verifyState(t, e, i, a);
  }
  /**
   * 初始化错误状态
   *
   * @return {*}
   * @memberof BIReportDesignController
   */
  initErrorState() {
    this.state.error = {};
    const { chartConfig: t } = je(this.state.selectChartType);
    if (!t)
      return;
    const e = t.data;
    if (!e || !e.details)
      return;
    const i = e.details.filter((a) => a.required === !0);
    !i || i.length === 0 || i.forEach((a) => {
      this.state.error[a.id] = {
        ok: !0,
        // 判断默认是否有值,true是检查通过，false表示不通过
        msg: ""
      };
    });
  }
  /**
   * 设置属性数据并备份
   *
   * @param {IData} data
   * @memberof BIReportDesignController
   */
  setBackUpData(t) {
    this.backupData = $({
      propertyData: t,
      selectChartType: this.state.selectChartType,
      selectCube: this.state.selectCube
    });
  }
  /**
   * 创建
   *
   * @author tony001
   * @date 2024-05-21 16:05:31
   */
  async created() {
    await this.fetchSchemeDetails(), await this.mergeSourceParams(), this.setBackUpData(this.state.propertyData);
    const t = await this.compileAppBIReport(this.state.propertyData);
    t && (this.state.reportModel = t), await this.initFilters(), this.initVerifyState(), this.state.isCreated = !0;
  }
  /**
   * 合并原始参数（指标和维度）
   *
   * @author tony001
   * @date 2024-07-23 23:07:02
   * @return {*}  {Promise<void>}
   */
  async mergeSourceParams() {
    const t = this.state.propertyData.data;
    t && t.measure && t.measure.length > 0 && t.measure.forEach((e, i) => {
      const a = this.state.measure.find(
        (s) => s.pssysbicubemeasureid === e.pssysbicubemeasureid
      );
      a && (this.state.propertyData.data.measure[i] = Object.assign(
        $(a),
        e
      ));
    }), t && t.dimension && t.dimension.length > 0 && t.dimension.forEach((e, i) => {
      const a = this.state.dimension.find(
        (s) => s.pssysbicubedimensionid === e.pssysbicubedimensionid
      );
      a && (this.state.propertyData.data.dimension[i] = Object.assign(
        $(a),
        e
      ));
    });
  }
  /**
   * 销毁
   *
   * @author tony001
   * @date 2024-05-21 17:05:09
   */
  async destroyed() {
  }
  /**
   * 获取报表体系详情
   *
   * @author tony001
   * @date 2024-06-05 15:06:12
   * @return {*}  {Promise<void>}
   */
  async fetchSchemeDetails() {
    const { selectCubeId: t } = this.config;
    this.allAppBICubes = await this.fetchCube();
    const e = {};
    if (this.allAppBICubes && this.allAppBICubes.length > 0) {
      if (this.allAppBICubes.forEach((i) => {
        const a = {
          id: i.pssysbischemeid,
          name: i.pssysbischemename
        };
        t === i.pssysbicubeid && (this.state.selectedScheme = a, this.state.selectCube = i, this.context.pssysbicube = i.pssysbicubeid), e[i.pssysbischemeid] = a;
      }), this.state.scheme = Object.values(e), !this.state.selectedScheme && this.state.scheme.length > 0 && (this.state.selectedScheme = this.state.scheme[0]), !this.state.selectedScheme || (this.state.cube = this.allAppBICubes.filter((i) => i.pssysbischemeid === this.state.selectedScheme.id), !this.state.selectCube && this.state.cube.length > 0 && (this.state.selectCube = this.state.cube[0], this.context.pssysbicube = this.state.selectCube.pssysbicubeid), !this.context.pssysbicube))
        return;
      this.state.measure = await this.fetchCubeMeasure(
        this.context.pssysbicube
      ), this.state.dimension = await this.fetchCubeDimension(
        this.context.pssysbicube
      );
    }
  }
  /**
   * 初始化过滤项集合
   *
   * @return {*}  {Promise<void>}
   * @memberof BIReportDesignController
   */
  async initFilters() {
    const { selectCube: t } = this.state;
    let e = [];
    if (t) {
      const i = await gi(t.psdename);
      i && (e = await yi(i));
    }
    this.state.schemaFields = e;
  }
  /**
   * 获取立方体数据
   *
   * @author tony001
   * @date 2024-06-04 18:06:48
   * @return {*}  {Promise<IAppBICube[]>}
   */
  async fetchCube() {
    return (await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicube",
      "fetchdefault",
      this.context,
      this.viewParams
    )).data || [];
  }
  /**
   * 获取立方体指标数据
   *
   * @param {string} cubeid
   * @return {*}  {Promise<IAppBICubeMeasureData[]>}
   * @memberof BIReportDesignController
   */
  async fetchCubeMeasure(t) {
    const e = {
      ...this.viewParams,
      n_pssysbicubeid_eq: t,
      size: 1e3
    };
    return (await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicubemeasure",
      "fetchdefault",
      this.context,
      e
    )).data || [];
  }
  /**
   * 获取立方体维度数据
   *
   * @param {string} cubeid
   * @return {*}  {Promise<IAppBICubeDimensionData[]>}
   * @memberof BIReportDesignController
   */
  async fetchCubeDimension(t) {
    const e = {
      ...this.viewParams,
      n_pssysbicubeid_eq: t,
      size: 1e3
    };
    return (await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicubedimension",
      "fetchdefault",
      this.context,
      e
    )).data || [];
  }
  /**
   * 刷新立方体子数据（指标或者维度）
   *
   * @param {('measure' | 'dimension')} type
   * @return {*}  {Promise<void>}
   * @memberof BIReportDesignController
   */
  async refreshCubeDetails(t) {
    t && (t === "measure" && (this.state.measure = await this.fetchCubeMeasure(
      this.context.pssysbicube
    )), t === "dimension" && (this.state.dimension = await this.fetchCubeDimension(
      this.context.pssysbicube
    )));
  }
  /**
   * 编译报表
   *
   * @return {*}  {Promise<IAppBIReport>}
   * @memberof BIReportDesignController
   */
  async compileAppBIReport(t) {
    const e = $(this.context);
    Object.assign(e, { pssysbireport: "__UNKNOWN__" });
    const i = await ibiz.util.biReport.translateDataToAppBIReport({
      reportTag: this.config.reportTag,
      selectChartType: this.state.selectChartType,
      selectCubeId: this.state.selectCube.pssysbicubeid,
      caption: t.caption,
      data: t.data,
      style: t.style,
      extend: t.extend
    }), s = await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbireport",
      "compileappbireport",
      e,
      i
    );
    if (s && s.data) {
      const n = await ibiz.hub.translationModelToDsl(
        s.data,
        "APPBIREPORT"
      );
      return n.appBISchemeId = this.config.selectedSchemeId, n;
    }
  }
  /**
   * 计算报表模型
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}  {Promise<IData>}
   * @memberof BIReportDesignController
   */
  async computeAppBIReportModel(t, e) {
    var a, s, n, l;
    let i = {};
    if (t === "caption" && (i.name = e), t.startsWith("style")) {
      const p = {
        selectChartType: this.state.selectChartType,
        style: this.state.propertyData.style
      };
      if ((a = this.state.propertyData.data) != null && a.filter && Object.assign(p, {
        filter: this.state.propertyData.data.filter
      }), (s = this.state.propertyData.data) != null && s.period && Object.assign(p, {
        period: this.state.propertyData.data.period
      }), ((l = (n = this.state.propertyData.data) == null ? void 0 : n.group) == null ? void 0 : l.length) > 0) {
        const d = this.state.propertyData.data.group.map(
          (u) => u.pssysbicubedimensionid
        );
        Object.assign(p, { group: d });
      }
      this.state.propertyData.extend && Object.assign(p, {
        extend: this.state.propertyData.extend
      }), i.reportUIModel = JSON.stringify(p);
    }
    return t.startsWith("data") && (i = await this.compileAppBIReport(this.state.propertyData) || {}), i;
  }
  /**
   * 校验必填检查状态
   *
   * @param {string} name
   * @param {unknown} value
   * @memberof BIReportDesignController
   */
  checkData(t, e) {
    this.state.error[t] = this.verifyErrorState(t, e, ["REQUIRE"]);
  }
  /**
   * 设置值
   *
   * @author tony001
   * @date 2024-06-12 17:06:22
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}  {Promise<void>}
   */
  async setData(t, e) {
    if (t.indexOf(".") !== -1) {
      const a = t.split(".");
      let s = this.state.propertyData;
      for (const l of a.slice(0, -1))
        s = s[l];
      const n = a[a.length - 1];
      e === null ? delete s[n] : s[n] = e, this.checkData(n, e);
    } else
      this.state.propertyData[t] = e;
    this.state.dataChangeState = !0;
    const i = this.state.reportChart;
    if (i) {
      const a = await this.computeAppBIReportModel(t, e);
      await i.handleValueChange(t, e, a);
    }
  }
  /**
   * 切换报表体系
   *
   * @author tony001
   * @date 2024-06-04 18:06:25
   * @param {string} tag
   * @return {*}  {Promise<void>}
   */
  async switchScheme(t) {
    if (this.state.scheme.length === 0)
      return;
    const e = this.state.scheme.find((a) => a.id === t);
    if (!e)
      return;
    this.state.selectedScheme = e;
    const i = this.allAppBICubes.filter((a) => a.pssysbischemeid === e.id);
    if (this.state.cube = i || [], this.state.cube.length === 0) {
      this.state.selectCube = void 0, delete this.context.pssysbicube;
      return;
    }
    if (this.state.selectCube = this.state.cube[0], this.context.pssysbicube = this.state.selectCube.pssysbicubeid, !this.context.pssysbicube) {
      this.state.measure = [], this.state.dimension = [];
      return;
    }
    this.state.measure = await this.fetchCubeMeasure(this.context.pssysbicube), this.state.dimension = await this.fetchCubeDimension(
      this.context.pssysbicube
    );
  }
  /**
   * 切换立方体
   *
   * @author tony001
   * @date 2024-06-04 18:06:48
   * @return {*}  {Promise<void>}
   */
  async switchCube(t) {
    if (!t)
      return;
    const e = this.allAppBICubes.find((i) => i.pssysbicubeid === t);
    if (!e) {
      this.state.selectCube = void 0, delete this.context.pssysbicube;
      return;
    }
    if (this.state.selectCube = e, this.context.pssysbicube = this.state.selectCube.pssysbicubeid, !this.context.pssysbicube) {
      this.state.measure = [], this.state.dimension = [];
      return;
    }
    this.state.measure = await this.fetchCubeMeasure(this.context.pssysbicube), this.state.dimension = await this.fetchCubeDimension(
      this.context.pssysbicube
    ), this.evt.emit("onSelectedCube", { tag: t }), await this.initFilters(), this.initVerifyState(), await this.switchReportType(this.state.selectChartType, !1);
  }
  /**
   * 初始化校验状态
   *
   * @memberof BIReportDesignController
   */
  initVerifyState() {
    var e;
    this.initErrorState();
    const { chartConfig: t } = je(this.state.selectChartType);
    (e = this.verifyController) == null || e.init(this.state.schemaFields, t.data);
  }
  /**
   * 切换图表类型
   *
   * @author tony001
   * @date 2024-06-06 00:06:27
   * @param {ChartType} tag
   * @return {*}  {Promise<void>}
   */
  async switchReportType(t, e = !0) {
    this.state.reportModel = void 0, this.state.dataChangeState = !0, this.state.selectChartType = t;
    const i = $(this.state.propertyData), a = {
      caption: i.caption
    };
    e && Object.assign(a, { data: i.data });
    const s = this.getDefaultValue(t, a), n = await this.compileAppBIReport(s);
    n && (this.state.reportModel = n, this.state.propertyData = s), this.initVerifyState(), this.evt.emit("onSelectedReportType", { tag: t });
  }
  /**
   * 设置报表图表控制器
   *
   * @author tony001
   * @date 2024-06-04 23:06:08
   * @param {(IBIReportChartController | undefined)} reportChart
   * @return {*}  {Promise<void>}
   */
  async setReportChart(t) {
    this.state.reportChart = t;
  }
  /**
   * 关闭
   *
   * @author tony001
   * @date 2024-06-20 13:06:17
   * @return {*}  {Promise<void>}
   */
  async close() {
    if (this.state.dataChangeState) {
      const t = await ibiz.confirm.warning({
        title: "确认返回",
        desc: "返回则无法保存编辑的信息。"
      });
      this.dismiss && t && this.dismiss({ ok: !0, data: [] });
    } else
      this.dismiss && this.dismiss({ ok: !0, data: [] });
  }
  /**
   * 保存数据
   *
   * @author tony001
   * @date 2024-06-20 13:06:28
   * @return {*}  {Promise<void>}
   */
  async save() {
    const t = { ok: !1 }, e = this.state.reportChart;
    if (e && !await e.checkData())
      return;
    const i = {
      reportTag: this.config.reportTag,
      selectChartType: this.state.selectChartType,
      selectCubeId: this.state.selectCube.pssysbicubeid,
      caption: this.state.propertyData.caption,
      data: this.state.propertyData.data,
      style: this.state.propertyData.style,
      extend: this.state.propertyData.extend
    }, a = await ibiz.util.biReport.translateDataToAppBIReport(i), s = $(this.context), n = ibiz.hub.getApp(ibiz.env.appId);
    try {
      const l = await n.deService.exec(
        "pssysbireport",
        "update",
        s,
        a
      );
      l && l.data && (t.data = l.data, this.setBackUpData(this.state.propertyData), ibiz.message.success("保存成功")), this.state.dataChangeState = !1;
    } catch (l) {
      throw new ne(l.message);
    }
    this.dismiss && this.dismiss(t);
  }
  /**
   * 取消保存
   *
   * @author tony001
   * @date 2024-06-20 13:06:39
   * @return {*}  {Promise<void>}
   */
  async cancel() {
    if (this.state.dataChangeState) {
      this.state.reportModel = void 0;
      const { propertyData: t, selectChartType: e, selectCube: i } = $(
        this.backupData
      );
      this.state.propertyData = t, this.state.selectChartType = e, this.state.selectCube = i;
      const a = await this.compileAppBIReport(t);
      a && (this.state.reportModel = a), this.state.dataChangeState = !1, $(this.backupData);
    }
  }
  /**
   * @description 获取操作项行为
   * @param {IData} item
   * @param {IUIActionGroupDetail[]} uiactionGroupDetails
   * @return {*}  {ButtonContainerState}
   * @memberof BIReportDesignController
   */
  getOptItemAction(t, e) {
    const i = new _i();
    return e != null && e.length ? (e.forEach((a) => {
      const s = a.uiactionId;
      if (s) {
        const n = new qi(
          a.id,
          this.context.srfappid,
          s
        );
        i.addState(a.id, n);
      }
    }), i.update(this.context, t), i) : (ibiz.log.debug(
      ibiz.i18n.t(
        "runtime.controller.control.dataView.noBehaviourGroupAction"
      )
    ), i);
  }
}
class Q {
  /**
   * Creates an instance of BaseConverter.
   * @param {IBIReportChartController} controller
   * @memberof BaseConverter
   */
  constructor(t) {
    /**
     * 图例间隔
     *
     * @type {number}
     * @memberof BaseConverter
     */
    M(this, "legendGap", 20);
    this.controller = t;
  }
  /**
   * 转化数据到模型
   *
   * @author tony001
   * @date 2024-06-25 17:06:45
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {(IData | undefined)} [opts]
   * @return {*}  {(Promise<IModel | undefined>)}
   */
  async translateDataToModel(t, e, i) {
    throw new Error("Method not implemented.");
  }
  /**
   * 获取图例参数
   *
   * @type {number}
   * @memberof BaseConverter
   */
  getLegendOPtions(t) {
    const e = {
      type: "scroll"
    };
    return (t === "left" || t === "right") && (e.orient = "vertical", e[t] = this.legendGap, e.top = "middle"), (t === "top" || t === "bottom") && (e.left = "center", e.top = t), t === "left-top" && (e.left = this.legendGap, e.top = "top"), t === "right-top" && (e.right = this.legendGap, e.top = "top"), t === "left-bottom" && (e.left = this.legendGap, e.top = "bottom"), t === "right-bottom" && (e.right = this.legendGap, e.top = "bottom"), e;
  }
  /**
   * 获取图表默认配置
   *
   * @type {number}
   * @memberof BaseConverter
   */
  getDefaultGridOptions(t = "") {
    const e = {
      show: !1,
      left: "5%",
      right: "5%"
    };
    return ["left-top", "right-top", "top"].includes(t) && (e.bottom = 70), ["left-bottom", "right-bottom", "bottom"].includes(t) && (e.top = 30), t === "left" && (e.top = 30, e.bottom = 70, e.right = 0), t === "right" && (e.top = 30, e.bottom = 70, e.let = 0), JSON.stringify(e);
  }
  /**
   * @description x轴标签
   * @return {*}
   * @memberof BaseConverter
   */
  axisLabel() {
    const t = {};
    return t.formatter = "function(param) {\n      if (param && param.includes(' ')) {\n        const time = new Date(param);\n        if (time.toString() !== 'Invalid Date') {\n          return time.toLocaleDateString().replaceAll('/','-');\n        }\n      }\n      return param.split('_').pop();\n    }", t;
  }
  /**
   * 使用间隔的时候加上省略限制
   *
   * @param {boolean} [tag=false]
   * @return {*}
   * @memberof BaseConverter
   */
  computeLabelEllipsis(t = !1, e = 1) {
    return t ? {
      width: 60 * (e > 0 ? e : 1),
      overflow: "truncate",
      ellipsis: "..."
    } : {};
  }
  /**
   * 计算轴应用
   *
   * @param {IData} series
   * @param {IData} uiModel
   * @param {boolean} [isRow=false]
   * @return {*}
   * @memberof BaseConverter
   */
  computeAxisLayout(t, e, i = !1) {
    var s;
    return ((s = e.extend) == null ? void 0 : s["axis@".concat(t.valueField)]) === "RIGHT" ? i ? { "EC.xAxisIndex": 1 } : { "EC.yAxisIndex": 1 } : {};
  }
}
class Ya extends Q {
  /**
   * 翻译数据到模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof GaugeConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var p, d;
    const { appDataEntityId: a, items: s, mode: n } = i;
    if (!a || !e || !t)
      return;
    if (!t.appBIReportMeasures)
      return e;
    const l = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name,
      catalog: "$catalog",
      value: (p = t.appBIReportMeasures) == null ? void 0 : p[0].measureTag
    };
    if (J(e, (u) => Z(u, l)), t) {
      const { params: u, seriesParams: c } = this.transform(t, s);
      Object.assign(e, { userParam: u }), (d = e.dechartSerieses) == null || d.forEach((C) => {
        Object.assign(C, {
          userParam: c
        });
      });
    }
    if (n === "CONTENT") {
      const u = t.appBIReportMeasures.map(
        (c) => ({
          name: c.measureTag,
          isDrill: !!c.drillDetailAppViewId
        })
      );
      Object.assign(e, {
        controlParam: {
          ctrlParams: { ENABLEDRILLDETAIL: u }
        }
      });
    }
    return e;
  }
  /**
   * 转换模型自定义参数
   *
   * @param {IAppBIReport} config
   * @param {IData[]} _items
   * @return {*}  {IChartModelParams}
   * @memberof GaugeConverter
   */
  transform(t, e) {
    const i = {
      "EC.color": JSON.stringify([])
    }, { reportUIModel: a, appBIReportMeasures: s } = t;
    let n = !1;
    s[0].jsonFormat && (n = !0);
    const l = {
      "EC.type": "gauge",
      "EC.radius": "90%",
      "EC.startAngle": "220",
      "EC.endAngle": "-40",
      "EC.splitNumber": "4",
      "EC.tooltip": "{\n        formatter:function(param){\n          let value = param.value[0];\n          if(".concat(n, "){\n            value = ibiz.util.text.format(String(value), '").concat(s[0].jsonFormat, '\') || value;\n          }\n          return "<div style=\'min-width:150px\'><div>"+ param.seriesId +"</div><div><span style=\'margin-right:16px\'>"+ param.marker + param.name+"</span>"+ value+"</div></div>"\n        }\n      }'),
      "EC.axisTick": '{"splitNumber":5,"distance":5,"lineStyle":{"width":2,"color":"#ddd"}}',
      "EC.splitLine": '{"length":10,"distance":5,"lineStyle":{"width":2,"color":"#ddd"}}',
      "EC.title": '{"show":false}',
      "EC.pointer": '{"length":"50%"}',
      "EC.detail": '{"offsetCenter":[0,"60%"]}',
      "EC.progress": '{"show":true,"width":60}',
      "EC.axisLine": '{"lineStyle":{"width":60,"color":[[1,"rgb(245, 245, 245)"]]}}',
      "EC.axisLabel": '{"distance":76,"color":"#333","fontSize":12,"formatter": "function (num){return (num * 100) / 100 + `%` }"}'
    }, p = {};
    let d;
    if (a) {
      const u = JSON.parse(a);
      u.style && (d = u.style);
    }
    if (d) {
      const { graphics: u, fontSetting: c, featureSetting: C } = d;
      if (u && (u.color && typeof u.color == "string" && (i["EC.color"] = JSON.stringify([u.color])), Array.isArray(u.color) && (i["EC.color"] = JSON.stringify(u.color))), c) {
        const { fontWeight: w, fontStyle: y, fontSize: m, color: g } = c.font || {};
        l["EC.detail"] = JSON.stringify({
          offsetCenter: [0, "60%"],
          fontWeight: w,
          fontStyle: y,
          fontSize: m,
          color: g,
          formatter: "function (value) {\n            let tempValue = value;\n            if('".concat(s[0].jsonFormat, "' !== 'undefined'){\n              tempValue = ibiz.util.text.format(String(value), '").concat(s[0].jsonFormat, "')\n            }\n            return tempValue;\n          }")
        });
      }
      if (C) {
        const { endpoint: w } = C;
        l["EC.max"] = JSON.stringify(w), l["EC.axisLabel"] = JSON.stringify({
          distance: 76,
          color: "#333",
          fontSize: 12,
          formatter: "function (num){return (num * 100) / '".concat(w, "' + '%' }")
        });
      }
    }
    return {
      params: i,
      seriesParams: l,
      axisParams: p
    };
  }
}
class Ka extends Q {
  /**
   * 条形图数据转模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof MultiSeriesBarConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var g;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (b) => Z(b, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `bar_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (b) => {
        if (c && c.length) {
          const v = c[0];
          Object.assign(b, {
            seriesCodeListId: v.appCodeListId,
            seriesField: v.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: b, seriesParams: v } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: b }), (g = e.dechartSerieses) == null || g.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeAxisLayout(h, u, !0),
            ...this.computeMaxMin(v, s, h),
            ...se(c, h, !0, !0)
          }
        });
      });
    }
    const w = {
      MODE: "ROW"
    };
    if (n === "CONTENT") {
      const b = t.appBIReportMeasures.map(
        (v) => ({
          name: v.measureTag,
          isDrill: !!v.drillDetailAppViewId
        })
      );
      Object.assign(w, { ENABLEDRILLDETAIL: b });
    }
    let y = !1;
    const m = t.appBIReportDimensions.filter((b) => {
      if (c.length && !y) {
        const v = c[0].measureTag;
        return b.dimensionTag !== v ? !0 : (y = !0, !1);
      }
      return !0;
    }).map((b) => {
      var v;
      return {
        sort: (v = u.extend) == null ? void 0 : v["sort@".concat(b.dimensionTag)],
        codename: b.dimensionTag,
        name: b.dimensionName,
        mode: b.appCodeListId ? "codelist" : "field",
        codelistId: b.appCodeListId
      };
    });
    return Object.assign(w, {
      CATALOGFIELDS: JSON.stringify(m),
      NOSORT: !0,
      chartid: l
    }), Object.assign(e, {
      controlParam: {
        ctrlParams: w
      }
    }), e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[0] === ".concat(l, " || param.value[0] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[0];\n        }\n        return '';\n          }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[0];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化条形图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof MultiSeriesBarConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n                return param.value[0];\n              }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y);
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = C, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameLocation: "center",
          nameTextStyle: {
            lineHeight: 60,
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(x);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = w;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(N);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
  /**
   * @description 重写x轴标题
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  axisLabel() {
    const t = {};
    return t.formatter = "function(param) {\n      if (param && param.includes(' ')) {\n        const time = new Date(param);\n        if (time.toString() !== 'Invalid Date') {\n          return time.toLocaleDateString().replaceAll('/','-');\n        }\n      }\n      if(param.indexOf('_') < 0){\n        return param;\n      }\n      const str = param.split('_').pop();\n      if(str.length > 4){\n        return str.slice(0,4) + '...'\n      }\n      return str;\n    }", t;
  }
}
class Za extends Q {
  /**
   * 通过数据翻译模型
   *
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof MultiSeriesLineConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `line_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y) => {
        if (c && c.length) {
          const m = c[0];
          Object.assign(y, {
            seriesCodeListId: m.appCodeListId,
            seriesField: m.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeAxisLayout(h, u),
            ...this.computeMaxMin(m, s, h),
            ...se(c, h)
          }
        });
      });
      const g = {};
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大，最小值
   *
   * @param {*} series
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof MultiSeriesLineConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n          }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化折线图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof MultiSeriesLineConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n            return param.value[1];\n          }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y);
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
}
class Qa extends Q {
  /**
   * 通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof MultiSeriesColConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `bar_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y) => {
        if (c && c.length) {
          const m = c[0];
          Object.assign(y, {
            seriesCodeListId: m.appCodeListId,
            seriesField: m.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            "EC.barWidth": "50%",
            "EC.barMaxWidth": "36",
            ...this.computeAxisLayout(h, u),
            ...this.computeMaxMin(m, s, h),
            ...se(c, h, !0)
          }
        });
      });
      const g = {};
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {        \n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化柱状图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof MultiSeriesBarConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && (d.color && typeof d.color == "string" && (a["EC.color"] = JSON.stringify([d.color])), Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color))), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n                return param.value[1];\n              }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y);
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          // 显示轴标题
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          minorSplitLine: {
            show: !1
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          minorSplitLine: {
            show: !1
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
  /**
   * @description 重写x轴标题
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  axisLabel() {
    const t = {};
    return t.formatter = "function(param) {\n      if (param && param.includes(' ')) {\n        const time = new Date(param);\n        if (time.toString() !== 'Invalid Date') {\n          return time.toLocaleDateString().replaceAll('/','-');\n        }\n      }\n      if(param.indexOf('_') < 0){\n          return param;\n      }\n      const str = param.split('_').pop();\n      if(str.length > 4){\n        return str.slice(0,4) + '...'\n      }\n      return str;\n    }", t;
  }
}
class eo extends Q {
  /**
   * 通过数据翻译模型
   *
   * @author tony001
   * @date 2024-06-06 16:06:46
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(IModel | undefined)}
   */
  async translateDataToModel(t, e, i = {}) {
    var c;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name,
      catalog: t.appBIReportDimensions[0].dimensionTag,
      value: t.appBIReportMeasures[0].measureTag
    };
    J(e, (C) => Z(C, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "pie",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        category: "srfCatalogField",
        value: "srfValue",
        type: "NONE",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "pie",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "pie_0",
      appId: "srfAppId"
    }, u = ie(t.appBIReportMeasures, d, {
      appDataEntityId: a,
      caption: t.name,
      dimension: t.appBIReportDimensions[0]
    });
    if (e.dechartSerieses.push(...u), t) {
      const { params: C, seriesParams: w } = this.transformStyle(t, t.appBIReportDimensions[0], l) || {};
      Object.assign(e, { userParam: C }), (c = e.dechartSerieses) == null || c.forEach((m) => {
        Object.assign(m, {
          userParam: {
            ...this.computeMaxMin(w, s, m),
            ...Ta(
              m,
              t.appBIReportMeasures,
              t.appBIReportDimensions[0]
            )
          }
        });
      });
      const y = {};
      if (n === "CONTENT") {
        const m = t.appBIReportMeasures.map(
          (g) => ({
            name: g.measureTag,
            isDrill: !!g.drillDetailAppViewId
          })
        );
        Object.assign(y, {
          ENABLEDRILLDETAIL: m
        });
      }
      Object.assign(e, {
        controlParam: {
          ctrlParams: {
            ...y,
            chartid: l
          }
        }
      });
    }
    return e;
  }
  /**
   *计算最大，最小值
   *
   * @param {*} series
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof PieConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s])), l = Math.max(...n), p = Math.min(...n);
      a.formatter = "function(param) {\n        let tempName = param.name;\n        const { data } = param;\n        const getOrigin = (origin) => {\n          if (origin && origin.$origin) {\n            return getOrigin(origin.$origin);\n          }\n          return origin;\n        };\n        const origin = getOrigin(data.value[1].$origin);\n        const chartData = JSON.parse(localStorage.getItem(data.value[1]._chartid));\n        if(origin){\n          const field = Object.keys(origin).find(key => {\n            return origin[key] === param.name;\n          })\n          if(field && chartData && chartData[field]){\n            tempName = chartData[field][param.name];\n          }\n        }else if(chartData){\n          const _tempname = Object.keys(chartData).find(_chart => {\n            return  chartData[_chart][param.name]\n          })\n          if(_tempname){\n            tempName = chartData[_tempname][param.name]\n          }\n        }\n\n        if(param.value[0] === ".concat(l, " || param.value[0] === ").concat(p, "){\n          if(").concat(a.percentage, "){\n            return tempName + '：（' + param.percent + '%' + '）';\n          }\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n            return tempName + '：' + value;\n          } \n          return tempName + '：' + param.value[0];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        let tempName = param.name;\n        const { data } = param;\n        const getOrigin = (origin) => {\n          if (origin && origin.$origin) {\n            return getOrigin(origin.$origin);\n          }\n          return origin;\n        };\n        const origin = getOrigin(data.value[1].$origin);\n        const chartData = JSON.parse(localStorage.getItem(data.value[1]._chartid));\n        if(origin){\n          const field = Object.keys(origin).find(key => {\n            return origin[key] === param.name;\n          })\n          if(field && chartData && chartData[field]){\n            tempName = chartData[field][param.name];\n          }\n        }else if(chartData){\n          const _tempname = Object.keys(chartData).find(_chart => {\n            return  chartData[_chart][param.name]\n          })\n          if(_tempname){\n            tempName = chartData[_tempname][param.name]\n          }\n        }\n\n        if(".concat(a.percentage, "){\n          return tempName + '：（' + param.percent + '%' + '）';\n        }\n        if('").concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n          return tempName + '：' + value;\n        } \n        return tempName + '：' + param.value[0];\n      }")), {
      ...t,
      "EC.label": JSON.stringify(a)
    };
  }
  /**
   * 转换饼图样式
   *
   * @author tony001
   * @date 2024-06-12 18:06:38
   * @param {IAppBIReport} config
   * @return {*}  {IChartModelParams}
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const C = {
          show: !!u.show,
          scope: u.scope,
          percentage: u.percentage,
          ...u.font
        };
        if (u.percentage ? C.formatter = "function(param) {\n            let tempName = param.name;\n            const { data } = param;\n            const getOrigin = (origin) => {\n              if (origin && origin.$origin) {\n                return getOrigin(origin.$origin);\n              }\n              return origin;\n            };\n            const origin = getOrigin(data.value[1].$origin);\n            const chartData = JSON.parse(localStorage.getItem(data.value[1]._chartid));\n            const field = Object.keys(origin).find(key => {\n              return origin[key] === param.name;\n            })\n            if(field && chartData[field]){\n              tempName = chartData[field][param.name];\n            }\n\n            return tempName + '：（' + param.percent + '%' + '）';\n            }" : C.formatter = "function(param) {\n            let tempName = param.name;\n            const { data } = param;\n            const getOrigin = (origin) => {\n              if (origin && origin.$origin) {\n                return getOrigin(origin.$origin);\n              }\n              return origin;\n            };\n            const origin = getOrigin(data.value[1].$origin);\n            const chartData = JSON.parse(localStorage.getItem(data.value[1]._chartid));\n            const field = Object.keys(origin).find(key => {\n              return origin[key] === param.name;\n            })\n            if(field && chartData[field]){\n              tempName = chartData[field][param.name];\n            }\n\n            return tempName + '：' + param.value[0];\n          }", s["EC.label"] = JSON.stringify(C), u.scope !== "all") {
          const w = function(y) {
            if (y.text === "")
              return {
                fontSize: 0,
                height: 0,
                labelLinePoints: [0, 0]
              };
          };
          s["EC.labelLayout"] = w;
        }
        u.show || (s["EC.emphasis"] = JSON.stringify({
          label: !1
        }));
      }
      if (c) {
        const C = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(e.dimensionTag, "' && chartData && chartData['").concat(e.dimensionTag, "']){\n              legendtext = chartData['").concat(e.dimensionTag, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(C, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(C), ["left-top", "right-top", "top"].includes(c.position) && (s["EC.center"] = JSON.stringify(["50%", "60%"])), ["left-bottom", "right-bottom", "bottom"].includes(c.position) && (s["EC.center"] = JSON.stringify(["50%", "40%"])), c.position === "left" && (s["EC.center"] = JSON.stringify(["60%", "50%"])), c.position === "right" && (s["EC.center"] = JSON.stringify(["40%", "50%"]));
      }
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
}
class to extends Q {
  /**
   * 通过数据翻译模型
   *
   * @author tony001
   * @date 2024-06-06 16:06:46
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(IModel | undefined)}
   */
  async translateDataToModel(t, e, i = {}) {
    var C;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (w) => Z(w, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "scatter",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "scatter",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `scatter_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    const c = ie(t.appBIReportMeasures, d, {
      appDataEntityId: a,
      caption: t.name,
      dimension: t.appBIReportDimensions[0]
    });
    if (e.dechartSerieses.push(...c), t) {
      const { params: w, seriesParams: y } = this.transformStyle(t) || {};
      Object.assign(e, { userParam: w }), (C = e.dechartSerieses) == null || C.forEach((b) => {
        Object.assign(b, {
          userParam: {
            ...this.computeAxisLayout(b, u),
            ...this.computeMaxMin(y, s, b),
            ...se([], b, !0)
          }
        });
      });
      const m = {};
      if (n === "CONTENT") {
        const b = t.appBIReportMeasures.map(
          (v) => ({
            name: v.measureTag,
            isDrill: !!v.drillDetailAppViewId
          })
        );
        Object.assign(m, { ENABLEDRILLDETAIL: b });
      }
      const g = t.appBIReportDimensions.map((b) => {
        var v;
        return {
          sort: (v = u.extend) == null ? void 0 : v["sort@".concat(b.dimensionTag)],
          codename: b.dimensionTag,
          name: b.dimensionName,
          mode: b.appCodeListId ? "codelist" : "field",
          codelistId: b.appCodeListId
        };
      });
      Object.assign(m, {
        CATALOGFIELDS: JSON.stringify(g),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: m
        }
      });
    }
    return e;
  }
  /**
   * 计算最大，最小值
   *
   * @param {*} series
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof ScatterConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value || param.value[1];\n          } \n          return param.value[1];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value || param.value[1];\n        }  \n        return param.value[1];\n      }")), { "EC.label": JSON.stringify(a) };
  }
  /**
   * 转换散点图样式
   *
   * @param {IAppBIReport} config
   * @return {*}  {IChartModelParams}
   * @memberof ScatterConverter
   */
  transformStyle(t) {
    const e = {}, i = {}, a = {};
    let s;
    const { reportUIModel: n } = t;
    if (n) {
      const l = JSON.parse(n);
      l.style && (s = l.style);
    }
    if (e["EC.title"] = JSON.stringify({ show: !1 }), s) {
      const { graphics: l, label: p, legend: d, xAxis: u, yAxis: c } = s;
      if (l && Array.isArray(l.color) && l.color.length && (e["EC.color"] = JSON.stringify(l.color)), p) {
        const C = {
          show: !!p.show,
          scope: p.scope,
          formatter: "function(param) {\n            return param.value[1];\n          }",
          position: "top",
          ...p.font
        };
        i["EC.label"] = JSON.stringify(C);
      }
      if (d) {
        const C = {
          show: !!d.show,
          textStyle: d.font,
          icon: "circle"
        };
        d.position && Object.assign(C, this.getLegendOPtions(d.position)), e["EC.legend"] = JSON.stringify(C);
      }
      if (u) {
        const {
          show: C,
          showTitle: w,
          titleFont: y,
          showLabel: m,
          labelFont: g,
          showAxisline: b,
          axisline: v,
          showGridline: h,
          gridline: f,
          enableLabelInterval: T,
          labelInterval: I
        } = u;
        let x = "";
        w ? x = void 0 : x = "";
        const A = {
          show: !!C,
          type: "category",
          name: x,
          nameTextStyle: {
            ...y
          },
          axisLabel: {
            show: !!m,
            // 显示轴标签
            interval: T ? I : "auto",
            ...this.axisLabel(),
            ...g,
            ...this.computeLabelEllipsis(T, I)
          },
          axisLine: {
            show: !!b,
            // 显示轴线
            lineStyle: {
              type: v.borderStyle === "doubleDashed" ? [15] : v.borderStyle,
              // 将轴线设置为虚线
              width: v.borderSize,
              color: v.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!h,
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          }
        };
        e["EC.xAxis"] = JSON.stringify(A);
      }
      if (c) {
        const {
          show: C,
          showTitle: w,
          titleFont: y,
          showLabel: m,
          labelFont: g,
          showAxisline: b,
          axisline: v,
          showGridline: h,
          gridline: f
        } = c, T = {
          show: !!C,
          type: "value",
          // 显示轴标题
          showTitle: w,
          nameTextStyle: {
            ...y
          },
          axisLabel: {
            show: !!m,
            // 显示轴标签
            ...g
          },
          axisLine: {
            show: !!b,
            // 显示轴线
            lineStyle: {
              type: v.borderStyle === "doubleDashed" ? [15] : v.borderStyle,
              // 将轴线设置为虚线
              width: v.borderSize,
              color: v.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!h,
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          }
        };
        e["EC.yAxis"] = JSON.stringify(T);
      }
      e["EC.grid"] = this.getDefaultGridOptions(d == null ? void 0 : d.position);
    }
    return {
      params: e,
      seriesParams: i,
      axisParams: a
    };
  }
}
class io extends Q {
  /**
   * 通过数据翻译模型
   *
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof StackColConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `bar_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y) => {
        if (c && c.length) {
          const m = c[0];
          Object.assign(y, {
            seriesCodeListId: m.appCodeListId,
            seriesField: m.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            "EC.barWidth": "50%",
            "EC.barMaxWidth": "36",
            ...this.computeAxisLayout(h, u),
            ...this.computeMaxMin(m, s, h),
            ...se(c, h, !0)
          }
        });
      });
      const g = {};
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大，最小值
   *
   * @param {*} series
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof StackColConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化堆叠图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof StackColConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n            return param.value[1];\n          }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y), s["EC.stack"] = "stackcol";
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
  /**
   * @description 重写x轴标题
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  axisLabel() {
    const t = {};
    return t.formatter = "function(param) {\n      if (param && param.includes(' ')) {\n        const time = new Date(param);\n        if (time.toString() !== 'Invalid Date') {\n          return time.toLocaleDateString().replaceAll('/','-');\n        }\n      }\n      if(param.indexOf('_') < 0){\n        return param;\n      }\n      const str = param.split('_').pop();\n      if(str.length > 4){\n        return str.slice(0,4) + '...'\n      }\n      return str;\n    }", t;
  }
}
class ao extends Q {
  /**
   *通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof ZoneColConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `bar_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y, m) => {
        if (Object.assign(y.chartSeriesEncode, {
          chartXAxisId: m,
          chartYAxisId: m
        }), c && c.length) {
          const g = c[0];
          Object.assign(y, {
            seriesCodeListId: g.appCodeListId,
            seriesField: g.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeMaxMin(m, s, h),
            ...se(c, h, !0)
          }
        });
      });
      const g = {
        ZONE: !0
      };
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof ZoneColConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转换分区柱状图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof ZoneColConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n            return param.value[1];\n          }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y);
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          },
          axisTick: {
            show: !0
            // 后续会计算，不是最后一个的坐标系刻度线都会隐藏
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            rich: {
              top: {
                padding: [0, 0, 15, 0],
                ...v
              },
              bottom: {
                padding: [10, 0, 0, 0],
                ...v
              }
            },
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
  /**
   * 获取图表默认配置
   *
   * @param {string} [position='']
   * @return {*}
   * @memberof ZoneColConverter
   */
  getDefaultGridOptions(t = "") {
    const e = {
      show: !1,
      left: "5%",
      right: "5%"
    };
    return ["left-top", "right-top", "top"].includes(t) && (e.bottom = 30), ["left-bottom", "right-bottom", "bottom"].includes(t) && (e.top = 30), t === "left" && (e.top = 30, e.bottom = 30, e.right = 0), t === "right" && (e.top = 30, e.bottom = 30, e.let = 0), JSON.stringify(e);
  }
}
class oo extends Q {
  /**
   * 条形图数据转模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof StackBarConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var g;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (b) => Z(b, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "bar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "bar",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `bar_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (b) => {
        if (c && c.length) {
          const v = c[0];
          Object.assign(b, {
            seriesCodeListId: v.appCodeListId,
            seriesField: v.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: b, seriesParams: v } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: b }), (g = e.dechartSerieses) == null || g.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeAxisLayout(h, u, !0),
            ...this.computeMaxMin(v, s, h),
            ...se(c, h, !0, !0)
          }
        });
      });
    }
    const w = {
      MODE: "ROW"
    };
    if (n === "CONTENT") {
      const b = t.appBIReportMeasures.map(
        (v) => ({
          name: v.measureTag,
          isDrill: !!v.drillDetailAppViewId
        })
      );
      Object.assign(w, {
        ENABLEDRILLDETAIL: b
      });
    }
    let y = !1;
    const m = t.appBIReportDimensions.filter((b) => {
      if (c.length && !y) {
        const v = c[0].measureTag;
        return b.dimensionTag !== v ? !0 : (y = !0, !1);
      }
      return !0;
    }).map((b) => {
      var v;
      return {
        sort: (v = u.extend) == null ? void 0 : v["sort@".concat(b.dimensionTag)],
        codename: b.dimensionTag,
        name: b.dimensionName,
        mode: b.appCodeListId ? "codelist" : "field",
        codelistId: b.appCodeListId
      };
    });
    return Object.assign(w, {
      CATALOGFIELDS: JSON.stringify(m),
      NOSORT: !0,
      chartid: l
    }), Object.assign(e, {
      controlParam: {
        ctrlParams: w
      }
    }), e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof StackBarConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[0] === ".concat(l, " || param.value[0] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[0];\n        }\n        return '';\n              }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[0]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[0];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化堆叠条形图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof StackBarConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n                    return param.value[0];\n                  }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y), s["EC.stack"] = "stackbar";
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = C, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameLocation: "center",
          nameTextStyle: {
            lineHeight: 60,
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(x);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = w;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(N);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
  /**
   * @description 重写x轴标题
   * @return {*}
   * @memberof MultiSeriesBarConverter
   */
  axisLabel() {
    const t = {};
    return t.formatter = "function(param) {\n      if (param && param.includes(' ')) {\n        const time = new Date(param);\n        if (time.toString() !== 'Invalid Date') {\n          return time.toLocaleDateString().replaceAll('/','-');\n        }\n      }\n      if(param.indexOf('_') < 0){\n        return param;\n    }\n      const str = param.split('_').pop();\n      if(str.length > 4){\n        return str.slice(0,4) + '...'\n      }\n      return str;\n    }", t;
  }
}
class so extends Q {
  /**
   * 通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof AreaConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `line_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y) => {
        if (c && c.length) {
          const m = c[0];
          Object.assign(y, {
            seriesCodeListId: m.appCodeListId,
            seriesField: m.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeAxisLayout(h, u),
            ...this.computeMaxMin(m, s, h),
            ...se(c, h)
          }
        });
      });
      const g = {};
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大，最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof AreaConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n      }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转化面积图样式
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof AreaConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n                return param.value[1];\n              }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y), s["EC.areaStyle"] = JSON.stringify({});
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
}
class ro extends Q {
  /**
   *通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof ZoneLineConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var w;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name
    };
    J(e, (y) => Z(y, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfCaption",
      catalogField: "srfCatalogField",
      echartsType: "line",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      chartSeriesEncode: {
        chartXAxisId: "0",
        chartYAxisId: "0",
        x: ["srfCatalogField"],
        y: ["srfValue"],
        type: "XY",
        name: "坐标系编码",
        id: "0",
        appId: "srfAppId"
      },
      seriesLayoutBy: "column",
      seriesType: "line",
      valueField: "srfValue",
      serieText: "srfSerieText",
      catalogName: "srfCatalogName",
      enableChartDataSet: !0,
      // id: `line_${index}`,
      appId: "srfAppId"
    };
    let u = {};
    t.reportUIModel && (u = JSON.parse(t.reportUIModel));
    let c = [];
    u && u.group && Array.isArray(u.group) && (c = oe(
      u.group,
      t.appBIReportDimensions
    ));
    const C = ie(
      t.appBIReportMeasures,
      d,
      {
        appDataEntityId: a,
        caption: t.name,
        dimension: t.appBIReportDimensions[0]
      },
      (y, m) => {
        if (Object.assign(y.chartSeriesEncode, {
          chartXAxisId: m,
          chartYAxisId: m
        }), c && c.length) {
          const g = c[0];
          Object.assign(y, {
            seriesCodeListId: g.appCodeListId,
            seriesField: g.measureTag
          });
        }
      }
    );
    if (e.dechartSerieses.push(...C), t) {
      const { params: y, seriesParams: m } = this.transformStyle(t, c, l) || {};
      Object.assign(e, { userParam: y }), (w = e.dechartSerieses) == null || w.forEach((h) => {
        Object.assign(h, {
          userParam: {
            ...this.computeMaxMin(m, s, h),
            ...se(c, h)
          }
        });
      });
      const g = {
        ZONE: !0
      };
      if (n === "CONTENT") {
        const h = t.appBIReportMeasures.map(
          (f) => ({
            name: f.measureTag,
            isDrill: !!f.drillDetailAppViewId
          })
        );
        Object.assign(g, { ENABLEDRILLDETAIL: h });
      }
      let b = !1;
      const v = t.appBIReportDimensions.filter((h) => {
        if (c.length && !b) {
          const f = c[0].measureTag;
          return h.dimensionTag !== f ? !0 : (b = !0, !1);
        }
        return !0;
      }).map((h) => {
        var f;
        return {
          sort: (f = u.extend) == null ? void 0 : f["sort@".concat(h.dimensionTag)],
          codename: h.dimensionTag,
          name: h.dimensionName,
          mode: h.appCodeListId ? "codelist" : "field",
          codelistId: h.appCodeListId
        };
      });
      Object.assign(g, {
        CATALOGFIELDS: JSON.stringify(v),
        NOSORT: !0,
        chartid: l
      }), Object.assign(e, {
        controlParam: {
          ctrlParams: g
        }
      });
    }
    return e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof ZoneLineConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s]) || 0), l = Math.max(...n) || 0, p = Math.min(...n) || 0;
      a.formatter = "function(param) {\n        if(param.value[1] === ".concat(l, " || param.value[1] === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value[1];\n        }\n        return '';\n          }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value[1]), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value[1];\n      }")), { ...t, "EC.label": JSON.stringify(a) };
  }
  /**
   * 转换分区折线图
   *
   * @param {IData} config
   * @return {*}  {IChartModelParams}
   * @memberof ZoneLineConverter
   */
  transformStyle(t, e, i) {
    const a = {}, s = {}, n = {};
    let l;
    const { reportUIModel: p } = t;
    if (p) {
      const d = JSON.parse(p);
      d.style && (l = d.style);
    }
    if (a["EC.title"] = JSON.stringify({ show: !1 }), l) {
      const { graphics: d, label: u, legend: c, xAxis: C, yAxis: w } = l;
      if (d && Array.isArray(d.color) && d.color.length && (a["EC.color"] = JSON.stringify(d.color)), u) {
        const y = {
          show: !!u.show,
          scope: u.scope,
          formatter: "function(param) {\n                return param.value[1];\n              }",
          position: u.position,
          ...u.font
        };
        s["EC.label"] = JSON.stringify(y);
      }
      if (c) {
        let y = "";
        e && e.length > 0 && (y = e[0].measureTag);
        const m = {
          show: !!c.show,
          textStyle: c.font,
          icon: "circle",
          formatter: "function(param){\n            const chartData = JSON.parse(localStorage.getItem('".concat(i, "'));\n            let legendtext = param;\n            if('").concat(y, "' && chartData && chartData['").concat(y, "']){\n              legendtext = chartData['").concat(y, "'][param]\n            }\n            return legendtext;\n          }")
        };
        c.position && Object.assign(m, this.getLegendOPtions(c.position)), a["EC.legend"] = JSON.stringify(m);
      }
      if (C) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I,
          enableLabelInterval: x,
          labelInterval: A
        } = C;
        let O = "";
        m ? O = void 0 : O = "";
        const N = {
          show: !!y,
          type: "category",
          name: O,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            interval: x ? A : "auto",
            ...this.axisLabel(),
            ...v,
            ...this.computeLabelEllipsis(x, A)
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          },
          axisTick: {
            show: !0
            // 后续会计算，不是最后一个的坐标系刻度线都会隐藏
          }
        };
        a["EC.xAxis"] = JSON.stringify(N);
      }
      if (w) {
        const {
          show: y,
          showTitle: m,
          titleFont: g,
          showLabel: b,
          labelFont: v,
          showAxisline: h,
          axisline: f,
          showGridline: T,
          gridline: I
        } = w, x = {
          show: !!y,
          type: "value",
          showTitle: m,
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            ...g
          },
          axisLabel: {
            show: !!b,
            // 显示轴标签
            rich: {
              top: {
                padding: [0, 0, 15, 0],
                ...v
              },
              bottom: {
                padding: [10, 0, 0, 0],
                ...v
              }
            },
            ...v
          },
          axisLine: {
            show: !!h,
            // 显示轴线
            lineStyle: {
              type: f.borderStyle === "doubleDashed" ? [15] : f.borderStyle,
              // 将轴线设置为虚线
              width: f.borderSize,
              color: f.color
              // 轴线颜色
            }
          },
          splitLine: {
            show: !!T,
            lineStyle: {
              type: I.borderStyle === "doubleDashed" ? [15] : I.borderStyle,
              // 将轴线设置为虚线
              width: I.borderSize,
              color: I.color
              // 轴线颜色
            }
          }
        };
        a["EC.yAxis"] = JSON.stringify(x);
      }
      a["EC.grid"] = this.getDefaultGridOptions(c == null ? void 0 : c.position);
    }
    return {
      params: a,
      seriesParams: s,
      axisParams: n
    };
  }
}
class no extends Q {
  /**
   * 数据转模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof RadarConverter
   */
  async translateDataToModel(t, e, i = {}) {
    var c;
    const { appDataEntityId: a, items: s, mode: n, chartid: l } = i;
    if (!t || !e || !a)
      return;
    if (!t.appBIReportDimensions || !t.appBIReportMeasures)
      return e;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: a,
      caption: t.name,
      catalog: t.appBIReportDimensions[0].dimensionTag,
      value: t.appBIReportMeasures[0].measureTag
    };
    J(e, (C) => Z(C, p)), e.dechartSerieses = [];
    const d = {
      caption: "srfSerieText",
      catalogField: "srfCatalogField",
      echartsType: "radar",
      chartCoordinateSystemId: "0",
      chartDataSetId: "0",
      seriesLayoutBy: "column",
      seriesType: "radar",
      valueField: "srfValue",
      enableChartDataSet: !0,
      id: "radar_0",
      appId: "srfAppId"
    }, u = ie(t.appBIReportMeasures, d, {
      appDataEntityId: a,
      caption: t.name,
      dimension: t.appBIReportDimensions[0]
    });
    if (e.dechartSerieses.push(...u), t) {
      const { params: C, seriesParams: w } = this.transformStyle(t) || {};
      Object.assign(e, { userParam: C }), (c = e.dechartSerieses) == null || c.forEach((m) => {
        Object.assign(m, {
          userParam: {
            ...this.computeMaxMin(w, s, m)
          }
        });
      });
      const y = {};
      if (n === "CONTENT") {
        const m = t.appBIReportMeasures.map(
          (g) => ({
            name: g.measureTag,
            isDrill: !!g.drillDetailAppViewId
          })
        );
        Object.assign(y, {
          ENABLEDRILLDETAIL: m
        });
      }
      Object.assign(e, {
        controlParam: {
          ctrlParams: {
            ...y,
            chartid: l
          }
        }
      });
    }
    return e;
  }
  /**
   * 计算最大最小值
   *
   * @param {IData} seriesParams
   * @param {IData} _items
   * @param {string} _valueCode
   * @return {*}
   * @memberof RadarConverter
   */
  computeMaxMin(t, e, i) {
    const a = $(JSON.parse(t["EC.label"]));
    if (a && a.scope !== "all") {
      const s = i.valueField, n = e.filter(
        (d) => Object.prototype.hasOwnProperty.call(d, s)
      ).map((d) => Number(d[s])), l = Math.max(...n), p = Math.min(...n);
      a.formatter = "function(param) {\n        if(param.value === ".concat(l, " || param.value === ").concat(p, "){\n          if('").concat(i.jsonFormat, "' !== 'undefined'){\n            value = ibiz.util.text.format(String(param.value), '").concat(i.jsonFormat, "')\n            return value;\n          } \n          return param.value;\n        }\n        return '';\n          }");
    }
    return a && a.scope === "all" && (a.formatter = "function(param) {\n        if('".concat(i.jsonFormat, "' !== 'undefined'){\n          value = ibiz.util.text.format(String(param.value), '").concat(i.jsonFormat, "')\n          return value;\n        }  \n        return param.value;\n      }")), {
      ...t,
      "EC.label": JSON.stringify(a)
    };
  }
  /**
   * 转换雷达图样式
   *
   * @param {IAppBIReport} config 报表模型
   * @return {*}  {IChartModelParams}
   * @memberof RadarConverter
   */
  transformStyle(t) {
    const e = {}, i = {}, a = {};
    let s;
    const { reportUIModel: n } = t;
    if (n) {
      const l = JSON.parse(n);
      l.style && (s = l.style);
    }
    if (i["EC.areaStyle"] = JSON.stringify({}), e["EC.title"] = JSON.stringify({ show: !1 }), s) {
      const { graphics: l, label: p, legend: d } = s;
      if (l && Array.isArray(l.color) && l.color.length && (e["EC.color"] = JSON.stringify(l.color)), p) {
        const u = {
          show: !!p.show,
          scope: p.scope,
          ...p.font
        };
        if (i["EC.label"] = JSON.stringify(u), p.scope !== "all") {
          const c = function(C) {
            if (C.text === "")
              return {
                fontSize: 0,
                height: 0,
                labelLinePoints: [0, 0]
              };
          };
          i["EC.labelLayout"] = c;
        }
      }
      if (d) {
        const u = {
          show: !!d.show,
          textStyle: d.font,
          icon: "circle"
        };
        d.position && Object.assign(u, this.getLegendOPtions(d.position)), e["EC.legend"] = JSON.stringify(u);
      }
    }
    return {
      params: e,
      seriesParams: i,
      axisParams: a
    };
  }
}
class lo extends Q {
  /**
   * 数据翻译为模型 todo
   *
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof NumberConverter
   */
  async translateDataToModel(t, e, i = {}) {
    return e;
  }
}
class co extends Q {
  constructor() {
    super(...arguments);
    /**
     * 代码表项
     *
     * @type {readonly}
     * @memberof CrossTableConverter
     */
    M(this, "codeListItems");
    /**
     * 样式配置
     *
     * @type {IData}
     * @memberof CrossTableConverter
     */
    M(this, "styleConfig", {});
    /**
     * 是否存在同环比数据
     *
     * @type {IData}
     * @memberof CrossTableConverter
     */
    M(this, "hasPeriod", !1);
    /**
     * 代码表列
     *
     * @type {string[]}
     * @memberof CrossTableConverter
     */
    M(this, "codelistColumn", []);
    /**
     * 合计列标识
     *
     * @type {string}
     * @memberof CrossTableConverter
     */
    M(this, "totalColTag", "col_sum");
    /**
     * 百分比数据
     *
     * @type {string}
     * @memberof CrossTableConverter
     */
    M(this, "percentkeys", []);
    /**
     * 指标
     *
     * @type {IAppBIReportMeasure[]}
     * @memberof CrossTableConverter
     */
    M(this, "measures", []);
    /**
     * @description 维度行
     * @type {IAppBIReportDimension[]}
     * @memberof CrossTableConverter
     */
    M(this, "dimensionRow", []);
    /**
     * @description 维度列
     * @type {IAppBIReportDimension[]}
     * @memberof CrossTableConverter
     */
    M(this, "dimensionCol", []);
    /**
     * @description 指标总数
     * @type {IData}
     * @memberof CrossTableConverter
     */
    M(this, "measuresTotalResult", {});
    /**
     * @description 列维度数据映射表
     * @type {Map<string, string>}
     * @memberof CrossTableConverter
     */
    M(this, "colDataMap", /* @__PURE__ */ new Map());
    /**
     * @description 表格属性映射表
     * @type {Map<string, string>}
     * @memberof CrossTableConverter
     */
    M(this, "gridFieldMap", /* @__PURE__ */ new Map());
  }
  /**
   * 根据样式计算列模型
   *
   * @return {*}
   * @memberof CrossTableConverter
   */
  calcColumnStyle(e = !0) {
    const { gridFont: i, agg: a } = this.styleConfig, s = {};
    return i && (s.align = i.gridBodyAlign), e && a && a.show && (s.aggMode = "SUM"), s;
  }
  /**
   * 计算合计列
   *
   * @param {string} position
   * @param {IData[]} degridColumns
   * @memberof CrossTableConverter
   */
  calcTotalCol(e, i) {
    const { agg: a } = this.styleConfig;
    if (this.dimensionCol.length > 0 && a.show && a.colPosition === e) {
      const s = this.clacMeasureColumns(this.measures, this.totalColTag), n = {
        dataItemName: this.totalColTag,
        appDEFieldId: this.totalColTag,
        caption: "合计",
        codeName: this.totalColTag,
        columnType: "GROUPGRIDCOLUMN",
        id: this.totalColTag,
        appId: "srfAppId",
        degridColumns: s
      };
      i.push(n);
    }
  }
  /**
   * 计算分组类型
   *
   * @param {IAppBIReport} data
   * @param {IData[]} items
   * @memberof CrossTableConverter
   */
  async calcGroupType(e) {
    const i = [];
    if (this.dimensionCol.length > 0) {
      const { dimensionTag: a, appCodeListId: s } = this.dimensionCol[0], { context: n, viewParams: l } = this.controller;
      s && await this.loadCodeList(s, n, l);
      let p = !1;
      e.forEach((d) => {
        const u = d[this.getGridField(a)];
        u ? i.includes(u) || i.push(u) : p = !0;
      }), p && i.push("");
    }
    return i;
  }
  /**
   * 计算指标列
   *
   * @param {IData[]} measure
   * @param {string} type
   * @return {*}
   * @memberof CrossTableConverter
   */
  clacMeasureColumns(e, i) {
    return e.map((a) => {
      let s = this.getGridField(a.measureTag);
      i && (s = "".concat(i, "@").concat(s));
      const n = "".concat(this.totalColTag, "@").concat(this.getGridField(
        a.measureTag
      ));
      return a.appCodeListId && this.codelistColumn.push(s), this.percentkeys.push(s), {
        dataItemName: s,
        appDEFieldId: s,
        caption: a.measureName,
        codeName: s,
        width: 150,
        widthUnit: "STAR",
        appCodeListId: a.appCodeListId,
        columnType: "DEFGRIDCOLUMN",
        id: s,
        appId: "srfAppId",
        totalCodename: n,
        format: a.jsonFormat,
        valueType: "SIMPLE",
        ...this.calcColumnStyle(),
        align: "RIGHT"
      };
    });
  }
  /**
   * 计算表格列模型
   *
   * @param {IAppBIReport} data
   * @return {*}
   * @memberof CrossTableConverter
   */
  calcGridColumns(e) {
    const i = [];
    if (this.dimensionRow && i.push(
      ...this.dimensionRow.map((a) => (a.appCodeListId && this.codelistColumn.push(this.getGridField(a.dimensionTag)), {
        dataItemName: this.getGridField(a.dimensionTag),
        appDEFieldId: this.getGridField(
          a.appDEFieldId || a.dimensionTag
        ),
        width: 150,
        widthUnit: "STAR",
        appCodeListId: a.appCodeListId,
        caption: a.dimensionName,
        codeName: this.getGridField(a.dimensionTag),
        columnType: "DEFGRIDCOLUMN",
        id: this.getGridField(a.dimensionTag),
        appId: "srfAppId",
        ...this.calcColumnStyle(!1)
      }))
    ), this.calcTotalCol("left", i), this.dimensionCol.length > 0) {
      const a = this.dimensionCol[0], s = e.map((n) => {
        const l = this.clacMeasureColumns(this.measures, n);
        return {
          dataItemName: this.getGridField(a.dimensionTag),
          appDEFieldId: this.getGridField(a.appDEFieldId),
          caption: this.transCodeListValue(n),
          appCodeListId: a.appCodeListId,
          codeName: this.getGridField(a.dimensionTag),
          columnType: "GROUPGRIDCOLUMN",
          id: this.getGridField(a.dimensionTag),
          appId: "srfAppId",
          degridColumns: l
        };
      });
      i.push(...s);
    } else {
      const a = this.clacMeasureColumns(this.measures);
      i.push(...a);
    }
    return this.calcTotalCol("right", i), i;
  }
  /**
   * 计算表格数据列
   *
   * @param {IData[]} columns
   * @return {*}
   * @memberof CrossTableConverter
   */
  calcGridDataItems(e) {
    const i = [], a = this.styleConfig.function.function || [];
    return e.forEach((s) => {
      const n = {};
      a.includes("showPercent") && s.totalCodename && this.measuresTotalResult[s.totalCodename] && (n.customCode = !0, n.scriptCode = "\n        if (Object.prototype.hasOwnProperty.call(data, '".concat(s.appDEFieldId, "')) {\n          const value = data['").concat(s.appDEFieldId, "'] / ").concat(this.measuresTotalResult[s.totalCodename], ";\n          let formatValue = data['").concat(s.appDEFieldId, "'];\n          if (controller.valueFormat) {\n            formatValue = ibiz.util.text.format(formatValue, controller.valueFormat);\n          }\n          return formatValue + '(' + ibiz.util.text.format(value, '0.##%') + ')'\n        }")), i.push({
        appDEFieldId: s.appDEFieldId,
        valueType: "SIMPLE",
        dataType: 25,
        id: s.id,
        appId: "srfAppId",
        format: s.format,
        ...n
      }), s.columnType === "GROUPGRIDCOLUMN" && i.push(...this.calcGridDataItems(s.degridColumns));
    }), i;
  }
  /**
   * 计算行合并
   *
   * @param {IData} data
   * @return {*}
   * @memberof CrossTableConverter
   */
  calcRowSpan() {
    return this.dimensionRow.map(
      (e) => this.getGridField(e.dimensionTag)
    );
  }
  /**
   * 是否存在数据项
   *
   * @param {IData[]} items
   * @param {IAppBIReportDimension[]} dimension_row
   * @return {*}
   * @memberof CrossTableConverter
   */
  getItem(e, i, a) {
    return e.find((s) => i.findIndex(
      (n) => s[this.getGridField(n.dimensionTag)] !== a[this.getGridField(n.dimensionTag)]
    ) === -1);
  }
  /**
   * 计算表格数据
   *
   * @param {IAppBIReport} data
   * @param {IData[]} items
   * @memberof CrossTableConverter
   */
  calcGridData(e) {
    if (this.colDataMap.clear(), this.dimensionCol.length > 0) {
      const i = [], { dimensionTag: a } = this.dimensionCol[0];
      return e.forEach((s) => {
        this.measures.forEach((n) => {
          const l = this.getGridField(n.measureTag) || "", p = s[this.getGridField(a)];
          let d = l || "";
          p && (d = "".concat(p, "@").concat(l), this.colDataMap.set(
            p,
            this.getDrillValue(s, this.getGridField(a))
          ));
          const u = this.getItem(i, this.dimensionRow, s);
          if (u)
            u[d] = s[l];
          else {
            const c = { [d]: s[l] };
            this.dimensionRow.forEach((C) => {
              c[this.getGridField(C.dimensionTag)] = s[this.getGridField(C.dimensionTag)];
            }), c.$origin = s.$origin, i.push(c);
          }
        });
      }), i;
    }
    return e;
  }
  /**
   * 计算统计数据
   *
   * @param {IData[]} items
   * @return {*}
   * @memberof CrossTableConverter
   */
  calcTotalData(e) {
    this.measures.forEach((i) => {
      const a = "".concat(this.totalColTag, "@").concat(this.getGridField(
        i.measureTag
      ));
      this.measuresTotalResult[a] = 0;
    }), e.forEach((i) => {
      this.measures.forEach((a) => {
        const s = "".concat(this.totalColTag, "@").concat(this.getGridField(
          a.measureTag
        )), n = this.percentkeys.reduce((l, p) => {
          const d = Number(i[p]) || 0;
          return Gi(l, d);
        }, 0);
        this.measuresTotalResult[s] += n, i[s] = n;
      });
    });
  }
  /**
   * 通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof CrossTableConverter
   */
  async translateDataToModel(e, i, a = {}) {
    const { appDataEntityId: s, mode: n, items: l = [] } = a;
    if (!e || !i || !s)
      return;
    const { appBIReportMeasures: p, appBIReportDimensions: d = [] } = e;
    if (!p)
      return i;
    this.measures = p, this.getDimension(d);
    const u = {
      appId: ibiz.env.appId,
      appDataEntityId: s,
      caption: e.name,
      value: p[0].measureTag
    };
    this.styleConfig = this.getStyleConfig(e) || {}, this.codelistColumn = [], this.percentkeys = [], this.calcGridFieldMap(l);
    const c = this.filterPeriod(Vi(l)), C = await this.calcGroupType(c), w = this.calcGridColumns(C), y = this.calcGridData(c);
    this.calcTotalData(y);
    const m = this.calcGridDataItems(w);
    return this.controller.state.tableData = y, Object.assign(i, { degridColumns: w, degridDataItems: m }), J(i, (g) => Z(g, u)), this.transformStyle(i, n), n === "CONTENT" && (this.controller.state.attrs = {
      "cell-class-name": ({ column: g }) => {
        const b = g.property.split("@").pop();
        if (this.measures.findIndex(
          (h) => this.getGridField(h.measureTag) === b
        ) !== -1)
          return "enable-pointer";
      },
      onCellClick: (g, b) => {
        if (ibiz.fullscreenUtil.isFullScreen)
          return;
        const v = b.property.split("@").pop(), h = p.find(
          (x) => this.getGridField(x.measureTag) === v
        );
        if (!h || !h.drillDetailAppViewId || b.property.startsWith(this.totalColTag))
          return;
        const f = g.getOrigin(), T = this.dimensionRow.map((x) => ({
          value: this.getDrillValue(
            f.$origin || f,
            x.dimensionTag
          ),
          name: x.dimensionTag
        }));
        if (b.property.includes("@")) {
          let x = b.property.split("@").shift();
          this.colDataMap.has(x) && (x = this.colDataMap.get(x)), T.push({
            value: x,
            name: this.dimensionCol[0].dimensionTag
          });
        }
        const I = {
          measure: {
            name: v
          },
          dimension: T
        };
        this.controller.handleDrillDetail(I);
      }
    }), i;
  }
  /**
   * 获取样式配置
   *
   * @param {IAppBIReport} config
   * @return {*}
   * @memberof CrossTableConverter
   */
  getStyleConfig(e) {
    const { reportUIModel: i } = e;
    if (i) {
      const a = JSON.parse(i);
      if (a.style)
        return a.style;
      this.hasPeriod = !!a.period;
    }
  }
  /**
   * 获取维度数据
   *
   * @param {IAppBIReportDimension[]} dimensions
   * @return {*}
   * @memberof CrossTableConverter
   */
  getDimension(e) {
    this.dimensionRow = e.filter(
      (i) => i.placement !== "COLHEADER"
    ), this.dimensionCol = e.filter(
      (i) => i.placement === "COLHEADER"
    );
  }
  /**
   * 加载代码表
   *
   * @param {string} appCodeListId
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {(Promise<Readonly<CodeListItem[]> | undefined>)}
   * @memberof CrossTableConverter
   */
  async loadCodeList(e, i, a) {
    const s = ibiz.hub.getApp(i.srfappid);
    if (!s.codeList.getCodeList(e))
      return ibiz.message.error("未找到代码表: ".concat(e)), [];
    const l = await s.codeList.get(e, i, a);
    return this.codeListItems = l, l;
  }
  /**
   * 转换代码表值
   *
   * @param {string} value
   * @return {*}
   * @memberof CrossTableConverter
   */
  transCodeListValue(e) {
    const i = this.findCodeListItem(this.codeListItems, e);
    return i ? i.text : e;
  }
  /**
   * 转换代码表值
   *
   * @param {(CodeListItem[] | undefined)} codelist
   * @param {(string | number)} value
   * @return {*}
   * @memberof CrossTableConverter
   */
  findCodeListItem(e, i) {
    if (e) {
      const a = e.find((s) => s.value == i);
      if (a)
        return a;
      for (let s = 0; s < e.length; s++) {
        const n = this.findCodeListItem(
          e[s].children,
          i
        );
        if (n)
          return n;
      }
    }
  }
  /**
   * 转换样式
   *
   * @param {IAppBIReport} data
   * @param {IData} model
   * @memberof CrossTableConverter
   */
  transformStyle(e, i) {
    const a = this.styleConfig, s = {
      vars: {},
      classList: []
    };
    if (s.vars = {
      "--ibiz-control-grid-header-align": a.gridFont.gridHeaderAlign,
      "--ibiz-control-grid-header-font-size": "".concat(a.gridFont.gridHeader.fontSize, "px"),
      "--ibiz-control-grid-header-font-weight": a.gridFont.gridHeader.fontWeight,
      "--ibiz-control-grid-header-text-color": a.gridFont.gridHeader.color,
      "--ibiz-control-grid-header-font-style": a.gridFont.gridHeader.fontStyle,
      "--ibiz-control-grid-content-font-size": "".concat(a.gridFont.gridBody.fontSize, "px"),
      "--ibiz-control-grid-content-font-weight": a.gridFont.gridBody.fontWeight,
      "--ibiz-control-grid-content-text-color": a.gridFont.gridBody.color,
      "--ibiz-control-grid-content-font-style": a.gridFont.gridBody.fontStyle
    }, a.agg.show && (Object.assign(e, { aggMode: "PAGE" }), a.agg.rowPosition === "top" && s.classList.push("el-table--top-agg")), a.function.show) {
      const n = {}, l = a.function.function || [];
      if (l.includes("fixedGridHeader") || s.classList.push("el-table--scroll-header"), l.includes("dimensionMerge")) {
        const p = this.calcRowSpan();
        Object.assign(n, { rowspankeys: p });
      }
      l.includes("fixedDimension") && this.dimensionRow && Object.assign(e, {
        frozenFirstColumn: this.dimensionRow.length
      }), Object.assign(e.controlParam, { ctrlParams: n });
    }
    i === "CONTENT" && s.classList.push("el-table--is-drill"), this.controller.state.style = s;
  }
  /**
   * 过滤同环比数据
   *
   * @param {IAppBIReport} data
   * @param {IData} model
   * @memberof CrossTableConverter
   */
  filterPeriod(e) {
    return e.filter((i) => !i.srfperiodtype);
  }
  /**
   * @description 获取反查值
   * @param {IData} item
   * @param {string} name
   * @return {*}
   * @memberof CrossTableConverter
   */
  getDrillValue(e, i) {
    return e.$origin && Object.prototype.hasOwnProperty.call(e.$origin, i) ? e.$origin[i] : e[i];
  }
  /**
   * @description 计算表格属性
   * @param {IData} data
   * @param {IData[]} items
   * @memberof CrossTableConverter
   */
  calcGridFieldMap(e) {
    this.gridFieldMap.clear();
    let i = [];
    e.forEach((a) => {
      i = Array.from(/* @__PURE__ */ new Set([...i, ...Object.keys(a)]));
    }), this.measures.forEach((a) => {
      a.appDEFieldId && i.includes("".concat(a.appDEFieldId, "_text")) && this.gridFieldMap.set(a.appDEFieldId, "".concat(a.appDEFieldId, "_text")), a.measureTag && i.includes("".concat(a.measureTag, "_text")) && this.gridFieldMap.set(a.measureTag, "".concat(a.measureTag, "_text"));
    }), [...this.dimensionRow, ...this.dimensionCol].forEach(
      (a) => {
        a.appDEFieldId && i.includes("".concat(a.appDEFieldId, "_text")) && this.gridFieldMap.set(a.appDEFieldId, "".concat(a.appDEFieldId, "_text")), a.dimensionTag && i.includes("".concat(a.dimensionTag, "_text")) && this.gridFieldMap.set(a.dimensionTag, "".concat(a.dimensionTag, "_text"));
      }
    );
  }
  /**
   * @description 获取表格属性
   * @param {string} codeName
   * @return {*}  {string}
   * @memberof CrossTableConverter
   */
  getGridField(e) {
    return e && this.gridFieldMap.has(e) ? this.gridFieldMap.get(e) : e;
  }
}
class po extends Q {
  constructor() {
    super(...arguments);
    /**
     * 样式配置
     *
     * @type {IData}
     * @memberof TableConverter
     */
    M(this, "styleConfig", {});
    /**
     * 是否存在同环比数据
     *
     * @type {IData}
     * @memberof TableConverter
     */
    M(this, "hasPeriod", !1);
    /**
     * @description 表格属性映射表
     * @type {Map<string, string>}
     * @memberof TableConverter
     */
    M(this, "gridFieldMap", /* @__PURE__ */ new Map());
  }
  /**
   * 根据样式计算列模型
   *
   * @return {*}
   * @memberof TableConverter
   */
  calcColumnStyle(e = !0) {
    const { gridFont: i, agg: a } = this.styleConfig, s = {};
    return i && (s.align = i.gridBodyAlign), e && a && a.show && (s.aggMode = "SUM"), s;
  }
  /**
   * 计算表格列模型
   *
   * @param {IData} data
   * @return {*}
   * @memberof TableConverter
   */
  calcGridColumns(e) {
    const { appBIReportMeasures: i = [], appBIReportDimensions: a = [] } = e, s = [];
    if (a.length > 0) {
      const n = a.map(
        (l) => ({
          dataItemName: this.getGridField(l.dimensionTag),
          appDEFieldId: this.getGridField(l.appDEFieldId),
          caption: l.dimensionName,
          codeName: this.getGridField(l.dimensionTag),
          width: 150,
          widthUnit: "STAR",
          appCodeListId: l.appCodeListId,
          columnType: "DEFGRIDCOLUMN",
          id: this.getGridField(l.dimensionTag),
          appId: "srfAppId",
          ...this.calcColumnStyle(!1)
        })
      );
      s.push(...n);
    }
    return i.length > 0 && s.push(
      ...i.map((n) => ({
        dataItemName: this.getGridField(n.measureTag),
        appDEFieldId: this.getGridField(
          n.appDEFieldId || n.measureTag
        ),
        caption: n.measureName,
        codeName: this.getGridField(n.measureTag),
        width: 150,
        widthUnit: "STAR",
        appCodeListId: n.appCodeListId,
        columnType: "DEFGRIDCOLUMN",
        id: this.getGridField(n.measureTag),
        appId: "srfAppId",
        format: n.jsonFormat,
        valueType: "SIMPLE",
        ...this.calcColumnStyle(),
        align: "RIGHT"
      }))
    ), s;
  }
  /**
   * 计算表格数据列
   *
   * @param {IData[]} columns
   * @return {*}
   * @memberof TableConverter
   */
  calcGridDataItems(e) {
    const i = [];
    return e.forEach((a) => {
      i.push({
        appDEFieldId: a.appDEFieldId,
        valueType: "SIMPLE",
        dataType: 25,
        id: a.id,
        appId: "srfAppId",
        format: a.format
      }), a.columnType === "GROUPGRIDCOLUMN" && i.push(...this.calcGridDataItems(a.degridColumns));
    }), i;
  }
  /**
   * 计算行合并
   *
   * @param {IAppBIReport} data
   * @return {*}
   * @memberof TableConverter
   */
  calcRowSpan(e) {
    const { appBIReportDimensions: i = [] } = e;
    return i.map((a) => a.dimensionTag);
  }
  /**
   * 通过数据翻译模型
   *
   * @param {(IAppBIReport | undefined)} data
   * @param {IModel} model
   * @param {IData} [opts={}]
   * @return {*}  {(Promise<IModel | undefined>)}
   * @memberof TableConverter
   */
  async translateDataToModel(e, i, a = {}) {
    const { appDataEntityId: s, mode: n, items: l = [] } = a;
    if (!e || !i || !s)
      return;
    if (!e.appBIReportMeasures)
      return i;
    const p = {
      appId: ibiz.env.appId,
      appDataEntityId: s,
      caption: e.name,
      value: e.appBIReportMeasures[0].measureTag
    };
    this.calcGridFieldMap(e, l), this.styleConfig = this.getStyleConfig(e) || {};
    const d = this.calcGridColumns(e), u = this.calcGridDataItems(d);
    if (Object.assign(i, { degridColumns: d, degridDataItems: u }), this.controller.state.tableData = this.filterPeriod(
      this.controller.state.items
    ), J(i, (c) => Z(c, p)), this.transformStyle(e, i, n), n === "CONTENT") {
      const { appBIReportMeasures: c = [], appBIReportDimensions: C = [] } = e;
      this.controller.state.attrs = {
        "cell-class-name": ({ column: w }) => {
          if (c.findIndex(
            (m) => m.measureTag === w.property
          ) !== -1)
            return "enable-pointer";
        },
        onCellClick: (w, y) => {
          if (ibiz.fullscreenUtil.isFullScreen)
            return;
          const m = c.find(
            (h) => h.measureTag === y.property
          );
          if (!m || !m.drillDetailAppViewId)
            return;
          const g = w.getOrigin(), b = C.map((h) => ({
            value: this.getDrillValue(
              g.$origin || g,
              h.dimensionTag
            ),
            name: h.dimensionTag
          })), v = {
            measure: {
              name: y.property
            },
            dimension: b
          };
          this.controller.handleDrillDetail(v);
        }
      };
    }
    return i;
  }
  /**
   * 获取样式配置
   *
   * @param {IAppBIReport} config
   * @memberof TableConverter
   */
  getStyleConfig(e) {
    const { reportUIModel: i } = e;
    if (i) {
      const a = JSON.parse(i);
      if (a.style)
        return a.style;
      this.hasPeriod = !!a.period;
    }
  }
  /**
   * 转换样式
   *
   * @param {IAppBIReport} data
   * @param {IData} model
   * @memberof TableConverter
   */
  transformStyle(e, i, a) {
    const s = this.styleConfig, n = {
      vars: {},
      classList: []
    };
    if (n.vars = {
      "--ibiz-control-grid-header-align": s.gridFont.gridHeaderAlign,
      "--ibiz-control-grid-header-font-size": "".concat(s.gridFont.gridHeader.fontSize, "px"),
      "--ibiz-control-grid-header-font-weight": s.gridFont.gridHeader.fontWeight,
      "--ibiz-control-grid-header-text-color": s.gridFont.gridHeader.color,
      "--ibiz-control-grid-header-font-style": s.gridFont.gridHeader.fontStyle,
      "--ibiz-control-grid-content-font-size": "".concat(s.gridFont.gridBody.fontSize, "px"),
      "--ibiz-control-grid-content-font-weight": s.gridFont.gridBody.fontWeight,
      "--ibiz-control-grid-content-text-color": s.gridFont.gridBody.color,
      "--ibiz-control-grid-content-font-style": s.gridFont.gridBody.fontStyle
    }, s.agg.show && (Object.assign(i, { aggMode: "PAGE" }), s.agg.position === "top" && n.classList.push("el-table--top-agg")), s.function.show) {
      const l = {}, p = s.function.function || [];
      if (p.includes("fixedGridHeader") || n.classList.push("el-table--scroll-header"), p.includes("dimensionMerge")) {
        const d = this.calcRowSpan(e);
        Object.assign(l, { rowspankeys: d });
      }
      p.includes("fixedDimension") && e.appBIReportDimensions && Object.assign(i, {
        frozenFirstColumn: e.appBIReportDimensions.length
      }), p.includes("showPercent") && Object.assign(l, {
        percentkeys: e.appBIReportMeasures.map(
          (d) => d.measureTag
        )
      }), Object.assign(i.controlParam, { ctrlParams: l });
    }
    a === "CONTENT" && n.classList.push("el-table--is-drill"), this.controller.state.style = n;
  }
  /**
   * 过滤同环比数据
   *
   * @param {IAppBIReport} data
   * @param {IData} model
   * @memberof TableConverter
   */
  filterPeriod(e) {
    return e.filter((i) => !i.srfperiodtype);
  }
  /**
   * @description 获取反查值
   * @param {IData} item
   * @param {string} name
   * @return {*}
   * @memberof TableConverter
   */
  getDrillValue(e, i) {
    return e.$origin && Object.prototype.hasOwnProperty.call(e.$origin, i) ? e.$origin[i] : e[i];
  }
  /**
   * @description 计算表格属性
   * @param {IData} data
   * @param {IData[]} items
   * @memberof TableConverter
   */
  calcGridFieldMap(e, i) {
    this.gridFieldMap.clear();
    let a = [];
    i.forEach((l) => {
      a = Array.from(/* @__PURE__ */ new Set([...a, ...Object.keys(l)]));
    });
    const { appBIReportMeasures: s = [], appBIReportDimensions: n = [] } = e;
    s.forEach((l) => {
      l.appDEFieldId && a.includes("".concat(l.appDEFieldId, "_text")) && this.gridFieldMap.set(l.appDEFieldId, "".concat(l.appDEFieldId, "_text")), l.measureTag && a.includes("".concat(l.measureTag, "_text")) && this.gridFieldMap.set(l.measureTag, "".concat(l.measureTag, "_text"));
    }), n.forEach((l) => {
      l.appDEFieldId && a.includes("".concat(l.appDEFieldId, "_text")) && this.gridFieldMap.set(l.appDEFieldId, "".concat(l.appDEFieldId, "_text")), l.dimensionTag && a.includes("".concat(l.dimensionTag, "_text")) && this.gridFieldMap.set(l.dimensionTag, "".concat(l.dimensionTag, "_text"));
    });
  }
  /**
   * @description 获取表格属性
   * @param {string} codeName
   * @return {*}  {string}
   * @memberof TableConverter
   */
  getGridField(e) {
    return e && this.gridFieldMap.has(e) ? this.gridFieldMap.get(e) : e;
  }
}
class uo {
  static createConverter(t, e) {
    if (t === "PIE")
      return new eo(e);
    if (t === "SCATTER")
      return new to(e);
    if (t === "STACK_COL")
      return new io(e);
    if (t === "GAUGE")
      return new Ya(e);
    if (t === "MULTI_SERIES_LINE")
      return new Za(e);
    if (t === "MULTI_SERIES_BAR")
      return new Ka(e);
    if (t === "MULTI_SERIES_COL")
      return new Qa(e);
    if (t === "ZONE_COL")
      return new ao(e);
    if (t === "STACK_BAR")
      return new oo(e);
    if (t === "AREA")
      return new so(e);
    if (t === "ZONE_LINE")
      return new ro(e);
    if (t === "RADAR")
      return new no(e);
    if (t === "NUMBER")
      return new lo(e);
    if (t === "CROSSTABLE")
      return new co(e);
    if (t === "GRID")
      return new po(e);
  }
}
class ee {
  /**
   * Creates an instance of BIReportChartController.
   * @author tony001
   * @date 2024-06-12 15:06:09
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   */
  constructor(t, e, i, a, s) {
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-05-31 00:05:28
     * @type {IBIReportChartState}
     */
    M(this, "state");
    /**
     * 转化器
     *
     * @author tony001
     * @date 2024-06-06 01:06:55
     * @type {(IChartConverter | undefined)}
     */
    M(this, "converter");
    /**
     * 初始化图表模型
     *
     * @author tony001
     * @date 2024-06-12 15:06:47
     * @type {(IModel | undefined)}
     */
    M(this, "chartModel");
    /**
     * 图表默认值
     *
     * @author tony001
     * @date 2024-06-12 15:06:15
     * @type {(IData | undefined)}
     */
    M(this, "chartDefaultValue");
    /**
     * 图表配置
     *
     * @author tony001
     * @date 2024-06-12 15:06:51
     * @type {(IData | undefined)}
     */
    M(this, "chartConfig");
    /**
     * 应用实体标识
     *
     * @author tony001
     * @date 2024-06-12 16:06:42
     * @type {(string | undefined)}
     */
    M(this, "appDataEntityId");
    /**
     * 图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:15
     * @type {IData}
     */
    M(this, "chartController");
    /**
     * 唯一标识
     *
     * @author tony001
     * @date 2024-07-24 22:07:10
     * @type {string}
     */
    M(this, "uuid", "");
    /**
     * 动态数据字典
     *
     * @author tony001
     * @date 2024-07-24 23:07:26
     * @type {IData}
     */
    M(this, "dynaDataDic", {});
    this.mode = t, this.context = e, this.viewParams = i, this.config = a, this.initData = s;
    const { chartModel: n, chartConfig: l, chartDefaultValue: p } = s;
    this.chartModel = n, this.chartConfig = l, this.chartDefaultValue = p;
    let d = "NUMBER";
    a.reportUIModel && (d = JSON.parse(a.reportUIModel).selectChartType || "NUMBER");
    const { appBISchemeId: u, appBICubeId: c, id: C, name: w } = this.config;
    this.uuid = "".concat(this.context.srfappid, "@").concat(u, "@").concat(c, "@").concat(C, "@").concat(d, "@").concat(encodeURIComponent(
      w
    )), this.converter = uo.createConverter(d, this), this.initState();
  }
  /**
   * 设置图表控制器
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:32
   * @param {IData} c
   */
  setChartController(t) {
    this.chartController = t, t.evt.on("onBeforeUpdate", () => {
      var e, i;
      if (this.chartController) {
        const { options: a = {} } = this.chartController, s = a.series || [], n = a.xAxis, l = a.yAxis, p = ((i = (e = this.state.model.controlParam) == null ? void 0 : e.ctrlParams) == null ? void 0 : i.MODE) === "ROW";
        delete a.dataZoom;
        const d = s.find((w) => w.data && w.data.length > 20);
        s.length > 0 && (s.length > 15 || d) && (p ? a.dataZoom = [
          {
            yAxisIndex: Array.isArray(l) ? l.map((w, y) => y) : 0,
            start: 0,
            end: 10
          }
        ] : a.dataZoom = [
          {
            xAxisIndex: Array.isArray(n) ? n.map((w, y) => y) : 0,
            start: 0,
            end: 10
          }
        ]), s.length > 0 && s.forEach((w, y) => {
          var m;
          if (w.type === "radar" && this.chartController) {
            const g = this.chartController.generator.seriesGenerators[y], { valueField: b } = g, v = (m = this.state.reportModel.appBIReportMeasures) == null ? void 0 : m.find(
              (f) => f.measureTag === b
            );
            v != null && v.jsonFormat && w.data && w.data.length > 0 && w.data.forEach((f) => {
              f.value = f.value.map((T) => ibiz.util.text.format(
                String(T),
                v.jsonFormat
              ));
            });
            const { radar: h } = a;
            h && Array.isArray(h) && h.forEach((f) => {
              f.indicator && Array.isArray(f.indicator) && f.indicator.forEach((T) => {
                const I = Object.keys(this.dynaDataDic).find(
                  (x) => this.dynaDataDic[x][T.name]
                );
                I && (T.name = this.dynaDataDic[I][T.name]);
              });
            });
          }
        });
        const u = this, c = Ea(u.state.reportModel);
        if (c && c.length > 0) {
          const w = c.findIndex((y) => y.mode === "field" && y.textAppDEFieldId);
          p ? l.forEach((y) => {
            y.axisLabel && (y.axisLabel.formatter = function(m) {
              const b = m.split("_").map((v) => {
                var f;
                const h = u.dynaDataDic[(f = c[w]) == null ? void 0 : f.codename];
                return h && h[v] ? h[v] : v;
              }).at(-1);
              return !b || b.indexOf("undefined") > -1 ? "undefined" : b.length > 4 && !b.includes("\n") ? "".concat(b.slice(0, 4), "...") : b;
            });
          }) : n && Array.isArray(n) && n.length > 0 && n.forEach((y) => {
            y.axisLabel && (y.axisLabel.formatter = function(m) {
              return m.split("_").map((b) => {
                var h;
                const v = u.dynaDataDic[(h = c[w]) == null ? void 0 : h.codename];
                return v && v[b] ? v[b] : b;
              }).at(-1);
            });
          }), a.dataZoom && Array.isArray(a.dataZoom) && a.dataZoom.forEach((y) => {
            var m;
            if (w >= 0) {
              const g = u.dynaDataDic[(m = c[w]) == null ? void 0 : m.codename];
              Object.assign(y, {
                labelFormatter(b, v) {
                  const h = v.split("_").at(-1);
                  return g && h && g[h] ? g[h] : h || "undefined";
                }
              });
            }
          });
        }
        let C = {};
        this.state.reportModel && this.state.reportModel.reportUIModel && (C = JSON.parse(this.state.reportModel.reportUIModel)), s.length > 0 && this.state.model.dechartSerieses && C.extend && this.state.model.dechartSerieses.forEach((w) => {
          var b;
          const y = (b = C.extend) == null ? void 0 : b["cordon@".concat(w.valueField)], m = {
            symbol: "none",
            silent: !0
          }, g = [];
          if (y) {
            const v = s.findIndex((T) => w.seriesField ? T.stack === w.serieText : T.name === w.serieText);
            let h = 1;
            const f = [];
            c && c.forEach((T) => {
              if (f.push(T.codename), T.codelistId) {
                const I = this.chartController.generator.codeListMap.get(
                  T.codelistId
                );
                h *= I.length;
              } else {
                const I = this.state.items.map((A) => A[T.codename] || A[T.codename] !== 0), x = Array.from(new Set(I));
                h *= x.length;
              }
            }), y.forEach((T) => {
              const I = Sa(
                T,
                w,
                this.state.items,
                h,
                f,
                p
              );
              g.push(I);
            }), Object.assign(m, {
              data: g
            }), v > -1 ? Object.assign(s[v], {
              markLine: m
            }) : Object.assign(s[0], {
              markLine: m
            });
          }
        });
      }
    });
  }
  /**
   * 初始化状态
   *
   * @author tony001
   * @date 2024-06-12 16:06:07
   */
  initState() {
    this.state = {}, this.state.isCreated = !1, this.state.refreshFlag = !0, this.state.propertyConfig = this.chartConfig, this.state.items = [], this.state.reportModel = this.config;
  }
  /**
   * 初始化
   *
   * @author tony001
   * @date 2024-06-12 17:06:20
   * @return {*}  {Promise<void>}
   */
  async created() {
    try {
      await this.init();
    } finally {
      this.state.isCreated = !0;
    }
  }
  /**
   * 初始化
   *
   * @author tony001
   * @date 2024-06-26 14:06:56
   * @return {*}  {Promise<void>}
   */
  async init() {
    var s;
    const { appBISchemeId: t, appBICubeId: e } = this.config, i = await this.getCubeById(
      "".concat(t, ".").concat(e)
    );
    if (!i)
      return;
    this.appDataEntityId = i.psdename.toLowerCase(), await this.load();
    const a = await ((s = this.converter) == null ? void 0 : s.translateDataToModel(
      this.state.reportModel,
      $(this.chartModel),
      {
        items: this.state.items,
        mode: this.mode,
        chartid: this.uuid,
        appDataEntityId: this.appDataEntityId
      }
    ));
    a && (this.state.model = a);
  }
  /**
   * 获取立方体数据
   *
   * @param {(string | undefined)} cubeId
   * @return {*}  {(Promise<IAppBICubeData | undefined>)}
   * @memberof BIReportChartController
   */
  async getCubeById(t) {
    if (!t)
      return;
    const e = $(this.context);
    return e.pssysbicube = t, (await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicube",
      "get",
      e,
      this.viewParams
    )).data || {};
  }
  /**
   * 初始化数据集
   *
   * @author tony001
   * @date 2024-06-18 15:06:41
   * @return {*}  {Promise<void>}
   */
  async load() {
    if (this.state.items = [], await this.checkData()) {
      const e = await this.fetchDataSource();
      this.state.items = e;
    }
    return this.state.items;
  }
  /**
   * 销毁
   *
   * @author tony001
   * @date 2024-06-12 17:06:38
   * @return {*}  {Promise<void>}
   */
  async destroyed() {
    localStorage.removeItem(this.uuid);
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BIReportChartController
   */
  async handleValueChange(t, e, i) {
    i && Object.keys(i).length > 0 && ((t.startsWith("style") || t.startsWith("extend.cordon") || t.startsWith("extend.axis")) && Object.assign(this.state.reportModel, i), (t.startsWith("data") || t.startsWith("extend")) && (this.state.reportModel = i));
  }
  /**
   * 检查数据
   *
   * @return {*}  {Promise<boolean>}
   * @memberof BIReportChartController
   */
  async checkData() {
    var s;
    let t = !0;
    if (!this.chartConfig)
      return t;
    const e = this.chartConfig.data;
    if (!e || !e.details)
      return t;
    const i = e.details.filter((n) => n.required === !0);
    if (!i || i.length === 0)
      return t;
    const a = this.state.reportModel;
    for (const n of i) {
      if (n.id && n.id === "measure" && (!a.appBIReportMeasures || a.appBIReportMeasures && a.appBIReportMeasures.length === 0)) {
        t = !1;
        break;
      }
      if (n.id && n.id === "dimension") {
        if (!a.appBIReportDimensions || a.appBIReportDimensions && a.appBIReportDimensions.length === 0) {
          t = !1;
          break;
        } else if (a.reportUIModel) {
          let l = $(a.appBIReportDimensions);
          const p = JSON.parse(a.reportUIModel);
          if (((s = p.group) == null ? void 0 : s.length) > 0 && (p.group.forEach((d) => {
            const u = d.split(".").pop();
            l = l.filter(
              (c) => c.dimensionTag !== u
            );
          }), l.length === 0)) {
            t = !1;
            break;
          }
        }
      }
    }
    return t;
  }
  /**
   * 刷新
   *
   * @author tony001
   * @date 2024-06-20 11:06:57
   * @param {('UI' | 'ALL')} [type='UI']
   * @return {*}  {Promise<void>}
   */
  async refresh(t = "UI") {
    var i;
    if (this.state.refreshFlag = !1, t === "ALL" && await this.checkData()) {
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    const e = await ((i = this.converter) == null ? void 0 : i.translateDataToModel(
      this.state.reportModel,
      $(this.chartModel),
      {
        items: this.state.items,
        mode: this.mode,
        chartid: this.uuid,
        appDataEntityId: this.appDataEntityId
      }
    ));
    e && (this.state.model = e, this.state.refreshFlag = !0);
  }
  /**
   * 获取数据集
   *
   * @author tony001
   * @date 2024-06-12 17:06:15
   * @return {*}  {Promise<IData[]>}
   */
  async fetchDataSource() {
    var l;
    const { appBICubeId: t } = this.config;
    let e = "";
    if (this.config.reportTag && this.config.reportTag.indexOf(".") === -1) {
      const p = await ibiz.hub.getAppDataEntity(
        this.appDataEntityId,
        ibiz.env.appId
      );
      e = "/".concat(p.deapicodeName2, "/report?srfreporttag=").concat(this.config.reportTag || "bi_report", "&srfcontenttype=json"), this.context && (e = Xi(this.context, p) + e);
    } else {
      const p = this.config.reportTag.split(".");
      e = "/".concat(La(p[0]), "/report?srfreporttag=").concat(p[1], "&srfcontenttype=json");
    }
    const i = {
      bicubetag: t,
      bimeasures: pi(
        this.state.reportModel,
        this.state.reportModel.appBIReportMeasures || []
      ),
      bidimensions: ui(
        this.state.reportModel,
        this.state.reportModel.appBIReportDimensions || []
      ),
      bisort: hi(
        this.state.reportModel,
        this.state.reportModel.appBIReportMeasures,
        this.state.reportModel.appBIReportDimensions
      )
    };
    let a = mi(this.state.reportModel);
    if (this.viewParams && this.viewParams.srfsearchconds && (a && a.length > 0 ? (l = a[0].searchconds) == null || l.push(this.viewParams.srfsearchconds) : a = this.viewParams.srfsearchconds), Object.assign(i, { searchconds: a }), this.state.reportModel.reportUIModel) {
      const p = JSON.parse(
        this.state.reportModel.reportUIModel
      );
      if (p.period && p.period.length > 0) {
        const d = p.period[0].value;
        d && Object.assign(i, { biperiod: d });
      }
    }
    const s = await ibiz.net.post(e, i);
    return this.handResponseData(s.data);
  }
  /**
   * 处理响应数据
   *
   * @author tony001
   * @date 2024-07-23 15:07:29
   * @private
   * @param {IData[]} data
   * @return {*}  {IData[]}
   */
  handResponseData(t) {
    const e = [], i = [], a = {};
    return this.state.reportModel.appBIReportDimensions && this.state.reportModel.appBIReportDimensions.forEach(
      (s) => {
        if (!s.appCodeListId && s.textAppDEFieldId && i.push(s.dimensionTag), s.stdDataType && Ce(s.stdDataType)) {
          const n = fe("extend", this.state.reportModel);
          n && n["period@".concat(s.dimensionTag)] && (a[s.dimensionTag] = n["period@".concat(s.dimensionTag)]);
        }
      }
    ), i.length > 0 && (i.forEach((s) => {
      const n = {};
      t && t.length > 0 && t.forEach((l) => {
        Object.prototype.hasOwnProperty.call(l, "".concat(s, "_text")) && (n[l[s]] = l["".concat(s, "_text")]);
      }), this.dynaDataDic[s] = n;
    }), localStorage.setItem(this.uuid, JSON.stringify(this.dynaDataDic))), t && t.length > 0 && t.forEach((s) => {
      s.$origin = $(s), Object.keys(a).length > 0 && Object.keys(a).forEach((n) => {
        s[n] = Ra(a[n].unit, s[n]);
      }), e.push(s);
    }), e;
  }
  /**
   * 打开反查视图modal
   *
   * @author zhanghengfeng
   * @date 2024-07-26 16:07:09
   * @param {string} appViewId
   * @param {IAppBIDrillDetailData} data
   * @return {*}  {Promise<void>}
   */
  async openDrillModal(t, e) {
    await ibiz.overlay.createModal(
      "BIReportDrillShell",
      {
        appViewId: t,
        context: this.context,
        data: e,
        reportModel: this.state.reportModel,
        config: this.config,
        dynamicDataDic: this.dynaDataDic
      },
      {
        width: "80%",
        height: "80%"
      }
    ).present();
  }
  /**
   * 处理数据反查
   *
   * @author tony001
   * @date 2024-07-11 16:07:20
   * @param {IAppBIDrillDetailData} args
   * @return {*}  {Promise<void>}
   */
  async handleDrillDetail(t) {
    const e = this.computeDrillDetailAppView(t);
    e && this.openDrillModal(e, t);
  }
  /**
   * 计算反查视图
   *
   * @author tony001
   * @date 2024-07-11 17:07:23
   * @private
   * @param {IAppBIDrillDetailData} args
   * @return {*}  {(string | undefined)}
   */
  computeDrillDetailAppView(t) {
    var s;
    const { measure: e } = t;
    if (!e || !e.name) {
      ibiz.log.error("执行数据反查无指标数据中断");
      return;
    }
    const i = (s = this.config.appBIReportMeasures) == null ? void 0 : s.find(
      (n) => n.measureTag === e.name
    );
    if (!i) {
      ibiz.log.error("执行数据反查未找到指标数据中断");
      return;
    }
    const a = i.drillDetailAppViewId;
    if (!a) {
      ibiz.log.error("执行数据反查未找到反查视图中断");
      return;
    }
    return a;
  }
}
class ho extends ee {
  /**
   * Creates an instance of BIPieChartController.
   * @author tony001
   * @date 2024-06-12 15:06:14
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: ii,
      chartConfig: ti,
      chartDefaultValue: ai
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BIPieChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class fo extends ee {
  /**
   * Creates an instance of BIScatterController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIScatterController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: di,
      chartConfig: ni,
      chartDefaultValue: li
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}
   * @memberof BIScatterController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class mo extends ee {
  /**
   * Creates an instance of BIStackColChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIStackColChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Ot,
      chartConfig: Mt,
      chartDefaultValue: At
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIStackColChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class go extends ee {
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Tt,
      chartConfig: wt,
      chartDefaultValue: Et
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BIGaugeChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend"))
      if (!await this.checkData())
        this.state.items = [];
      else {
        const s = await this.fetchDataSource();
        this.state.items = s;
      }
    this.refresh();
  }
  /**
   * 获取数据集
   *
   * @author zhanghengfeng
   * @date 2024-06-14 21:06:24
   * @return {*}  {Promise<IData[]>}
   */
  async fetchDataSource() {
    var a, s;
    const t = await super.fetchDataSource(), e = ((a = this.state.reportModel.appBIReportMeasures) == null ? void 0 : a[0].measureTag) || "", i = ((s = this.state.reportModel.appBIReportMeasures) == null ? void 0 : s[0].measureName) || "";
    if (t && e) {
      const n = t.reduce((l, p) => l + parseFloat("".concat(p[e] || 0)), 0);
      return [
        {
          $catalog: i,
          [e]: n
        }
      ];
    }
    return [];
  }
}
class yo extends ee {
  /**
   * Creates an instance of BIMultiSeriesLineChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IChartConfig} config
   * @memberof BIMultiSeriesLineChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Gt,
      chartConfig: Vt,
      chartDefaultValue: Ut
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIMultiSeriesLineChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class bo extends ee {
  /**
   * Creates an instance of BIMultiSeriesBarChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIMultiSeriesBarChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Nt,
      chartConfig: Bt,
      chartDefaultValue: Pt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIMultiSeriesBarChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class vo extends ee {
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Dt,
      chartConfig: St,
      chartDefaultValue: xt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @author zhanghengfeng
   * @date 2024-06-14 21:06:15
   * @param {string} name
   * @param {unknown} _value
   * @return {*}  {Promise<void>}
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend"))
      if (!await this.checkData())
        this.state.items = [];
      else {
        const s = await this.fetchDataSource();
        this.state.items = s;
      }
    this.refresh();
  }
}
class Co extends ee {
  /**
   * Creates an instance of BIZoneColChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIZoneColChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Rt,
      chartConfig: Ft,
      chartDefaultValue: Lt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIZoneColChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class Io extends ee {
  /**
   * Creates an instance of BIStackBarController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIStackBarController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: zt,
      chartConfig: $t,
      chartDefaultValue: kt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   *  处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIStackBarController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class wo extends ee {
  /**
   * Creates an instance of BIAreaController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIAreaController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: qt,
      chartConfig: Xt,
      chartDefaultValue: Jt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIAreaController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class To extends ee {
  /**
   * Creates an instance of BIZoneChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIZoneChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: jt,
      chartConfig: Ht,
      chartDefaultValue: _t
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIZoneChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class Eo extends ee {
  /**
   * Creates an instance of BIPolarController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIPolarController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: oi,
      chartConfig: ri,
      chartDefaultValue: si
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}
   * @memberof BIRadarController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class So extends ee {
  /**
   * Creates an instance of BINumberChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BINumberChartController
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: {},
      chartConfig: Ct,
      chartDefaultValue: It
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BINumberChartController
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class Do extends ee {
  /**
   * Creates an instance of BIPieChartController.
   * @author tony001
   * @date 2024-06-12 15:06:14
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Qt,
      chartConfig: Zt,
      chartDefaultValue: ei
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 初始化状态
   *
   * @memberof BICrossTableController
   */
  initState() {
    super.initState(), this.state.style = {};
  }
  /**
   * 处理值变更
   *
   * @author tony001
   * @date 2024-06-12 17:06:03
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}  {Promise<void>}
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class xo extends ee {
  /**
   * Creates an instance of BIPieChartController.
   * @author tony001
   * @date 2024-06-12 15:06:14
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   */
  constructor(t, e, i, a) {
    super(t, e, i, a, {
      chartModel: Yt,
      chartConfig: Wt,
      chartDefaultValue: Kt
    }), this.mode = t, this.context = e, this.viewParams = i, this.config = a;
  }
  /**
   * 初始化状态
   *
   * @memberof BITableController
   */
  initState() {
    super.initState(), this.state.style = {}, this.state.attrs = {};
  }
  /**
   * 处理值变更
   *
   * @author tony001
   * @date 2024-06-12 17:06:03
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}  {Promise<void>}
   */
  async handleValueChange(t, e, i) {
    if (super.handleValueChange(t, e, i), t.startsWith("data.") || t.startsWith("extend")) {
      if (!await this.checkData()) {
        this.state.model = this.chartModel;
        return;
      }
      const s = await this.fetchDataSource();
      this.state.items = s;
    }
    this.refresh();
  }
}
class Oo {
  constructor() {
    M(this, "component", "IBizBIReportNumber");
  }
  createController(t) {
    return K(
      (...i) => new So(...i),
      {
        ...t
      }
    );
  }
}
class Mo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new ho(...i),
      {
        ...t
      }
    );
  }
}
class Ao {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new go(...i),
      {
        ...t
      }
    );
  }
}
class Fo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new bo(...i),
      {
        ...t
      }
    );
  }
}
class Lo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new yo(...i),
      {
        ...t
      }
    );
  }
}
class Ro {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new vo(...i),
      {
        ...t
      }
    );
  }
}
class No {
  constructor() {
    M(this, "component", "IBizBIReportGridShell");
  }
  createController(t) {
    return K(
      (...i) => new Do(...i),
      {
        ...t
      }
    );
  }
}
class Bo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new fo(...i),
      {
        ...t
      }
    );
  }
}
class Po {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new mo(...i),
      {
        ...t
      }
    );
  }
}
class zo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new Co(...i),
      {
        ...t
      }
    );
  }
}
class $o {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new Io(...i),
      {
        ...t
      }
    );
  }
}
class ko {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new wo(...i),
      {
        ...t
      }
    );
  }
}
class Go {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new To(...i),
      {
        ...t
      }
    );
  }
}
class Vo {
  constructor() {
    M(this, "component", "IBizBIReportChartShell");
  }
  createController(t) {
    return K(
      (...i) => new Eo(...i),
      {
        ...t
      }
    );
  }
}
class Uo {
  constructor() {
    M(this, "component", "IBizBIReportGridShell");
  }
  createController(t) {
    return K(
      (...i) => new xo(...i),
      {
        ...t
      }
    );
  }
}
const jo = () => {
  Y("NUMBER", () => new Oo()), Y("PIE", () => new Mo()), Y(
    "SCATTER",
    () => new Bo()
  ), Y(
    "STACK_COL",
    () => new Po()
  ), Y("GAUGE", () => new Ao()), Y(
    "MULTI_SERIES_BAR",
    () => new Fo()
  ), Y(
    "MULTI_SERIES_LINE",
    () => new Lo()
  ), Y(
    "MULTI_SERIES_COL",
    () => new Ro()
  ), Y(
    "ZONE_COL",
    () => new zo()
  ), Y(
    "STACK_BAR",
    () => new $o()
  ), Y("AREA", () => new ko()), Y(
    "ZONE_LINE",
    () => new Go()
  ), Y("RADAR", () => new Vo()), Y(
    "CROSSTABLE",
    () => new No()
  ), Y("GRID", () => new Uo());
}, Ho = /* @__PURE__ */ V({
  name: "IBizBIReportChartShell",
  props: {
    c: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = U("bi-report-chart-shell"), e = o.c;
    return {
      ns: t,
      controller: e,
      handleControllerAppear: (a) => {
        e.setChartController(a);
      }
    };
  },
  render() {
    return !this.controller.state.isCreated || !this.controller.state.refreshFlag ? null : r(S("iBizChartControl"), {
      modelData: this.controller.state.model,
      context: this.controller.context,
      isSimple: !0,
      data: this.controller.state.items,
      onControllerAppear: this.handleControllerAppear
    }, null);
  }
}), _o = /* @__PURE__ */ V({
  name: "IBizBIReportGridShell",
  props: {
    c: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = U("bi-report-grid"), e = o.c;
    return {
      ns: t,
      controller: e,
      handleControllerAppear: (s) => {
        e.setChartController(s);
      },
      renderNoData: () => r(S("iBizNoData"), {
        text: ibiz.i18n.t("control.common.currentNoData")
      }, null)
    };
  },
  render() {
    if (!this.controller.state.isCreated || !this.controller.state.refreshFlag)
      return null;
    const {
      vars: o,
      classList: t = []
    } = this.controller.state.style, {
      degridColumns: e = []
    } = this.controller.state.model;
    return e.length === 0 ? this.renderNoData() : r(S("iBizGridControl"), Pi({
      modelData: this.controller.state.model,
      context: this.controller.context,
      isSimple: !0,
      style: o,
      class: [...t, this.ns.b()],
      data: this.controller.state.tableData,
      onControllerAppear: this.handleControllerAppear
    }, this.controller.state.attrs), null);
  }
}), qo = /* @__PURE__ */ V({
  name: "IBizBIReportNumber",
  props: {
    c: {
      type: Object,
      required: !0
    },
    enableDrillDetail: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["drillDetail"],
  setup(o, {
    emit: t
  }) {
    const e = o.c, i = U("amount"), a = F({
      visible: !1,
      // 查看明细是否显示
      yoy: 0,
      // 同比差异值,年与年比较
      qoq: 0,
      // 环比差异值,月与月比较
      currentTotal: 0,
      // 当前总数
      yoyTotal: 0,
      // 同比总数
      qoqTotal: 0
      // 环比总数
    }), s = k(() => e.state.reportModel), n = () => {
      var b, v, h;
      const g = (h = (v = (b = s.value) == null ? void 0 : b.appBIReportMeasures) == null ? void 0 : v[0]) == null ? void 0 : h.measureTag;
      g && (e.state.items.forEach((f) => {
        f && f.srfperiodtype === "PoP1" ? a.value.qoqTotal = Number.isNaN(Number(f[g])) ? 0 : Number(f[g]) : f && f.srfperiodtype === "YoY1" ? a.value.yoyTotal = Number.isNaN(Number(f[g])) ? 0 : Number(f[g]) : f && f[g] && (a.value.currentTotal = Number.isNaN(Number(f[g])) ? 0 : Number(f[g]));
      }), a.value.qoq = a.value.currentTotal - a.value.qoqTotal, a.value.yoy = a.value.currentTotal - a.value.yoyTotal);
    }, l = k(() => {
      var g, b;
      if ((g = s.value) != null && g.reportUIModel) {
        const v = JSON.parse((b = s.value) == null ? void 0 : b.reportUIModel);
        if (v.style)
          return v.style;
      }
      return {};
    }), p = k(() => {
      const g = {};
      if (l.value && l.value.font && l.value.font.font) {
        const {
          fontWeight: b,
          fontStyle: v,
          fontSize: h,
          color: f
        } = l.value.font.font;
        Object.assign(g, {
          fontWeight: b,
          fontStyle: v,
          fontSize: "".concat(h, "px"),
          color: f
        });
      }
      return g;
    }), d = k(() => {
      const g = {};
      if (l.value && l.value.font && l.value.font.font) {
        const {
          fontWeight: b,
          fontStyle: v,
          fontSize: h,
          color: f
        } = l.value.font.font;
        Object.assign(g, {
          fontWeight: b,
          fontStyle: v,
          fontSize: "".concat(h / 5, "px"),
          color: f
        });
      }
      return g;
    });
    W(() => [s.value, e.state.items], () => {
      a.value.yoy = 0, a.value.qoq = 0, a.value.currentTotal = 0, a.value.yoyTotal = 0, a.value.qoqTotal = 0, n();
    }, {
      immediate: !0,
      deep: !0
    });
    const u = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor",
      style: "transform: rotate(180deg);"
    }, [r("g", {
      id: "aft1.Base基础/1.icon图标/5.navigation/caret-down",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M5.02 8.233l5.952-5.952a.6.6 0 0 1 1.025.424v5.952a.6.6 0 0 1-.6.6H5.445a.6.6 0 0 1-.424-1.024z",
      id: "aft路径",
      transform: "rotate(45 7.997 5.257)"
    }, null)])]), c = () => r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false",
      fill: "currentColor"
    }, [r("g", {
      id: "aft1.Base基础/1.icon图标/5.navigation/caret-down",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M5.02 8.233l5.952-5.952a.6.6 0 0 1 1.025.424v5.952a.6.6 0 0 1-.6.6H5.445a.6.6 0 0 1-.424-1.024z",
      id: "aft路径",
      transform: "rotate(45 7.997 5.257)"
    }, null)])]), C = (g, b) => {
      if (g === 0)
        return b === 0 ? r("span", null, [R("-")]) : r("div", {
          class: i.e("up")
        }, [u(), r("span", null, [R("100%")])]);
      const v = b - g, h = (Math.abs(v) / g * 100).toFixed(0);
      return v < 0 ? r("div", {
        class: i.e("down")
      }, [c(), r("span", null, [h, R("%")])]) : v === 0 ? r("span", null, [R("-")]) : r("div", {
        class: i.e("up")
      }, [u(), r("span", null, [h, R("%")])]);
    }, w = () => {
      var g, b, v;
      a.value.visible = !1, t("drillDetail", {
        measure: {
          name: (v = (b = (g = s.value) == null ? void 0 : g.appBIReportMeasures) == null ? void 0 : b[0]) == null ? void 0 : v.measureTag
        }
      });
    }, y = (g) => {
      var v, h, f;
      const b = (f = (h = (v = s.value) == null ? void 0 : v.appBIReportMeasures) == null ? void 0 : h[0]) == null ? void 0 : f.jsonFormat;
      return b ? ibiz.util.text.format(String(g), b) : g;
    }, m = k({
      get() {
        return a.value.visible && o.enableDrillDetail && o.c.mode === "CONTENT" && !ibiz.fullscreenUtil.isFullScreen;
      },
      set(g) {
        a.value.visible = g;
      }
    });
    return {
      ns: i,
      controller: e,
      uiState: a,
      style: p,
      renderUpDownResult: C,
      miniStyle: d,
      reportUIModelStyle: l,
      onDrillDetail: w,
      handleFormat: y,
      visibleComp: m
    };
  },
  render() {
    var o, t, e, i, a, s, n, l, p, d;
    return !this.controller.state.isCreated || !this.controller.state.refreshFlag ? null : r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("content")
    }, [r(S("el-popover"), {
      trigger: "click",
      visible: this.visibleComp,
      "onUpdate:visible": (u) => this.visibleComp = u,
      "popper-class": this.ns.e("check-detail"),
      placement: "right-start",
      width: 200
    }, {
      default: () => r("div", {
        onClick: this.onDrillDetail,
        class: this.ns.em("check-detail", "item")
      }, [r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        id: "aspnormal/preview",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M11.626 0c1.057 0 1.923.818 2 1.855l.005.15v3.411a.6.6 0 0 1-1.192.097l-.008-.097.001-1.348V2.005c0-.41-.31-.749-.705-.799l-.101-.006h-9.62c-.41 0-.75.308-.8.704l-.006.101v11.989c0 .41.308.75.705.8l.101.006h5.906l.017-.004.016-.003h2.074a.598.598 0 1 1 .107 1.187l-.095.01V16H2.006a2.006 2.006 0 0 1-2-1.856L0 13.994V2.005C0 .948.818.082 1.856.005L2.006 0h9.62zm-1.595 6.328a3.669 3.669 0 0 1 3.665 3.665c0 .79-.251 1.523-.678 2.123l2.412 2.412a.6.6 0 1 1-.848.85l-2.41-2.412a3.646 3.646 0 0 1-2.14.692 3.67 3.67 0 0 1-3.667-3.665 3.67 3.67 0 0 1 3.666-3.665zm-5.106 5.29a.6.6 0 0 1 .097 1.191l-.097.008H2.85a.6.6 0 0 1-.097-1.192l.097-.008h2.074zm5.106-4.09a2.468 2.468 0 0 0-2.466 2.465 2.468 2.468 0 0 0 2.466 2.466 2.47 2.47 0 0 0 2.466-2.466 2.469 2.469 0 0 0-2.466-2.465zm-4.815-.126a.6.6 0 0 1 .097 1.193l-.097.007h-2.35A.6.6 0 0 1 2.77 7.41l.098-.008h2.349zm5.58-4a.6.6 0 0 1 .097 1.192l-.097.008H2.867A.6.6 0 0 1 2.77 3.41l.097-.008h7.929z",
        id: "asp合并形状"
      }, null)])]), r("span", {
        class: this.ns.em("check-detail", "text")
      }, [R("查看明细")])]),
      reference: () => r("div", {
        class: this.ns.em("content", "number")
      }, [r("span", {
        class: this.ns.em("content", "number-text"),
        style: this.style
      }, [this.handleFormat(this.uiState.currentTotal)]), r("span", {
        class: this.ns.em("content", "number-unit"),
        style: this.miniStyle
      }, null)])
    }), r("div", {
      class: this.ns.em("content", "compare")
    }, [((o = this.reportUIModelStyle.yoy) == null ? void 0 : o.show) && r("div", {
      class: this.ns.em("content", "yoy")
    }, [r("div", {
      class: this.ns.em("content", "compare-number")
    }, [r("span", null, [R("同比")]), r("span", {
      class: [this.ns.em("content", "yoy-yoyTotal"), this.ns.is("show", (e = (t = this.reportUIModelStyle.yoy) == null ? void 0 : t.yoy) == null ? void 0 : e.includes("orgin"))]
    }, [this.uiState.yoyTotal]), r("span", {
      class: [this.ns.em("content", "yoy-value"), this.ns.is("show", (a = (i = this.reportUIModelStyle.yoy) == null ? void 0 : i.yoy) == null ? void 0 : a.includes("difference"))]
    }, [R("("), this.uiState.yoy > 0 ? "+" : "", this.uiState.yoy, R(")")])]), r("div", {
      class: this.ns.em("content", "icon")
    }, [this.renderUpDownResult(this.uiState.yoyTotal, this.uiState.currentTotal)])]), ((s = this.reportUIModelStyle.qoq) == null ? void 0 : s.show) && r("div", {
      class: this.ns.em("content", "qoq")
    }, [r("div", {
      class: this.ns.em("content", "compare-number")
    }, [r("span", null, [R("环比")]), r("span", {
      class: [this.ns.em("content", "qoq-qoqTotal"), this.ns.is("show", (l = (n = this.reportUIModelStyle.qoq) == null ? void 0 : n.qoq) == null ? void 0 : l.includes("orgin"))]
    }, [this.uiState.qoqTotal]), r("span", {
      class: [this.ns.em("content", "qoq-value"), this.ns.is("show", (d = (p = this.reportUIModelStyle.qoq) == null ? void 0 : p.qoq) == null ? void 0 : d.includes("difference"))]
    }, [R("("), this.uiState.qoq > 0 ? "+" : "", this.uiState.qoq, R(")")])]), r("div", {
      class: this.ns.em("content", "icon")
    }, [this.renderUpDownResult(this.uiState.qoqTotal, this.uiState.currentTotal)])])])])]);
  }
}), Ye = /* @__PURE__ */ V({
  name: "IBizBIReportContent",
  components: {
    IBizBIReportChartShell: Ho,
    IBizBIReportGridShell: _o,
    IBizBIReportNumber: qo
  },
  props: {
    mode: {
      type: String,
      require: !0
    },
    context: {
      type: Object,
      require: !0
    },
    viewParams: {
      type: Object,
      require: !0
    },
    // 设计态必传
    controller: {
      type: Object
    },
    // 呈现态必传
    config: {
      type: Object
    }
  },
  emits: ["reportChartChange", "init"],
  setup(o, {
    emit: t
  }) {
    var p;
    const e = U("content"), i = {
      name: "AppView",
      id: "AppView",
      viewType: "DECUSTOMVIEW",
      appId: ibiz.env.appId
    };
    zi(
      "ctx",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Ji(i, Ui.create({})).ctx
    );
    const a = F(), s = F(), n = (d) => {
      var C;
      const u = dt(d);
      a.value = u;
      const c = {
        ...o.config
      };
      Object.assign(c, {
        selectChartType: d,
        selectCubeId: (C = o.controller) == null ? void 0 : C.state.selectCube.pssysbicubeid
      }), s.value = u == null ? void 0 : u.createController({
        mode: "DESIGN",
        context: o.context,
        viewParams: o.viewParams,
        config: o.config
      }), t("reportChartChange", s.value);
    };
    if (o.mode === "DESIGN")
      n((p = o.controller) == null ? void 0 : p.state.selectChartType);
    else {
      const {
        reportUIModel: d
      } = o.config;
      let u = "NUMBER";
      d && (u = JSON.parse(d).selectChartType || "NUMBER");
      const c = dt(u);
      a.value = c, s.value = c == null ? void 0 : c.createController({
        mode: "CONTENT",
        context: o.context,
        viewParams: o.viewParams,
        config: o.config
      });
    }
    return t("init", s.value), He(() => {
      s.value && s.value.destroyed();
    }), {
      ns: e,
      c: s,
      provider: a,
      onDrillDetail: (d) => {
        var u;
        (u = s.value) == null || u.handleDrillDetail(d);
      }
    };
  },
  render() {
    var o;
    return Ze(r("div", {
      class: this.ns.b("container")
    }, [((o = this.c) == null ? void 0 : o.state.isCreated) && te(S(this.provider.component), {
      c: this.c,
      onDrillDetail: this.onDrillDetail
    })]), [[Qe("loading"), this.c && !this.c.state.isCreated]]);
  }
}), Xo = /* @__PURE__ */ V({
  name: "BIContentCaption",
  props: {
    config: {
      type: Object,
      default: () => {
      }
    },
    controller: {
      type: Object
    }
  },
  setup(o) {
    const t = U("bi-content-caption"), e = k(() => {
      var p, d;
      return (d = (p = o.controller) == null ? void 0 : p.state.propertyData) == null ? void 0 : d.caption;
    }), i = F({
      chartCaption: e.value,
      // 图表名称
      isFocus: !1
      // 是否聚焦
    }), a = () => {
      var p, d;
      i.value.isFocus = !0, i.value.chartCaption = (d = (p = o.controller) == null ? void 0 : p.state.propertyData) == null ? void 0 : d.caption;
    }, s = () => {
      var p;
      i.value.isFocus = !1, (p = o.controller) == null || p.setData("caption", i.value.chartCaption);
    }, n = (p) => {
      var d;
      p && p.code === "Enter" ? s() : p && p.code === "Escape" && (p.stopPropagation(), i.value.isFocus = !1, i.value.chartCaption = (d = o.controller) == null ? void 0 : d.state.propertyData.caption);
    }, l = k(() => {
      var p;
      return ((p = o.controller) == null ? void 0 : p.state.propertyData.caption) || "未命名";
    });
    return {
      ns: t,
      caption: l,
      uiState: i,
      onFocus: a,
      onChange: s,
      handleKeyDown: n
    };
  },
  render() {
    var o, t, e;
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: [this.ns.e("caption"), this.ns.is("focus", this.uiState.isFocus)]
    }, [r("div", {
      class: this.ns.e("label")
    }, [r("span", null, [this.caption]), r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      focusable: "false"
    }, [r("g", {
      id: "aiwaction/edit",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M2 8.34L10.71 0 15 4.17 6.538 13H2V8.34zm1.2.512V11.8h2.826l7.283-7.6-2.606-2.533L3.2 8.852zM0 16v-1.2h16V16H0z",
      id: "aiw编辑"
    }, null)])])]), r(S("el-input"), {
      class: this.ns.e("input"),
      modelValue: this.uiState.chartCaption,
      "onUpdate:modelValue": (i) => this.uiState.chartCaption = i,
      placeholder: "请输入报表名称(不超过32字符)",
      onFocus: this.onFocus,
      onKeydown: this.handleKeyDown,
      onBlur: this.onChange
    }, null)]), r("div", {
      class: this.ns.e("data-total")
    }, [R("共"), r("span", {
      class: this.ns.e("size")
    }, [((e = (t = (o = this.controller) == null ? void 0 : o.state.reportChart) == null ? void 0 : t.state) == null ? void 0 : e.items.length) || 0]), R("条数据")])]);
  }
}), Jo = /* @__PURE__ */ V({
  name: "BIDesignHeader",
  props: {
    controller: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = U("design-header"), e = k(() => o.controller.state.propertyData), i = k(() => {
      var l;
      return (l = e.value) == null ? void 0 : l.caption;
    });
    return {
      ns: t,
      caption: i,
      onSave: () => {
        o.controller.save();
      },
      onClose: async () => {
        o.controller.close();
      },
      onReset: async () => {
        if (o.controller && !o.controller.state.dataChangeState)
          return;
        await ibiz.confirm.warning({
          title: "确认取消保存",
          desc: r("div", {
            class: t.b("report-caption")
          }, [r("div", null, [R("确认取消保存报表"), r("div", {
            class: t.be("report-caption", "name")
          }, [i.value || "未命名"]), R("吗？")]), r("div", {
            class: t.be("report-caption", "desc")
          }, [R("取消保存后无法保存编辑信息。")])])
        }) && o.controller.cancel();
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r("div", {
      class: this.ns.e("caption")
    }, [r("span", {
      class: this.ns.em("caption", "text")
    }, [this.caption])]), r("div", {
      class: this.ns.e("actions")
    }, [r("div", {
      class: this.ns.em("actions", "close"),
      onClick: this.onClose
    }, [R("返回")]), r("div", {
      class: this.ns.em("actions", "save")
    }, [r(S("el-dropdown"), {
      "split-button": !0,
      type: "primary",
      onClick: this.onSave,
      onCommand: this.onReset,
      "popper-class": this.ns.b("save-popper")
    }, {
      default: () => r("span", null, [R("保存")]),
      dropdown: () => r(S("el-dropdown-menu"), null, {
        default: () => [r(S("el-dropdown-item"), null, {
          default: () => [R("取消保存")]
        })]
      })
    })])])]);
  }
}), ct = /* @__PURE__ */ V({
  name: "IBizBIReportDesign",
  components: {
    "bi-report-select": aa,
    "bi-report-property": qa,
    "bi-report-content": Ye,
    "bi-content-caption": Xo,
    "bi-design-header": Jo
  },
  props: {
    context: {
      type: Object,
      require: !0
    },
    viewParams: {
      type: Object,
      require: !0
    },
    dismiss: {
      type: Object
    },
    config: {
      type: Object,
      default: () => ({
        reportTag: "bi_report",
        selectChartType: "NUMBER"
      })
    },
    measureToolbar: {
      type: Object
    },
    dimensionToolbar: {
      type: Object
    }
  },
  emit: ["action-click"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-report-design"), i = Zi((...n) => new Wa(...n)), a = (n) => {
      i.setReportChart(n);
    }, s = (n) => {
      i.switchReportType(n);
    };
    return i.evt.on("onActionClick", ({
      detail: n,
      item: l,
      event: p
    }) => {
      t("action-click", {
        detail: n,
        item: l,
        event: p
      });
    }), {
      ns: e,
      c: i,
      handleReportChartChange: a,
      handleReportChartTypeChange: s
    };
  },
  render() {
    return Ze(r("div", {
      class: this.ns.b("container")
    }, [this.c.state.isCreated && [r("div", {
      class: this.ns.be("container", "header")
    }, [r(S("bi-design-header"), {
      controller: this.c
    }, null)]), r("div", {
      class: this.ns.be("container", "design-area")
    }, [r("div", {
      class: this.ns.b("sidebar")
    }, [r(S("bi-report-select"), {
      controller: this.c
    }, null), r(S("bi-report-property"), {
      controller: this.c,
      onReportChartTypeChange: this.handleReportChartTypeChange
    }, null)]), r("div", {
      class: this.ns.b("content")
    }, [r(S("bi-content-caption"), {
      controller: this.c,
      config: this.config
    }, null), this.c.state.reportModel && r(S("bi-report-content"), {
      mode: "DESIGN",
      context: this.c.context,
      viewParams: this.c.viewParams,
      controller: this.c,
      config: this.c.state.reportModel,
      onReportChartChange: this.handleReportChartChange
    }, null)])])]]), [[Qe("loading"), !this.c.state.isCreated]]);
  }
}), pt = /* @__PURE__ */ V({
  name: "BIReportDrillShell",
  props: {
    appViewId: {
      type: String,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    data: {
      type: Object,
      required: !0
    },
    reportModel: {
      type: Object,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    },
    dynamicDataDic: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = U("bi-report-drill-shell"), e = F(""), i = F([]), a = F([]), s = F(""), n = F({}), l = F(!1), p = async (C) => o.context ? await ibiz.hub.getApp(o.context.srfappid).codeList.get(C, o.context) : [], d = () => {
      var I, x, A;
      const {
        appBISchemeId: C,
        appBICubeId: w
      } = o.config, y = o.data.measure, m = (I = o.data.dimension) == null ? void 0 : I.filter((O) => a.value.includes(O.name));
      let g = "";
      const b = {
        bicubetag: w
      }, v = (x = o.reportModel.appBIReportMeasures) == null ? void 0 : x.find((O) => O.measureTag === y.name);
      if (!v) {
        ibiz.log.error("执行数据反查未找到指标数据中断");
        return;
      }
      Object.assign(b, {
        bimeasures: pi(o.reportModel, [v])
      }), g += "".concat(C, ".").concat(w, ".").concat(v.measureTag);
      let h = [];
      if (Object.assign(b, {
        bidimensions: []
      }), m && m.length > 0) {
        g += "$";
        const O = /* @__PURE__ */ new Map();
        m.forEach((N, P) => {
          O.set(N.name, N.value), g += "".concat(N.name, "=").concat(N.value), P !== m.length - 1 && (g += "&");
        }), h = (A = o.reportModel.appBIReportDimensions) == null ? void 0 : A.filter((N) => O.has(N.dimensionTag)), h && h.length > 0 && Object.assign(b, {
          bidimensions: ui(o.reportModel, h)
        });
      }
      Object.assign(b, {
        bisort: hi(o.reportModel, [v], h)
      });
      const f = [{
        condtype: "CUSTOM",
        customtype: "BIDRILLDETAIL",
        customcond: g
      }], T = mi(o.reportModel);
      T && f.push(T[0]), Object.assign(b, {
        searchconds: f
      }), n.value = b, s.value = i.value.filter((O) => a.value.some((N) => N === O.name)).map((O) => O.text).join(",");
    };
    return (async () => {
      var C, w;
      try {
        l.value = !1;
        const {
          measure: y,
          dimension: m
        } = o.data;
        if (y) {
          const g = (C = o.reportModel.appBIReportMeasures) == null ? void 0 : C.find((b) => b.measureTag === y.name);
          g && (e.value = g.measureName || "");
        }
        if (Array.isArray(m)) {
          const g = (w = o.reportModel.appBIReportDimensions) == null ? void 0 : w.filter((b) => m.some((v) => v.name === b.dimensionTag));
          if (g && g.length) {
            const b = await Promise.all(g.map(async (v) => {
              var T, I;
              const h = (T = m.find((x) => x.name === v.dimensionTag)) == null ? void 0 : T.value;
              let f = h;
              if (v.appCodeListId) {
                const x = await p(v.appCodeListId), A = x == null ? void 0 : x.find((O) => O.value === h);
                A && (f = A.text);
              }
              return !v.appCodeListId && v.textAppDEFieldId && o.dynamicDataDic && (f = (I = o.dynamicDataDic[v.dimensionTag]) == null ? void 0 : I["".concat(h)]), {
                text: v.dimensionName,
                name: v.dimensionTag,
                value: h,
                valueText: f
              };
            }));
            i.value = b, a.value = i.value.map((v) => v.name);
          }
        }
        d();
      } finally {
        l.value = !0;
      }
    })(), {
      ns: t,
      caption: e,
      items: i,
      activeItems: a,
      activeText: s,
      customParams: n,
      isLoaded: l,
      handleClick: (C) => {
        const w = a.value.findIndex((y) => y === C.name);
        w !== -1 ? a.value.splice(w, 1) : a.value.push(C.name), d();
      }
    };
  },
  render() {
    if (this.isLoaded)
      return r("div", {
        class: this.ns.b()
      }, [r("div", {
        class: this.ns.b("header")
      }, [this.caption]), r("div", {
        class: this.ns.b("content")
      }, [this.items.length > 0 && r("div", {
        class: this.ns.b("content-left")
      }, [r("div", {
        class: this.ns.b("content-left-list")
      }, [this.items.map((o) => r("div", {
        class: [this.ns.b("item"), this.ns.is("active", this.activeItems.includes(o.name))],
        onClick: () => {
          this.handleClick(o);
        }
      }, [r("div", {
        class: this.ns.be("item", "name")
      }, [o.text || ""]), r("div", {
        class: this.ns.be("item", "value")
      }, [o.valueText || ""])]))]), r("div", {
        class: this.ns.b("content-left-active-items"),
        title: "已过滤的纬度：".concat(this.activeText)
      }, [r("span", {
        class: this.ns.be("content-left-active-items", "text")
      }, [R("已过滤的纬度："), this.activeText])])]), r("div", {
        class: this.ns.b("content-right")
      }, [te(S("IBizViewShell"), {
        context: this.context,
        params: this.customParams,
        viewId: this.appViewId
      })])])]);
  }
});
class Ei extends yt {
  constructor() {
    super(...arguments);
    /**
     * BI报表配置
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:34
     * @type {IData}
     */
    M(this, "config", {});
    /**
     * 上下文
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:53
     * @type {IContext}
     */
    M(this, "context");
    /**
     * BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:45
     * @type {string}
     */
    M(this, "reportKey", "");
    /**
     * @description 指标工具栏
     * @type {(IDEToolbar | null)}
     * @memberof BIReportPanelController
     */
    M(this, "measureToolbar", null);
    /**
     * @description 维度工具栏
     * @type {(IDEToolbar | null)}
     * @memberof BIReportPanelController
     */
    M(this, "dimensionToolbar", null);
  }
  /**
   * 初始化BI报表key
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:16
   */
  initReportKey() {
    var a, s, n;
    const e = (a = this.panel.view.model) == null ? void 0 : a.appDataEntityId;
    e && (this.reportKey = bt(e));
    const i = (n = (s = this.model) == null ? void 0 : s.editor) == null ? void 0 : n.editorParams;
    i && i.appDataEntityId && (this.reportKey = i.appDataEntityId);
  }
  /**
   * @description 初始化维度指标工具栏
   * @memberof BIReportPanelController
   */
  initToolbar() {
    var a;
    const i = ((a = this.panel.view.model.viewLayoutPanel) == null ? void 0 : a.controls) || [];
    this.measureToolbar = i.find(
      (s) => s.controlType === "TOOLBAR" && s.name === "measure_toolbar"
    ), this.dimensionToolbar = i.find(
      (s) => s.controlType === "TOOLBAR" && s.name === "dimension_toolbar"
    );
  }
  /**
   * 初始化
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:40
   * @return {*}  {Promise<void>}
   */
  async onInit() {
    await super.onInit(), this.initReportKey(), this.initToolbar();
    const e = $(this.panel.context);
    Object.assign(e, { pssysbireport: e[this.reportKey] }), this.context = e;
    const i = ibiz.hub.getApp(ibiz.env.appId);
    try {
      this.panel.view.startLoading();
      const a = await i.deService.exec(
        "pssysbireport",
        "get",
        e,
        this.panel.params
      );
      if (a.data) {
        const s = await ibiz.util.biReport.translateDEReportToConfig(
          a.data
        );
        this.panel.params.srfreporttag && (s.reportTag = this.panel.params.srfreporttag), this.panel.params.srfbischematag && (s.selectedSchemeId = this.panel.params.srfbischematag), this.config = s;
      }
    } catch (a) {
      throw new ne(a.message);
    } finally {
      this.panel.view.endLoading();
    }
  }
}
const ut = /* @__PURE__ */ V({
  name: "BIReportPanel",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: Ei,
      required: !0
    }
  },
  setup(o) {
    const t = U("bi-report-panel"), e = o.controller;
    return {
      ns: t,
      c: e,
      onActionClick: async ({
        detail: a,
        item: s,
        event: n
      }) => {
        const l = {
          ...e.panel.params
        }, p = a.uiactionId;
        await gt.execAndResolved(p, {
          context: e.context,
          params: l,
          data: [s],
          view: e.panel.view,
          event: n
        }, a.appId);
      }
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r(S("iBizBIReportDesign"), {
      context: this.c.context,
      params: this.c.panel.params,
      config: this.c.config,
      measureToolbar: this.c.measureToolbar,
      dimensionToolbar: this.c.dimensionToolbar,
      dismiss: () => {
        window.history.back();
      },
      onActionClick: this.onActionClick
    }, null)]);
  }
});
class Wo {
  constructor() {
    M(this, "component", "BIReportPanel");
  }
  async createController(t, e, i) {
    const a = new Ei(t, e, i);
    return await a.init(), a;
  }
}
const Yo = {
  install(o) {
    o.component(ut.name, ut), vt(
      "CUSTOM_BI_REPORT_PANEL",
      () => new Wo()
    );
  }
};
class Ko extends Wi {
  constructor() {
    super(...arguments);
    /**
     * 图表报表属性数据
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    M(this, "propertyData", {});
    /**
     * 图表报表模型
     *
     * @type {IAppBIReport | undefined}
     * @memberof IBIReportDesignState
     */
    M(this, "reportModel");
    /**
     * 表格报表属性数据
     *
     * @type {IData}
     * @memberof IBIReportDesignState
     */
    M(this, "gridPropertyData", {});
    /**
     * 表格报表模型
     *
     * @type {IAppBIReport | undefined}
     * @memberof IBIReportDesignState
     */
    M(this, "gridReportModel");
    /**
     * 默认图表报表属性数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:39
     * @type {IData}
     */
    M(this, "defaultPropertyData", {});
    /**
     * 默认表格报表属性数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:48
     * @type {IData}
     */
    M(this, "defaultGridPropertyData", {});
    /**
     * 默认图表报表模型
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:02
     * @type {(IAppBIReport | undefined)}
     */
    M(this, "defaultReportModel");
    /**
     * 默认表格报表模型
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:15
     * @type {(IAppBIReport | undefined)}
     */
    M(this, "defaultGridReportModel");
    /**
     * 是否已加载schema
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:17
     * @type {boolean}
     */
    M(this, "isLoadedSchema", !1);
    /**
     * schema字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:32
     * @type {ISchemaField[]}
     */
    M(this, "schemaFields", []);
    /**
     * 条件字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:43
     * @type {ISchemaField[]}
     */
    M(this, "conditionFields", []);
    /**
     * 条件字段映射
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:56
     * @type {Map<string, IAppBICubeDimensionData>}
     */
    M(this, "conditionFieldMap", /* @__PURE__ */ new Map());
    /**
     * 字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:07
     * @type {ISchemaField[]}
     */
    M(this, "fields", []);
    /**
     * 字段图标映射
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:13
     * @type {Map<string, string>}
     */
    M(this, "fieldIconMap", /* @__PURE__ */ new Map());
    /**
     * 指标
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:27
     * @type {IAppBICubeMeasureData[]}
     */
    M(this, "measure", []);
    /**
     * 维度
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:36
     * @type {IAppBICubeDimensionData[]}
     */
    M(this, "dimension", []);
    /**
     * 过滤条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:46
     * @type {IFilterNodeGroup}
     */
    M(this, "cond");
    /**
     * 过滤项
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:02
     * @type {IData[]}
     */
    M(this, "filter", []);
    /**
     * 过滤模式
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:40
     * @type {string}
     */
    M(this, "filterMode", "");
    /**
     * 自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:50
     * @type {string}
     */
    M(this, "customCond", "");
    /**
     * 条件数量
     *
     * @author zhanghengfeng
     * @date 2024-07-16 21:07:22
     * @type {number}
     */
    M(this, "condNum", 0);
  }
}
class Si extends yt {
  constructor() {
    super(...arguments);
    /**
     * BI报表配置
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:34
     * @type {IData}
     */
    M(this, "config", {});
    /**
     * 上下文
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:53
     * @type {IContext}
     */
    M(this, "context");
    /**
     * 表格控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:41
     * @type {IBIReportChartController}
     */
    M(this, "grid");
    /**
     * 图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:56
     * @type {IBIReportChartController}
     */
    M(this, "chart");
    /**
     * 表格类型
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:24
     * @type {string[]}
     */
    M(this, "gridType", ["GRID", "CROSSTABLE"]);
    /**
     * BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:45
     * @type {string}
     */
    M(this, "reportKey", "");
    /**
     * 立方体数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:42
     * @type {IAppBICubeData}
     */
    M(this, "appBICube");
  }
  /**
   * 创建面板状态对象
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:45
   * @protected
   * @return {*}  {BIReportPanelContentState}
   */
  createState() {
    var e;
    return new Ko((e = this.parent) == null ? void 0 : e.state);
  }
  /**
   * 初始化BI报表key
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:16
   */
  initReportKey() {
    var a, s, n;
    const e = (a = this.panel.view.model) == null ? void 0 : a.appDataEntityId;
    e && (this.reportKey = bt(e));
    const i = (n = (s = this.model) == null ? void 0 : s.editor) == null ? void 0 : n.editorParams;
    i && i.appDataEntityId && (this.reportKey = i.appDataEntityId);
  }
  /**
   * 设置表格控制器
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:43
   * @param {IBIReportChartController} grid
   */
  setGrid(e) {
    this.grid = e;
  }
  /**
   * 设置图表控制器
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:56
   * @param {IBIReportChartController} chart
   */
  setChart(e) {
    this.chart = e;
  }
  /**
   * 初始化立方体数据
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:06
   * @return {*}  {Promise<void>}
   */
  async initAppBICube() {
    var d, u;
    const e = this.config.selectChartType, i = this.gridType.includes(e) ? this.state.gridReportModel : this.state.reportModel;
    if (!i)
      return;
    const { appBISchemeId: a, appBICubeId: s } = i;
    if (!a || !s)
      return;
    const n = $(this.context);
    n.pssysbicube = "".concat(a, ".").concat(s);
    const p = await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicube",
      "get",
      n,
      this.panel.params
    );
    this.appBICube = p.data, (d = this.appBICube) != null && d.pssysbicubeid && (this.context.pssysbicube = (u = this.appBICube) == null ? void 0 : u.pssysbicubeid);
  }
  /**
   * 初始化指标
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:53
   * @return {*}  {Promise<void>}
   */
  async initMeasure() {
    const e = {
      ...this.panel.params,
      n_pssysbicubeid_eq: this.context.pssysbicube,
      size: 1e3
    }, a = await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicubemeasure",
      "fetchdefault",
      this.context,
      e
    );
    Array.isArray(a.data) && (this.state.measure = a.data);
  }
  /**
   * 初始化维度
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:27
   * @return {*}  {Promise<void>}
   */
  async initDimension() {
    const e = {
      ...this.panel.params,
      n_pssysbicubeid_eq: this.context.pssysbicube,
      size: 1e3
    }, a = await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbicubedimension",
      "fetchdefault",
      this.context,
      e
    );
    Array.isArray(a.data) && (this.state.dimension = a.data);
  }
  /**
   * 初始化schema字段
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:32
   * @return {*}  {Promise<void>}
   */
  async initSchemaFields() {
    var s;
    const e = (s = this.appBICube) == null ? void 0 : s.psdename;
    if (!e)
      return;
    const i = await gi(e);
    if (!i)
      return;
    const a = await yi(i);
    if (Array.isArray(a)) {
      const n = await ibiz.hub.getAppDataEntity(
        e,
        this.context.srfappid
      );
      n && a.forEach((l) => {
        Object.assign(l, {
          appDataEntityFullTag: n.defullTag
        });
      }), this.state.schemaFields = a;
    }
  }
  /**
   * 初始化字段
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:06
   * @return {*}  {Promise<void>}
   */
  async initFields() {
    if (!this.state.schemaFields.length)
      return;
    const e = ["COMMON"], i = [
      ...this.state.measure.filter(
        (s) => e.includes(s.bimeasuretype)
      ),
      ...this.state.dimension.filter(
        (s) => e.includes(s.bidimensiontype)
      )
    ], a = await Promise.all(
      i.map(async (s) => {
        const n = await he(s, this.state.schemaFields);
        return n && this.state.fieldIconMap.set(
          n.appDEFieldId,
          s.bimeasuretype ? "measure" : "dimension"
        ), n;
      })
    );
    this.state.fields = a.filter((s) => !!s);
  }
  /**
   * 初始化条件字段
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:46
   * @return {*}  {Promise<void>}
   */
  async initConditionFields() {
    if (!this.state.schemaFields.length)
      return;
    const e = ["COMMON"], i = [
      ...this.state.dimension.filter(
        (s) => e.includes(s.bidimensiontype)
      )
    ], a = await Promise.all(
      i.map(async (s) => {
        const n = await he(s, this.state.schemaFields);
        return n && this.state.conditionFieldMap.set(n.appDEFieldId, s), n;
      })
    );
    this.state.conditionFields = a.filter((s) => !!s);
  }
  /**
   * 初始化过滤项
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:19
   * @return {*}  {Promise<void>}
   */
  initFilter() {
    var p, d, u, c, C;
    const e = this.config.selectChartType, i = this.gridType.includes(e) ? this.state.gridPropertyData : this.state.propertyData, a = (p = i == null ? void 0 : i.extend) == null ? void 0 : p.filterMode;
    if (this.state.filterMode = a || "", this.state.customCond = "", this.state.filter = [], this.state.condNum = 0, a === "pql") {
      const w = (d = i == null ? void 0 : i.extend) == null ? void 0 : d.pqlValue;
      if (this.state.customCond = w || "", this.state.customCond) {
        const y = (u = lt(this.state.customCond)) == null ? void 0 : u.filter(
          (m) => m.type === "condition"
        );
        y && (this.state.condNum = y.length);
      }
      return;
    }
    const s = ((c = i == null ? void 0 : i.data) == null ? void 0 : c.filter) || [];
    if (Array.isArray(s) && (this.state.filter = s, this.state.condNum = this.state.filter.length), !s.length)
      return;
    const n = [];
    s.forEach((w) => {
      var y, m, g;
      n.push({
        nodeType: "FIELD",
        field: (y = w.condition) == null ? void 0 : y.field,
        valueOP: (m = w.condition) == null ? void 0 : m.valueOP,
        value: (g = w.condition) == null ? void 0 : g.value
      });
    });
    const l = {
      nodeType: "GROUP",
      logicType: ((C = s[0]) == null ? void 0 : C.groupLogicType) || "AND",
      children: n
    };
    this.state.cond = l;
  }
  /**
   * 加载schema数据
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:37
   * @return {*}  {Promise<void>}
   */
  async loadSchema() {
    await this.initAppBICube(), await this.initSchemaFields(), await this.initMeasure(), await this.initDimension(), await this.initConditionFields(), await this.initFields(), this.state.isLoadedSchema = !0;
  }
  /**
   * 更新过滤项
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:01
   * @param {IData[]} value
   */
  async updateFilter(e) {
    if (this.state.filter = e, this.state.condNum = this.state.filter.length, this.chart && this.state.propertyData) {
      this.state.propertyData.data || (this.state.propertyData.data = {}), this.state.propertyData.extend || (this.state.propertyData.extend = {}), this.state.gridPropertyData.extend.filterMode = this.state.filterMode, this.state.propertyData.data.filter = e;
      const i = await this.compileAppBIReport(
        this.config.selectChartType,
        this.state.propertyData
      );
      this.chart.handleValueChange("data.", "", i || {});
    }
    if (this.grid && this.state.defaultGridReportModel) {
      this.state.gridPropertyData.data || (this.state.gridPropertyData.data = {}), this.state.propertyData.extend || (this.state.propertyData.extend = {}), this.state.gridPropertyData.extend.filterMode = this.state.filterMode, this.state.gridPropertyData.data.filter = e;
      const i = this.config.selectChartType, a = this.gridType.includes(i) ? i : "GRID", s = await this.compileAppBIReport(
        a,
        this.state.gridPropertyData
      );
      this.grid.handleValueChange("data.", "", s || {});
    }
  }
  /**
   * 更新自定义条件
   *
   * @author zhanghengfeng
   * @date 2024-07-16 22:07:16
   * @param {string} value
   * @return {*}  {Promise<void>}
   */
  async updateCustomCond(e) {
    var i;
    if (this.state.customCond = e, this.state.customCond) {
      const a = (i = lt(this.state.customCond)) == null ? void 0 : i.filter(
        (s) => s.type === "condition"
      );
      a && (this.state.condNum = a.length);
    } else
      this.state.condNum = 0;
    if (this.chart && this.state.propertyData) {
      this.state.propertyData.extend || (this.state.propertyData.extend = {}), this.state.propertyData.extend.filterMode = this.state.filterMode, this.state.propertyData.extend.pqlValue = e;
      const a = await this.compileAppBIReport(
        this.config.selectChartType,
        this.state.propertyData
      );
      this.chart.handleValueChange("data.", "", a || {});
    }
    if (this.grid && this.state.defaultGridReportModel) {
      this.state.gridPropertyData.extend || (this.state.gridPropertyData.extend = {}), this.state.gridPropertyData.extend.filterMode = this.state.filterMode, this.state.gridPropertyData.extend.pqlValue = e;
      const a = this.config.selectChartType, s = this.gridType.includes(a) ? a : "GRID", n = await this.compileAppBIReport(
        s,
        this.state.gridPropertyData
      );
      this.grid.handleValueChange("data.", "", n || {});
    }
  }
  /**
   * 重置模型
   *
   * @author zhanghengfeng
   * @date 2024-07-16 17:07:41
   */
  resetModel() {
    this.state.propertyData = $(this.state.defaultPropertyData), this.state.gridPropertyData = $(this.state.defaultGridPropertyData), this.initFilter(), this.chart && this.state.defaultReportModel && this.chart.handleValueChange(
      "data.",
      "",
      $(this.state.defaultReportModel)
    ), this.grid && this.state.defaultGridReportModel && this.grid.handleValueChange(
      "data.",
      "",
      $(this.state.defaultGridReportModel)
    );
  }
  /**
   * 初始化
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:15
   * @return {*}  {Promise<void>}
   */
  async onInit() {
    await super.onInit(), this.initReportKey();
    const e = $(this.panel.context);
    Object.assign(e, { pssysbireport: e[this.reportKey] }), this.context = e;
    const i = ibiz.hub.getApp(ibiz.env.appId);
    try {
      this.panel.view.startLoading();
      const a = await i.deService.exec(
        "pssysbireport",
        "get",
        e,
        this.panel.params
      );
      if (a.data) {
        const s = await ibiz.util.biReport.translateDEReportToConfig(
          a.data
        );
        this.panel.params.srfreporttag && (s.reportTag = this.panel.params.srfreporttag), this.config = s;
        const n = this.config.selectChartType;
        this.gridType.includes(n) || await this.initReportModel(), await this.initGridReportModel(), this.initFilter();
      }
    } catch (a) {
      throw new ne(a.message);
    } finally {
      this.panel.view.endLoading();
    }
  }
  /**
   * 获取图表默认值
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:52
   * @param {string} selectChartType
   * @param {(IData | undefined)} sourceData
   * @return {*}  {IData}
   */
  getDefaultValue(e, i) {
    const { chartDefaultValue: a, chartConfig: s } = je(e), n = $(a);
    return i && Object.keys(i).length > 0 && Object.keys(i).forEach((l) => {
      l === "data" ? Object.keys(i.data).forEach((p) => {
        var d;
        if (Object.prototype.hasOwnProperty.call(n.data, p)) {
          const u = s == null ? void 0 : s.data.details.find((c) => c.id === p);
          if (!u)
            return;
          u && u.details[0].multiple ? n.data[p] = i.data[p] : n.data[p] = (d = i.data[p]) == null ? void 0 : d.slice(0, 1);
        } else
          p === "period" && (n.data[p] = i.data[p]);
      }) : n[l] = i[l];
    }), n;
  }
  /**
   * 编译报表
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:25
   * @param {string} selectChartType
   * @param {IData} propertyData
   * @return {*}  {(Promise<IAppBIReport | undefined>)}
   */
  async compileAppBIReport(e, i) {
    const a = $(this.context);
    Object.assign(a, { pssysbireport: "__UNKNOWN__" });
    const s = await ibiz.util.biReport.translateDataToAppBIReport({
      reportTag: this.config.reportTag,
      selectChartType: e,
      selectCubeId: this.config.selectCubeId,
      caption: i.caption,
      data: i.data,
      style: i.style,
      extend: i.extend
    }), l = await ibiz.hub.getApp(ibiz.env.appId).deService.exec(
      "pssysbireport",
      "compileappbireport",
      a,
      s
    );
    if (l && l.data) {
      const p = await ibiz.hub.translationModelToDsl(
        l.data,
        "APPBIREPORT"
      );
      return p.appBISchemeId = this.config.selectedSchemeId, p;
    }
  }
  /**
   * 初始化图表模型
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:33
   * @return {*}  {Promise<void>}
   */
  async initReportModel() {
    this.state.propertyData = {}, this.state.reportModel = void 0, this.state.propertyData = this.getDefaultValue(
      this.config.selectChartType,
      $(this.config.propertyData)
    ), this.state.defaultPropertyData = $(this.state.propertyData);
    const e = await this.compileAppBIReport(
      this.config.selectChartType,
      this.state.propertyData
    );
    e && (this.state.reportModel = e, this.state.defaultReportModel = $(e));
  }
  /**
   * 初始化表格模型
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:48
   * @return {*}  {Promise<void>}
   */
  async initGridReportModel() {
    const e = this.config.selectChartType, i = this.gridType.includes(e) ? e : "GRID";
    this.state.gridPropertyData = {}, this.state.gridReportModel = void 0;
    const a = $(
      this.gridType.includes(this.config.selectChartType) ? this.config.propertyData : this.state.propertyData
    ), s = {
      caption: a.caption
    };
    Object.assign(s, {
      data: a.data
    }), Object.assign(s, {
      extend: a.extend
    }), this.gridType.includes(e) && Object.assign(s, {
      style: a.style
    }), this.state.gridPropertyData = this.getDefaultValue(i, s), this.state.defaultGridPropertyData = $(this.state.gridPropertyData);
    const n = await this.compileAppBIReport(
      i,
      this.state.gridPropertyData
    );
    n && (this.state.gridReportModel = n, this.state.defaultGridReportModel = $(n));
  }
  /**
   * 更新表格模型
   *
   * @author zhanghengfeng
   * @date 2024-07-03 20:07:05
   * @return {*}  {Promise<void>}
   */
  async updateGridReportModel() {
    var n, l, p, d;
    if (!this.grid)
      return;
    const e = this.config.selectChartType, i = this.gridType.includes(e) ? e : "GRID", a = {}, s = {
      selectChartType: i,
      style: this.state.gridPropertyData.style
    };
    if ((n = this.state.gridPropertyData.data) != null && n.filter && Object.assign(s, {
      filter: this.state.gridPropertyData.data.filter
    }), (l = this.state.gridPropertyData.data) != null && l.period && Object.assign(s, {
      period: this.state.gridPropertyData.data.period
    }), ((d = (p = this.state.gridPropertyData.data) == null ? void 0 : p.group) == null ? void 0 : d.length) > 0) {
      const u = this.state.gridPropertyData.data.group.map(
        (c) => c.pssysbicubedimensionid
      );
      Object.assign(s, { group: u });
    }
    a.reportUIModel = JSON.stringify(s), await this.grid.handleValueChange("style", "", a);
  }
}
function ht(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !me(o);
}
const Zo = /* @__PURE__ */ V({
  name: "BIFilterCondition",
  props: {
    value: {
      type: Object
    },
    schemaFields: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      required: !0
    },
    borderMode: {
      type: String,
      default: "DEFAULT"
    }
  },
  emits: {
    change: (o) => !0
  },
  setup(o, {
    emit: t
  }) {
    const e = U("bi-filter-condition"), i = F([]), a = F([{
      text: "且",
      value: "AND"
    }, {
      text: "或",
      value: "OR"
    }]), s = /* @__PURE__ */ new Map();
    fi.forEach((m) => s.set(m.valueOP, m.label));
    const n = F(/* @__PURE__ */ new Map());
    W(() => o.schemaFields, () => {
      n.value = /* @__PURE__ */ new Map(), o.schemaFields.forEach((m) => {
        n.value.set(m.appDEFieldId, m);
      });
    }, {
      immediate: !0
    });
    const l = async (m) => {
      m.editorProvider = void 0, m.editor = void 0;
      const g = n.value.get(m.field);
      if (!g)
        return;
      const b = Je(g), v = await Ie(b);
      if (v) {
        m.editorProvider = v;
        const h = await v.createController(b, {
          context: o.context,
          params: o.params
        });
        m.editor = h;
      }
    };
    W(() => o.value, async () => {
      if (!o.value) {
        i.value = [];
        return;
      }
      const m = o.value.children;
      if (Array.isArray(m) && m.length) {
        const g = o.value.logicType || "";
        i.value = await Promise.all(m.map(async (b) => {
          const v = b.field || "", h = b.valueOP || "", f = b.value, T = {
            key: Te(),
            connection: g,
            field: v,
            valueOP: h,
            value: f
          };
          return await l(T), T;
        }));
        return;
      }
      i.value = [];
    }, {
      immediate: !0
    });
    const p = () => {
      var b;
      if (!i.value.length) {
        t("change", null);
        return;
      }
      const m = [];
      i.value.forEach((v) => {
        m.push({
          nodeType: "FIELD",
          field: v.field,
          valueOP: v.valueOP,
          value: v.value
        });
      });
      const g = {
        nodeType: "GROUP",
        logicType: ((b = i.value[0]) == null ? void 0 : b.connection) || "AND",
        children: m
      };
      t("change", g);
    };
    return {
      ns: e,
      items: i,
      connectionItems: a,
      filterModeMap: s,
      schemaFieldMap: n,
      handleAdd: async () => {
        var h, f, T;
        if (o.disabled)
          return;
        const m = i.value[0], g = ((h = o.schemaFields[0]) == null ? void 0 : h.appDEFieldId) || "", b = ((T = (f = n.value.get(g)) == null ? void 0 : f.valueOPs) == null ? void 0 : T[0]) || "", v = {
          key: Te(),
          connection: (m == null ? void 0 : m.connection) || "AND",
          field: g,
          valueOP: b
        };
        await l(v), i.value.push(v), p();
      },
      handleRemove: (m) => {
        o.disabled || (i.value.splice(m, 1), p());
      },
      renderEditor: (m) => {
        if (!m.valueOP || et.includes(m.valueOP))
          return null;
        if (m.editorProvider && m.editor) {
          const g = S(m.editorProvider.formEditor);
          return te(g, {
            value: m.value,
            controller: m.editor,
            disabled: o.disabled,
            onChange: (b) => {
              m.value = b, p();
            }
          });
        }
      },
      handleConnectionChange: (m) => {
        i.value.forEach((g) => {
          g.connection = m.connection;
        }), p();
      },
      handleFieldChange: async (m) => {
        var b;
        const g = n.value.get(m.field);
        m.valueOP = ((b = g == null ? void 0 : g.valueOPs) == null ? void 0 : b[0]) || "", m.value = void 0, await l(m), p();
      },
      handleValueOPChange: (m) => {
        m.value = void 0, p();
      }
    };
  },
  render() {
    return r("div", {
      class: [this.ns.b(), this.disabled && this.ns.m("disabled")]
    }, [this.borderMode === "BORDER" && r("div", {
      class: this.ns.e("filter-number")
    }, [R("查询条件("), this.items.length, R(")")]), r("div", {
      class: [this.ns.b("content"), this.ns.is("border-mode", this.borderMode === "BORDER")]
    }, [this.items.map((o, t) => {
      let e, i;
      return r("div", {
        class: this.ns.b("item")
      }, [r("div", {
        class: [this.ns.be("item", "connection"), t === 0 && this.ns.bem("item", "connection", "init")]
      }, [t === 0 ? r("div", null, [R("当")]) : r(S("el-select"), {
        modelValue: o.connection,
        "onUpdate:modelValue": (a) => o.connection = a,
        disabled: t > 1 || this.disabled,
        onChange: () => {
          this.handleConnectionChange(o);
        }
      }, ht(e = this.connectionItems.map((a) => r(S("el-option"), {
        key: a.value,
        value: a.value,
        label: a.text
      }, null))) ? e : {
        default: () => [e]
      })]), r("div", {
        class: this.ns.b("item-content")
      }, [r("div", {
        class: this.ns.be("item", "field")
      }, [r(S("el-select"), {
        modelValue: o.field,
        "onUpdate:modelValue": (a) => o.field = a,
        disabled: this.disabled,
        onChange: () => {
          this.handleFieldChange(o);
        }
      }, ht(i = this.schemaFields.map((a) => r(S("el-option"), {
        key: a.appDEFieldId,
        value: a.appDEFieldId,
        label: a.caption
      }, null))) ? i : {
        default: () => [i]
      })]), r("div", {
        class: this.ns.be("item", "valueOP")
      }, [r(S("el-select"), {
        modelValue: o.valueOP,
        "onUpdate:modelValue": (a) => o.valueOP = a,
        disabled: this.disabled,
        onChange: () => {
          this.handleValueOPChange(o);
        }
      }, {
        default: () => {
          var a, s;
          return [(s = (a = this.schemaFieldMap.get(o.field)) == null ? void 0 : a.valueOPs) == null ? void 0 : s.map((n) => r(S("el-option"), {
            key: n,
            value: n,
            label: this.filterModeMap.get(n) || n
          }, null))];
        }
      })]), r("div", {
        class: this.ns.be("item", "editor")
      }, [this.renderEditor(o)])]), r("div", {
        class: this.ns.be("item", "btn"),
        title: "删除",
        onClick: (a) => {
          a.stopPropagation(), this.handleRemove(t);
        }
      }, [r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        preserveAspectRatio: "xMidYMid meet",
        focusable: "false"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z"
      }, null)])])])]);
    })]), r("div", {
      class: [this.ns.b("footer"), this.ns.is("border-mode", this.borderMode === "BORDER")]
    }, [r("div", {
      class: this.ns.b("footer-btn"),
      onClick: this.handleAdd
    }, [r("svg", {
      class: this.ns.be("footer-btn", "icon"),
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z"
    }, null)])]), r("div", {
      class: this.ns.be("footer-btn", "text")
    }, [R("新增筛选条件")])])])]);
  }
}), Qo = /* @__PURE__ */ V({
  name: "BIFilter",
  components: {
    "bi-filter-condition": Zo
  },
  props: {
    modal: {
      type: Object,
      required: !0
    },
    state: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      required: !0
    },
    borderMode: {
      type: String,
      default: "DEFAULT"
    }
  },
  emit: ["confirm"],
  setup(o, {
    emit: t
  }) {
    const e = U("bi-filter"), i = F(o.state.filterMode || "default"), a = k(() => o.state.isLoadedSchema), s = F();
    W(() => o.state.cond, () => {
      s.value = o.state.cond;
    }, {
      immediate: !0
    });
    const n = k(() => o.state.conditionFields), l = (b) => {
      s.value = b;
    }, p = k(() => o.state.fields), d = k(() => o.state.fieldIconMap), u = F(""), c = F();
    return W(() => o.state.customCond, () => {
      u.value = o.state.customCond || "";
    }, {
      immediate: !0
    }), {
      ns: e,
      activeTab: i,
      isLoaded: a,
      cond: s,
      schemaFields: n,
      handleCondChange: l,
      customCond: u,
      pqlEditor: c,
      fields: p,
      fieldIconMap: d,
      handleCustomCondChange: (b) => {
        u.value = b;
      },
      handleReset: (b) => {
        b.stopPropagation(), o.modal.dismiss(), t("reset");
      },
      handleCancel: (b) => {
        b.stopPropagation(), o.modal.dismiss();
      },
      handleConfirm: (b) => {
        var v, h;
        b.stopPropagation();
        try {
          if (i.value === "pql") {
            if (c.value && !((h = (v = c.value).verify) == null ? void 0 : h.call(v)))
              return;
            t("confirm", {
              type: i.value,
              customCond: u.value
            });
          } else
            t("confirm", {
              type: i.value,
              cond: s.value
            });
          o.modal.dismiss();
        } catch (f) {
          ibiz.log.error(f == null ? void 0 : f.message);
        }
      },
      renderItem: (b) => [r("div", {
        class: e.be("item", "icon")
      }, [d.value.get(b.value) === "measure" ? r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M4.236 9.9l.422-3.8H2.6a.6.6 0 1 1 0-1.2h2.19l.372-3.347a.6.6 0 1 1 1.192.133L5.998 4.9h4.793l.37-3.347a.6.6 0 0 1 1.193.133L11.998 4.9h2.459a.6.6 0 0 1 0 1.2h-2.592l-.421 3.8h2.013a.6.6 0 0 1 0 1.2H11.31l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H5.311l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H1.6a.6.6 0 0 1 0-1.2h2.636zm1.208 0h4.792l.422-3.8H5.865l-.421 3.8z"
      }, null)])]) : r("svg", {
        viewBox: "0 0 16 16",
        xmlns: "http://www.w3.org/2000/svg",
        height: "1em",
        width: "1em",
        focusable: "false",
        fill: "currentColor"
      }, [r("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [r("path", {
        d: "M9 1.2v4.974h1V3.2h2v2.974h1.5a1.5 1.5 0 0 1 1.5 1.5v5.784a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V7.674a1.5 1.5 0 0 1 1.5-1.5H4V3.2h2v2.974h1V1.2h2zM6 6.636H4v4.038h2V6.636zm1 4.038h2V6.636H7v4.038zm5-4.053h-2v4.053h2V6.621z"
      }, null)])])]), r("div", {
        class: e.be("item", "text")
      }, [b.label || ""])]
    };
  },
  render() {
    return Ze(r("div", {
      class: this.ns.b()
    }, [this.isLoaded ? [r("div", {
      class: this.ns.b("header")
    }, [r("div", {
      class: this.ns.b("header-text")
    }, [R("筛选")]), r("div", {
      class: [this.ns.b("header-tab"), this.ns.bm("header-tab", this.activeTab)]
    }, [r(S("el-tabs"), {
      type: "card",
      modelValue: this.activeTab,
      "onUpdate:modelValue": (o) => this.activeTab = o
    }, {
      default: () => [r(S("el-tab-pane"), {
        name: "default",
        label: "基本"
      }, null), r(S("el-tab-pane"), {
        name: "pql",
        label: "PQL"
      }, null)]
    })]), r("div", {
      class: this.ns.b("header-btn"),
      onClick: this.handleCancel
    }, [r("svg", {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      height: "1em",
      width: "1em",
      preserveAspectRatio: "xMidYMid meet",
      focusable: "false"
    }, [r("g", {
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [r("path", {
      d: "M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z",
      transform: "rotate(45 8.056 8.056)"
    }, null)])])])]), r("div", {
      class: this.ns.b("content")
    }, [this.activeTab === "pql" ? r(S("iBizPqlEditor"), {
      ref: "pqlEditor",
      class: this.ns.e("pql-editor"),
      placeholder: "输入筛选条件",
      value: this.customCond,
      fields: this.fields,
      context: this.context,
      params: this.params,
      renderItem: this.renderItem,
      onChange: this.handleCustomCondChange
    }, null) : r(S("bi-filter-condition"), {
      class: this.ns.e("filter-condition"),
      value: this.cond,
      schemaFields: this.schemaFields,
      context: this.context,
      params: this.params,
      onChange: this.handleCondChange,
      borderMode: this.borderMode
    }, null)]), r("div", {
      class: this.ns.b("footer")
    }, [r("div", {
      class: this.ns.be("footer", "reset-btn"),
      onClick: this.handleReset
    }, [R("重置")]), r(S("el-button"), {
      class: this.ns.be("footer", "cancel-btn"),
      text: !0,
      onClick: this.handleCancel
    }, {
      default: () => [R("取消")]
    }), r(S("el-button"), {
      class: this.ns.be("footer", "confirm-btn"),
      onClick: this.handleConfirm
    }, {
      default: () => [R("确认")]
    })])] : null]), [[Qe("loading"), !this.isLoaded]]);
  }
}), ft = /* @__PURE__ */ V({
  name: "BIReportPanelContent",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: Si,
      required: !0
    }
  },
  setup(o) {
    var v, h, f, T, I, x;
    const t = U("bi-report-panel-content"), e = o.controller, i = F(["chart", "grid"]), a = F(!1), s = F(!1);
    a.value = !!((f = (h = (v = e.state.gridPropertyData) == null ? void 0 : v.style) == null ? void 0 : h.agg) != null && f.show);
    const n = (x = (I = (T = e.state.gridPropertyData) == null ? void 0 : T.style) == null ? void 0 : I.function) == null ? void 0 : x.function;
    Array.isArray(n) && (s.value = n.includes("showPercent"));
    const l = async (A) => {
      e.state.gridPropertyData.style || (e.state.gridPropertyData.style = {}), e.state.gridPropertyData.style.agg || (e.state.gridPropertyData.style.agg = {}), e.state.gridPropertyData.style.agg.show = A, e.updateGridReportModel();
    }, p = (A) => {
      e.state.gridPropertyData.style || (e.state.gridPropertyData.style = {}), e.state.gridPropertyData.style.function || (e.state.gridPropertyData.style.function = {}), Array.isArray(e.state.gridPropertyData.style.function.function) || (e.state.gridPropertyData.style.function.function = []);
      const O = e.state.gridPropertyData.style.function.function, N = O.indexOf("showPercent");
      A && N === -1 && O.push("showPercent"), !A && N !== -1 && O.splice(N, 1), e.updateGridReportModel();
    }, d = (A) => {
      e.setGrid(A);
    }, u = (A) => {
      e.setChart(A);
    }, c = F();
    let C;
    _e(() => {
      c.value && ResizeObserver && (C = new ResizeObserver(() => {
        var A, O, N;
        (N = (O = (A = e.chart) == null ? void 0 : A.chartController) == null ? void 0 : O.resizeChart) == null || N.call(O);
      }), C.observe(c.value));
    }), He(() => {
      C == null || C.disconnect();
    });
    const w = F(!1), y = () => {
      var O, N, P, H, j, q;
      e.resetModel(), a.value = !!((P = (N = (O = e.state.gridPropertyData) == null ? void 0 : O.style) == null ? void 0 : N.agg) != null && P.show);
      const A = (q = (j = (H = e.state.gridPropertyData) == null ? void 0 : H.style) == null ? void 0 : j.function) == null ? void 0 : q.function;
      Array.isArray(A) ? s.value = A.includes("showPercent") : s.value = !1;
    }, m = (A) => {
      const O = A.type;
      if (e.state.filterMode = O, O === "default") {
        const N = A.cond;
        if (e.state.cond = N, N) {
          const P = N.children;
          if (Array.isArray(P) && P.length) {
            const H = N.logicType, j = P.map((q) => ({
              ...e.state.conditionFieldMap.get(q.field),
              groupLogicType: H,
              condition: {
                value: q.value,
                valueOP: q.valueOP,
                nodeType: "FIELD",
                field: q.field
              }
            }));
            e.updateFilter(j);
            return;
          }
        }
        e.updateFilter([]);
      }
      O === "pql" && e.updateCustomCond(A.customCond);
    };
    let g;
    const b = async (A) => {
      A.stopPropagation(), !g && (e.state.isLoadedSchema || e.loadSchema(), g = ibiz.overlay.createPopover((O) => te(Qo, {
        modal: O,
        state: e.state,
        context: e.panel.context,
        params: e.panel.params,
        onConfirm: m,
        onReset: y
      }), void 0, {
        placement: "bottom-start",
        autoClose: !0,
        noArrow: !0,
        width: 800
      }), await g.present(A.target), w.value = !0, await g.onWillDismiss(), w.value = !1, g = void 0);
    };
    return He(() => {
      g == null || g.dismiss();
    }), {
      ns: t,
      c: e,
      value: i,
      showAgg: a,
      showPercent: s,
      chartRef: c,
      isActive: w,
      handleShowAggChange: l,
      handleShowPercentChange: p,
      handleGridInit: d,
      handleChartInit: u,
      openFilterPopover: b
    };
  },
  render() {
    return r("div", {
      class: this.ns.b()
    }, [r(S("el-collapse"), {
      modelValue: this.value,
      "onUpdate:modelValue": (o) => this.value = o
    }, {
      default: () => [this.c.state.reportModel && r(S("el-collapse-item"), {
        name: "chart"
      }, {
        title: () => r("div", {
          class: this.ns.b("item-header")
        }, [r("div", {
          class: this.ns.b("item-header-left")
        }, [R("图表")])]),
        default: () => r("div", {
          class: this.ns.b("chart"),
          ref: "chartRef"
        }, [r(S("iBizBIReportContent"), {
          mode: "CONTENT",
          context: this.c.context,
          viewParams: this.c.panel.params,
          config: this.c.state.reportModel,
          onInit: this.handleChartInit
        }, null)])
      }), this.c.state.gridReportModel && r(S("el-collapse-item"), {
        name: "grid"
      }, {
        title: () => r("div", {
          class: this.ns.b("item-header")
        }, [r("div", {
          class: this.ns.b("item-header-left")
        }, [this.c.gridType.includes(this.c.config.selectChartType) ? "图表" : "数据"]), r("div", {
          class: [this.ns.b("filter"), this.ns.is("active", this.isActive)],
          onClick: this.openFilterPopover
        }, [r("svg", {
          class: this.ns.be("filter", "icon"),
          viewBox: "0 0 16 16",
          xmlns: "http://www.w3.org/2000/svg",
          height: "1em",
          width: "1em",
          preserveAspectRatio: "xMidYMid meet",
          focusable: "false"
        }, [r("g", {
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [r("path", {
          d: "M1.6 2h12.8a.6.6 0 0 1 0 1.2H1.6a.6.6 0 1 1 0-1.2zm2.5 5.393h7.8a.6.6 0 0 1 0 1.2H4.1a.6.6 0 1 1 0-1.2zm2.5 5.416h2.8a.6.6 0 0 1 0 1.2H6.6a.6.6 0 1 1 0-1.2z"
        }, null)])]), r("div", {
          class: this.ns.be("filter", "text")
        }, [R("筛选")]), !!this.c.state.condNum && r("div", {
          class: this.ns.be("filter", "badge")
        }, [this.c.state.condNum])]), r("div", {
          class: this.ns.b("item-header-right"),
          onClick: (o) => {
            o.stopPropagation();
          }
        }, [r(S("el-checkbox"), {
          modelValue: this.showAgg,
          "onUpdate:modelValue": (o) => this.showAgg = o,
          onChange: this.handleShowAggChange,
          label: "显示合计",
          size: "large"
        }, null), r(S("el-checkbox"), {
          modelValue: this.showPercent,
          "onUpdate:modelValue": (o) => this.showPercent = o,
          onChange: this.handleShowPercentChange,
          label: "显示百分比",
          size: "large"
        }, null)])]),
        default: () => r("div", {
          class: this.ns.b("grid")
        }, [r(S("iBizBIReportContent"), {
          mode: "CONTENT",
          context: this.c.context,
          viewParams: this.c.panel.params,
          config: this.c.state.gridReportModel,
          onInit: this.handleGridInit
        }, null)])
      })]
    })]);
  }
});
class es {
  constructor() {
    M(this, "component", "BIReportPanelContent");
  }
  async createController(t, e, i) {
    const a = new Si(t, e, i);
    return await a.init(), a;
  }
}
const ts = {
  install(o) {
    o.component(ft.name, ft), vt(
      "CUSTOM_BI_REPORT_PANEL_CONTENT",
      () => new es()
    );
  }
}, is = {
  install(o) {
    o.use(Yo), o.use(ts);
  }
}, cs = {
  install(o) {
    o.component(ct.name, ct), o.component(Ye.name, Ye), o.component(pt.name, pt), jo(), o.use(is);
  }
};
export {
  cs as default
};
