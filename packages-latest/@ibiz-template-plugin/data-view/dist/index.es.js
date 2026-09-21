import './style.css';
var Ct = Object.defineProperty;
var Dt = (e, t, n) => t in e ? Ct(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => Dt(e, typeof t != "symbol" ? t + "" : t, n);
import { getSpanProps as et, useNamespace as M, withInstall as P, getRadioProps as St, getEditorEmits as tt, useAutoFocusBlur as kt, useCodeListListen as Lt, useFocusAndBlur as Rt, useControlController as nt, useUIStore as xt, getSliderProps as ct, getRawProps as Mt } from "@ibiz-template/vue3-util";
import { EditorController as he, registerEditorProvider as ie, registerControlProvider as me, ControlType as Pt, PortletPartController as $e, getPortletProvider as It, ViewPortletController as Bt, registerPortletProvider as de, CodeListEditorController as Et, PanelItemController as dt, registerPanelItemProvider as vt, ListController as ft, Srfuf as st, GridRowState as Nt, ControlVO as zt, GridController as Wt, ScriptFactory as Tt } from "@ibiz-template/runtime";
import { defineComponent as x, computed as I, createVNode as l, ref as g, resolveComponent as B, h as ee, onMounted as z, onBeforeMount as At, watch as W, mergeProps as lt, isVNode as ht, onBeforeUnmount as q, withDirectives as Ot, resolveDirective as Yt, watchEffect as Vt, onUnmounted as Y, nextTick as T, renderSlot as Ht, createTextVNode as Ft, onActivated as Gt, onDeactivated as jt, getCurrentInstance as F } from "vue";
import { clone as mt } from "ramda";
import ve from "dayjs";
import { isNil as _t, toNumber as se, isNumber as ge } from "lodash-es";
import { showTitle as Ut, listenJSEvent as ae, NOOP as fe, debounce as Xt } from "@ibiz-template/core";
const be = /* @__PURE__ */ x({
  name: "DigitalFlop",
  props: et(),
  setup(e) {
    const t = M("digital-flop"), n = e.controller, o = I(() => e.value ? e.value.toString() : ""), a = I(() => ({
      [t.cssVarBlockName("font-size")]: "".concat(n.fontSize, "px"),
      [t.cssVarBlockName("width")]: "".concat(n.size, "px"),
      [t.cssVarBlockName("height")]: "".concat(n.size, "px")
    }));
    return {
      ns: t,
      c: n,
      curValue: o,
      styles: a
    };
  },
  render() {
    return l("div", {
      class: this.ns.b(),
      style: this.styles
    }, [this.curValue.split("").map((e) => l("div", {
      class: [this.ns.e("item"), this.ns.is("symbol", Number.isNaN(Number(e)))]
    }, [e]))]);
  }
});
class qt extends he {
  constructor() {
    super(...arguments);
    /**
     * @description 卡片大小
     * @type {number}
     * @memberof DigitalFlopController
     */
    D(this, "size", 32);
    /**
     * @description 字体大小
     * @type {number}
     * @memberof DigitalFlopController
     */
    D(this, "fontSize", 16);
  }
  async onInit() {
    super.onInit();
    const { size: n, fontSize: o } = this.editorParams;
    n && (this.size = Number(n)), o && (this.fontSize = Number(o));
  }
}
class Qt {
  constructor() {
    D(this, "formEditor", "DigitalFlop");
    D(this, "gridEditor", "DigitalFlop");
  }
  async createController(t, n) {
    const o = new qt(t, n);
    return await o.init(), o;
  }
}
const Kt = P(be, function(e) {
  e.component(be.name, be), ie("SPAN_DIGITAL_FLOP", () => new Qt());
}), ye = /* @__PURE__ */ x({
  name: "ScreenDashboard",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    }
  },
  setup(e) {
    const t = M("screen-dashboard"), n = g(e.modelData), o = (s) => {
      s.map((r) => {
        r.controlType === "PORTLET" && (r.sysPFPluginId = r.sysPFPluginId || "screen", r.portletType === "CONTAINER" && r.controls && o(r.controls));
      });
    }, {
      ctrlParams: a = {}
    } = e.modelData.controlParam || {};
    return a.SCREENMODE !== "false" && (n.value = mt(e.modelData), n.value.controls && o(n.value.controls)), {
      ns: t,
      tempModelData: n
    };
  },
  render() {
    const e = B("IBizDashboardControl"), t = ee(e, {
      modelData: this.tempModelData,
      context: this.context,
      params: this.params,
      provider: this.provider
    });
    return l("div", {
      class: [this.ns.b()]
    }, [t]);
  }
});
class Zt {
  constructor() {
    D(this, "component", "ScreenDashboard");
  }
}
const Jt = P(
  ye,
  function(e) {
    e.component(ye.name, ye), me(
      "".concat(Pt.DASHBOARD, "_SCREEN"),
      () => new Zt()
    );
  }
);
class en extends $e {
  /**
   * 重写
   * @param {T} model
   * @param {IDashboardController} dashboard
   * @param {IPortletContainerController} [parent]
   * @memberof ScreenPortletController
   */
  constructor(n, o, a) {
    super(n, o, a);
    /**
     * @description 控件参数
     * @type {IData}
     * @memberof ScreenPortletController
     */
    D(this, "controlParam", {});
    /**
     * @description 边框样式
     * @type {string}
     * @memberof ScreenPortletController
     */
    D(this, "borderStyle", "");
    /**
     * @description 边框模式
     * @type {('full' | 'body')}
     * @memberof ScreenPortletController
     */
    D(this, "borderMode", "body");
    /**
     * @description 图标类型
     * @type {('full' | 'icon')}
     * @memberof ScreenPortletController
     */
    D(this, "iconType", "full");
    // 所有应用门户
    D(this, "appPortlets", []);
    /**
     * @description 内容区背景图
     * @type {string}
     * @memberof ScreenPortletController
     */
    D(this, "bodyBgUrl", "");
    this.initControlParams();
  }
  /**
   * @description 初始化控件参数
   * @memberof ScreenPortletController
   */
  initControlParams() {
    var a, s, r, d, y, h;
    const n = ibiz.hub.getApp(this.context.srfappid);
    this.appPortlets = n.model.appPortlets || [];
    const o = this.appPortlets.find(
      (f) => f.codeName === this.model.codeName
    );
    o && o.portletParams && (this.controlParam = o.portletParams, (a = o.portletParams) != null && a.BORDERSTYLE && (this.borderStyle = (s = o.portletParams) == null ? void 0 : s.BORDERSTYLE), (r = o.portletParams) != null && r.BORDERMODE && (this.borderMode = (d = o.portletParams) == null ? void 0 : d.BORDERMODE), (y = o.portletParams) != null && y.ICONTYPE && (this.iconType = (h = o.portletParams) == null ? void 0 : h.ICONTYPE), this.controlParam.BODYBGURL && (this.bodyBgUrl = this.controlParam.BODYBGURL));
  }
}
const tn = {
  LIST: "IBizListPortlet",
  CHART: "IBizChartPortlet",
  VIEW: "IBizViewPortlet",
  REPORT: "IBizReportPortlet",
  HTML: "IBizHtmlPortlet",
  FILTER: "IBizFilterPortlet",
  ACTIONBAR: "IBizActionBarPortlet",
  APPMENU: "IBizMenuPortlet",
  CONTAINER: "IBizContainerPortlet",
  RAWITEM: "IBizRawItemPortlet"
}, pe = /* @__PURE__ */ x({
  name: "ScreenPortlet",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: $e,
      required: !0
    }
  },
  setup(e) {
    const t = M("screen-portlet");
    return {
      c: new en(e.controller.model, e.controller.dashboard, e.controller.parent),
      ns: t
    };
  },
  render() {
    var a, s;
    const {
      sysImage: e
    } = this.modelData, t = tn[this.controller.model.portletType] || "IBizViewPortlet", n = B(t), o = ee(n, {
      modelData: this.modelData,
      controller: this.controller
    }, (s = (a = this.$slots).default) == null ? void 0 : s.call(a));
    if (this.c.borderStyle) {
      const r = B(this.c.borderStyle);
      let d = 0;
      return this.c.model.showTitleBar && this.c.borderMode === "body" && (d = 58), ee(r, {
        offsetY: d,
        class: [this.ns.b(), this.ns.is("full-icon", this.c.iconType === "full"), this.ns.is("full-border", d > 0), this.ns.is("container", this.controller.model.portletType === "CONTAINER")]
      }, o);
    }
    return l("div", {
      class: [this.ns.b(), this.ns.is("full-icon", this.c.iconType === "full"), this.ns.is("container", this.controller.model.portletType === "CONTAINER")]
    }, [o, e && this.controller.model.portletType === "CONTAINER" && l(B("iBizIcon"), {
      class: this.ns.e("bg-icon"),
      icon: e
    }, null), this.c.bodyBgUrl && l("img", {
      class: this.ns.e("body-image"),
      src: this.c.bodyBgUrl
    }, null)]);
  }
});
class at {
  constructor() {
    D(this, "component", "ScreenPortlet");
  }
  async createController(t, n, o) {
    const a = mt(t), s = Object.assign(a, { sysPFPluginId: "" });
    !s.showTitleBar && s.sysImage && (s.showTitleBar = !0, s.title = "");
    const r = await It(s);
    if (r)
      return await r.createController(a, n, o);
    const d = new Bt(a, n, o);
    return await d.init(), d;
  }
}
const nn = P(pe, function(e) {
  e.component(pe.name, pe), de(
    "PORTLET_CUSTOM_SCREEN",
    () => new at()
  ), de("CUSTOM_SCREEN", () => new at());
}), { toString: ln } = Object.prototype;
function on(e) {
  return ue(e) === "object";
}
function sn(e) {
  return ue(e) === "array";
}
function an(e) {
  return ue(e) === "map";
}
function rn(e) {
  return ue(e) === "set";
}
function un(e) {
  return ue(e) === "string";
}
const cn = {
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
function ue(e) {
  return cn[ln.call(e)];
}
function J() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function te() {
  return "".concat(J() + J(), "-").concat(J(), "-").concat(J(), "-").concat(J(), "-").concat(J()).concat(J()).concat(J());
}
function dn(e) {
  return e == null;
}
function vn(e) {
  if (sn(e) || un(e))
    return e.length === 0;
  if (on(e)) {
    for (const t in e)
      if (Object.prototype.hasOwnProperty.call(e, t))
        return !1;
    return !0;
  }
  return an(e) || rn(e) ? e.size === 0 : e == null;
}
function we(e) {
  return !dn(e) && !vn(e);
}
function fn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ht(e);
}
const Ce = /* @__PURE__ */ x({
  name: "ScreenRadioList",
  props: St(),
  emits: tt(),
  setup(e, {
    emit: t
  }) {
    const n = M("screen-radio-list"), o = e.controller, a = o.model;
    let s = null;
    const {
      useInFocusAndBlur: r,
      useInValueChange: d
    } = kt(e, t), y = (m) => {
      t("change", m), d();
    }, h = g([]), f = () => {
      const m = h.value.findIndex(($) => $.value === e.value);
      h.value && h.value.length > 0 && (m < h.value.length - 1 ? t("change", h.value[m + 1].value) : t("change", h.value[0].value));
    };
    z(() => {
      s = setInterval(() => {
        f();
      }, o.speed), f();
    }), At(() => {
      s && clearInterval(s);
    }), W(() => e.data, (m) => {
      o.loadCodeList(m).then(($) => {
        h.value = $;
      });
    }, {
      immediate: !0,
      deep: !0
    });
    const b = (m) => {
      m && (h.value = m);
    };
    Lt(o.model.appCodeListId, o.context.srfappid, b);
    const c = I(() => {
      var m;
      return ((m = h.value.find(($) => $.value == e.value)) == null ? void 0 : m.text) || "";
    }), v = I(() => !!(e.controlParams && e.controlParams.editmode === "hover" && !e.readonly));
    W(c, (m, $) => {
      m !== $ && t("infoTextChange", m);
    }, {
      immediate: !0
    });
    const {
      componentRef: u
    } = Rt(() => t("focus"), () => r());
    return {
      timer: s,
      ns: n,
      c: o,
      editorModel: a,
      items: h,
      valueText: c,
      onSelectValueChange: y,
      editorRef: u,
      showFormDefaultContent: v
    };
  },
  render() {
    let e;
    return l("div", {
      class: [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      ref: "editorRef"
    }, [this.readonly ? this.valueText : l(B("el-radio-group"), lt({
      class: this.ns.e("group"),
      "model-value": we(this.value) ? String(this.value) : "",
      onChange: this.onSelectValueChange
    }, this.$attrs), fn(e = this.items.map((t, n) => this.controller.renderMode === "radio" ? l(B("el-radio"), {
      key: n,
      label: we(t.value) ? String(t.value) : "",
      disabled: this.disabled || t.disableSelect === !0
    }, {
      default: () => [l("span", {
        class: this.ns.e("text")
      }, [t.text])]
    }) : l(B("el-radio-button"), {
      key: n,
      border: !0,
      class: [this.ns.e("button"), this.ns.is("space", this.c.btnSpace !== 0)],
      style: {
        [this.ns.cssVarBlockName("button-space")]: "".concat(this.c.btnSpace, "px")
      },
      label: we(t.value) ? String(t.value) : "",
      disabled: this.disabled || t.disableSelect === !0
    }, {
      default: () => [l("span", {
        class: this.ns.em("button", "text")
      }, [t.text])]
    }))) ? e : {
      default: () => [e]
    })]);
  }
});
class hn extends Et {
  constructor() {
    super(...arguments);
    /**
     * @description 循环速度,单位毫秒
     * @type {number}
     * @memberof ScreenRadioListEditorController
     */
    D(this, "speed", 3e3);
    /**
     * 按钮间隔
     *
     * @type {number}
     * @memberof ScreenRadioListEditorController
     */
    D(this, "btnSpace", 0);
    /**
     * @description 绘制模式(button: 按钮模式, radio: 单选框模式)
     * @type {('button' | 'radio')}
     * @memberof ScreenRadioListEditorController
     */
    D(this, "renderMode", "button");
  }
  async onInit() {
    super.onInit();
    const { speed: n, renderMode: o, btnSpace: a } = this.editorParams;
    n && (this.speed = Number(n)), o && (this.renderMode = o), a && (this.btnSpace = Number(a));
  }
}
class mn {
  constructor() {
    D(this, "formEditor", "ScreenRadioList");
    D(this, "gridEditor", "ScreenRadioList");
  }
  async createController(t, n) {
    const o = new hn(
      t,
      n
    );
    return await o.init(), o;
  }
}
const $n = P(
  Ce,
  function(e) {
    e.component(Ce.name, Ce), ie(
      "RADIOBUTTONLIST_SCREEN_RADIO_LIST",
      () => new mn()
    );
  }
), De = /* @__PURE__ */ x({
  name: "ScreenRealTime",
  props: et(),
  setup(e) {
    const t = M("screen-real-time"), n = e.controller;
    let o = null;
    const a = {
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "zh-CN": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    }, s = g([]);
    return z(() => {
      const d = (n.valueFormat || "YYYY-MM-DD,week,HH:mm:ss").split(","), y = ibiz.i18n.getLang(), h = a[y], f = () => {
        const c = ve();
        d.forEach((v, u) => {
          v === "week" ? s.value[u] = h[c.day()] : s.value[u] = c.format(v);
        });
      };
      if (f(), d.some((c) => c.includes("ss"))) {
        const c = () => {
          const v = 1e3 - ve().millisecond();
          o = setTimeout(() => {
            f(), c();
          }, v);
        };
        c();
      } else
        o = setInterval(f, 6e4);
    }), q(() => {
      o && (clearTimeout(o), clearInterval(o));
    }), {
      ns: t,
      c: n,
      items: s
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [this.items.map((e) => l("div", {
      class: this.ns.e("item")
    }, [e]))]);
  }
});
class gn extends he {
}
class bn {
  constructor() {
    D(this, "formEditor", "ScreenRealTime");
    D(this, "gridEditor", "ScreenRealTime");
  }
  async createController(t, n) {
    const o = new gn(t, n);
    return await o.init(), o;
  }
}
const yn = P(
  De,
  function(e) {
    e.component(De.name, De), ie(
      "SPAN_SCREEN_REAL_TIME",
      () => new bn()
    );
  }
), Se = /* @__PURE__ */ x({
  name: "ScreenPortletRealTime",
  props: et(),
  setup(e) {
    const t = M("screen-portlet-real-time"), n = e.controller;
    let o = null;
    const a = {
      en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "zh-CN": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    }, s = g([]);
    return z(() => {
      const {
        ctrlParams: r = {}
      } = n.model.controlParam, y = (r.VALUEFORMAT || "YYYY-MM-DD,week,HH:mm:ss").split(","), h = ibiz.i18n.getLang(), f = a[h], b = () => {
        const v = ve();
        y.forEach((u, m) => {
          u === "week" ? s.value[m] = f[v.day()] : s.value[m] = v.format(u);
        });
      };
      if (b(), y.some((v) => v.includes("ss"))) {
        const v = () => {
          const u = 1e3 - ve().millisecond();
          o = setTimeout(() => {
            b(), v();
          }, u);
        };
        v();
      } else
        o = setInterval(b, 6e4);
    }), q(() => {
      o && (clearTimeout(o), clearInterval(o));
    }), {
      ns: t,
      c: n,
      items: s
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [this.items.map((e) => l("div", {
      class: this.ns.e("item")
    }, [e]))]);
  }
});
class pn extends $e {
}
class wn {
  constructor() {
    D(this, "component", "ScreenPortletRealTime");
  }
  async createController(t, n, o) {
    const a = new pn(
      t,
      n,
      o
    );
    return await a.init(), a;
  }
}
const Cn = P(
  Se,
  function(e) {
    e.component(Se.name, Se), de(
      "PORTLET_CUSTOM_SCREEN_PORTLET_REAL_TIME",
      () => new wn()
    );
  }
);
class $t extends dt {
  constructor() {
    super(...arguments);
    /**
     * @description 边框样式
     * @type {string}
     * @memberof ScreenPanelContainerController
     */
    D(this, "borderStyle", "");
  }
  async onInit() {
    await super.onInit(), this.borderStyle = "CustomDecoration5";
  }
}
const ke = /* @__PURE__ */ x({
  name: "ScreenPanelContainer",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: $t,
      required: !0
    }
  },
  setup() {
    return {
      ns: M("screen-panel-container")
    };
  },
  render() {
    var o, a;
    const e = B("IBizPanelContainer"), t = ((a = (o = this.$slots).default) == null ? void 0 : a.call(o)) || [], n = ee(e, {
      modelData: this.modelData,
      controller: this.controller
    }, t);
    if (this.controller.borderStyle) {
      const s = B(this.controller.borderStyle);
      return ee(s, {
        class: [this.ns.b()]
      }, n);
    }
    return l("div", {
      class: this.ns.b()
    }, [n]);
  }
});
class Dn {
  constructor() {
    D(this, "component", "ScreenPanelContainer");
  }
  async createController(t, n, o) {
    const a = new $t(t, n, o);
    return await a.init(), a;
  }
}
const Sn = P(
  ke,
  function(e) {
    e.component(ke.name, ke), vt(
      "CUSTOM_SCREEN_PANEL_CONTAINER",
      () => new Dn()
    );
  }
);
class kn extends ft {
  constructor(n, o, a, s) {
    super(n, o, a, s);
    /**
     * 滚动模式
     * DEFAULT是连续滚动 STEP是一行一行滚动
     *
     * @type {('DEFAULT' | 'STEP')}
     * @memberof CarouselListController
     */
    D(this, "rollMode", "DEFAULT");
    /**
     * 滚动速度
     *
     * @type {number}
     * @memberof CarouselListController
     */
    D(this, "moveSpeed", 0);
    /**
     * 列表项边框
     *
     * @type {string}
     * @memberof CarouselListController
     */
    D(this, "borderStyle", "");
    this.init();
  }
  /**
   * 初始化控件参数
   *
   * @memberof CarouselListController
   */
  init() {
    this.controlParams && (this.controlParams.rollmode && (this.rollMode = this.controlParams.rollmode), this.controlParams.speed ? this.moveSpeed = Number(this.controlParams.speed) : this.rollMode === "DEFAULT" ? this.moveSpeed = 20 : this.moveSpeed = 2, this.controlParams.borderstyle && (this.borderStyle = this.controlParams.borderstyle));
  }
}
function Le(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ht(e);
}
const Re = /* @__PURE__ */ x({
  name: "CarouselList",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: !1
    },
    loadDefault: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    const t = nt((...w) => new kn(...w)), n = M("carousel-list"), o = g(t.moveSpeed), a = g(!1), s = g(t.rollMode), r = g(), d = g(), y = I(() => t.model.enablePagingBar === !0 || t.model.pagingMode !== 2 ? !0 : t.state.items.length >= t.state.total || t.state.isLoading || t.state.total <= t.state.size), h = g(), f = g(te()), b = g();
    t.controlParams.defaultexpandall === "true" && (W(() => t.state.groups, () => {
      t.state.groups.length > 0 && (b.value = t.state.groups.map((w) => w.key));
    }), b.value = t.state.groups.map((w) => w.key));
    const c = I(() => {
      if (!a.value || s.value !== "DEFAULT")
        return {};
      const w = {
        flex: "none",
        height: "auto"
      };
      return Object.assign(w, {
        animation: "scroll-top ".concat(o.value, "s linear infinite")
      }), w;
    });
    W(() => t.state.curPage, () => {
      var w, k;
      if (t.state.curPage === 1 && (t.model.pagingMode === 2 || t.model.pagingMode === 3)) {
        f.value = te();
        const S = (k = (w = h.value) == null ? void 0 : w.ElInfiniteScroll) == null ? void 0 : k.containerEl;
        S && (S.lastScrollTop = 0, S.scrollTop = 0);
      }
    });
    const v = (w, k) => {
      const {
        context: S,
        params: N
      } = t, O = t.state.selectedData.findIndex((ne) => ne.srfkey === w.srfkey), G = [n.b("item"), n.is("active", O !== -1)];
      return l(B("iBizControlShell"), {
        class: G,
        style: "",
        data: w,
        modelData: k,
        context: S,
        params: N,
        onClick: () => t.onRowClick(w),
        onDblclick: () => t.onDbRowClick(w)
      }, null);
    }, u = (w) => {
      const k = t.state.selectedData.findIndex((N) => N.srfkey === w.srfkey), S = [n.b("item"), n.is("active", k !== -1)];
      return l("div", {
        class: S,
        key: w.srfkey,
        onClick: () => t.onRowClick(w),
        onDblclick: () => t.onDbRowClick(w)
      }, ["".concat(_t(w.srfmajortext) ? "" : w.srfmajortext)]);
    }, m = (w) => {
      const k = e.modelData.itemLayoutPanel;
      return l(B("el-collapse-item"), {
        title: Ut(w.caption),
        class: n.be("group-content", "item"),
        name: w.key
      }, {
        default: () => [w.children.length > 0 ? w.children.map((S) => k ? v(S, k) : u(S)) : l("div", {
          class: n.bem("group-content", "item", "empty")
        }, [ibiz.i18n.t("app.noData")])]
      });
    }, $ = (w, k) => {
      const S = k ? v(w, k) : u(w);
      if (t.borderStyle) {
        const N = B(t.borderStyle);
        return ee(N, {}, S);
      }
      return S;
    }, p = () => {
      let w;
      if (t.model.enableGroup && !t.state.isSimple)
        return l(B("el-collapse"), {
          modelValue: b.value,
          "onUpdate:modelValue": (S) => b.value = S,
          class: [n.b("group-content"), n.b("content"), n.is("allow-roll", a.value)],
          style: c.value
        }, {
          default: () => {
            var S;
            return [(S = t.state.groups) == null ? void 0 : S.map((N) => l("div", {
              class: [n.b("scroll-item")]
            }, [m(N)]))];
          }
        });
      const k = e.modelData.itemLayoutPanel;
      return Ot(l("div", {
        class: [n.b("scroll"), n.b("content"), n.is("allow-roll", a.value)],
        style: c.value,
        "infinite-scroll-distance": 10,
        "infinite-scroll-disabled": y.value,
        ref: "infiniteScroll",
        key: f.value
      }, [t.state.items.map((S, N) => l("div", {
        class: [n.b("scroll-item")]
      }, [$(S, k)])), a.value && t.state.items.map((S, N) => l("div", {
        class: [n.b("scroll-item")]
      }, [$(S, k)])), t.model.pagingMode === 3 && !(t.state.items.length >= t.state.total || t.state.isLoading || t.state.total <= t.state.size) && l("div", {
        class: n.e("load-more-button")
      }, [l(B("el-button"), {
        text: !0,
        onClick: () => t.loadMore()
      }, Le(w = ibiz.i18n.t("control.common.loadMore")) ? w : {
        default: () => [w]
      })])]), [[Yt("infinite-scroll"), () => t.loadMore()]]);
    }, i = () => {
      var k;
      const w = (k = t.model.controls) == null ? void 0 : k.find((S) => S.name === "".concat(t.model.name, "_quicktoolbar"));
      if (w)
        return l(B("iBizToolbarControl"), {
          modelData: w,
          context: t.context,
          params: t.params
        }, null);
    }, L = () => {
      var k;
      const w = (k = t.model.controls) == null ? void 0 : k.find((S) => S.name === "".concat(t.model.name, "_batchtoolbar"));
      if (w)
        return l("div", {
          class: n.b("batchtoolbar")
        }, [l(B("iBizToolbarControl"), {
          modelData: w,
          context: t.context,
          params: t.params
        }, null)]);
    }, C = () => {
      let w;
      const {
        isLoaded: k
      } = t.state;
      if (k)
        return k && l(B("iBizNoData"), {
          class: n.b("content"),
          text: t.model.emptyText,
          emptyTextLanguageRes: t.model.emptyTextLanguageRes,
          enableShowImage: t.state.hideNoDataImage
        }, Le(w = i()) ? w : {
          default: () => [w]
        });
    }, H = () => {
      clearInterval(d.value);
      let w = 1;
      d.value = setInterval(() => {
        var S, N;
        const k = (N = (S = r.value) == null ? void 0 : S.$el) == null ? void 0 : N.getElementsByClassName(n.b("scroll-item"));
        if (a.value && s.value === "STEP") {
          const O = k[0].offsetHeight;
          h.value.scrollTo({
            top: O * w,
            behavior: "smooth"
          }), w >= t.state.items.length ? (setTimeout(() => {
            h.value.scrollTo({
              top: 0,
              behavior: "instant"
            });
          }, 500), w = 1) : w += 1;
        } else
          clearInterval(d.value);
      }, o.value * 1e3);
    }, R = () => {
      var k, S;
      const w = (S = (k = r.value) == null ? void 0 : k.$el) == null ? void 0 : S.getElementsByClassName(n.b("scroll-item"));
      if (!a.value && h.value && w && w.length && !w[0].offsetHeight) {
        const O = setInterval(() => {
          w[0].offsetHeight > 0 && t.state.items.length * w[0].offsetHeight > h.value.clientHeight ? (a.value = !0, H(), clearInterval(O)) : (clearInterval(O), clearInterval(d.value));
        }, 10);
      }
    };
    return W(() => h.value, (w) => {
      w && R();
    }, {
      immediate: !0,
      deep: !0
    }), {
      c: t,
      ns: n,
      carouselContainer: r,
      infiniteScroll: h,
      renderListContent: p,
      renderNoData: C,
      renderBatchToolBar: L
    };
  },
  render() {
    let e = null;
    return this.c.state.isCreated && (e = [this.c.state.items.length > 0 ? this.renderListContent() : this.renderNoData(), this.renderBatchToolBar(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? l(B("iBizPagination"), {
      class: this.ns.e("pagination"),
      total: this.c.state.total,
      curPage: this.c.state.curPage,
      size: this.c.state.size,
      totalPages: this.c.state.totalPages
    }, null) : null]), l(B("iBizControlBase"), {
      class: [this.ns.is("enable-page", !!this.c.state.enablePagingBar), "test"],
      ref: "carouselContainer",
      controller: this.c
    }, Le(e) ? e : {
      default: () => [e]
    });
  }
});
class Ln {
  constructor() {
    D(this, "component", "CarouselList");
  }
}
const Rn = P(Re, function(e) {
  e.component(Re.name, Re), me(
    "LIST_RENDER_CAROUSEL_LIST",
    () => new Ln()
  );
});
function xn(e, t) {
  const n = [], o = e[0] || "", a = t.filter((s) => (s[o] || n.push(s), s[o]));
  return a.sort((s, r) => {
    for (const d of e)
      if (s[d] !== r[d])
        return s[d] > r[d] ? 1 : -1;
    return 0;
  }), a.push(...n), a;
}
function Mn(e) {
  const t = g();
  let n = !1, o = !1;
  async function a(f, b, c) {
    if (f.srfuf !== st.CREATE)
      if (e.editShowMode === "row" && e.model.enableRowEdit) {
        const v = e.findRowState(f);
        v && v.showRowEdit !== !0 && await e.switchRowEdit(v, !0);
      } else
        e.onRowClick(f);
  }
  function s(f) {
    f.srfuf !== st.CREATE && e.onDbRowClick(f);
  }
  function r(f) {
    n || e.setSelection(f);
  }
  W(
    [
      () => t.value,
      () => e.state.isLoaded,
      () => e.state.selectedData
    ],
    ([f, b, c]) => {
      !b || !f || (e.state.singleSelect ? c[0] ? t.value.setCurrentRow(c[0], !0) : t.value.setCurrentRow() : (n = !0, t.value.clearSelection(), c.forEach((v) => t.value.toggleRowSelection(v, !0)), n = !1));
    }
  );
  function d(f) {
    if (o) {
      o = !1;
      return;
    }
    const { prop: b, order: c } = f, v = e.fieldColumns[b].model.appDEFieldId;
    let u;
    c === "ascending" ? u = "asc" : c === "descending" && (u = "desc"), "".concat(v, ",").concat(u) !== e.state.sortQuery && (e.setSort(v, u), e.load({
      isInitialLoad: e.model.pagingMode === 2 || e.model.pagingMode === 3
    }));
  }
  function y({ row: f }) {
    let b = "";
    e.state.selectedData.length > 0 && e.state.selectedData.forEach((v) => {
      v === f && (b = "current-row");
    });
    const c = e.findRowState(f);
    return c != null && c.showRowEdit && (b += " editing-row"), f.srfkey && (b += " id-".concat(f.srfkey)), e.enableRowEditOrder && (b += " enable-order"), b;
  }
  function h({
    _row: f,
    column: b,
    _rowIndex: c,
    _columnIndex: v
  }) {
    var m;
    const u = (m = e.model.degridColumns) == null ? void 0 : m.find(($) => $.codeName === b.property);
    return u && u.headerSysCss && u.headerSysCss.cssName ? u.headerSysCss.cssName : "";
  }
  return W(
    () => e.state.sortQuery,
    (f) => {
      if (f) {
        const b = e.state.sortQuery.split(",")[0], c = e.state.sortQuery.split(",")[1];
        if (b && c) {
          const v = c === "desc" ? "descending" : "ascending", u = () => {
            t.value ? T(() => {
              o = !0, t.value.sort(b, v);
            }) : setTimeout(u, 500);
          };
          u();
        }
      }
    }
  ), {
    tableRef: t,
    onRowClick: a,
    onDbRowClick: s,
    onSelectionChange: r,
    onSortChange: d,
    handleRowClassName: y,
    handleHeaderCellClassName: h
  };
}
function Pn(e, t) {
  const n = () => {
    t.data && (e.state.items = t.data, e.state.rows = t.data.map((h) => new Nt(new zt(h), e)), e.calcAggResult(e.state.items), e.calcTotalData());
  }, o = I(() => {
    var f;
    const h = Object.values(e.fieldColumns).find(
      (b) => b.model.appDEFieldId === e.model.minorSortAppDEFieldId
    );
    return {
      prop: h == null ? void 0 : h.model.codeName,
      order: ((f = e.model.minorSortDir) == null ? void 0 : f.toLowerCase()) === "desc" ? "descending" : "ascending"
    };
  });
  e.evt.on("onCreated", async () => {
    t.isSimple && (n(), e.state.isLoaded = !0);
  }), W(
    () => t.data,
    () => {
      t.isSimple && n();
    },
    {
      deep: !0
    }
  );
  const a = I(() => {
    const h = e.state;
    if (e.model.enableGroup) {
      const b = [];
      return h.groups.forEach((c) => {
        if (!c.children.length)
          return;
        const v = [...c.children], u = v.shift();
        b.push({
          tempsrfkey: (u == null ? void 0 : u.tempsrfkey) || c.caption,
          srfkey: (u == null ? void 0 : u.srfkey) || c.caption,
          isGroupData: !0,
          caption: c.caption,
          first: u,
          children: v
        });
      }), b;
    }
    const { rowspankeys: f = [] } = e.controlParams;
    return f.length > 0 ? xn(
      f,
      h.rows.map((b) => b.data)
    ) : h.rows.map((b) => b.data);
  }), s = I(() => {
    if (e.isMultistageHeader)
      return e.model.degridColumns || [];
    const h = [];
    return e.state.columnStates.forEach((f) => {
      var c, v;
      if (f.hidden)
        return;
      const b = ((c = e.fieldColumns[f.key]) == null ? void 0 : c.model) || ((v = e.uaColumns[f.key]) == null ? void 0 : v.model);
      b && h.push(b);
    }), h;
  });
  return {
    tableData: a,
    renderColumns: s,
    defaultSort: o,
    summaryMethod: ({
      columns: h
    }) => h.map((f, b) => b === 0 ? e.aggTitle : e.state.aggResult[f.property]),
    spanMethod: ({
      row: h,
      column: f,
      rowIndex: b,
      columnIndex: c
    }) => {
      const { property: v } = f, { rowspankeys: u = [], colspankeys: m = [] } = e.controlParams;
      if (u.length > 0 && u.includes(v)) {
        const $ = c === 0 || h[v];
        if (b > 0 && $ && h[v] === a.value[b - 1][v])
          return {
            rowspan: 0,
            colspan: 0
          };
        let p = 1;
        for (let i = b + 1; i < a.value.length && ($ && a.value[i][v] === h[v]); i++)
          p += 1;
        return {
          rowspan: p,
          colspan: 1
        };
      }
      if (m.length > 0 && m.includes(v)) {
        const $ = s.value[c - 1].codeName;
        if (c > 0 && m.includes($) && h[v] === h[$])
          return {
            rowspan: 0,
            colspan: 0
          };
        let p = 1;
        for (let i = c + 1; i < s.value.length; i++) {
          const L = s.value[i].codeName;
          if (m.includes(L) && h[L] === h[v])
            p += 1;
          else
            break;
        }
        return {
          rowspan: 1,
          colspan: p
        };
      }
    },
    headerDragend: (h, f, b) => {
      const { property: c } = b, v = e.columns[c];
      if (v.isAdaptiveColumn) {
        v.isAdaptiveColumn = !1, v.model.width = h;
        const u = s.value.findIndex((m) => e.columns[m.codeName].isAdaptiveColumn);
        e.hasAdaptiveColumn = u !== -1;
      }
    }
  };
}
function In(e, t) {
  let n = null, o = 0;
  const a = g({}), s = () => {
    if (window.ResizeObserver) {
      const d = e.value.$el.querySelector(
        ".el-table__header-wrapper"
      );
      d && (n = new ResizeObserver((y) => {
        const h = y[0].contentRect.height;
        if (h !== o) {
          const f = {
            "now-header-height": "".concat(h, "px")
          };
          a.value = t.cssVarBlock(f), o = h;
        }
      }), n.observe(d));
    }
  }, r = Vt(() => {
    e.value && s();
  });
  return Y(() => {
    n && n.disconnect(), r();
  }), {
    headerCssVars: a
  };
}
function Bn(e, t, n) {
  if (!n.enableRowEditOrder)
    return {};
  let o = 0, a = 0, s = null, r = null;
  const d = [], y = (f) => {
    let b = "";
    return f.forEach((c) => {
      c.startsWith("id-") && (b = c.replace("id-", ""));
    }), b;
  }, h = (f) => {
    f.setAttribute("draggable", "true");
    const b = ae(
      f,
      "dragstart",
      (m) => {
        if (m.target) {
          const $ = m.target;
          m.dataTransfer.effectAllowed = "move";
          const p = y($.classList);
          o = n.state.rows.findIndex(
            (i) => i.data.srfkey === p
          ), s = n.state.rows[o];
        }
      }
    ), c = ae(
      f,
      "dragenter",
      (m) => {
        m.preventDefault();
        const $ = m.currentTarget, p = y($.classList);
        a = n.state.rows.findIndex(
          (i) => i.data.srfkey === p
        ), !((s == null ? void 0 : s.data.srfkey) === p || a === -1) && (r = n.state.rows[a]);
      }
    ), v = ae(
      f,
      "dragover",
      (m) => {
        m.preventDefault();
      }
    ), u = ae(f, "dragend", (m) => {
      m.preventDefault(), s && r && n.onDragChange(
        s,
        r,
        a > o ? "next" : "prev"
      );
    });
    d.push(b), d.push(c), d.push(v), d.push(u);
  };
  return W(
    [() => e.value, () => n.state.isLoaded],
    (f, b) => {
      if (!b || !f)
        return;
      const c = e.value.$el;
      c && c.getElementsByClassName("el-table__row").forEach((u) => {
        h(u);
      });
    }
  ), {
    cleanup: () => {
      d.forEach((f) => {
        f();
      });
    }
  };
}
class En extends Wt {
  constructor(n, o, a, s) {
    super(n, o, a, s);
    /**
     * 移动速度
     * DEFAULT时，表示多少秒内完整轮播一次全部数据,鼠标移上去时暂停
     * STEP: 表示每隔多少秒移动一行，不会根据鼠标是否悬浮而暂停
     *
     * @type {number}
     * @memberof CarouselGridController
     */
    D(this, "speed", 2);
    /**
     * 滚动方式
     *
     * @type {('DEFAULT' | 'STEP')}
     * @memberof CarouselGridController
     */
    D(this, "rollMode", "DEFAULT");
    this.init();
  }
  init() {
    this.controlParams && (this.controlParams.rollmode && (this.rollMode = this.controlParams.rollmode), this.controlParams.speed ? this.speed = this.controlParams.speed : this.rollMode === "DEFAULT" ? this.speed = 12 : this.speed = 2);
  }
}
function Nn(e, t) {
  var o;
  const n = {};
  return (o = e.controlAttributes) == null || o.forEach((a) => {
    a.attrName && a.attrValue && (n[a.attrName] = Tt.execSingleLine(a.attrValue, {
      ...t
    }));
  }), n;
}
function zn(e, t, n, o) {
  var f;
  const {
    codeName: a,
    width: s
  } = t, r = e.columns[a], d = e.state.columnStates.find((b) => b.key === a), h = r.isAdaptiveColumn || !e.hasAdaptiveColumn && o === n.length - 1 ? "min-width" : "width";
  return l(B("el-table-column"), lt({
    label: t.caption,
    prop: a
  }, {
    [h]: s
  }, {
    fixed: d.fixed,
    sortable: t.enableSort ? "custom" : !1,
    align: ((f = t.align) == null ? void 0 : f.toLowerCase()) || "center"
  }), {
    default: ({
      row: b
    }) => {
      let c = b;
      b.isGroupData && (c = b.first);
      const v = e.findRowState(c);
      if (v) {
        const u = B(e.providers[a].component);
        return ee(u, {
          controller: r,
          row: v,
          key: c.tempsrfkey + a,
          attrs: Nn(t, {
            ...e.getEventArgs(),
            data: v.data
          })
        });
      }
      return null;
    }
  });
}
function gt(e, t, n, o) {
  var a, s;
  if (t.columnType === "GROUPGRIDCOLUMN") {
    const r = ((a = t.degridColumns) == null ? void 0 : a.filter((h) => !h.hideDefault && !h.hiddenDataItem)) || [], {
      width: d
    } = t, y = ((s = t.align) == null ? void 0 : s.toLowerCase()) || "center";
    return l(B("el-table-column"), {
      prop: t.codeName,
      label: t.caption,
      "min-width": d,
      align: y
    }, {
      default: () => r.map((h, f) => gt(e, h, n, f))
    });
  }
  return zn(e, t, n, o);
}
const xe = /* @__PURE__ */ x({
  name: "CarouselGrid",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    rowEditOpen: {
      type: Boolean,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: !1
    },
    data: {
      type: Array,
      required: !1
    },
    loadDefault: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, {
    slots: t
  }) {
    const n = nt((...A) => new En(...A)), o = M("control-".concat(n.model.controlType.toLowerCase())), a = M("carousel-grid"), s = g(), r = g({}), d = g(!1), {
      zIndex: y
    } = xt();
    n.state.zIndex = y.increment();
    const h = g(48), {
      tableRef: f,
      onRowClick: b,
      onDbRowClick: c,
      onSelectionChange: v,
      onSortChange: u,
      handleRowClassName: m,
      handleHeaderCellClassName: $
    } = Mn(n), {
      headerCssVars: p
    } = In(f, o), {
      cleanup: i = fe
    } = Bn(f, o, n), L = () => l("div", null, null), {
      tableData: C,
      renderColumns: H,
      defaultSort: R,
      summaryMethod: w,
      spanMethod: k,
      headerDragend: S
    } = Pn(n, e), N = (A, U) => t[A.id] ? Ht(t, A.id, {
      model: A,
      data: n.state.items
    }) : gt(n, A, H.value, U), O = () => {
      var A;
      if ((A = f.value) != null && A.$el) {
        const U = f.value.$el.getElementsByClassName("el-scrollbar__wrap");
        if (U && U.length) {
          const Z = U[0], wt = C.value.length * h.value;
          if (Z.clientHeight && wt > Z.clientHeight && (d.value = !0, d.value))
            if (n.rollMode === "STEP") {
              clearInterval(s.value);
              let ce = 1;
              s.value = setInterval(() => {
                Z.scrollTo({
                  top: h.value * ce,
                  behavior: "smooth"
                }), ce >= C.value.length ? (setTimeout(() => {
                  Z.scrollTo({
                    top: 0,
                    behavior: "instant"
                  });
                }, 500), ce = 1) : ce += 1;
              }, n.speed * 1e3);
            } else
              r.value = {
                "--speed": "".concat(n.speed, "s")
              };
        }
      }
    };
    Y(() => {
      y.decrement(), i !== fe && i();
    });
    const G = I(() => n.model.pagingMode !== 2 ? !0 : n.state.items.length >= n.state.total || n.state.isLoading || n.state.total <= n.state.size), ne = (A) => d.value ? [...A, ...A] : A, Q = g(), K = g(te());
    return W(() => n.state.curPage, () => {
      var A, U;
      if (n.state.curPage === 1 && (n.model.pagingMode === 2 || n.model.pagingMode === 3)) {
        K.value = te();
        const Z = (U = (A = Q.value) == null ? void 0 : A.ElInfiniteScroll) == null ? void 0 : U.containerEl;
        Z && (Z.lastScrollTop = 0, Z.scrollTop = 0);
      }
    }), {
      c: n,
      ns: o,
      ns1: a,
      tableRef: f,
      tableData: C,
      renderColumns: H,
      allowRoll: d,
      rollStyle: r,
      renderTableColumn: N,
      onDbRowClick: c,
      onRowClick: b,
      onSelectionChange: v,
      onSortChange: u,
      handleRowClassName: m,
      handleHeaderCellClassName: $,
      renderNoData: L,
      summaryMethod: w,
      spanMethod: k,
      headerDragend: S,
      handleResize: O,
      conputedGridData: ne,
      defaultSort: R,
      headerCssVars: p,
      isLodeMoreDisabled: G,
      infiniteScroll: Q,
      infiniteScrollKey: K
    };
  },
  render() {
    if (!this.c.state.isCreated)
      return;
    this.handleResize();
    const e = this.c.state, t = this.c.controlParams.defaultexpandall === "true";
    return l(B("iBizControlBase"), {
      class: [this.ns1.b(), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("single-select", e.singleSelect), this.ns.is("empty", e.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized)],
      controller: this.c,
      style: this.headerCssVars
    }, {
      default: () => [l(B("el-table"), lt({
        ref: "tableRef",
        class: [this.ns.e("table"), this.ns.is("allow-roll", this.allowRoll && this.c.rollMode === "DEFAULT")],
        "default-sort": this.defaultSort,
        border: !0,
        "show-header": !this.c.state.hideHeader,
        "show-summary": this.c.enableAgg,
        "summary-method": this.summaryMethod,
        "highlight-current-row": e.singleSelect,
        "row-class-name": this.handleRowClassName,
        "header-cell-class-name": this.handleHeaderCellClassName,
        "row-key": "tempsrfkey",
        data: this.conputedGridData(this.tableData),
        "default-expand-all": t,
        "span-method": this.spanMethod,
        onRowClick: this.onRowClick,
        onRowDblclick: this.onDbRowClick,
        onSelectionChange: this.onSelectionChange,
        onSortChange: this.onSortChange,
        onHeaderDragend: this.headerDragend,
        "tooltip-effect": "light",
        "scrollbar-always-on": !0
      }, this.$attrs, {
        style: this.rollStyle
      }), {
        empty: this.renderNoData,
        default: () => [this.renderColumns.map((n, o) => this.renderTableColumn(n, o))]
      })]
    });
  }
});
class Wn {
  constructor() {
    D(this, "component", "CarouselGrid");
  }
}
const Tn = P(xe, function(e) {
  e.component(xe.name, xe), me(
    "GRID_RENDER_CAROUSEL_GRID",
    () => new Wn()
  );
}), Me = /* @__PURE__ */ x({
  name: "PercentPond",
  props: ct(),
  setup(e) {
    const t = M("percent-pond"), n = e.controller, o = g(100), a = () => {
      const s = Number(e.value) || 0;
      return "".concat(o.value === 0 ? 0 : Math.round(s / o.value * 100) || 0, "%");
    };
    return n.totalField && W(() => e.data[n.totalField], (s) => {
      (s || s === 0) && (o.value = s);
    }, {
      immediate: !0
    }), {
      ns: t,
      useCover: a,
      total: o
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [l("div", {
      class: this.ns.e("slider")
    }, [l("div", {
      class: this.ns.em("slider", "line")
    }, null), l("div", {
      class: this.ns.em("slider", "cover-slider")
    }, [l("div", {
      class: this.ns.em("slider", "use-cover"),
      style: {
        width: this.useCover()
      }
    }, null), l("i", {
      class: ["fa fa-caret-down", this.ns.em("slider", "slider-arrow")],
      style: {
        left: "calc(".concat(this.useCover(), " - 5px)")
      },
      "aria-hidden": "true"
    }, null)])]), l("div", {
      class: this.ns.e("value")
    }, [l("div", {
      class: this.ns.em("value", "current")
    }, [this.value]), l("div", {
      class: this.ns.em("value", "total")
    }, [Ft("/"), this.total])])]);
  }
});
class An extends he {
  constructor() {
    super(...arguments);
    /**
     * 总数属性
     *
     * @type {string}
     * @memberof PercentPondController
     */
    D(this, "totalField", "");
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PercentPondController
   */
  async onInit() {
    super.onInit(), this.editorParams && this.editorParams.TOTALFIELD && (this.totalField = this.editorParams.TOTALFIELD.toLowerCase());
  }
}
class On {
  constructor() {
    D(this, "formEditor", "PercentPond");
    D(this, "gridEditor", "PercentPond");
  }
  async createController(t, n) {
    const o = new An(t, n);
    return await o.init(), o;
  }
}
const Yn = P(Me, function(e) {
  e.component(Me.name, Me), ie(
    "SLIDER_SCREEN_PROGRESS",
    () => new On()
  );
}), Vn = /* @__PURE__ */ x({
  name: "CustomButton1",
  render() {
    return l("svg", {
      viewBox: "0 0 187 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M0,0 L0,34 L168,34 L183,19 L183,0",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,34 L168,34 L183,19",
      class: "dv-button-svg-line"
    }, null)])]);
  }
}), Hn = /* @__PURE__ */ x({
  name: "CustomButton2",
  render() {
    return l("svg", {
      viewBox: "0 0 167 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M0,0 L0,34 L163,34 L163,0",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,0 L164.1,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,0 L163,34",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M164.1,34 L0,34",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M1.1,34 L1.1,0",
      class: "dv-button-svg-line"
    }, null)])]);
  }
}), Fn = /* @__PURE__ */ x({
  name: "CustomButton3",
  render() {
    return l("svg", {
      viewBox: "0 0 167 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M1,1 L1,33 L162,33 L162,1",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,0 L0,10",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M-1.1,0 L10,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M164.1,0 L153,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,0 L163,10",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M164.1,34 L153,34",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,34 L163,24",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M0,34 L0,24",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M-1.1,34 L10,34",
      class: "dv-button-svg-line"
    }, null)])]);
  }
}), Gn = /* @__PURE__ */ x({
  name: "CustomButton4",
  render() {
    return l("svg", {
      viewBox: "0 0 187 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M0,34 L168,34 L183,19 L183,0 L0,0",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,34 L168,34 L183,19 L183,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M184.1,0 L0,0 L0,34.7",
      class: "dv-button-svg-line"
    }, null)])]);
  }
}), jn = /* @__PURE__ */ x({
  name: "CustomButton5",
  render() {
    return l("svg", {
      viewBox: "0 0 187 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M0,34 L168,34 L183,19 L183,0 L15,0 L0,15",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,34 L168,34 L183,19 L183,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M183,0 L15,0 L0,15 L0,34",
      class: "dv-button-svg-line"
    }, null)])]);
  }
}), _n = /* @__PURE__ */ x({
  name: "CustomButton6",
  render() {
    return l("svg", {
      viewBox: "0 0 167 38",
      preserveAspectRatio: "none",
      class: "dv-button-svg",
      fill: "currentColor"
    }, [l("g", {
      style: "transform: translate(2px, 2px);"
    }, [l("g", null, [l("path", {
      "data-type": "shape",
      d: "M0,0 L0,34 L163,34 L163,0",
      class: "dv-button-svg-bg"
    }, null)]), l("path", {
      "data-type": "polyline",
      d: "M0,0 L81.6,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,0 L81.4,0",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M0,34 L81.6,34",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,34 L81.4,34",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M0,1 L10,1",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,1 L153,1",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M0,33 L10,33",
      class: "dv-button-svg-line"
    }, null), l("path", {
      "data-type": "polyline",
      d: "M163,33 L153,33",
      class: "dv-button-svg-line"
    }, null)])]);
  }
});
class bt extends dt {
  /**
   * 父容器数据对象数据
   * @author lxm
   * @date 2023-07-15 01:33:58
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.dataParent.data;
  }
  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @protected
   * @returns {*}  {Promise<void>}
   */
  async onInit() {
    await super.onInit();
  }
}
const Pe = /* @__PURE__ */ x({
  name: "CustomButton",
  components: {
    CustomButton1: Vn,
    CustomButton2: Hn,
    CustomButton3: Fn,
    CustomButton4: Gn,
    CustomButton5: jn,
    CustomButton6: _n
  },
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: bt,
      required: !0
    }
  },
  setup(e) {
    const t = M("panel-button"), n = e.controller, {
      rawItem: o
    } = e.modelData, a = g(""), s = g({}), r = g("lightblue"), d = g(), y = g("CustomButton5"), h = g(""), f = g(0.6), b = g("");
    o && o.cssStyle && (a.value = o.cssStyle), o && o.rawItemParams && o.rawItemParams.forEach((v) => {
      v.key === "BUTTONNAME" ? y.value = v.value : v.key === "BORDERCOLOR" ? d.value = v.value : v.key === "COLOR" ? r.value = v.value : v.key === "BGCOLOR" && (h.value = v.value);
    });
    const c = I(() => {
      const {
        id: v
      } = e.modelData, u = [t.b(), t.m(v)];
      return u.push(...e.controller.containerClass), u;
    });
    return Object.assign(s.value, {
      [t.cssVarBlockName("svg-border-color")]: d.value,
      [t.cssVarBlockName("svg-color")]: r.value,
      [t.cssVarBlockName("svg-bg-color")]: h.value,
      [t.cssVarBlockName("svg-bg-opacity")]: f.value
    }), W(() => n.data, async (v) => {
      if (v) {
        const u = n.model.rawItem;
        if (!u)
          return;
        let m;
        const $ = {
          ...v
        };
        u.contentType === "RAW" ? m = u.caption : u.contentType === "HTML" && (m = u.content), m && u.templateMode && (m = await ibiz.util.hbs.render(m.replace("//n", "\n"), Object.assign($, {
          data: {
            ...v
          }
        }))), b.value = m;
      }
    }, {
      immediate: !0
    }), {
      ns: t,
      classArr: c,
      tempStyle: a,
      content: b,
      svgShape: y,
      svgStyle: s
    };
  },
  render() {
    if (!this.controller.state.visible)
      return;
    const e = B(this.svgShape);
    return l("div", {
      class: this.classArr,
      style: this.tempStyle,
      onClick: (t) => {
        this.controller.onClick(t);
      }
    }, [l("div", {
      class: this.ns.b("custon-btn"),
      style: this.svgStyle
    }, [e && ee(e), l(B("iBizRawItem"), {
      class: this.ns.e("raw-item"),
      rawItem: this.modelData,
      content: this.content
    }, null)])]);
  }
});
class Un {
  constructor() {
    D(this, "component", "CustomButton");
  }
  async createController(t, n, o) {
    const a = new bt(t, n, o);
    return await a.init(), a;
  }
}
const Xn = P(Pe, function(e) {
  e.component(Pe.name, Pe), vt("CUSTOM_CUSTOM_BTN", () => new Un());
}), Ie = /* @__PURE__ */ x({
  name: "WaterLevelPond",
  props: ct(),
  emits: tt(),
  setup(e) {
    const t = M("water-level-pond"), n = e.controller;
    let o = fe;
    const a = g(null), s = I(() => n.maxItem ? e.data[n.maxItem] : 100), r = I(() => {
      const d = Number(e.value) / Number(s.value);
      return n.valueFormat ? ibiz.util.text.format(d.toString(), n.valueFormat) : d;
    });
    return W(() => e.value, () => {
      const d = Number(e.value) / Number(s.value);
      n.setDate(d);
    }, {
      immediate: !0
    }), z(() => {
      a.value && n.drawCanvas(a.value), o = ae(window, "resize", () => {
        n.refresh();
      });
    }), q(() => {
      o !== fe && o(), n.cancelAnimation();
    }), {
      ns: t,
      canvas: a,
      curValue: r
    };
  },
  render() {
    return l("div", {
      class: [this.ns.b()]
    }, [l("div", {
      class: this.ns.e("value")
    }, [this.curValue]), l("canvas", {
      ref: "canvas"
    }, null)]);
  }
});
class qn {
  constructor({
    canvasWidth: t,
    // 轴长
    canvasHeight: n,
    // 轴高
    waveWidth: o = 0.055,
    // 波浪宽度,数越小越宽
    waveHeight: a = 6,
    // 波浪高度,数越大越高
    xOffset: s = 0,
    speed: r = 4,
    color: d = "#DBB77A"
    // 波浪颜色
  } = {}) {
    D(this, "points", []);
    D(this, "startX", 0);
    D(this, "canvasWidth", 0);
    D(this, "canvasHeight", 0);
    D(this, "waveWidth", 0);
    D(this, "waveHeight", 0);
    D(this, "xOffset", 0);
    D(this, "speed", 0);
    D(this, "color", "");
    this.points = [], this.startX = 0, this.canvasWidth = t, this.canvasHeight = n, this.waveWidth = o / 100, this.waveHeight = a, this.xOffset = s, this.speed = r, this.color = d;
  }
  draw(t) {
    t.save();
    const n = this.points;
    t.beginPath();
    for (let o = 0; o < n.length; o += 1) {
      const a = n[o];
      t.lineTo(a[0], a[1]);
    }
    t.lineTo(this.canvasWidth, this.canvasHeight), t.lineTo(this.startX, this.canvasHeight), t.lineTo(n[0][0], n[0][1]), t.fillStyle = this.color, t.fill(), t.restore();
  }
  update({ nowRange: t } = {}) {
    this.points = [];
    const {
      startX: n,
      waveHeight: o,
      waveWidth: a,
      canvasWidth: s,
      canvasHeight: r,
      xOffset: d
    } = this;
    for (let y = n; y < n + s; y += 20 / s) {
      const h = Math.sin((n + y) * a + d), f = r * (1 - t / 100);
      this.points.push([y, f + h * o]);
    }
    this.xOffset += this.speed / 100;
  }
}
const re = /* @__PURE__ */ new Map(), yt = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, pt = /^(rgb|rgba|RGB|RGBA)/, Qn = (e) => {
  const t = yt.test(e), n = pt.test(e), o = e;
  return t || n || e ? o : (console.error("Color: Invalid color!"), "");
}, Kn = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substring(0, 2), 16), o = parseInt(t.substring(2, 4), 16), a = parseInt(t.substring(4, 6), 16);
  return [n, o, a];
}, Zn = (e) => e.replace(/rgb\(|rgba\(|\)/g, "").split(",").slice(0, 3).map(function(t) {
  return parseInt(t, 10);
}), Jn = (e) => {
  if (!e)
    return console.error("getRgbValue: Missing parameters!"), !1;
  const t = Qn(e);
  if (!t) return !1;
  const n = yt.test(t), o = pt.test(t), a = t.toLowerCase();
  if (n) return Kn(a);
  if (o) return Zn(a);
}, el = (e) => {
  if (!e)
    return console.error("getColorFromRgbValue: Missing parameters!"), !1;
  const t = e.length;
  if (t !== 3 && t !== 4)
    return console.error("getColorFromRgbValue: Value is illegal!"), !1;
  let n = t === 3 ? "rgb(" : "rgba(";
  return n += "".concat(e.join(","), ")"), n;
}, X = (e, t) => {
  const n = t || 100;
  if (!e)
    return console.error("fade: Missing parameters!"), !1;
  const o = Jn(e);
  if (!o) return !1;
  const a = [...o, n / 100];
  return el(a);
}, V = (e, t) => {
  const n = [];
  return e.forEach((o, a) => {
    t[a] ? n.push(t[a]) : n.push(o);
  }), n;
}, j = (e, t) => {
  if (e && !re.has(e)) {
    const n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, o = new n(() => {
      t();
    });
    o.observe(e, {
      attributes: !0,
      childList: !0,
      attributeFilter: ["style"],
      attributeOldValue: !0,
      subtree: !0,
      characterData: !0
    }), re.set(e, o);
  }
}, _ = (e) => {
  if (e && re.has(e)) {
    const t = re.get(e);
    t.disconnect(), t.takeRecords(), re.delete(e);
  }
}, E = () => {
  const e = document.documentElement;
  return e ? getComputedStyle(e).getPropertyValue("--ibiz-color-primary") : null;
}, tl = (e) => e.filter((t) => typeof t == "number"), nl = (e) => tl(e).reduce((n, o) => n + o, 0), ll = (e, t) => {
  const n = Math.abs(e[0] - t[0]), o = Math.abs(e[1] - t[1]);
  return Math.sqrt(n * n + o * o);
}, rt = (e) => {
  const n = new Array(e.length - 1).fill(0).map((o, a) => [e[a], e[a + 1]]).map((o) => ll(o[0], o[1]));
  return nl(n);
};
function oe(e, t, n, o) {
  let a = null;
  return function() {
    clearTimeout(a), a = setTimeout(() => {
      t.apply(n, o);
    }, e);
  };
}
function le(e, t) {
  const n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, o = new n(t);
  return o.observe(e, {
    attributes: !0,
    childList: !0,
    attributeFilter: ["style"],
    attributeOldValue: !0,
    subtree: !0,
    characterData: !0
  }), o;
}
function ot(e, t, n) {
  const o = g(0), a = g(0);
  let s, r = null, d = null;
  const y = (v = !0) => new Promise((u) => {
    T(() => {
      d = e.value, o.value = e.value ? e.value.clientWidth : 0, a.value = e.value ? e.value.clientHeight : 0, e.value ? (!o.value || !a.value) && console.warn(
        "DataV: Component width or height is 0px, rendering abnormality may occur!"
      ) : console.warn(
        "DataV: Failed to get dom node, component rendering may be abnormal!"
      ), typeof t == "function" && v && t(), u(!0);
    });
  }), h = () => {
    s = oe(
      200,
      y,
      F(),
      null
    );
  }, f = () => {
    r = le(d, s), window.addEventListener(
      "resize",
      s
    );
  }, b = () => {
    r && (r.disconnect(), r.takeRecords(), r = null);
  }, c = async () => {
    await y(!1), h(), f(), typeof n == "function" && n();
  };
  return z(() => {
    c();
  }), Y(() => {
    b();
  }), Gt(c), jt(b), {
    width: o,
    height: a,
    initWH: y
  };
}
function ol(e, t) {
  let n = e;
  const o = Array.from({ length: t }, (a, s) => t - s).map((a) => {
    const s = 1 + Math.floor(Math.random() * (n / a * 2 - 1));
    return n -= s, s;
  });
  return o[t - 1] += n, o;
}
function sl(e) {
  const t = [];
  let n = 0;
  const o = e.length, a = e.sort((s, r) => r - s);
  for (; a.length > 1; ) {
    const s = a.pop(), r = a.pop();
    t[n] = r, t[o - (n + 1)] = s, n++;
  }
  return a.length === 1 && (t[n] = a.pop()), t;
}
function al() {
  const e = Math.floor(Math.random() * 256), t = Math.floor(Math.random() * 256), n = Math.floor(Math.random() * 256);
  return "rgb(".concat(e, ",").concat(t, ",").concat(n, ")");
}
function it(e) {
  const t = Math.floor(Math.random() * e.length);
  return e[t];
}
class rl extends he {
  constructor() {
    super(...arguments);
    /**
     * @description canvas对象
     * @type {HTMLCanvasElement}
     * @memberof WaterLevelPondController
     */
    D(this, "canvas");
    /**
     * @description canvas宽度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "canvasWidth", 0);
    /**
     * @description canvas高度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "canvasHeight", 0);
    /**
     * @description 当前范围
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "nowRange", 0);
    /**
     * @description 当前范围值
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "rangeValue", 0);
    /**
     * @description 波浪对象
     * @type {(Wave | null)}
     * @memberof WaterLevelPondController
     */
    D(this, "wave", null);
    /**
     * @description 动画id
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "requestID", 0);
    /**
     * @description 形状
     * @type {string}
     * @memberof WaterLevelPondController
     */
    D(this, "shape", "circle");
    /**
     * @description 波浪数量
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "waveNum", 3);
    /**
     * @description 波浪宽度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "waveWidth", 5);
    /**
     * @description 波浪高度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "waveHeight", 6);
    /**
     * @description 波浪透明度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "waveOpacity", 40);
    /**
     * @description 动画速度
     * @type {number}
     * @memberof WaterLevelPondController
     */
    D(this, "speed", 4);
    /**
     * @description 最大值项名称
     * @type {string}
     * @memberof WaterLevelPondController
     */
    D(this, "maxItem", "");
    /**
     * @description 样式名
     * @memberof WaterLevelPondController
     */
    D(this, "ns", M("water-level-pond"));
    /**
     * @description 获取主题色
     * @param {string} name
     * @memberof WaterLevelPondController
     */
    D(this, "getThemeVar", (n) => getComputedStyle(this.canvas).getPropertyValue(n));
  }
  async onInit() {
    super.onInit(), this.model.precision && ibiz.log.warn("滑动输入条不支持配置精度");
    const {
      SHAPE: n,
      WAVENUM: o,
      WAVEWIDTH: a,
      WAVEHEIGHT: s,
      WAVEOPACITY: r,
      SPEED: d,
      MAXITEM: y
    } = this.editorParams;
    n && (this.shape = n), o && (this.waveNum = se(o)), a && (this.waveWidth = se(a)), s && (this.waveHeight = se(s)), r && (this.waveOpacity = se(r)), d && (this.speed = se(d)), y && (this.maxItem = y);
  }
  /**
   * @description 绘制canvas
   * @param {HTMLCanvasElement} canvas
   * @memberof WaterLevelPondController
   */
  drawCanvas(n) {
    this.canvas = n, this.canvasWidth = n.scrollWidth, this.canvasHeight = n.offsetHeight, n.height = this.canvasHeight, n.width = this.canvasWidth, this.calcScale(n), this.nowRange = 0;
    const o = this.getThemeVar(this.ns.cssVarName("color-primary")), a = X(o, this.waveOpacity);
    this.wave = new qn({
      canvasWidth: this.canvasWidth,
      // 轴长
      canvasHeight: this.canvasHeight,
      // 轴高
      waveWidth: this.waveWidth,
      // 波浪宽度,数越小越宽
      waveHeight: this.waveHeight,
      // 波浪高度,数越大越高
      color: a,
      // 波浪颜色
      xOffset: 0,
      // 初始偏移
      speed: this.speed
      // 速度
    }), this.startDraw(n);
  }
  /**
   * @description 开始绘制
   * @param {HTMLCanvasElement} canvas
   * @memberof WaterLevelPondController
   */
  startDraw(n) {
    const o = n.getContext("2d");
    o.clearRect(0, 0, n.offsetWidth, n.offsetHeight), this.drawContainer(o), this.nowRange <= this.rangeValue && (this.nowRange += 1), this.nowRange > this.rangeValue && (this.nowRange -= 1), this.wave.update({
      nowRange: this.nowRange
    }), this.wave.draw(o), this.requestID = window.requestAnimationFrame(() => this.startDraw(n));
  }
  /**
   * @description 取消动画
   * @memberof WaterLevelPondController
   */
  cancelAnimation() {
    window.cancelAnimationFrame(this.requestID);
  }
  /**
   * @description 刷新
   * @memberof WaterLevelPondController
   */
  refresh() {
    this.canvasWidth = this.canvas.offsetWidth, this.canvasHeight = this.canvas.offsetHeight, this.canvas.height = this.canvasHeight, this.canvas.width = this.canvasWidth, this.wave && (this.wave.canvasHeight = this.canvasHeight, this.wave.canvasWidth = this.canvasWidth);
  }
  /**
   * @description 绘制容器
   * @param {CanvasRenderingContext2D} ctx
   * @memberof WaterLevelPondController
   */
  drawContainer(n) {
    const o = this.shape;
    o === "circle" ? this.drawCircle(n) : o === "rect" && this.drawRect(n);
  }
  /**
   * @description 绘制圆
   * @param {CanvasRenderingContext2D} ctx
   * @memberof WaterLevelPondController
   */
  drawCircle(n) {
    const a = Math.min(this.canvasHeight, this.canvasWidth) / 2, s = 4, r = a - s, d = this.getThemeVar(this.ns.cssVarName("color-border"));
    n.lineWidth = s, n.beginPath(), n.arc(this.canvasWidth / 2, this.canvasHeight / 2, r, 0, 2 * Math.PI), n.strokeStyle = d, n.stroke(), n.clip();
  }
  /**
   * @description 绘制矩形
   * @param {CanvasRenderingContext2D} ctx
   * @memberof WaterLevelPondController
   */
  drawRect(n) {
    n.beginPath(), n.rect(
      10,
      10,
      this.canvasWidth - 2 * 10,
      this.canvasHeight - 2 * 10
    );
    const a = this.getThemeVar(this.ns.cssVarName("color-border"));
    n.strokeStyle = a, n.lineWidth = 2, n.closePath(), n.stroke(), n.clip();
  }
  /**
   * @description 计算缩放
   * @param {IData} canvas
   * @memberof WaterLevelPondController
   */
  calcScale(n) {
    const o = n.getContext("2d"), a = window.devicePixelRatio || 1, s = o.webkitBackingStorePixelRatio || o.mozBackingStorePixelRatio || o.msBackingStorePixelRatio || o.oBackingStorePixelRatio || o.backingStorePixelRatio || 1, r = a / s;
    if (a !== s) {
      const d = n.width, y = n.height;
      n.width = d * r, n.height = y * r, n.style.width = "".concat(d, "px"), n.style.height = "".concat(y, "px"), o.scale(r, r);
    }
  }
  /**
   * @description 设置值
   * @param {number} value
   * @memberof WaterLevelPondController
   */
  setDate(n) {
    this.rangeValue = n * 100;
  }
}
class il {
  constructor() {
    D(this, "formEditor", "WaterLevelPond");
    D(this, "gridEditor", "WaterLevelPond");
  }
  async createController(t, n) {
    const o = new rl(t, n);
    return await o.init(), o;
  }
}
const ul = P(
  Ie,
  function(e) {
    e.component(Ie.name, Ie), ie(
      "SLIDER_WATER_LEVEL_POND",
      () => new il()
    );
  }
), Be = /* @__PURE__ */ x({
  name: "CustomSearchBox",
  props: Mt(),
  emits: tt(),
  setup(e) {
    const t = M("custom-search-box"), n = e.controller, o = g(""), a = () => {
      if (e.controller.dashboard) {
        const r = e.controller.dashboard;
        r && r.refresh({
          query: o.value
        });
      }
    };
    return {
      c: n,
      ns: t,
      searchValue: o,
      onSearch: a,
      handleKeyUp: (r) => {
        r && r.code === "Enter" && a();
      }
    };
  },
  render() {
    return l("div", {
      class: [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : ""]
    }, [l(B("el-input"), {
      class: [this.ns.e("input")],
      modelValue: this.searchValue,
      "onUpdate:modelValue": (e) => this.searchValue = e,
      placeholder: this.c.placeholder,
      clearable: !1,
      "suffix-icon": l(B("ion-icon"), {
        onClick: this.onSearch,
        class: this.ns.e("search-icon"),
        name: "search"
      }, null),
      onKeyup: this.handleKeyUp
    }, null)]);
  }
});
class cl extends $e {
  constructor() {
    super(...arguments);
    /**
     * 占位提示
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    D(this, "placeholder", "");
  }
  /**
   * 初始化
   */
  async onInit() {
    if (super.onInit(), this.model.controlParam) {
      const { ctrlParams: n } = this.model.controlParam;
      n && n.PLACEHOLDER && (this.placeholder = ibiz.appUtil.resolveI18nText(
        n.PLACEHOLDER
      ));
    }
  }
}
class dl {
  constructor() {
    D(this, "component", "CustomSearchBox");
  }
  async createController(t, n, o) {
    const a = new cl(
      t,
      n,
      o
    );
    return await a.init(), a;
  }
}
const vl = P(Be, (e) => {
  e.component(Be.name, Be), de(
    "EDITOR_CUSTOMSTYLE_CUSTOM_SEARCH_BOX",
    () => new dl()
  );
}), ut = /* @__PURE__ */ x({
  name: "CustomTag",
  props: {
    tname: {
      type: String,
      required: !0
    },
    controller: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = M("custom-tag"), n = I(() => e.controller.customColorGroup.length > 0 ? it(e.controller.customColorGroup) : al()), o = I(() => e.controller.enableFontSizeRandom ? "".concat(Math.random() * (e.controller.maxFontSize - e.controller.minFontSize) + e.controller.minFontSize, "px") : "".concat(e.controller.defaultFontSize, "px"));
    return {
      ns: t,
      setColor: n,
      normalSize: o,
      getRandomColorFromArray: it
    };
  },
  render() {
    return l("a", {
      class: this.ns.b(),
      style: "color:".concat(this.setColor, ";font-size:").concat(this.normalSize)
    }, [this.tname]);
  }
});
class fl extends ft {
  constructor() {
    super(...arguments);
    /**
     *   字体大小是否为随机
     *
     * @author fangZhiHao
     * @date 2024-08-22 15:08:22
     * @type {boolean}
     */
    D(this, "enableFontSizeRandom", !0);
    /**
     *  字体最大字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:47
     * @type {number}
     */
    D(this, "maxFontSize", 16);
    /**
     *  字体最小字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:06
     * @type {number}
     */
    D(this, "minFontSize", 8);
    /**
     *  默认字号
     *
     * @author fangZhiHao
     * @date 2024-08-22 16:08:51
     * @type {number}
     */
    D(this, "defaultFontSize", 16);
    /**
     *  自定义字体颜色组
     *
     * @author fangZhiHao
     * @date 2024-08-26 10:08:45
     * @type {string[]}
     */
    D(this, "customColorGroup", []);
  }
  async onCreated() {
    var r, d;
    if (await super.onCreated(), !((r = this.model.controlParam) != null && r.ctrlParams))
      return;
    const {
      ENABLEFONTSIZERANDOM: n,
      RANDOMFONTSIZERANGE: o,
      DEFAULTFONTSIZE: a,
      CUSTOMCOLORGROUP: s
    } = (d = this.model.controlParam) == null ? void 0 : d.ctrlParams;
    if (n && (this.enableFontSizeRandom = JSON.parse(n)), o) {
      const y = JSON.parse(o), { min: h, max: f } = y;
      ge(h) && (this.minFontSize = h), ge(f) && (this.maxFontSize = f);
    }
    ge(a) && (this.defaultFontSize = a), s && (this.customColorGroup = JSON.parse(s));
  }
}
const Ee = /* @__PURE__ */ x({
  name: "TaggedWall",
  component: [ut],
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    context: {
      type: Object,
      required: !0
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * 是否为单选
     * - true 单选
     * - false 多选
     *
     * @type {(Boolean)}
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: !1
    },
    loadDefault: {
      type: Boolean,
      default: !0
    }
  },
  setup() {
    const e = nt((...s) => new fl(...s)), t = M("tagged-wall"), n = g([]), o = g([]), a = I(() => {
      const s = ol(o.value.length, 7);
      n.value = sl(s);
      const r = o.value.sort(() => Math.random() > 0.5 ? -1 : 1).concat();
      return n.value.map((d, y) => r.splice(0, d));
    });
    return W(() => e.state.items, () => {
      o.value = e.state.items;
    }), {
      c: e,
      ns: t,
      tags: a,
      tagList: o
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [l("div", {
      class: this.ns.e("tag-body")
    }, [l("div", {
      class: this.ns.e("tag-body-tags")
    }, [this.tags.map((e, t) => l("div", {
      key: t,
      class: this.ns.e("tag-body-tags-li")
    }, [e.map((n) => l(ut, {
      key: n.id,
      tname: n.name,
      controller: this.c
    }, null))]))])])]);
  }
});
class hl {
  constructor() {
    D(this, "component", "TaggedWall");
  }
}
const ml = P(Ee, function(e) {
  e.component(Ee.name, Ee), me(
    "LIST_RENDER_TAGGED_WALL",
    () => new hl()
  );
}), Ne = /* @__PURE__ */ x({
  name: "CustomDV1",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = [E() || "#0095ee", "#95d8f8"], o = ["left-top", "right-top", "left-bottom", "right-bottom"], a = g(), s = g(0), r = g(0), d = I(() => V(n, e.color || [])), y = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), h = () => {
      const b = s.value - e.offsetX, c = r.value - e.offsetY, v = 8;
      return l("div", {
        class: [t.e("border-box")]
      }, [l("svg", {
        class: [t.e("border")],
        width: b,
        height: Math.max(c, 0)
      }, [l("polygon", {
        fill: y,
        points: "10, 27 10, ".concat(r.value - 27 - e.offsetY, " 13, ").concat(r.value - 24 - e.offsetY, " 13, ").concat(r.value - 21 - e.offsetY, " 24, ").concat(r.value - 11 - e.offsetY, "\n        38, ").concat(r.value - 11 - e.offsetY, " 41, ").concat(r.value - 8 - e.offsetY, " 73, ").concat(r.value - 8 - e.offsetY, " 75, ").concat(r.value - 10 - e.offsetY, " 81, ").concat(r.value - 10 - e.offsetY, "\n        85, ").concat(r.value - 6 - e.offsetY, " ").concat(s.value - 85, ", ").concat(r.value - 6 - e.offsetY, " ").concat(s.value - 81, ", ").concat(r.value - 10 - e.offsetY, " ").concat(s.value - 75, ", ").concat(r.value - 10 - e.offsetY, "\n        ").concat(s.value - 73, ", ").concat(r.value - 8 - e.offsetY, " ").concat(s.value - 41, ", ").concat(r.value - 8 - e.offsetY, " ").concat(s.value - 38, ", ").concat(r.value - 11 - e.offsetY, "\n        ").concat(s.value - 24, ", ").concat(r.value - 11 - e.offsetY, " ").concat(s.value - 13, ", ").concat(r.value - 21 - e.offsetY, " ").concat(s.value - 13, ", ").concat(r.value - 24 - e.offsetY, "\n        ").concat(s.value - 10, ", ").concat(r.value - 27 - e.offsetY, " ").concat(s.value - 10, ", 27 ").concat(s.value - 13, ", 25 ").concat(s.value - 13, ", 21\n        ").concat(s.value - 24, ", 11 ").concat(s.value - 38, ", 11 ").concat(s.value - 41, ", 8 ").concat(s.value - 73, ", 8 ").concat(s.value - 75, ", 10\n        ").concat(s.value - 81, ", 10 ").concat(s.value - 85, ", 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24")
      }, null)]), o.map((u) => l("svg", {
        key: u,
        class: [t.e(u), t.e("border")]
      }, [l("polygon", {
        fill: d.value[0],
        points: "\n                  ".concat(6 + v, ",").concat(66 + v, " ").concat(6 + v, ",").concat(18 + v, " ").concat(12 + v, ",").concat(12 + v, " ").concat(18 + v, ",").concat(12 + v, " ").concat(24 + v, ",").concat(6 + v, " ").concat(27 + v, ",").concat(6 + v, " ").concat(30 + v, ",").concat(9 + v, " ").concat(36 + v, ",").concat(9 + v, " ").concat(39 + v, ",").concat(6 + v, " ").concat(84 + v, ",").concat(6 + v, " ").concat(81 + v, ",").concat(9 + v, " ").concat(75 + v, ",").concat(9 + v, " ").concat(73.2 + v, ",").concat(7 + v, " ").concat(40.8 + v, ",").concat(7 + v, " ").concat(37.8 + v, ",").concat(10.2 + v, " ").concat(24 + v, ",").concat(10.2 + v, " ").concat(12 + v, ",").concat(21 + v, " ").concat(12 + v, ",").concat(24 + v, " ").concat(9 + v, ",").concat(27 + v, " ").concat(9 + v, ",").concat(51 + v, " ").concat(7.8 + v, ",").concat(54 + v, " ").concat(7.8 + v, ",").concat(63 + v, "\n                ")
      }, [l("animate", {
        attributeName: "fill",
        values: "".concat(d.value[0], ";").concat(d.value[1], ";").concat(d.value[0]),
        dur: "0.5s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        fill: d.value[1],
        points: "\n                  ".concat(27.6 + v, ",").concat(4.8 + v, " ").concat(38.4 + v, ",").concat(4.8 + v, " ").concat(35.4 + v, ",").concat(7.8 + v, " ").concat(30.6 + v, ",").concat(7.8 + v, "\n                ")
      }, [l("animate", {
        attributeName: "fill",
        values: "".concat(d.value[1], ";").concat(d.value[0], ";").concat(d.value[1]),
        dur: "0.5s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        fill: d.value[0],
        points: "\n                  ".concat(9 + v, ",").concat(54 + v, " ").concat(9 + v, ",").concat(63 + v, " ").concat(7.2 + v, ",").concat(66 + v, " ").concat(7.2 + v, ",").concat(75 + v, " ").concat(7.8 + v, ",").concat(78 + v, " ").concat(7.8 + v, ",").concat(110 + v, " ").concat(8.4 + v, ",").concat(110 + v, " ").concat(8.4 + v, ",").concat(66 + v, " ").concat(9.6 + v, ",").concat(66 + v, " ").concat(9.6 + v, ",").concat(54 + v, "\n                ")
      }, [l("animate", {
        attributeName: "fill",
        values: "".concat(d.value[0], ";").concat(d.value[1], ";transparent"),
        dur: "1s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)])]))]);
    }, f = () => {
      T(() => {
        const b = a.value;
        b && (s.value = b.clientWidth, r.value = b.clientHeight);
      });
    };
    return z(() => {
      f(), j(a.value, f), window.addEventListener("resize", f);
    }), Y(() => {
      _(a.value), window.removeEventListener("resize", f);
    }), {
      ns: t,
      customDv1: a,
      renderBorder: h
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv1",
      class: [this.ns.b(), this.ns.is("style-1", !0)],
      style: "--ibiz-style-1-offsetY:".concat(this.offsetY, "px")
    }, [l("div", {
      class: this.ns.e("wrapper")
    }, [this.renderBorder()]), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), $l = P(Ne, function(e) {
  e.component(Ne.name, Ne);
}), ze = /* @__PURE__ */ x({
  name: "CustomDV2",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = I(() => V(n, e.color || [])), d = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), y = () => {
      const f = a.value - e.offsetX, b = s.value - e.offsetY, c = 8;
      return l("svg", {
        class: [t.em("border-svg", "container")],
        width: f,
        height: Math.max(b, 0),
        style: "--ibiz-style-2-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: d,
        points: "\n            ".concat(7 + c, ", ").concat(7 + c, " \n            ").concat(a.value - 7 - c, ", ").concat(7 + c, " \n            ").concat(a.value - 7 - c, ", ").concat(s.value - 7 - e.offsetY - c, " \n            ").concat(7 + c, ", ").concat(s.value - 7 - c - e.offsetY, "\n          ")
      }, null), l("polyline", {
        stroke: r.value[0],
        points: "\n            ".concat(2 + c, ", ").concat(2 + c, " \n            ").concat(a.value - 2 - c, ", ").concat(2 + c, " \n            ").concat(a.value - 2 - c, ", ").concat(s.value - 2 - e.offsetY - c, " \n            ").concat(2 + c, ", ").concat(s.value - 2 - e.offsetY - c, " \n            ").concat(2 + c, ", ").concat(2 + c, "\n          ")
      }, null), l("polyline", {
        stroke: r.value[1],
        points: "\n            ".concat(6 + c, ", ").concat(6 + c, " \n            ").concat(a.value - 6 - c, ", ").concat(6 + c, " \n            ").concat(a.value - 6 - c, ", ").concat(s.value - 6 - c - e.offsetY, " \n            ").concat(6 + c, ", ").concat(s.value - 6 - e.offsetY - c, " \n            ").concat(6 + c, ", ").concat(6 + c, "\n          ")
      }, null), l("circle", {
        fill: r.value[0],
        cx: "".concat(11 + c),
        cy: "".concat(11 + c),
        r: "1"
      }, null), l("circle", {
        fill: r.value[0],
        cx: "".concat(a.value - 11 - c),
        cy: "".concat(11 + c),
        r: "1"
      }, null), l("circle", {
        fill: r.value[0],
        cx: "".concat(a.value - 11 - c),
        cy: "".concat(s.value - 11 - c - e.offsetY),
        r: "1"
      }, null), l("circle", {
        fill: r.value[0],
        cx: "".concat(11 + c),
        cy: "".concat(s.value - 11 - c - e.offsetY),
        r: "1"
      }, null)]);
    }, h = () => {
      T(() => {
        const f = o.value;
        f && (a.value = f.clientWidth, s.value = f.clientHeight);
      });
    };
    return z(() => {
      h(), j(o.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", h);
    }), {
      ns: t,
      customDv2: o,
      renderBorder: y
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv2",
      class: [this.ns.b(), this.ns.is("style-2", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), gl = P(ze, function(e) {
  e.component(ze.name, ze);
}), We = /* @__PURE__ */ x({
  name: "CustomDV3",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = I(() => V(n, e.color || [])), d = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), y = () => {
      const f = a.value - e.offsetX, b = s.value - e.offsetY, c = 8;
      return l("svg", {
        class: [t.em("border-svg", "container")],
        width: f,
        height: Math.max(b, 0),
        style: "--ibiz-style-3-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: d,
        points: "\n            ".concat(23 + c, ", ").concat(23 + c, " \n            ").concat(a.value - 24 - c, ", ").concat(23 + c, " \n            ").concat(a.value - 24 - c, ", ").concat(s.value - 24 - e.offsetY - c, " \n            ").concat(23 + c, ", ").concat(s.value - 24 - e.offsetY - c, "\n          ")
      }, null), l("polyline", {
        class: [t.e("bb3-line1")],
        stroke: r.value[0],
        points: "\n            ".concat(4 + c, ", ").concat(4 + c, " \n            ").concat(a.value - 22 - c, ", ").concat(4 + c, " \n            ").concat(a.value - 22 - c, ", ").concat(s.value - 22 - e.offsetY - c, " \n            ").concat(4 + c, ", ").concat(s.value - 22 - e.offsetY - c, " \n            ").concat(4 + c, ", ").concat(4 + c, "\n          ")
      }, null), l("polyline", {
        class: [t.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(10 + c, ", ").concat(10 + c, " \n            ").concat(a.value - 16 - c, ", ").concat(10 + c, " \n            ").concat(a.value - 16 - c, ", ").concat(s.value - 16 - e.offsetY - c, " \n            ").concat(10 + c, ", ").concat(s.value - 16 - e.offsetY - c, " \n            ").concat(10 + c, ", ").concat(10 + c, "\n          ")
      }, null), l("polyline", {
        class: [t.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(16 + c, ", ").concat(16 + c, " \n            ").concat(a.value - 10 - c, ", ").concat(16 + c, " \n            ").concat(a.value - 10 - c, ", ").concat(s.value - 10 - e.offsetY - c, " \n            ").concat(16 + c, ", ").concat(s.value - 10 - e.offsetY - c, " \n            ").concat(16 + c, ", ").concat(16 + c, "\n          ")
      }, null), l("polyline", {
        class: [t.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(22 + c, ", ").concat(22 + c, " \n            ").concat(a.value - 4 - c, ", ").concat(22 + c, " \n            ").concat(a.value - 4 - c, ", ").concat(s.value - 4 - e.offsetY - c, " \n            ").concat(22 + c, ", ").concat(s.value - 4 - e.offsetY - c, " \n            ").concat(22 + c, ", ").concat(22 + c, "\n          ")
      }, null)]);
    }, h = () => {
      T(() => {
        const f = o.value;
        f && (a.value = f.clientWidth, s.value = f.clientHeight);
      });
    };
    return z(() => {
      h(), j(o.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", h);
    }), {
      ns: t,
      customDv3: o,
      renderBorder: y
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv3",
      class: [this.ns.b(), this.ns.is("style-3", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), bl = P(We, function(e) {
  e.component(We.name, We);
}), Te = /* @__PURE__ */ x({
  name: "CustomDV4",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = g([]);
    let r, d;
    const y = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), h = () => new Promise(($) => {
      T(() => {
        const p = a.value;
        n.value = p ? p.offsetWidth : 0, o.value = p ? p.offsetHeight : 0, p ? (!n.value || !o.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), $();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const $ = a.value;
      d = le($, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), s.value = [E() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      s.value = [];
      const $ = [E() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          s.value[p] = e.color[p];
        s.value.length < 2 && s.value.push("rgba(0,0,255,0.7)");
      } else
        s.value = $;
    };
    W(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const $ = n.value - e.offsetX, p = o.value - e.offsetY, i = 8;
      return l("svg", {
        class: [t.e("svg-container"), {
          [t.e("de-reverse")]: e.reverse
        }],
        width: $,
        height: Math.max(p, 0),
        style: "--ibiz-style-4-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(n.value - 15 - i, ", ").concat(22 + i, " \n            ").concat(170 - i, ", ").concat(22 + i, " \n            ").concat(150 - i, ", ").concat(7 + i, " \n            ").concat(40 - i, ", ").concat(7 + i, " \n            ").concat(40 - i, ", ").concat(28 + i, " \n            ").concat(21 - i, ", ").concat(32 + i, " \n            ").concat(16 - i, ", ").concat(42 + i, " \n            ").concat(16 - i, ", ").concat(o.value - 32 - e.offsetY + i, " \n            ").concat(41 - i, ", ").concat(o.value - 7 - e.offsetY + i, " \n            ").concat(n.value - 15 - i, ", ").concat(o.value - 7 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-1",
        stroke: s.value[0],
        points: "\n            ".concat(145 - i, ", ").concat(o.value - 5 - e.offsetY + i, " \n            ").concat(40 - i, ", ").concat(o.value - 5 - e.offsetY + i, " \n            ").concat(10 - i, ", ").concat(o.value - 35 - e.offsetY + i, " \n            ").concat(10 - i, ", ").concat(40 + i, " \n            ").concat(40 - i, ", ").concat(5 + i, " \n            ").concat(150 - i, ", ").concat(5 + i, " \n            ").concat(170 - i, ", ").concat(20 + i, " \n            ").concat(n.value - 15 - i, ", ").concat(20 + i, "\n          ")
      }, null), l("polyline", {
        stroke: s.value[1],
        class: "dv-bb4-line-2",
        points: "\n            ".concat(245 - i, ", ").concat(o.value - 1 - e.offsetY + i, " \n            ").concat(36 - i, ", ").concat(o.value - 1 - e.offsetY + i, " \n            ").concat(14 - i, ", ").concat(o.value - 23 - e.offsetY + i, " \n            ").concat(14 - i, ", ").concat(o.value - 100 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-3",
        stroke: s.value[0],
        points: "\n            ".concat(7 - i, ", ").concat(o.value - 40 - e.offsetY + i, " \n            ").concat(7 - i, ", ").concat(o.value - 75 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-4",
        stroke: s.value[0],
        points: "\n            ".concat(28 - i, ", ").concat(24 + i, " \n            ").concat(13 - i, ", ").concat(41 + i, " \n            ").concat(13 - i, ", ").concat(64 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-5",
        stroke: s.value[0],
        points: "\n            ".concat(5 - i, ", ").concat(45 + i, " \n            ").concat(5 - i, ", ").concat(140 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-6",
        stroke: s.value[1],
        points: "\n            ".concat(14 - i, ", ").concat(75 + i, " \n            ").concat(14 - i, ", ").concat(100 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-7",
        stroke: s.value[1],
        points: "\n            ".concat(55 - i, ", ").concat(11 + i, " \n            ").concat(147 - i, ", ").concat(11 + i, " \n            ").concat(167 - i, ", ").concat(26 + i, " \n            ").concat(250 - i, ", ").concat(26 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-8",
        stroke: s.value[1],
        points: "\n            ".concat(158 - i, ", ").concat(5 + i, " \n            ").concat(173 - i, ", ").concat(16 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-9",
        stroke: s.value[0],
        points: "\n            ".concat(200 - i, ", ").concat(17 + i, " \n            ").concat(n.value - 10 - i, ", ").concat(17 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-10",
        stroke: s.value[1],
        points: "\n            ".concat(385 - i, ", ").concat(17 + i, " \n            ").concat(n.value - 10 - i, ", ").concat(17 + i, "\n          ")
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const $ = F();
      $ && typeof $.afterAutoResizeMixinInit == "function" && $.afterAutoResizeMixinInit();
    };
    return z(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: t,
      myElement: a
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-4", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), yl = P(Te, function(e) {
  e.component(Te.name, Te);
}), Ae = /* @__PURE__ */ x({
  name: "CustomDV5",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = g([]);
    let r, d;
    const y = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), h = () => new Promise(($) => {
      T(() => {
        const p = a.value;
        n.value = p ? p.offsetWidth : 0, o.value = p ? p.offsetHeight : 0, p ? (!n.value || !o.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), $();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const $ = a.value;
      d = le($, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), s.value = [E() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      s.value = [];
      const $ = [E() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          s.value[p] = e.color[p];
        s.value.length < 2 && s.value.push("rgba(0,0,255,0.7)");
      } else
        s.value = $;
    };
    W(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const $ = n.value - e.offsetX, p = o.value - e.offsetY, i = 8;
      return l("svg", {
        class: [t.e("svg-container"), {
          [t.e("de-reverse")]: e.reverse
        }],
        width: $,
        height: Math.max(p, 0),
        style: "--ibiz-style-5-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(10 + i, ", ").concat(22 + i, " \n            ").concat(n.value - 22 - i, ", ").concat(22 + i, " \n            ").concat(n.value - 22 - i, ", ").concat(o.value - 86 - e.offsetY + i, " \n            ").concat(n.value - 84 - i, ", ").concat(o.value - 24 - e.offsetY + i, " \n            ").concat(10 + i, ", ").concat(o.value - 24 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-1",
        stroke: s.value[0],
        points: "\n            ".concat(8 + i, ", ").concat(5 + i, " \n            ").concat(n.value - 5 - i, ", ").concat(5 + i, " \n            ").concat(n.value - 5 - i, ", ").concat(o.value - 100 - i, " \n            ").concat(n.value - 100 - i, ", ").concat(o.value - 5 - e.offsetY - i, " \n            ").concat(8 + i, ", ").concat(o.value - 5 - e.offsetY - i, " \n            ").concat(8 + i, ", ").concat(5 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-2",
        stroke: s.value[1],
        points: "\n            ".concat(3 + i, ", ").concat(5 + i, " \n            ").concat(n.value - 20 - i, ", ").concat(5 + i, " \n            ").concat(n.value - 20 - i, ", ").concat(o.value - 60 - e.offsetY - i, " \n            ").concat(n.value - 74 - i, ", ").concat(o.value - 5 - e.offsetY - i, " \n            ").concat(3 + i, ", ").concat(o.value - 5 - e.offsetY - i, " \n            ").concat(3 + i, ", ").concat(5 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-3",
        stroke: s.value[1],
        points: "\n            ".concat(50 + i, ", ").concat(13 + i, " \n            ").concat(n.value - 35 - i, ", ").concat(13 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-4",
        stroke: s.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(20 + i, " \n            ").concat(n.value - 35 - i, ", ").concat(20 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-5",
        stroke: s.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(o.value - 20 - e.offsetY - i, " \n            ").concat(n.value - 110 - i, ", ").concat(o.value - 20 - e.offsetY - i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-6",
        stroke: s.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(o.value - 13 - e.offsetY - i, " \n            ").concat(n.value - 110 - i, ", ").concat(o.value - 13 - e.offsetY - i, "\n          ")
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const $ = F();
      $ && typeof $.afterAutoResizeMixinInit == "function" && $.afterAutoResizeMixinInit();
    };
    return z(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: t,
      myElement: a
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-5", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), pl = P(Ae, function(e) {
  e.component(Ae.name, Ae);
}), Oe = /* @__PURE__ */ x({
  name: "CustomDV6",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = g([]);
    let r, d;
    const y = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), h = () => new Promise(($) => {
      T(() => {
        const p = a.value;
        n.value = p ? p.offsetWidth : 0, o.value = p ? p.offsetHeight : 0, p ? (!n.value || !o.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), $();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const $ = a.value;
      d = le($, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), s.value = [E() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      s.value = [];
      const $ = [E() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          s.value[p] = e.color[p];
        s.value.length < 2 && s.value.push("rgba(0,0,255,0.7)");
      } else
        s.value = $;
    };
    W(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const $ = n.value - e.offsetX, p = o.value - e.offsetY, i = 8;
      return l("svg", {
        class: [t.e("svg-container"), {
          [t.e("de-reverse")]: e.reverse
        }],
        width: $,
        height: Math.max(p, 0),
        style: "--ibiz-style-6-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(9 + i, ", ").concat(7 + i, " \n            ").concat($ - 9 - i, ", ").concat(7 + i, " \n            ").concat($ - 9 - i, ", ").concat(p - 7 - i, " \n            ").concat(9 + i, ", ").concat(p - 7 - i, "\n          ")
      }, null), l("circle", {
        fill: s.value[1],
        cx: 5 + i,
        cy: 5 + i,
        r: 2
      }, null), l("circle", {
        fill: s.value[1],
        cx: $ - 5 - i,
        cy: 5 + i,
        r: 2
      }, null), l("circle", {
        fill: s.value[1],
        cx: $ - 5 - i,
        cy: p - 5 - i,
        r: 2
      }, null), l("circle", {
        fill: s.value[1],
        cx: 5 + i,
        cy: p - 5 - i,
        r: 2
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(10 + i, ", 4 ").concat($ - 10 - i, ", 4")
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(10 + i, ", ").concat(p - 4 - i, " ").concat($ - 10 - i, ", ").concat(p - 4 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(5 + i, ", 70 ").concat(5 + i, ", ").concat(p - 70 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat($ - 5 - i, ", 70 ").concat($ - 5 - i, ", ").concat(p - 70 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(3 + i, ", 10 ").concat(3 + i, ", 50")
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(7 + i, ", 30 ").concat(7 + i, ", 80")
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat($ - 3 - i, ", 10 ").concat($ - 3 - i, ", 50")
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat($ - 7 - i, ", 30 ").concat($ - 7 - i, ", 80")
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(3 + i, ", ").concat(p - 10 - i, " ").concat(3 + i, ", ").concat(p - 50 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat(7 + i, ", ").concat(p - 30 - i, " ").concat(7 + i, ", ").concat(p - 80 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat($ - 3 - i, ", ").concat(p - 10 - i, " ").concat($ - 3 - i, ", ").concat(p - 50 - i)
      }, null), l("polyline", {
        stroke: s.value[0],
        points: " ".concat($ - 7 - i, ", ").concat(p - 30 - i, " ").concat($ - 7 - i, ", ").concat(p - 80 - i)
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const $ = F();
      $ && typeof $.afterAutoResizeMixinInit == "function" && $.afterAutoResizeMixinInit();
    };
    return z(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: t,
      myElement: a
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-6", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), wl = P(Oe, function(e) {
  e.component(Oe.name, Oe);
}), Ye = /* @__PURE__ */ x({
  name: "CustomDV7",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = "var(--ibiz-screen-dashboard-border-color)";
    let r, d;
    const y = () => {
      const u = a.value;
      u && (n.value = u ? u.offsetWidth : 0, o.value = u ? u.offsetHeight : 0);
    }, h = () => {
      r = Xt(y, 100);
    }, f = () => {
      const u = a.value;
      d = le(u, r), window.addEventListener("resize", r);
    }, b = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, c = () => {
      const u = n.value - e.offsetX, m = o.value - e.offsetY, $ = 8, p = 25, i = 10;
      return l("svg", {
        class: [t.e("svg-container")],
        width: u,
        height: Math.max(m, 0),
        style: "--ibiz-style-7-offsetY:".concat(e.offsetY, "px")
      }, [l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: s,
        points: "".concat($, ", ").concat($ + p, " ").concat($, ", ").concat($, " ").concat($ + p, ", ").concat($)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: s,
        points: "".concat(u - p - $, ", ").concat($, " ").concat(u - $, ", ").concat($, " ").concat(u - $, ", ").concat($ + p)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: s,
        points: "".concat(u - p - $, ", ").concat(m - $, " ").concat(u - $, ", ").concat(m - $, " ").concat(u - $, ", ").concat(m - p - $)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: s,
        points: "".concat($, ", ").concat(m - p - $, " ").concat($, ", ").concat(m - $, " ").concat(p + $, ", ").concat(m - $)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: s,
        points: "".concat($, ", ").concat(i + $, " ").concat($, ", ").concat($, " ").concat(i + $, ", ").concat($)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: s,
        points: "".concat(u - i - $, ", ").concat($, " ").concat(u - $, ", ").concat($, " ").concat(u - $, ", ").concat(i + $)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: s,
        points: "".concat(u - i - $, ", ").concat(m - $, " ").concat(u - $, ", ").concat(m - $, " ").concat(u - $, ", ").concat(m - i - $)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: s,
        points: "".concat($, ", ").concat(m - i - $, " ").concat($, ", ").concat(m - $, " ").concat($ + i, ", ").concat(m - $)
      }, null)]);
    }, v = async () => {
      await y(), h(), f();
      const u = F();
      u && typeof u.afterAutoResizeMixinInit == "function" && u.afterAutoResizeMixinInit();
    };
    return z(() => {
      v();
    }), q(() => {
      b();
    }), {
      renderBorder: c,
      ns: t,
      myElement: a,
      mergedColor: s
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-7", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), Cl = P(Ye, function(e) {
  e.component(Ye.name, Ye);
}), Ve = /* @__PURE__ */ x({
  name: "CustomDV8",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    dur: {
      // 单次动画时长，单位秒，默认为3秒
      type: Number,
      default: 3
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = g([]);
    let r, d;
    const y = te(), h = "border-box-8-path-".concat(y), f = "border-box-8-gradient-".concat(y), b = "border-box-8-mask-".concat(y), c = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), v = I(() => (n.value + o.value - e.offsetY - 5) * 2), u = (R) => e.reverse ? "M ".concat(0.5 + R, ",").concat(0.5 + R, " L ").concat(0.5 + R, ",").concat(o.value - 0.5 - e.offsetY - R, " L ").concat(n.value - 0.5 - R, ",").concat(o.value - 0.5 - e.offsetY - R, " L ").concat(n.value - 0.5 - R, ",").concat(0.5 + R, " Z") : "M ".concat(0.5 + R, ",").concat(0.5 + R, " L ").concat(n.value - 0.5 - R, ",").concat(0.5 + R, " L ").concat(n.value - 0.5 - R, ",").concat(o.value - 0.5 - e.offsetY - R, " L ").concat(0.5 + R, ",").concat(o.value - 0.5 - e.offsetY - R, " Z"), m = () => new Promise((R) => {
      T(() => {
        const w = a.value;
        n.value = w ? w.offsetWidth : 0, o.value = w ? w.offsetHeight : 0, w ? (!n.value || !o.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), R();
      });
    }), $ = () => {
      r = oe(100, m, F(), null);
    }, p = () => {
      const R = a.value;
      d = le(R, r), window.addEventListener("resize", r);
    }, i = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, L = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), s.value = [E() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      s.value = [];
      const R = [E() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let w = 0; w < e.color.length; w++)
          s.value[w] = e.color[w];
        s.value.length < 2 && s.value.push("rgba(0,0,255,0.7)");
      } else
        s.value = R;
    };
    W(() => e.color, () => {
      L();
    }, {
      deep: !0,
      immediate: !0
    });
    const C = () => {
      const R = n.value - e.offsetX, w = o.value - e.offsetY, k = 8;
      return l("svg", {
        class: [t.e("svg-container")],
        width: R,
        height: Math.max(w, 0),
        style: "--ibiz-style-8-offsetY:".concat(e.offsetY, "px")
      }, [l("defs", null, [l("path", {
        id: h,
        d: u(k),
        fill: "transparent"
      }, null), l("radialGradient", {
        id: f,
        cx: "50%",
        cy: "50%",
        r: "50%"
      }, [l("stop", {
        offset: "0%",
        "stop-color": "#fff",
        "stop-opacity": "1"
      }, null), l("stop", {
        offset: "100%",
        "stop-color": "#fff",
        "stop-opacity": "0"
      }, null)]), l("mask", {
        id: b
      }, [l("path", {
        id: "myPath",
        d: u(k),
        stroke: "black",
        fill: "none"
      }, null), l("circle", {
        cx: "0",
        cy: "0",
        r: "150",
        fill: "url(#".concat(f, ")")
      }, [l("animateMotion", {
        dur: "".concat(e.dur, "s"),
        rotate: "auto",
        repeatCount: "indefinite"
      }, [l("mpath", {
        href: "#myPath"
      }, null)])])])]), l("polygon", {
        fill: c,
        points: "0, ".concat(k, " ").concat(n.value, ", ").concat(k, " ").concat(n.value, ", ").concat(o.value - e.offsetY - k, " 0, ").concat(o.value - e.offsetY - k)
      }, null), l("use", {
        stroke: s.value[0],
        "stroke-width": "1",
        "xlink:href": "#".concat(h)
      }, null), l("use", {
        stroke: s.value[1],
        "stroke-width": "3",
        "xlink:href": "#".concat(h),
        mask: "url(#".concat(b, ")")
      }, [l("animate", {
        attributeName: "stroke-dasharray",
        from: "0, ".concat(v.value),
        to: "".concat(v.value, ", 0"),
        dur: "".concat(e.dur, "s"),
        repeatCount: "indefinite"
      }, null)])]);
    }, H = async () => {
      await m(), $(), p();
      const R = F();
      R && typeof R.afterAutoResizeMixinInit == "function" && R.afterAutoResizeMixinInit();
    };
    return z(() => {
      L(), H();
    }), q(() => {
      i();
    }), {
      renderBorder: C,
      ns: t,
      myElement: a
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-8", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), Dl = P(Ve, function(e) {
  e.component(Ve.name, Ve);
}), He = /* @__PURE__ */ x({
  name: "CustomDV9",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = te(), o = g("border-box-9-gradient-".concat(n)), a = g("border-box-9-mask-".concat(n)), s = [E() || "#0095ee", "#95d8f8"], r = g(), d = g(0), y = g(0), h = I(() => V(s, e.color || [])), f = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), b = () => {
      const v = d.value - e.offsetX, u = y.value - e.offsetY, m = 8;
      return l("svg", {
        class: [t.em("border-svg", "container")],
        width: v,
        height: Math.max(u, 0),
        style: "--ibiz-style-9-offsetY:".concat(e.offsetY, "px")
      }, [l("defs", null, [l("linearGradient", {
        id: o.value,
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "100%"
      }, [l("animate", {
        attributeName: "x1",
        values: "0%;100%;0%",
        dur: "10s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "x2",
        values: "100%;0%;100%",
        dur: "10s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null), l("stop", {
        offset: "0%",
        "stop-color": h.value[0]
      }, [l("animate", {
        attributeName: "stop-color",
        values: "".concat(h.value[0], ";").concat(h.value[1], ";").concat(h.value[0]),
        dur: "10s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("stop", {
        offset: "100%",
        "stop-color": h.value[1]
      }, [l("animate", {
        attributeName: "stop-color",
        values: "".concat(h.value[1], ";").concat(h.value[0], ";").concat(h.value[1]),
        dur: "10s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)])]), l("mask", {
        id: a.value
      }, [l("polyline", {
        stroke: "#fff",
        "stroke-width": "3",
        fill: "transparent",
        points: "".concat(8 + m, ", ").concat(u * 0.4 + m, " ").concat(8 + m, ", ").concat(3 + m, ", ").concat(d.value * 0.4 + 7 + m, ", ").concat(3 + m)
      }, null), l("polyline", {
        fill: "#fff",
        points: "".concat(8 + m, ", ").concat(u * 0.15 + m, " ").concat(8 + m, ", ").concat(3 + m, ", ").concat(d.value * 0.1 + 7 + m, ", ").concat(3 + m, "\n              ").concat(d.value * 0.1 + m, ", ").concat(8 + m, " ").concat(14 + m, ", ").concat(8 + m, " ").concat(14 + m, ", ").concat(u * 0.15 - 7 + m, "\n            ")
      }, null), l("polyline", {
        stroke: "#fff",
        "stroke-width": "3",
        fill: "transparent",
        points: "".concat(d.value * 0.5 - m, ", ").concat(3 + m, " ").concat(d.value - 3 - m, ", ").concat(3 + m, ", ").concat(d.value - 3 - m, ", ").concat(u * 0.25 + m)
      }, null), l("polyline", {
        fill: "#fff",
        points: "\n              ".concat(d.value * 0.52, ", ").concat(3 + m, " ").concat(d.value * 0.58, ", ").concat(3 + m, "\n              ").concat(d.value * 0.58 - 7, ", ").concat(9 + m, " ").concat(d.value * 0.52 + 7, ", ").concat(9 + m, "\n            ")
      }, null), l("polyline", {
        fill: "#fff",
        points: "\n              ".concat(d.value * 0.9 - m, ", ").concat(3 + m, " \n              ").concat(d.value - 3 - m, ", ").concat(3 + m, " \n              ").concat(d.value - 3 - m, ", ").concat(u * 0.1 + m, "\n              ").concat(d.value - 9 - m, ", ").concat(u * 0.1 - 7 + m, "\n               ").concat(d.value - 9 - m, ", ").concat(9 + m, "\n                ").concat(d.value * 0.9 + 7 - m, ", ").concat(9 + m, "\n            ")
      }, null), l("polyline", {
        stroke: "#fff",
        "stroke-width": "3",
        fill: "transparent",
        points: "".concat(8 + m, ", ").concat(u * 0.5, " ").concat(8 + m, ", ").concat(u - 3 - m, " ").concat(d.value * 0.3 + 7, ", ").concat(u - 3 - m)
      }, null), l("polyline", {
        fill: "#fff",
        points: "\n              ".concat(8 + m, ", ").concat(u * 0.55, " ").concat(8 + m, ", ").concat(u * 0.7, "\n              ").concat(2 + m, ", ").concat(u * 0.7 - 7, " ").concat(2 + m, ", ").concat(u * 0.55 + 7, "\n            ")
      }, null), l("polyline", {
        stroke: "#fff",
        "stroke-width": "3",
        fill: "transparent",
        points: "".concat(d.value * 0.35 - m, ", ").concat(u - 3 - m, " ").concat(d.value - 3 - m, ", ").concat(u - 3 - m, " ").concat(d.value - 3 - m, ", ").concat(u * 0.35 - m)
      }, null), l("polyline", {
        fill: "#fff",
        points: "\n              ".concat(d.value * 0.92 - m, ", ").concat(u - 3 - m, "\n               ").concat(d.value - 3 - m, ", ").concat(u - 3 - m, " ").concat(d.value - 3 - m, ", ").concat(u * 0.8 - m, "\n              ").concat(d.value - 9 - m, ", ").concat(u * 0.8 + 7 - m, " ").concat(d.value - 9 - m, ", ").concat(u - 9 - m, " ").concat(d.value * 0.92 + 7 - m, ", ").concat(u - 9 - m, "\n            ")
      }, null)])]), l("polygon", {
        fill: f,
        points: "\n        15, 9 ".concat(d.value * 0.1 + 1, ", 9 ").concat(d.value * 0.1 + 4, ", 6 ").concat(d.value * 0.52 + 2, ", 6\n        ").concat(d.value * 0.52 + 6, ", 10 ").concat(d.value * 0.58 - 7, ", 10 ").concat(d.value * 0.58 - 2, ", 6\n        ").concat(d.value * 0.9 + 2, ", 6 ").concat(d.value * 0.9 + 6, ", 10 ").concat(d.value - 10, ", 10 ").concat(d.value - 10, ", ").concat(u * 0.1 - 6, "\n        ").concat(d.value - 6, ", ").concat(u * 0.1 - 1, " ").concat(d.value - 6, ", ").concat(u * 0.8 + 1, " ").concat(d.value - 10, ", ").concat(u * 0.8 + 6, "\n        ").concat(d.value - 10, ", ").concat(u - 10, " ").concat(d.value * 0.92 + 7, ", ").concat(u - 10, "  ").concat(d.value * 0.92 + 2, ", ").concat(u - 6, "\n        11, ").concat(u - 6, " 11, ").concat(u * 0.15 - 2, " 15, ").concat(u * 0.15 - 7, "\n      ")
      }, null), l("rect", {
        x: "0",
        y: "0",
        width: d.value,
        height: Math.max(u, 0),
        fill: "url(#".concat(o.value, ")"),
        mask: "url(#".concat(a.value, ")")
      }, null)]);
    }, c = () => {
      T(() => {
        const v = r.value;
        v && (d.value = v.clientWidth, y.value = v.clientHeight);
      });
    };
    return z(() => {
      c(), j(r.value, c), window.addEventListener("resize", c);
    }), Y(() => {
      _(r.value), window.removeEventListener("resize", c);
    }), {
      ns: t,
      customDv9: r,
      renderBorder: b
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv9",
      class: [this.ns.b(), this.ns.is("style-9", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), Sl = P(He, function(e) {
  e.component(He.name, He);
}), Fe = /* @__PURE__ */ x({
  name: "CustomDV10",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = ["left-top", "right-top", "left-bottom", "right-bottom"], o = [E() || "#0095ee", "#95d8f8"], a = g(), s = g(0), r = g(0), d = I(() => V(o, e.color || [])), y = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), h = g(e.offsetY), f = g(8), b = () => l("div", {
      class: [t.e("border-box")]
    }, [n.map((v) => l("svg", {
      width: "150px",
      height: "".concat(150 - e.offsetY / 2, "px"),
      key: v,
      class: [t.e(v), t.em("border-svg", "container")]
    }, [l("polygon", {
      fill: d.value[1],
      points: "\n               ".concat(40 + f.value, ", ").concat(0 + f.value, " \n               ").concat(5 + f.value, ", ").concat(0 + f.value, " \n               ").concat(0 + f.value, ", ").concat(5 + f.value, " \n               ").concat(0 + f.value, ", ").concat(16 + f.value, " \n               ").concat(3 + f.value, ", ").concat(19 + f.value, " \n               ").concat(3 + f.value, ", ").concat(7 + f.value, " \n               ").concat(7 + f.value, ", ").concat(3 + f.value, " \n               ").concat(35 + f.value, ", ").concat(3 + f.value, "\n             ")
    }, null)]))]), c = () => {
      T(() => {
        const v = a.value;
        v && (s.value = v.clientWidth, r.value = v.clientHeight);
      });
    };
    return z(() => {
      c(), j(a.value, c), window.addEventListener("resize", c);
    }), Y(() => {
      _(a.value), window.removeEventListener("resize", c);
    }), {
      ns: t,
      customDv10: a,
      mergedColor: d,
      renderBorder: b,
      backgroundColor: y,
      padding: f,
      offsety: h
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv10",
      class: [this.ns.b(), this.ns.is("style-10", !0)],
      style: "--ibiz-style-10-offsetY:".concat(this.offsety, "px;--ibiz-style-10-padding:").concat(this.padding, "px")
    }, [l("div", {
      class: this.ns.e("wrapper")
    }, [this.renderBorder()]), l("div", {
      class: this.ns.e("mask"),
      style: "box-shadow: inset 0 0 25px 3px ".concat(this.mergedColor[0], ";background-color: ").concat(this.backgroundColor, ";")
    }, null), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), kl = P(Fe, function(e) {
  e.component(Fe.name, Fe);
}), Ge = /* @__PURE__ */ x({
  name: "CustomDV11",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    },
    titleWidth: {
      type: Number,
      default: 250
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = M("custom-border"), n = te(), o = [E() || "#0095ee", "#95d8f8"], a = g("".concat(t.b(), "-filterId-").concat(n)), s = g(), r = g(0), d = g(0), y = I(() => V(o, e.color || [])), h = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), f = () => {
      const c = r.value - e.offsetX, v = d.value - e.offsetY, u = 8;
      return l("svg", {
        class: [t.em("border-svg", "container")],
        width: c,
        height: Math.max(v, 0)
      }, [l("defs", null, [l("filter", {
        id: a.value,
        height: "150%",
        width: "150%",
        x: "-25%",
        y: "-25%"
      }, [l("feMorphology", {
        operator: "dilate",
        radius: "2",
        in: "SourceAlpha",
        result: "thicken"
      }, null), l("feGaussianBlur", {
        in: "thicken",
        stdDeviation: "3",
        result: "blurred"
      }, null), l("feFlood", {
        "flood-color": y.value[1],
        result: "glowColor"
      }, null), l("feComposite", {
        in: "glowColor",
        in2: "blurred",
        operator: "in",
        result: "softGlowColored"
      }, null), l("feMerge", null, [l("feMergeNode", {
        in: "softGlowColored"
      }, null), l("feMergeNode", {
        in: "SourceGraphic"
      }, null)])])]), l("polygon", {
        fill: h,
        points: "\n        20, 32 ".concat(r.value * 0.5 - e.titleWidth / 2, ", 32 ").concat(r.value * 0.5 - e.titleWidth / 2 + 20, ", 53\n        ").concat(r.value * 0.5 + e.titleWidth / 2 - 20, ", 53 ").concat(r.value * 0.5 + e.titleWidth / 2, ", 32\n        ").concat(r.value - 20, ", 32 ").concat(r.value - 8, ", 48 ").concat(r.value - 8, ", ").concat(d.value - 25, " ").concat(r.value - 20, ", ").concat(d.value - 8, "\n        20, ").concat(d.value - 8, " 8, ").concat(d.value - 25, " 8, 50\n      ")
      }, null), l("polyline", {
        stroke: y.value[0],
        filter: "url(#".concat(a.value, ")"),
        points: "\n    ".concat((r.value - e.titleWidth) / 2 + u, ", ").concat(30 + u, "\n    ").concat(20 + u, ", ").concat(30 + u, "\n    ").concat(7 + u, ", ").concat(50 + u, " \n    ").concat(7 + u, ", ").concat(50 + (d.value - 167) / 2 + u, "\n    ").concat(13 + u, ", ").concat(55 + (d.value - 167) / 2 + u, "\n    ").concat(13 + u, ", ").concat(135 + (d.value - 167) / 2 + u, "\n    ").concat(7 + u, ", ").concat(140 + (d.value - 167) / 2 + u, " \n    ").concat(7 + u, ", ").concat(d.value - 27 - u, "\n    ").concat(20 + u, ", ").concat(d.value - 7 - u, " \n    ").concat(r.value - 20 - u, ", ").concat(d.value - 7 - u, " \n    ").concat(r.value - 7 - u, ", ").concat(d.value - 27 - u, "\n    ").concat(r.value - 7 - u, ", ").concat(140 + (d.value - 167) / 2 + u, " \n    ").concat(r.value - 13 - u, ", ").concat(135 + (d.value - 167) / 2 + u, "\n    ").concat(r.value - 13 - u, ", ").concat(55 + (d.value - 167) / 2 + u, " \n    ").concat(r.value - 7 - u, ", ").concat(50 + (d.value - 167) / 2 + u, "\n    ").concat(r.value - 7 - u, ", ").concat(50 + u, "  ").concat(r.value - 20 - u, ",  ").concat(30 + u, " \n     ").concat((r.value + e.titleWidth) / 2, ", ").concat(30 + u, "\n     ").concat((r.value + e.titleWidth) / 2 - 20, ", ").concat(7 + u, " \n     ").concat((r.value - e.titleWidth) / 2 + 20, ", ").concat(7 + u, " \n     ").concat((r.value - e.titleWidth) / 2, ", ").concat(30 + u, "\n     ").concat((r.value - e.titleWidth) / 2 + 20, ", ").concat(52 + u, " \n     ").concat((r.value + e.titleWidth) / 2 - 20, ", ").concat(52 + u, " \n     ").concat((r.value + e.titleWidth) / 2, ", ").concat(30 + u, "\n          \n          ")
      }, null), l("polygon", {
        stroke: y.value[0],
        fill: "transparent",
        points: "\n          ".concat((r.value + e.titleWidth) / 2 - 5, ", ").concat(30 + u, " ").concat((r.value + e.titleWidth) / 2 - 21, ", ").concat(11 + u, "\n          ").concat((r.value + e.titleWidth) / 2 - 27, ", ").concat(11 + u, " ").concat((r.value + e.titleWidth) / 2 - 8, ", ").concat(34 + u, "\n        ")
      }, null), l("polygon", {
        stroke: y.value[0],
        fill: "transparent",
        points: "\n          ".concat((r.value - e.titleWidth) / 2 + 5, ", ").concat(30 + u, " ").concat((r.value - e.titleWidth) / 2 + 22, ", ").concat(49 + u, "\n          ").concat((r.value - e.titleWidth) / 2 + 28, ", ").concat(49 + u, " ").concat((r.value - e.titleWidth) / 2 + 8, ", ").concat(26 + u, "\n        ")
      }, null), l("polygon", {
        stroke: y.value[0],
        fill: X(y.value[1] || o[1], 30) || "",
        filter: "url(#".concat(a.value, ")"),
        points: "\n        ".concat((r.value + e.titleWidth) / 2 - 11, ", ").concat(37 + u, " ").concat((r.value + e.titleWidth) / 2 - 32, ", ").concat(11 + u, "\n        ").concat((r.value - e.titleWidth) / 2 + 23, ", ").concat(11 + u, " ").concat((r.value - e.titleWidth) / 2 + 11, ", ").concat(23 + u, "\n        ").concat((r.value - e.titleWidth) / 2 + 33, ", ").concat(49 + u, " ").concat((r.value + e.titleWidth) / 2 - 22, ", ").concat(49 + u, "\n      ")
      }, null), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "1",
        points: "\n          ".concat((r.value - e.titleWidth) / 2 - 10, ", ").concat(37 + u, " ").concat((r.value - e.titleWidth) / 2 - 31, ", ").concat(37 + u, "\n          ").concat((r.value - e.titleWidth) / 2 - 25, ", ").concat(46 + u, " ").concat((r.value - e.titleWidth) / 2 - 4, ", ").concat(46 + u, "\n        ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "1;0.7;1",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "0.7",
        points: "\n          ".concat((r.value - e.titleWidth) / 2 - 40, ", ").concat(37 + u, " ").concat((r.value - e.titleWidth) / 2 - 61, ", ").concat(37 + u, "\n          ").concat((r.value - e.titleWidth) / 2 - 55, ", ").concat(46 + u, " ").concat((r.value - e.titleWidth) / 2 - 34, ", ").concat(46 + u, "\n        ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "0.7;0.4;0.7",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "0.5",
        points: "\n          ".concat((r.value - e.titleWidth) / 2 - 70, ", ").concat(37 + u, " ").concat((r.value - e.titleWidth) / 2 - 91, ", ").concat(37 + u, "\n          ").concat((r.value - e.titleWidth) / 2 - 85, ", ").concat(46 + u, " ").concat((r.value - e.titleWidth) / 2 - 64, ", ").concat(46 + u, "\n        ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "0.5;0.2;0.5",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "1",
        points: "\n          ".concat((r.value + e.titleWidth) / 2 + 30, ", ").concat(37 + u, " ").concat((r.value + e.titleWidth) / 2 + 9, ", ").concat(37 + u, "\n          ").concat((r.value + e.titleWidth) / 2 + 3, ", ").concat(46 + u, " ").concat((r.value + e.titleWidth) / 2 + 24, ", ").concat(46 + u, "\n        ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "1;0.7;1",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "0.7",
        points: "\n          ".concat((r.value + e.titleWidth) / 2 + 60, ", ").concat(37 + u, " ").concat((r.value + e.titleWidth) / 2 + 39, ", ").concat(37 + u, "\n          ").concat((r.value + e.titleWidth) / 2 + 33, ", ").concat(46 + u, " ").concat((r.value + e.titleWidth) / 2 + 54, ", ").concat(46 + u, "\n        ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "0.7;0.4;0.7",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("polygon", {
        filter: "url(#".concat(a.value, ")"),
        fill: y.value[0],
        opacity: "0.5",
        points: "\n        ".concat((r.value + e.titleWidth) / 2 + 90, ", ").concat(37 + u, " ").concat((r.value + e.titleWidth) / 2 + 69, ", ").concat(37 + u, "\n        ").concat((r.value + e.titleWidth) / 2 + 63, ", ").concat(46 + u, " ").concat((r.value + e.titleWidth) / 2 + 84, ", ").concat(46 + u, "\n      ")
      }, [l("animate", {
        attributeName: "opacity",
        values: "0.5;0.2;0.5",
        dur: "2s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("text", {
        class: "dv-border-box-11-title",
        x: "".concat(r.value / 2),
        y: "32",
        fill: "#fff",
        "font-size": "18",
        "text-anchor": "middle",
        "dominant-baseline": "middle"
      }, [e.title]), l("polygon", {
        fill: y.value[0],
        filter: "url(#".concat(a.value, ")"),
        points: "\n          ".concat(7 + u, ", ").concat(53 + (d.value - 167) / 2, " ").concat(11 + u, ", ").concat(57 + (d.value - 167) / 2, "\n          ").concat(11 + u, ", ").concat(133 + (d.value - 167) / 2, " ").concat(7 + u, ", ").concat(137 + (d.value - 167) / 2, "\n        ")
      }, null), l("polygon", {
        fill: y.value[0],
        filter: "url(#".concat(a.value, ")"),
        points: "\n          ".concat(r.value - 7 - u, ", ").concat(53 + (d.value - 167) / 2, " ").concat(r.value - 11 - u, ", ").concat(57 + (d.value - 167) / 2, "\n          ").concat(r.value - 11 - u, ", ").concat(133 + (d.value - 167) / 2, " ").concat(r.value - 7 - u, ", ").concat(137 + (d.value - 167) / 2, "\n        ")
      }, null)]);
    }, b = () => {
      T(() => {
        const c = s.value;
        c && (r.value = c.clientWidth, d.value = c.clientHeight);
      });
    };
    return z(() => {
      b(), j(s.value, b), window.addEventListener("resize", b);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", b);
    }), {
      ns: t,
      customDv11: s,
      renderBorder: f
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv11",
      class: [this.ns.b(), this.ns.is("style-11", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), Ll = P(Ge, function(e) {
  e.component(Ge.name, Ge);
}), je = /* @__PURE__ */ x({
  name: "CustomDV12",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = g(0), o = g(0), a = g(), s = g([]);
    let r, d;
    const y = te(), h = "borderr-box-12-filterId-".concat(y), f = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), b = () => new Promise((i) => {
      T(() => {
        const L = a.value;
        n.value = L ? L.offsetWidth : 0, o.value = L ? L.offsetHeight : 0, L ? (!n.value || !o.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), i();
      });
    }), c = () => {
      r = oe(100, b, F(), null);
    }, v = () => {
      const i = a.value;
      d = le(i, r), window.addEventListener("resize", r);
    }, u = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, m = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), s.value = [E() || "#123afc", "#0000FF"];
        return;
      }
      s.value = [];
      const i = [E() || "#123afc", "#0000FF"];
      if (e.color.length > 0) {
        for (let L = 0; L < e.color.length; L++)
          s.value[L] = e.color[L];
        s.value.length < 2 && s.value.push("#0000FF");
      } else
        s.value = i;
    };
    W(() => e.color, () => {
      m();
    }, {
      deep: !0,
      immediate: !0
    });
    const $ = () => {
      const i = n.value - e.offsetX, L = o.value - e.offsetY, C = 8;
      return l("svg", {
        class: [t.e("svg-container")],
        width: i,
        height: Math.max(L, 0),
        style: "--ibiz-style-12-offsetY:".concat(e.offsetY, "px")
      }, [l("defs", null, [l("filter", {
        id: h,
        height: "150%",
        width: "150%",
        x: "-25%",
        y: "-25%"
      }, [l("feMorphology", {
        operator: "dilate",
        radius: "1",
        in: "SourceAlpha",
        result: "thicken"
      }, null), l("feGaussianBlur", {
        in: "thicken",
        stdDeviation: "2",
        result: "blurred"
      }, null), l("feFlood", {
        "flood-color": "rgba(".concat(s.value[1] || e.color[1], ",0.7)"),
        result: "glowColor"
      }, [l("animate", {
        attributeName: "flood-color",
        values: "\n                rgba(".concat(s.value[1] || e.color[1], ",0.7);\n                rgba(").concat(s.value[1] || e.color[1], ",0.3);\n                rgba(").concat(s.value[1] || e.color[1], ",0.7);\n              "),
        dur: "3s",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]), l("feComposite", {
        in: "glowColor",
        in2: "blurred",
        operator: "in",
        result: "softGlowColored"
      }, null), l("feMerge", null, [l("feMergeNode", {
        in: "softGlowColored"
      }, null), l("feMergeNode", {
        in: "SourceGraphic"
      }, null)])])]), i && L ? l("path", {
        fill: f,
        "stroke-width": 2,
        stroke: s.value[0],
        d: "\n        M ".concat(15 + C, " 5 L ").concat(i - 15 - C, " 5 Q ").concat(i - 5 - C, " 5, ").concat(i - 5 - C, " 15\n        L ").concat(i - 5 - C, " ").concat(L - 15 - C, " Q ").concat(i - 5 - C, " ").concat(L - 5 - C, ", ").concat(i - 15 - C, " ").concat(L - 5 - C, "\n        L ").concat(15 + C, ", ").concat(L - 5 - C, " Q ").concat(5 + C, " ").concat(L - 5 - C, " ").concat(5 + C, " ").concat(L - 15 - C, " L ").concat(5 + C, " 15\n        Q ").concat(5 + C, " 5 ").concat(15 + C, " 5\n      ")
      }, null) : null, l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: s.value[1],
        d: "M ".concat(20 + C, " 5 L ").concat(15 + C, " 5 Q ").concat(5 + C, " 5 ").concat(5 + C, " 15 L ").concat(5 + C, " ").concat(L - 5 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: s.value[1],
        d: "M ".concat(i - 20 - C, " 5 L ").concat(i - 15 - C, " 5 Q ").concat(i - 5 - C, " 5 ").concat(i - 5 - C, " 15 L ").concat(i - 5 - C, " ").concat(L - 5 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: s.value[1],
        d: "M ".concat(i - 20 - C, " ").concat(L - 5 - C, " L ").concat(i - 15 - C, " ").concat(L - 5 - C, " Q ").concat(i - 5 - C, " ").concat(L - 5 - C, " ").concat(i - 5 - C, " ").concat(L - 15 - C, " L ").concat(i - 5 - C, " ").concat(L - 20 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: s.value[1],
        d: "M ".concat(20 + C, " ").concat(L - 5 - C, " L ").concat(15 + C, " ").concat(L - 5 - C, " Q ").concat(5 + C, " ").concat(L - 5 - C, " ").concat(5 + C, " ").concat(L - 15 - C, " L ").concat(5 + C, " ").concat(L - 20 - C)
      }, null)]);
    }, p = async () => {
      await b(), c(), v();
      const i = F();
      i && typeof i.afterAutoResizeMixinInit == "function" && i.afterAutoResizeMixinInit();
    };
    return z(() => {
      m(), p();
    }), q(() => {
      u();
    }), {
      renderBorder: $,
      ns: t,
      myElement: a
    };
  },
  render() {
    var e, t;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-12", !0)],
      ref: (n) => {
        this.myElement = n;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), Rl = P(je, function(e) {
  e.component(je.name, je);
}), _e = /* @__PURE__ */ x({
  name: "CustomDV13",
  props: {
    offsetX: {
      style: Number,
      default: 0
    },
    offsetY: {
      style: Number,
      default: 0
    },
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-border"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = I(() => V(n, e.color || [])), d = "var(".concat(t.cssVarName("screen-dashboard-custom-dv-bg"), ")"), y = () => {
      const f = a.value - e.offsetX, b = s.value - e.offsetY, c = 8;
      return l("svg", {
        class: [t.em("border-svg", "container")],
        width: f,
        height: Math.max(b, 0),
        style: "--ibiz-style-13-offsetY:".concat(e.offsetY, "px")
      }, [l("path", {
        fill: d,
        stroke: r.value[0],
        d: "\n            M ".concat(5 + c, " ").concat(20 + c, " L ").concat(5 + c, " ").concat(10 + c, " L ").concat(12 + c, " ").concat(3 + c, " \n            L ").concat(60 - c, " ").concat(3 + c, " L ").concat(68 - c, " ").concat(10 + c, "\n            L ").concat(a.value - 20 - c, " ").concat(10 + c, " L ").concat(a.value - 5 - c, " ").concat(25 + c, "\n            L ").concat(a.value - 5 - c, " ").concat(b - 5 - c, " L ").concat(20 + c, " ").concat(b - 5 - c, "\n            L ").concat(5 + c, " ").concat(b - 20 - c, " L ").concat(5 + c, " ").concat(20 + c, "\n          ")
      }, null), l("path", {
        fill: "transparent",
        "stroke-width": "3",
        "stroke-linecap": "round",
        "stroke-dasharray": "10, 5",
        stroke: r.value[0],
        d: "M ".concat(16 + c, " ").concat(9 + c, " L ").concat(61 - c, " ").concat(9 + c)
      }, null), l("path", {
        fill: "transparent",
        stroke: r.value[1],
        d: "M ".concat(5 + c, " ").concat(20 + c, " L ").concat(5 + c, " ").concat(10 + c, " L ").concat(12 + c, " ").concat(3 + c, " \n            L ").concat(60 - c, " ").concat(3 + c, " L ").concat(68 - c, " ").concat(10 + c)
      }, null), l("path", {
        fill: "transparent",
        stroke: r.value[1],
        d: "M ".concat(a.value - 5 - c, " ").concat(b - 30 - c, " L ").concat(a.value - 5 - c, " ").concat(b - 5 - c, " L ").concat(a.value - 30 - c, " ").concat(b - 5 - c)
      }, null)]);
    }, h = () => {
      T(() => {
        const f = o.value;
        f && (a.value = f.clientWidth, s.value = f.clientHeight);
      });
    };
    return z(() => {
      h(), j(o.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", h);
    }), {
      ns: t,
      customDv13: o,
      renderBorder: y
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDv13",
      class: [this.ns.b(), this.ns.is("style-13", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), xl = P(_e, function(e) {
  e.component(_e.name, _e);
}), Ue = /* @__PURE__ */ x({
  name: "CustomDecoration1",
  props: {
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-decoration-1"), n = g(), o = g([20, 50]), a = g(4), s = g(20), r = g(2.5), d = g(r.value / 2), y = [E() || "#0095ee", "#95d8f8"], h = I(() => V(y, e.color || [])), f = g([]), b = g([]), c = g([1, 1]), v = () => {
      const [R, w] = o.value, k = R / (s.value + 1), S = w / (a.value + 1), N = Array.from({
        length: a.value
      }).fill(0).map((O, G) => Array.from({
        length: s.value
      }).fill(0).map((ne, Q) => [k * (Q + 1), S * (G + 1)]));
      b.value = N.reduce((O, G) => [...O, ...G], []);
    }, u = () => {
      const R = b.value[s.value * 2 - 1], w = b.value[s.value * 2 - 3];
      f.value = [R, w];
    }, m = () => {
      C();
    }, $ = () => {
      C();
    }, {
      width: p,
      height: i
    } = ot(n, m, $), L = () => {
      const [R, w] = o.value;
      c.value = [p.value / R, i.value / w];
    }, C = () => {
      v(), u(), L();
    };
    return {
      ns: t,
      customDecoration1: n,
      renderBorder: () => l("svg", {
        width: "".concat(o.value[0], "px"),
        height: "".concat(o.value[1], "px"),
        style: "transform:scale(".concat(c.value[0], ", ").concat(c.value[1], ");")
      }, [b.value.map((R) => Math.random() > 0.6 ? l("rect", {
        key: R.join(","),
        fill: h.value[0],
        x: R[0] - d.value,
        y: R[1] - d.value,
        width: r.value,
        height: r.value
      }, [Math.random() > 0.6 ? l("animate", {
        attributeName: "fill",
        values: "".concat(h.value[0], ";transparent"),
        dur: "1s",
        begin: Math.random() * 2,
        repeatCount: "indefinite"
      }, null) : null]) : null), f.value[0] ? l("rect", {
        fill: h.value[1],
        x: f.value[0][0] - r.value,
        y: f.value[0][1] - r.value,
        width: r.value * 2,
        height: r.value * 2
      }, [l("animate", {
        attributeName: "width",
        values: "0;".concat(r.value * 2),
        dur: "2s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "height",
        values: "0;".concat(r.value * 2),
        dur: "2s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "x",
        values: "".concat(f.value[0][0], ";").concat(f.value[0][0] - r.value),
        dur: "2s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "y",
        values: "".concat(f.value[0][1], ";").concat(f.value[0][1] - r.value),
        dur: "2s",
        repeatCount: "indefinite"
      }, null)]) : null, f.value[1] ? l("rect", {
        fill: h.value[1],
        x: f.value[1][0] - 40,
        y: f.value[1][1] - r.value,
        width: 40,
        height: r.value * 2
      }, [l("animate", {
        attributeName: "width",
        values: "0;40;0",
        dur: "2s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "x",
        values: "".concat(f.value[1][0], ";").concat(f.value[1][0] - 40, ";").concat(f.value[1][0]),
        dur: "2s",
        repeatCount: "indefinite"
      }, null)]) : null])
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration1",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), Ml = P(
  Ue,
  function(e) {
    e.component(Ue.name, Ue);
  }
), Xe = /* @__PURE__ */ x({
  name: "CustomDecoration2",
  props: {
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    dur: {
      type: Number,
      default: 2
    }
  },
  setup(e) {
    const t = M("custom-decoration-2"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = g(0), d = g(0), y = g(0), h = g(0), f = I(() => V(n, e.color || [])), b = () => {
      e.reverse ? (r.value = 1, d.value = h.value, a.value = y.value / 2, s.value = 0) : (r.value = y.value, d.value = 1, a.value = 0, s.value = h.value / 2);
    };
    W(() => e.reverse, () => {
      b();
    }, {
      immediate: !0
    });
    const c = () => l("svg", {
      width: "".concat(y.value, "px"),
      height: "".concat(h.value, "px")
    }, [l("rect", {
      x: a.value,
      y: s.value,
      width: r.value,
      height: d.value,
      fill: f.value[0]
    }, [l("animate", {
      attributeName: e.reverse ? "height" : "width",
      from: "0",
      to: e.reverse ? h.value : y.value,
      dur: "".concat(e.dur, "s"),
      calcMode: "spline",
      keyTimes: "0;1",
      keySplines: ".42,0,.58,1",
      repeatCount: "indefinite"
    }, null)]), l("rect", {
      x: a.value,
      y: s.value,
      width: "1",
      height: "1",
      fill: f.value[1]
    }, [l("animate", {
      attributeName: e.reverse ? "y" : "x",
      from: "0",
      to: e.reverse ? h.value : y.value,
      dur: "".concat(e.dur, "s"),
      calcMode: "spline",
      keyTimes: "0;1",
      keySplines: "0.42,0,0.58,1",
      repeatCount: "indefinite"
    }, null)])]), v = () => {
      T(() => {
        const u = o.value;
        u && (y.value = u.clientWidth, h.value = u.clientHeight);
      });
    };
    return z(() => {
      v(), j(o.value, v), window.addEventListener("resize", v);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", v);
    }), {
      ns: t,
      customDecoration2: o,
      renderBorder: c
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration2",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), Pl = P(
  Xe,
  function(e) {
    e.component(Xe.name, Xe);
  }
), qe = /* @__PURE__ */ x({
  name: "CustomDecoration3",
  props: {
    color: {
      type: Array,
      default: () => []
    },
    dur: {
      type: Number,
      default: 1.2
    }
  },
  setup(e) {
    const t = M("custom-decoration-3"), n = g(7), o = g([300, 35]), a = g([1, 1]), s = g(2), r = g(25), d = g(n.value / 2), y = g([]), h = [E() || "#0095ee", "#95d8f8"], f = g(), b = I(() => V(h, e.color || [])), c = () => {
      const [C, H] = o.value, R = C / (r.value + 1), w = H / (s.value + 1), k = Array.from({
        length: s.value
      }).fill(0).map((S, N) => Array.from({
        length: r.value
      }).fill(0).map((O, G) => [R * (G + 1), w * (N + 1)]));
      y.value = k.reduce((S, N) => [...S, ...N], []);
    }, v = () => l("svg", {
      width: "".concat(o.value[0], "px"),
      height: "".concat(o.value[1], "px"),
      style: "transform:scale(".concat(a.value[0], ",").concat(a.value[1], ");")
    }, [y.value.map((C) => l("rect", {
      key: C.join(),
      fill: b.value[0],
      x: C[0] - d.value,
      y: C[1] - d.value,
      width: n.value,
      height: n.value
    }, [Math.random() > 0.6 ? l("animate", {
      attributeName: "fill",
      values: "".concat(b.value.join(";")),
      dur: "".concat(Math.random() + 1, "s"),
      begin: Math.random() * 2,
      repeatCount: "indefinite"
    }, null) : null]))]), u = () => {
      m();
    }, m = () => {
      c(), L();
    }, $ = () => {
      m();
    }, {
      width: p,
      height: i
    } = ot(f, $, u), L = () => {
      const [C, H] = o.value;
      a.value = [p.value / C, i.value / H];
    };
    return {
      ns: t,
      customDecoration3: f,
      renderBorder: v
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration3",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), Il = P(
  qe,
  function(e) {
    e.component(qe.name, qe);
  }
), Qe = /* @__PURE__ */ x({
  name: "CustomDecoration4",
  props: {
    color: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    dur: {
      type: Number,
      default: 1.2
    }
  },
  setup(e) {
    const t = M("custom-decoration-4"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = I(() => V(n, e.color || [])), d = () => l("div", {
      class: "container ".concat(e.reverse ? "reverse" : "normal"),
      style: e.reverse ? "width:".concat(a.value, "px;height:5px;animation-duration:").concat(e.dur, "s") : "width:5px;height:".concat(s.value, "px;animation-duration:").concat(e.dur, "s")
    }, [l("svg", {
      width: e.reverse ? a.value : 5,
      height: e.reverse ? 5 : s.value
    }, [l("polyline", {
      stroke: r.value[0],
      points: e.reverse ? "0, 2.5 ".concat(a.value, ", 2.5") : "2.5, 0 2.5, ".concat(s.value)
    }, null), l("polyline", {
      class: "bold-line",
      stroke: r.value[1],
      "stroke-width": "3",
      "stroke-dasharray": "20, 80",
      "stroke-dashoffset": "-30",
      points: e.reverse ? "0, 2.5 ".concat(a.value, ", 2.5") : "2.5, 0 2.5, ".concat(s.value)
    }, null)])]), y = () => {
      T(() => {
        const h = o.value;
        h && (a.value = h.clientWidth, s.value = h.clientHeight);
      });
    };
    return z(() => {
      y(), j(o.value, y), window.addEventListener("resize", y);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", y);
    }), {
      ns: t,
      customDecoration4: o,
      renderBorder: d
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration4",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), Bl = P(
  Qe,
  function(e) {
    e.component(Qe.name, Qe);
  }
), Ke = /* @__PURE__ */ x({
  name: "CustomDecoration5",
  props: {
    color: {
      type: Array,
      default: () => []
    },
    dur: {
      type: Number,
      default: 1.2
    }
  },
  setup(e) {
    const t = M("custom-decoration-5"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = g(""), d = g(""), y = g(0), h = g(0), f = I(() => V(n, e.color || [])), b = () => {
      const u = [[0, s.value * 0.2], [a.value * 0.18, s.value * 0.2], [a.value * 0.2, s.value * 0.4], [a.value * 0.25, s.value * 0.4], [a.value * 0.27, s.value * 0.6], [a.value * 0.72, s.value * 0.6], [a.value * 0.75, s.value * 0.4], [a.value * 0.8, s.value * 0.4], [a.value * 0.82, s.value * 0.2], [a.value, s.value * 0.2]], m = [[a.value * 0.3, s.value * 0.8], [a.value * 0.7, s.value * 0.8]], $ = rt(u), p = rt(m);
      r.value = u.map((i) => i.join(",")).join(" "), d.value = m.map((i) => i.join(",")).join(" "), y.value = $, h.value = p;
    }, c = () => l("svg", {
      width: a.value,
      height: s.value
    }, [l("polyline", {
      fill: "transparent",
      stroke: f.value[0],
      "stroke-width": "3",
      points: r.value
    }, [l("animate", {
      attributeName: "stroke-dasharray",
      attributeType: "XML",
      from: "0, ".concat(y.value / 2, ", 0, ").concat(y.value / 2),
      to: "0, 0, ".concat(y.value, ", 0"),
      dur: "".concat(e.dur, "s"),
      begin: "0s",
      calcMode: "spline",
      keyTimes: "0;1",
      keySplines: "0.4,1,0.49,0.98",
      repeatCount: "indefinite"
    }, null)]), l("polyline", {
      fill: "transparent",
      stroke: f.value[1],
      "stroke-width": "2",
      points: d.value
    }, [l("animate", {
      attributeName: "stroke-dasharray",
      attributeType: "XML",
      from: "0, ".concat(h.value / 2, ", 0, ").concat(h.value / 2),
      to: "0, 0, ".concat(h.value, ", 0"),
      dur: "".concat(e.dur, "s"),
      begin: "0s",
      calcMode: "spline",
      keyTimes: "0;1",
      keySplines: ".4,1,.49,.98",
      repeatCount: "indefinite"
    }, null)])]), v = () => {
      T(() => {
        const u = o.value;
        u && (a.value = u.clientWidth, s.value = u.clientHeight, b());
      });
    };
    return z(() => {
      v(), j(o.value, v), window.addEventListener("resize", v);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", v);
    }), {
      ns: t,
      customDecoration5: o,
      renderBorder: c
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration5",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), El = P(
  Ke,
  function(e) {
    e.component(Ke.name, Ke);
  }
), Ze = /* @__PURE__ */ x({
  name: "CustomDecoration6",
  props: {
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = M("custom-decoration-6"), n = g(7), o = g([300, 35]), a = g([1, 1]), s = g(1), r = g(40), d = g(n.value / 2), y = g([]), h = g([]), f = g([]), b = g([]), c = g(), v = [E() || "#0095ee", "#95d8f8"], u = I(() => V(v, e.color || [])), m = (k, S) => arguments.length === 1 ? Number.parseInt((Math.random() * k + 1).toString(), 10) : Number.parseInt((Math.random() * (S - k + 1) + k).toString(), 10), $ = () => {
      const [k, S] = o.value, N = k / (r.value + 1), O = S / (s.value + 1), G = Array.from({
        length: s.value
      }).fill(0).map((Q, K) => Array.from({
        length: r.value
      }).fill(0).map((A, U) => [N * (U + 1), O * (K + 1)]));
      y.value = G.reduce((Q, K) => [...Q, ...K], []);
      const ne = Array.from({
        length: s.value * r.value
      }).fill(0).map(() => Math.random() > 0.8 ? m(0.7 * S, S) : m(0.2 * S, 0.5 * S));
      h.value = ne, f.value = Array.from({
        length: s.value * r.value
      }).fill(0).map((Q, K) => ne[K] * Math.random()), b.value = Array.from({
        length: s.value * r.value
      }).fill(0).map(() => Math.random() + 1.5);
    }, p = () => {
      $(), R();
    }, i = () => {
      p();
    }, L = () => {
      p();
    }, {
      width: C,
      height: H
    } = ot(c, i, L), R = () => {
      const [k, S] = o.value;
      a.value = [C.value / k, H.value / S];
    };
    return {
      ns: t,
      customDecoration6: c,
      renderBorder: () => l("svg", {
        width: "".concat(o.value[0], "px"),
        height: "".concat(o.value[1], "px"),
        style: "transform:scale(".concat(a.value[0], ",").concat(a.value[1], ");")
      }, [y.value.map((k, S) => l("rect", {
        key: S,
        fill: u.value[Math.random() > 0.5 ? 0 : 1],
        x: k[0] - d.value,
        y: k[1] - h.value[S] / 2,
        width: n.value,
        height: h.value[S]
      }, [l("animate", {
        attributeName: "y",
        values: "".concat(k[1] - f.value[S] / 2, ";").concat(k[1] - h.value[S] / 2, ";").concat(k[1] - f.value[S] / 2),
        dur: "".concat(b.value[S], "s"),
        keyTimes: "0;0.5;1",
        calcMode: "spline",
        keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
        begin: "0s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "height",
        values: "".concat(f.value[S], ";").concat(h.value[S], ";").concat(f.value[S]),
        dur: "".concat(b.value[S], "s"),
        keyTimes: "0;0.5;1",
        calcMode: "spline",
        keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]))])
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration6",
      class: this.ns.b()
    }, [this.renderBorder(), (t = (e = this.$slots).default) == null ? void 0 : t.call(e)]);
  }
}), Nl = P(
  Ze,
  function(e) {
    e.component(Ze.name, Ze);
  }
), Je = /* @__PURE__ */ x({
  name: "CustomDecoration11",
  props: {
    color: {
      type: Array,
      default: () => []
    },
    dur: {
      type: Number,
      default: 1.2
    }
  },
  setup(e) {
    const t = M("custom-decoration-11"), n = [E() || "#0095ee", "#95d8f8"], o = g(), a = g(0), s = g(0), r = I(() => V(n, e.color || [])), d = () => l("svg", {
      class: [t.em("border-svg", "container")],
      width: a.value,
      height: s.value
    }, [l("polygon", {
      fill: X(r.value[1] || n[1], 10) || "",
      stroke: r.value[1],
      points: "20 10, 25 4, 55 4 60 10"
    }, null), l("polygon", {
      fill: X(r.value[1] || n[1], 10) || "",
      stroke: r.value[1],
      points: "20 ".concat(s.value - 10, ", 25 ").concat(s.value - 4, ", 55 ").concat(s.value - 4, " 60 ").concat(s.value - 10)
    }, null), l("polygon", {
      fill: X(r.value[1] || n[1], 10) || "",
      stroke: r.value[1],
      points: "".concat(a.value - 20, " 10, ").concat(a.value - 25, " 4, ").concat(a.value - 55, " 4 ").concat(a.value - 60, " 10")
    }, null), l("polygon", {
      fill: X(r.value[1] || n[1], 10) || "",
      stroke: r.value[1],
      points: "".concat(a.value - 20, " ").concat(s.value - 10, ", ").concat(a.value - 25, " ").concat(s.value - 4, ", ").concat(a.value - 55, " ").concat(s.value - 4, " ").concat(a.value - 60, " ").concat(s.value - 10)
    }, null), l("polygon", {
      fill: X(r.value[0] || n[0], 20) || "",
      stroke: r.value[0],
      points: "\n          20 10, 5 ".concat(s.value / 2, " 20 ").concat(s.value - 10, "\n          ").concat(a.value - 20, " ").concat(s.value - 10, " ").concat(a.value - 5, " ").concat(s.value / 2, " ").concat(a.value - 20, " 10\n        ")
    }, null), l("polyline", {
      fill: "transparent",
      stroke: X(r.value[0] || n[0], 70) || "",
      points: "25 18, 15 ".concat(s.value / 2, " 25 ").concat(s.value - 18)
    }, null), l("polyline", {
      fill: "transparent",
      stroke: X(r.value[0] || n[0], 70) || "",
      points: "".concat(a.value - 25, " 18, ").concat(a.value - 15, " ").concat(s.value / 2, " ").concat(a.value - 25, " ").concat(s.value - 18)
    }, null)]), y = () => {
      T(() => {
        const h = o.value;
        h && (a.value = h.clientWidth, s.value = h.clientHeight);
      });
    };
    return z(() => {
      y(), j(o.value, y), window.addEventListener("resize", y);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", y);
    }), {
      ns: t,
      customDecoration5: o,
      renderBorder: d
    };
  },
  render() {
    var e, t;
    return l("div", {
      ref: "customDecoration5",
      class: this.ns.b()
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("decoration-content")
    }, [(t = (e = this.$slots).default) == null ? void 0 : t.call(e)])]);
  }
}), zl = P(
  Je,
  function(e) {
    e.component(Je.name, Je);
  }
), Gl = {
  install(e) {
    e.use(Kt), e.use(Jt), e.use(nn), e.use($n), e.use(yn), e.use(Cn), e.use(Sn), e.use(Rn), e.use(Tn), e.use(Yn), e.use(Xn), e.use(ul), e.use(vl), e.use(ml), e.use($l), e.use(gl), e.use(bl), e.use(yl), e.use(pl), e.use(wl), e.use(Cl), e.use(Dl), e.use(Sl), e.use(kl), e.use(Ll), e.use(Rl), e.use(xl), e.use(Ml), e.use(Pl), e.use(Il), e.use(Bl), e.use(El), e.use(Nl), e.use(zl);
  }
};
export {
  Gl as default
};
