import './style.css';
var Ct = Object.defineProperty;
var Dt = (e, n, t) => n in e ? Ct(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var D = (e, n, t) => Dt(e, typeof n != "symbol" ? n + "" : n, t);
import { getSpanProps as Ze, useNamespace as P, withInstall as x, getRadioProps as kt, getEditorEmits as et, useAutoFocusBlur as St, useCodeListListen as Rt, useFocusAndBlur as Lt, useControlController as tt, useUIStore as It, getSliderProps as ut, getRawProps as Pt } from "@ibiz-template/vue3-util";
import { EditorController as fe, registerEditorProvider as ie, registerControlProvider as he, ControlType as xt, PortletPartController as me, getPortletProvider as Et, ViewPortletController as Mt, registerPortletProvider as de, CodeListEditorController as Bt, PanelItemController as ct, registerPanelItemProvider as dt, ListController as vt, Srfuf as ot, GridRowState as zt, ControlVO as Tt, GridController as Nt, ScriptFactory as Wt } from "@ibiz-template/runtime";
import { defineComponent as I, computed as E, createVNode as l, ref as $, resolveComponent as M, h as ee, onMounted as T, onBeforeMount as At, watch as N, mergeProps as nt, isVNode as ft, onBeforeUnmount as q, withDirectives as Ot, resolveDirective as Yt, watchEffect as Ht, onUnmounted as Y, nextTick as W, renderSlot as Vt, createTextVNode as Ft, onActivated as Gt, onDeactivated as jt, getCurrentInstance as F } from "vue";
import { clone as ht } from "ramda";
import mt from "dayjs";
import { isNil as _t, toNumber as se, isNumber as $e } from "lodash-es";
import { showTitle as Ut, listenJSEvent as ae, NOOP as ve, debounce as Xt } from "@ibiz-template/core";
const ge = /* @__PURE__ */ I({
  name: "DigitalFlop",
  props: Ze(),
  setup(e) {
    const n = P("digital-flop"), t = e.controller, s = E(() => e.value ? e.value.toString() : "");
    return {
      ns: n,
      c: t,
      curValue: s
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [this.curValue.split("").map((e) => l("div", {
      class: [this.ns.e("item"), this.ns.is("symbol", Number.isNaN(Number(e)))]
    }, [e]))]);
  }
});
class qt extends fe {
}
class Qt {
  constructor() {
    D(this, "formEditor", "DigitalFlop");
    D(this, "gridEditor", "DigitalFlop");
  }
  async createController(n, t) {
    const s = new qt(n, t);
    return await s.init(), s;
  }
}
const Kt = x(ge, function(e) {
  e.component(ge.name, ge), ie("SPAN_DIGITAL_FLOP", () => new Qt());
}), be = /* @__PURE__ */ I({
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
    const n = P("screen-dashboard"), t = $(e.modelData), s = (o) => {
      o.map((r) => {
        r.controlType === "PORTLET" && (r.sysPFPluginId = r.sysPFPluginId || "screen", r.portletType === "CONTAINER" && r.controls && s(r.controls));
      });
    }, {
      ctrlParams: a = {}
    } = e.modelData.controlParam || {};
    return a.SCREENMODE !== "false" && (t.value = ht(e.modelData), t.value.controls && s(t.value.controls)), {
      ns: n,
      tempModelData: t
    };
  },
  render() {
    const e = M("IBizDashboardControl"), n = ee(e, {
      modelData: this.tempModelData,
      context: this.context,
      params: this.params,
      provider: this.provider
    });
    return l("div", {
      class: [this.ns.b()]
    }, [n]);
  }
});
class Jt {
  constructor() {
    D(this, "component", "ScreenDashboard");
  }
}
const Zt = x(
  be,
  function(e) {
    e.component(be.name, be), he(
      "".concat(xt.DASHBOARD, "_SCREEN"),
      () => new Jt()
    );
  }
);
class en extends me {
  /**
   * 重写
   * @param {T} model
   * @param {IDashboardController} dashboard
   * @param {IPortletContainerController} [parent]
   * @memberof ScreenPortletController
   */
  constructor(t, s, a) {
    super(t, s, a);
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
    var a, o, r, d, y, h;
    const t = ibiz.hub.getApp(this.context.srfappid);
    this.appPortlets = t.model.appPortlets || [];
    const s = this.appPortlets.find(
      (f) => f.codeName === this.model.codeName
    );
    s && s.portletParams && (this.controlParam = s.portletParams, (a = s.portletParams) != null && a.BORDERSTYLE && (this.borderStyle = (o = s.portletParams) == null ? void 0 : o.BORDERSTYLE), (r = s.portletParams) != null && r.BORDERMODE && (this.borderMode = (d = s.portletParams) == null ? void 0 : d.BORDERMODE), (y = s.portletParams) != null && y.ICONTYPE && (this.iconType = (h = s.portletParams) == null ? void 0 : h.ICONTYPE), this.controlParam.BODYBGURL && (this.bodyBgUrl = this.controlParam.BODYBGURL));
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
}, ye = /* @__PURE__ */ I({
  name: "ScreenPortlet",
  props: {
    modelData: {
      type: Object,
      required: !0
    },
    controller: {
      type: me,
      required: !0
    }
  },
  setup(e) {
    const n = P("screen-portlet");
    return {
      c: new en(e.controller.model, e.controller.dashboard, e.controller.parent),
      ns: n
    };
  },
  render() {
    var a, o;
    const {
      sysImage: e
    } = this.modelData, n = tn[this.controller.model.portletType] || "IBizViewPortlet", t = M(n), s = ee(t, {
      modelData: this.modelData,
      controller: this.controller
    }, (o = (a = this.$slots).default) == null ? void 0 : o.call(a));
    if (this.c.borderStyle) {
      const r = M(this.c.borderStyle);
      let d = 0;
      return this.c.model.showTitleBar && this.c.borderMode === "body" && (d = 50), ee(r, {
        offsetY: d,
        class: [this.ns.b(), this.ns.is("full-icon", this.c.iconType === "full"), this.ns.is("full-border", d > 0), this.ns.is("container", this.controller.model.portletType === "CONTAINER")]
      }, s);
    }
    return l("div", {
      class: [this.ns.b(), this.ns.is("full-icon", this.c.iconType === "full"), this.ns.is("container", this.controller.model.portletType === "CONTAINER")]
    }, [s, e && this.controller.model.portletType === "CONTAINER" && l(M("iBizIcon"), {
      class: this.ns.e("bg-icon"),
      icon: e
    }, null), this.c.bodyBgUrl && l("img", {
      class: this.ns.e("body-image"),
      src: this.c.bodyBgUrl
    }, null)]);
  }
});
class st {
  constructor() {
    D(this, "component", "ScreenPortlet");
  }
  async createController(n, t, s) {
    const a = ht(n), o = Object.assign(a, { sysPFPluginId: "" });
    !o.showTitleBar && o.sysImage && (o.showTitleBar = !0, o.title = "");
    const r = await Et(o);
    if (r)
      return await r.createController(a, t, s);
    const d = new Mt(a, t, s);
    return await d.init(), d;
  }
}
const nn = x(ye, function(e) {
  e.component(ye.name, ye), de(
    "PORTLET_CUSTOM_SCREEN",
    () => new st()
  ), de("CUSTOM_SCREEN", () => new st());
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
function Z() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function te() {
  return "".concat(Z() + Z(), "-").concat(Z(), "-").concat(Z(), "-").concat(Z(), "-").concat(Z()).concat(Z()).concat(Z());
}
function dn(e) {
  return e == null;
}
function vn(e) {
  if (sn(e) || un(e))
    return e.length === 0;
  if (on(e)) {
    for (const n in e)
      if (Object.prototype.hasOwnProperty.call(e, n))
        return !1;
    return !0;
  }
  return an(e) || rn(e) ? e.size === 0 : e == null;
}
function pe(e) {
  return !dn(e) && !vn(e);
}
function fn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ft(e);
}
const we = /* @__PURE__ */ I({
  name: "ScreenRadioList",
  props: kt(),
  emits: et(),
  setup(e, {
    emit: n
  }) {
    const t = P("screen-radio-list"), s = e.controller, a = s.model;
    let o = null, r = "radio", d = !1;
    a.editorParams && (a.editorParams.renderMode && (r = a.editorParams.renderMode), a.editorParams.isBtnRoundCorner && (d = s.toBoolean(a.editorParams.isBtnRoundCorner)));
    const {
      useInFocusAndBlur: y,
      useInValueChange: h
    } = St(e, n), f = (p) => {
      n("change", p), h();
    }, b = $([]), c = () => {
      const p = b.value.findIndex((i) => i.value === e.value);
      b.value && b.value.length > 0 && (p < b.value.length - 1 ? n("change", b.value[p + 1].value) : n("change", b.value[0].value));
    };
    T(() => {
      s.enablecirculate && (o = setInterval(() => {
        c();
      }, s.intervaltime));
    }), At(() => {
      o && clearInterval(o);
    }), N(() => e.data, (p) => {
      s.loadCodeList(p).then((i) => {
        b.value = i;
      });
    }, {
      immediate: !0,
      deep: !0
    });
    const v = (p) => {
      p && (b.value = p);
    };
    Rt(s.model.appCodeListId, s.context.srfappid, v);
    const u = E(() => {
      var p;
      return ((p = b.value.find((i) => i.value == e.value)) == null ? void 0 : p.text) || "";
    }), m = E(() => !!(e.controlParams && e.controlParams.editmode === "hover" && !e.readonly));
    N(u, (p, i) => {
      p !== i && n("infoTextChange", p);
    }, {
      immediate: !0
    });
    const {
      componentRef: g
    } = Lt(() => n("focus"), () => y());
    return {
      timer: o,
      ns: t,
      editorModel: a,
      items: b,
      valueText: u,
      onSelectValueChange: f,
      editorRef: g,
      renderMode: r,
      isBtnRoundCorner: d,
      showFormDefaultContent: m
    };
  },
  render() {
    let e;
    return l("div", {
      class: [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("grid-layout", !!this.controller.rowNumber)],
      style: this.controller.rowNumber ? "--ibiz-radio-group-row-number:".concat(this.controller.rowNumber) : "",
      ref: "editorRef"
    }, [this.readonly ? this.valueText : l(M("el-radio-group"), nt({
      class: this.ns.e("group"),
      "model-value": pe(this.value) ? String(this.value) : "",
      onChange: this.onSelectValueChange
    }, this.$attrs), fn(e = this.items.map((n, t) => this.renderMode === "radio" ? l(M("el-radio"), {
      key: t,
      label: pe(n.value) ? String(n.value) : "",
      disabled: this.disabled || n.disableSelect === !0
    }, {
      default: () => [l("span", {
        class: this.ns.e("text")
      }, [n.text])]
    }) : l(M("el-radio-button"), {
      key: t,
      class: [this.ns.e("button"), this.isBtnRoundCorner ? this.ns.em("button", "round-corner") : ""],
      label: pe(n.value) ? String(n.value) : "",
      disabled: this.disabled || n.disableSelect === !0
    }, {
      default: () => [l("span", {
        class: this.ns.em("button", "text")
      }, [n.text])]
    }))) ? e : {
      default: () => [e]
    })]);
  }
});
class hn extends Bt {
  constructor() {
    super(...arguments);
    /**
     * 单选一行展示几个
     * @author fangZhiHao
     * @date 2024-07-17 10:07:40
     * @type {(number | undefined)}
     */
    D(this, "rowNumber");
    /**
     * 是否开启循环
     *
     * @author fangZhiHao
     * @date 2024-08-08 14:08:13
     * @type {boolean}
     */
    D(this, "enablecirculate", !0);
    /**
     * 循环间隔
     *
     * @author fangZhiHao
     * @date 2024-08-08 14:08:13
     * @type {boolean}
     */
    D(this, "intervaltime", 3e3);
  }
  async onInit() {
    super.onInit();
    const { ENABLECIRCULATE: t, INTERVALTIME: s, rowNumber: a } = this.editorParams;
    a && (this.rowNumber = a), s && (this.intervaltime = Number(s)), t && (this.enablecirculate = JSON.parse(t));
  }
}
class mn {
  constructor() {
    D(this, "formEditor", "ScreenRadioList");
    D(this, "gridEditor", "ScreenRadioList");
  }
  async createController(n, t) {
    const s = new hn(
      n,
      t
    );
    return await s.init(), s;
  }
}
const $n = x(
  we,
  function(e) {
    e.component(we.name, we), ie(
      "RADIOBUTTONLIST_SCREEN_RADIO_LIST",
      () => new mn()
    );
  }
), Ce = /* @__PURE__ */ I({
  name: "ScreenRealTime",
  props: Ze(),
  setup(e) {
    const n = P("screen-real-time"), t = e.controller;
    let s = null;
    const a = ["日", "一", "二", "三", "四", "五", "六"], o = $(""), r = $(""), d = $("");
    return T(() => {
      s = setInterval(() => {
        const y = mt();
        o.value = t.leftTime ? "".concat(y.format(t.leftTime), " ") : "", r.value = t.showWeek ? "星期".concat(a[y.day()], " ") : "", d.value = t.rightTime ? y.format(t.rightTime) : "";
      }, 1e3);
    }), q(() => {
      s && clearInterval(s);
    }), {
      ns: n,
      c: t,
      leftText: o,
      week: r,
      rightText: d
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [this.leftText ? l("div", {
      class: this.ns.e("left-time")
    }, [this.leftText]) : null, this.week ? l("div", {
      class: this.ns.e("week")
    }, [this.week]) : null, l("div", {
      class: this.ns.e("right-time")
    }, [this.rightText])]);
  }
});
class gn extends fe {
  constructor() {
    super(...arguments);
    /**
     * 左侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    D(this, "leftTime", "YYYY-MM-DD");
    /**
     *  星期
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:17
     * @type {string}
     */
    D(this, "showWeek", !0);
    /**
     * 右侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    D(this, "rightTime", "HH:mm:ss");
  }
  /**
   * 初始化
   */
  async onInit() {
    if (super.onInit(), this.parent.valueFormat) {
      const t = this.parent.valueFormat.split(","), s = t.findIndex((a) => a === "week");
      s > -1 ? (this.showWeek = !0, s === 0 && (this.leftTime = "", this.rightTime = t[1]), s === 1 && (t.splice(s, 1), t.forEach((a, o) => {
        o === 0 && (this.leftTime = a), o === 1 && (this.rightTime = a);
      }))) : (this.showWeek = !1, t.forEach((a, o) => {
        o === 0 && (this.leftTime = a), o === 1 && (this.rightTime = a);
      }));
    }
  }
}
class bn {
  constructor() {
    D(this, "formEditor", "ScreenRealTime");
    D(this, "gridEditor", "ScreenRealTime");
  }
  async createController(n, t) {
    const s = new gn(n, t);
    return await s.init(), s;
  }
}
const yn = x(
  Ce,
  function(e) {
    e.component(Ce.name, Ce), ie(
      "SPAN_SCREEN_REAL_TIME",
      () => new bn()
    );
  }
), De = /* @__PURE__ */ I({
  name: "ScreenPortletRealTime",
  props: Ze(),
  setup(e) {
    const n = P("screen-portlet-real-time"), t = e.controller;
    let s = null;
    const a = ["日", "一", "二", "三", "四", "五", "六"], o = $(""), r = $(""), d = $("");
    return T(() => {
      s = setInterval(() => {
        const y = mt();
        o.value = t.leftTime ? "".concat(y.format(t.leftTime), " ") : "", r.value = t.showWeek ? "星期".concat(a[y.day()], " ") : "", d.value = t.rightTime ? y.format(t.rightTime) : "";
      }, 1e3);
    }), q(() => {
      s && clearInterval(s);
    }), {
      ns: n,
      c: t,
      leftText: o,
      week: r,
      rightText: d
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [this.leftText ? l("div", {
      class: this.ns.e("left-time")
    }, [this.leftText]) : null, this.week ? l("div", {
      class: this.ns.e("week")
    }, [this.week]) : null, l("div", {
      class: this.ns.e("right-time")
    }, [this.rightText])]);
  }
});
class pn extends me {
  constructor() {
    super(...arguments);
    /**
     * 左侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    D(this, "leftTime", "YYYY-MM-DD");
    /**
     *  星期
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:17
     * @type {string}
     */
    D(this, "showWeek", !0);
    /**
     * 右侧时间
     *
     * @author fangZhiHao
     * @date 2024-08-08 13:08:33
     * @type {string}
     */
    D(this, "rightTime", "HH:mm:ss");
  }
  /**
   * 初始化
   */
  async onInit() {
    if (super.onInit(), this.model.controlParam) {
      const { ctrlParams: t } = this.model.controlParam;
      if (t && t.VALUEFORMAT) {
        const s = t.VALUEFORMAT.split(","), a = s.findIndex((o) => o === "week");
        a > -1 ? (this.showWeek = !0, a === 0 && (this.leftTime = "", this.rightTime = s[1]), a === 1 && (s.splice(a, 1), s.forEach((o, r) => {
          r === 0 && (this.leftTime = o), r === 1 && (this.rightTime = o);
        }))) : (this.showWeek = !1, s.forEach((o, r) => {
          r === 0 && (this.leftTime = o), r === 1 && (this.rightTime = o);
        }));
      }
    }
  }
}
class wn {
  constructor() {
    D(this, "component", "ScreenPortletRealTime");
  }
  async createController(n, t, s) {
    const a = new pn(
      n,
      t,
      s
    );
    return await a.init(), a;
  }
}
const Cn = x(
  De,
  function(e) {
    e.component(De.name, De), de(
      "PORTLET_CUSTOM_SCREEN_PORTLET_REAL_TIME",
      () => new wn()
    );
  }
);
class $t extends ct {
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
const ke = /* @__PURE__ */ I({
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
      ns: P("screen-panel-container")
    };
  },
  render() {
    var s, a;
    const e = M("IBizPanelContainer"), n = ((a = (s = this.$slots).default) == null ? void 0 : a.call(s)) || [], t = ee(e, {
      modelData: this.modelData,
      controller: this.controller
    }, n);
    if (this.controller.borderStyle) {
      const o = M(this.controller.borderStyle);
      return ee(o, {
        class: [this.ns.b()]
      }, t);
    }
    return l("div", {
      class: this.ns.b()
    }, [t]);
  }
});
class Dn {
  constructor() {
    D(this, "component", "ScreenPanelContainer");
  }
  async createController(n, t, s) {
    const a = new $t(n, t, s);
    return await a.init(), a;
  }
}
const kn = x(
  ke,
  function(e) {
    e.component(ke.name, ke), dt(
      "CUSTOM_SCREEN_PANEL_CONTAINER",
      () => new Dn()
    );
  }
);
class Sn extends vt {
  constructor(t, s, a, o) {
    super(t, s, a, o);
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
function Se(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ft(e);
}
const Re = /* @__PURE__ */ I({
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
    const n = tt((...w) => new Sn(...w)), t = P("carousel-list"), s = $(n.moveSpeed), a = $(!1), o = $(n.rollMode), r = $(), d = $(), y = E(() => n.model.enablePagingBar === !0 || n.model.pagingMode !== 2 ? !0 : n.state.items.length >= n.state.total || n.state.isLoading || n.state.total <= n.state.size), h = $(), f = $(te()), b = $();
    n.controlParams.defaultexpandall === "true" && (N(() => n.state.groups, () => {
      n.state.groups.length > 0 && (b.value = n.state.groups.map((w) => w.key));
    }), b.value = n.state.groups.map((w) => w.key));
    const c = E(() => {
      if (!a.value || o.value !== "DEFAULT")
        return {};
      const w = {
        flex: "none",
        height: "auto"
      };
      return Object.assign(w, {
        animation: "scroll-top ".concat(s.value, "s linear infinite")
      }), w;
    });
    N(() => n.state.curPage, () => {
      var w, S;
      if (n.state.curPage === 1 && (n.model.pagingMode === 2 || n.model.pagingMode === 3)) {
        f.value = te();
        const k = (S = (w = h.value) == null ? void 0 : w.ElInfiniteScroll) == null ? void 0 : S.containerEl;
        k && (k.lastScrollTop = 0, k.scrollTop = 0);
      }
    });
    const v = (w, S) => {
      const {
        context: k,
        params: z
      } = n, O = n.state.selectedData.findIndex((ne) => ne.srfkey === w.srfkey), G = [t.b("item"), t.is("active", O !== -1)];
      return l(M("iBizControlShell"), {
        class: G,
        style: "",
        data: w,
        modelData: S,
        context: k,
        params: z,
        onClick: () => n.onRowClick(w),
        onDblclick: () => n.onDbRowClick(w)
      }, null);
    }, u = (w) => {
      const S = n.state.selectedData.findIndex((z) => z.srfkey === w.srfkey), k = [t.b("item"), t.is("active", S !== -1)];
      return l("div", {
        class: k,
        key: w.srfkey,
        onClick: () => n.onRowClick(w),
        onDblclick: () => n.onDbRowClick(w)
      }, ["".concat(_t(w.srfmajortext) ? "" : w.srfmajortext)]);
    }, m = (w) => {
      const S = e.modelData.itemLayoutPanel;
      return l(M("el-collapse-item"), {
        title: Ut(w.caption),
        class: t.be("group-content", "item"),
        name: w.key
      }, {
        default: () => [w.children.length > 0 ? w.children.map((k) => S ? v(k, S) : u(k)) : l("div", {
          class: t.bem("group-content", "item", "empty")
        }, [ibiz.i18n.t("app.noData")])]
      });
    }, g = (w, S) => {
      const k = S ? v(w, S) : u(w);
      if (n.borderStyle) {
        const z = M(n.borderStyle);
        return ee(z, {}, k);
      }
      return k;
    }, p = () => {
      let w;
      if (n.model.enableGroup && !n.state.isSimple)
        return l(M("el-collapse"), {
          modelValue: b.value,
          "onUpdate:modelValue": (k) => b.value = k,
          class: [t.b("group-content"), t.b("content"), t.is("allow-roll", a.value)],
          style: c.value
        }, {
          default: () => {
            var k;
            return [(k = n.state.groups) == null ? void 0 : k.map((z) => l("div", {
              class: [t.b("scroll-item")]
            }, [m(z)]))];
          }
        });
      const S = e.modelData.itemLayoutPanel;
      return Ot(l("div", {
        class: [t.b("scroll"), t.b("content"), t.is("allow-roll", a.value)],
        style: c.value,
        "infinite-scroll-distance": 10,
        "infinite-scroll-disabled": y.value,
        ref: "infiniteScroll",
        key: f.value
      }, [n.state.items.map((k, z) => l("div", {
        class: [t.b("scroll-item")]
      }, [g(k, S)])), a.value && n.state.items.map((k, z) => l("div", {
        class: [t.b("scroll-item")]
      }, [g(k, S)])), n.model.pagingMode === 3 && !(n.state.items.length >= n.state.total || n.state.isLoading || n.state.total <= n.state.size) && l("div", {
        class: t.e("load-more-button")
      }, [l(M("el-button"), {
        text: !0,
        onClick: () => n.loadMore()
      }, Se(w = ibiz.i18n.t("control.common.loadMore")) ? w : {
        default: () => [w]
      })])]), [[Yt("infinite-scroll"), () => n.loadMore()]]);
    }, i = () => {
      var S;
      const w = (S = n.model.controls) == null ? void 0 : S.find((k) => k.name === "".concat(n.model.name, "_quicktoolbar"));
      if (w)
        return l(M("iBizToolbarControl"), {
          modelData: w,
          context: n.context,
          params: n.params
        }, null);
    }, R = () => {
      var S;
      const w = (S = n.model.controls) == null ? void 0 : S.find((k) => k.name === "".concat(n.model.name, "_batchtoolbar"));
      if (w)
        return l("div", {
          class: t.b("batchtoolbar")
        }, [l(M("iBizToolbarControl"), {
          modelData: w,
          context: n.context,
          params: n.params
        }, null)]);
    }, C = () => {
      let w;
      const {
        isLoaded: S
      } = n.state;
      if (S)
        return S && l(M("iBizNoData"), {
          class: t.b("content"),
          text: n.model.emptyText,
          emptyTextLanguageRes: n.model.emptyTextLanguageRes,
          enableShowImage: n.state.hideNoDataImage
        }, Se(w = i()) ? w : {
          default: () => [w]
        });
    }, V = () => {
      clearInterval(d.value);
      let w = 1;
      d.value = setInterval(() => {
        var k, z;
        const S = (z = (k = r.value) == null ? void 0 : k.$el) == null ? void 0 : z.getElementsByClassName(t.b("scroll-item"));
        if (a.value && o.value === "STEP") {
          const O = S[0].offsetHeight;
          h.value.scrollTo({
            top: O * w,
            behavior: "smooth"
          }), w >= n.state.items.length ? (setTimeout(() => {
            h.value.scrollTo({
              top: 0,
              behavior: "instant"
            });
          }, 500), w = 1) : w += 1;
        } else
          clearInterval(d.value);
      }, s.value * 1e3);
    }, L = () => {
      var S, k;
      const w = (k = (S = r.value) == null ? void 0 : S.$el) == null ? void 0 : k.getElementsByClassName(t.b("scroll-item"));
      if (!a.value && h.value && w && w.length && !w[0].offsetHeight) {
        const O = setInterval(() => {
          w[0].offsetHeight > 0 && n.state.items.length * w[0].offsetHeight > h.value.clientHeight ? (a.value = !0, V(), clearInterval(O)) : (clearInterval(O), clearInterval(d.value));
        }, 10);
      }
    };
    return N(() => h.value, (w) => {
      w && L();
    }, {
      immediate: !0,
      deep: !0
    }), {
      c: n,
      ns: t,
      carouselContainer: r,
      infiniteScroll: h,
      renderListContent: p,
      renderNoData: C,
      renderBatchToolBar: R
    };
  },
  render() {
    let e = null;
    return this.c.state.isCreated && (e = [this.c.state.items.length > 0 ? this.renderListContent() : this.renderNoData(), this.renderBatchToolBar(), this.c.state.enablePagingBar && this.c.model.pagingMode === 1 ? l(M("iBizPagination"), {
      class: this.ns.e("pagination"),
      total: this.c.state.total,
      curPage: this.c.state.curPage,
      size: this.c.state.size,
      totalPages: this.c.state.totalPages
    }, null) : null]), l(M("iBizControlBase"), {
      class: [this.ns.is("enable-page", !!this.c.state.enablePagingBar), "test"],
      ref: "carouselContainer",
      controller: this.c
    }, Se(e) ? e : {
      default: () => [e]
    });
  }
});
class Rn {
  constructor() {
    D(this, "component", "CarouselList");
  }
}
const Ln = x(Re, function(e) {
  e.component(Re.name, Re), he(
    "LIST_RENDER_CAROUSEL_LIST",
    () => new Rn()
  );
});
function In(e, n) {
  const t = [], s = e[0] || "", a = n.filter((o) => (o[s] || t.push(o), o[s]));
  return a.sort((o, r) => {
    for (const d of e)
      if (o[d] !== r[d])
        return o[d] > r[d] ? 1 : -1;
    return 0;
  }), a.push(...t), a;
}
function Pn(e) {
  const n = $();
  let t = !1, s = !1;
  async function a(f, b, c) {
    if (f.srfuf !== ot.CREATE)
      if (e.editShowMode === "row" && e.model.enableRowEdit) {
        const v = e.findRowState(f);
        v && v.showRowEdit !== !0 && await e.switchRowEdit(v, !0);
      } else
        e.onRowClick(f);
  }
  function o(f) {
    f.srfuf !== ot.CREATE && e.onDbRowClick(f);
  }
  function r(f) {
    t || e.setSelection(f);
  }
  N(
    [
      () => n.value,
      () => e.state.isLoaded,
      () => e.state.selectedData
    ],
    ([f, b, c]) => {
      !b || !f || (e.state.singleSelect ? c[0] ? n.value.setCurrentRow(c[0], !0) : n.value.setCurrentRow() : (t = !0, n.value.clearSelection(), c.forEach((v) => n.value.toggleRowSelection(v, !0)), t = !1));
    }
  );
  function d(f) {
    if (s) {
      s = !1;
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
    const u = (m = e.model.degridColumns) == null ? void 0 : m.find((g) => g.codeName === b.property);
    return u && u.headerSysCss && u.headerSysCss.cssName ? u.headerSysCss.cssName : "";
  }
  return N(
    () => e.state.sortQuery,
    (f) => {
      if (f) {
        const b = e.state.sortQuery.split(",")[0], c = e.state.sortQuery.split(",")[1];
        if (b && c) {
          const v = c === "desc" ? "descending" : "ascending", u = () => {
            n.value ? W(() => {
              s = !0, n.value.sort(b, v);
            }) : setTimeout(u, 500);
          };
          u();
        }
      }
    }
  ), {
    tableRef: n,
    onRowClick: a,
    onDbRowClick: o,
    onSelectionChange: r,
    onSortChange: d,
    handleRowClassName: y,
    handleHeaderCellClassName: h
  };
}
function xn(e, n) {
  const t = () => {
    n.data && (e.state.items = n.data, e.state.rows = n.data.map((h) => new zt(new Tt(h), e)), e.calcAggResult(e.state.items), e.calcTotalData());
  }, s = E(() => {
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
    n.isSimple && (t(), e.state.isLoaded = !0);
  }), N(
    () => n.data,
    () => {
      n.isSimple && t();
    },
    {
      deep: !0
    }
  );
  const a = E(() => {
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
    return f.length > 0 ? In(
      f,
      h.rows.map((b) => b.data)
    ) : h.rows.map((b) => b.data);
  }), o = E(() => {
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
    renderColumns: o,
    defaultSort: s,
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
        const g = c === 0 || h[v];
        if (b > 0 && g && h[v] === a.value[b - 1][v])
          return {
            rowspan: 0,
            colspan: 0
          };
        let p = 1;
        for (let i = b + 1; i < a.value.length && (g && a.value[i][v] === h[v]); i++)
          p += 1;
        return {
          rowspan: p,
          colspan: 1
        };
      }
      if (m.length > 0 && m.includes(v)) {
        const g = o.value[c - 1].codeName;
        if (c > 0 && m.includes(g) && h[v] === h[g])
          return {
            rowspan: 0,
            colspan: 0
          };
        let p = 1;
        for (let i = c + 1; i < o.value.length; i++) {
          const R = o.value[i].codeName;
          if (m.includes(R) && h[R] === h[v])
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
        const u = o.value.findIndex((m) => e.columns[m.codeName].isAdaptiveColumn);
        e.hasAdaptiveColumn = u !== -1;
      }
    }
  };
}
function En(e, n) {
  let t = null, s = 0;
  const a = $({}), o = () => {
    if (window.ResizeObserver) {
      const d = e.value.$el.querySelector(
        ".el-table__header-wrapper"
      );
      d && (t = new ResizeObserver((y) => {
        const h = y[0].contentRect.height;
        if (h !== s) {
          const f = {
            "now-header-height": "".concat(h, "px")
          };
          a.value = n.cssVarBlock(f), s = h;
        }
      }), t.observe(d));
    }
  }, r = Ht(() => {
    e.value && o();
  });
  return Y(() => {
    t && t.disconnect(), r();
  }), {
    headerCssVars: a
  };
}
function Mn(e, n, t) {
  if (!t.enableRowEditOrder)
    return {};
  let s = 0, a = 0, o = null, r = null;
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
          const g = m.target;
          m.dataTransfer.effectAllowed = "move";
          const p = y(g.classList);
          s = t.state.rows.findIndex(
            (i) => i.data.srfkey === p
          ), o = t.state.rows[s];
        }
      }
    ), c = ae(
      f,
      "dragenter",
      (m) => {
        m.preventDefault();
        const g = m.currentTarget, p = y(g.classList);
        a = t.state.rows.findIndex(
          (i) => i.data.srfkey === p
        ), !((o == null ? void 0 : o.data.srfkey) === p || a === -1) && (r = t.state.rows[a]);
      }
    ), v = ae(
      f,
      "dragover",
      (m) => {
        m.preventDefault();
      }
    ), u = ae(f, "dragend", (m) => {
      m.preventDefault(), o && r && t.onDragChange(
        o,
        r,
        a > s ? "next" : "prev"
      );
    });
    d.push(b), d.push(c), d.push(v), d.push(u);
  };
  return N(
    [() => e.value, () => t.state.isLoaded],
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
class Bn extends Nt {
  constructor(t, s, a, o) {
    super(t, s, a, o);
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
function zn(e, n) {
  var s;
  const t = {};
  return (s = e.controlAttributes) == null || s.forEach((a) => {
    a.attrName && a.attrValue && (t[a.attrName] = Wt.execSingleLine(a.attrValue, {
      ...n
    }));
  }), t;
}
function Tn(e, n, t, s) {
  var f;
  const {
    codeName: a,
    width: o
  } = n, r = e.columns[a], d = e.state.columnStates.find((b) => b.key === a), h = r.isAdaptiveColumn || !e.hasAdaptiveColumn && s === t.length - 1 ? "min-width" : "width";
  return l(M("el-table-column"), nt({
    label: n.caption,
    prop: a
  }, {
    [h]: o
  }, {
    fixed: d.fixed,
    sortable: n.enableSort ? "custom" : !1,
    align: ((f = n.align) == null ? void 0 : f.toLowerCase()) || "center"
  }), {
    default: ({
      row: b
    }) => {
      let c = b;
      b.isGroupData && (c = b.first);
      const v = e.findRowState(c);
      if (v) {
        const u = M(e.providers[a].component);
        return ee(u, {
          controller: r,
          row: v,
          key: c.tempsrfkey + a,
          attrs: zn(n, {
            ...e.getEventArgs(),
            data: v.data
          })
        });
      }
      return null;
    }
  });
}
function gt(e, n, t, s) {
  var a, o;
  if (n.columnType === "GROUPGRIDCOLUMN") {
    const r = ((a = n.degridColumns) == null ? void 0 : a.filter((h) => !h.hideDefault && !h.hiddenDataItem)) || [], {
      width: d
    } = n, y = ((o = n.align) == null ? void 0 : o.toLowerCase()) || "center";
    return l(M("el-table-column"), {
      prop: n.codeName,
      label: n.caption,
      "min-width": d,
      align: y
    }, {
      default: () => r.map((h, f) => gt(e, h, t, f))
    });
  }
  return Tn(e, n, t, s);
}
const Le = /* @__PURE__ */ I({
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
    slots: n
  }) {
    const t = tt((...A) => new Bn(...A)), s = P("control-".concat(t.model.controlType.toLowerCase())), a = P("carousel-grid"), o = $(), r = $({}), d = $(!1), {
      zIndex: y
    } = It();
    t.state.zIndex = y.increment();
    const h = $(48), {
      tableRef: f,
      onRowClick: b,
      onDbRowClick: c,
      onSelectionChange: v,
      onSortChange: u,
      handleRowClassName: m,
      handleHeaderCellClassName: g
    } = Pn(t), {
      headerCssVars: p
    } = En(f, s), {
      cleanup: i = ve
    } = Mn(f, s, t), R = () => l("div", null, null), {
      tableData: C,
      renderColumns: V,
      defaultSort: L,
      summaryMethod: w,
      spanMethod: S,
      headerDragend: k
    } = xn(t, e), z = (A, U) => n[A.id] ? Vt(n, A.id, {
      model: A,
      data: t.state.items
    }) : gt(t, A, V.value, U), O = () => {
      var A;
      if ((A = f.value) != null && A.$el) {
        const U = f.value.$el.getElementsByClassName("el-scrollbar__wrap");
        if (U && U.length) {
          const J = U[0], wt = C.value.length * h.value;
          if (J.clientHeight && wt > J.clientHeight && (d.value = !0, d.value))
            if (t.rollMode === "STEP") {
              clearInterval(o.value);
              let ce = 1;
              o.value = setInterval(() => {
                J.scrollTo({
                  top: h.value * ce,
                  behavior: "smooth"
                }), ce >= C.value.length ? (setTimeout(() => {
                  J.scrollTo({
                    top: 0,
                    behavior: "instant"
                  });
                }, 500), ce = 1) : ce += 1;
              }, t.speed * 1e3);
            } else
              r.value = {
                "--speed": "".concat(t.speed, "s")
              };
        }
      }
    };
    Y(() => {
      y.decrement(), i !== ve && i();
    });
    const G = E(() => t.model.pagingMode !== 2 ? !0 : t.state.items.length >= t.state.total || t.state.isLoading || t.state.total <= t.state.size), ne = (A) => d.value ? [...A, ...A] : A, Q = $(), K = $(te());
    return N(() => t.state.curPage, () => {
      var A, U;
      if (t.state.curPage === 1 && (t.model.pagingMode === 2 || t.model.pagingMode === 3)) {
        K.value = te();
        const J = (U = (A = Q.value) == null ? void 0 : A.ElInfiniteScroll) == null ? void 0 : U.containerEl;
        J && (J.lastScrollTop = 0, J.scrollTop = 0);
      }
    }), {
      c: t,
      ns: s,
      ns1: a,
      tableRef: f,
      tableData: C,
      renderColumns: V,
      allowRoll: d,
      rollStyle: r,
      renderTableColumn: z,
      onDbRowClick: c,
      onRowClick: b,
      onSelectionChange: v,
      onSortChange: u,
      handleRowClassName: m,
      handleHeaderCellClassName: g,
      renderNoData: R,
      summaryMethod: w,
      spanMethod: S,
      headerDragend: k,
      handleResize: O,
      conputedGridData: ne,
      defaultSort: L,
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
    const e = this.c.state, n = this.c.controlParams.defaultexpandall === "true";
    return l(M("iBizControlBase"), {
      class: [this.ns1.b(), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("single-select", e.singleSelect), this.ns.is("empty", e.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized)],
      controller: this.c,
      style: this.headerCssVars
    }, {
      default: () => [l(M("el-table"), nt({
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
        "default-expand-all": n,
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
        default: () => [this.renderColumns.map((t, s) => this.renderTableColumn(t, s))]
      })]
    });
  }
});
class Nn {
  constructor() {
    D(this, "component", "CarouselGrid");
  }
}
const Wn = x(Le, function(e) {
  e.component(Le.name, Le), he(
    "GRID_RENDER_CAROUSEL_GRID",
    () => new Nn()
  );
}), Ie = /* @__PURE__ */ I({
  name: "PercentPond",
  props: ut(),
  setup(e) {
    const n = P("percent-pond"), t = e.controller, s = $(0), a = () => {
      const o = Number(e.value) || 0;
      return "".concat(s.value === 0 ? 0 : Math.round(o / s.value * 100) || 0, "%");
    };
    return N(() => e.data[t.totalField], (o) => {
      o || o === 0 ? s.value = o : s.value = 0;
    }, {
      immediate: !0
    }), {
      ns: n,
      useCover: a,
      total: s
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
class An extends fe {
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
  async createController(n, t) {
    const s = new An(n, t);
    return await s.init(), s;
  }
}
const Yn = x(Ie, function(e) {
  e.component(Ie.name, Ie), ie(
    "EDITOR_CUSTOMSTYLE_SCREEN_PROGRESS",
    () => new On()
  );
}), Hn = /* @__PURE__ */ I({
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
}), Vn = /* @__PURE__ */ I({
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
}), Fn = /* @__PURE__ */ I({
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
}), Gn = /* @__PURE__ */ I({
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
}), jn = /* @__PURE__ */ I({
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
}), _n = /* @__PURE__ */ I({
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
class bt extends ct {
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
const Pe = /* @__PURE__ */ I({
  name: "CustomButton",
  components: {
    CustomButton1: Hn,
    CustomButton2: Vn,
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
    const n = P("panel-button"), t = e.controller, {
      rawItem: s
    } = e.modelData, a = $(""), o = $({}), r = $("lightblue"), d = $(), y = $("CustomButton5"), h = $(""), f = $(0.6), b = $("");
    s && s.cssStyle && (a.value = s.cssStyle), s && s.rawItemParams && s.rawItemParams.forEach((v) => {
      v.key === "BUTTONNAME" ? y.value = v.value : v.key === "BORDERCOLOR" ? d.value = v.value : v.key === "COLOR" ? r.value = v.value : v.key === "BGCOLOR" && (h.value = v.value);
    });
    const c = E(() => {
      const {
        id: v
      } = e.modelData, u = [n.b(), n.m(v)];
      return u.push(...e.controller.containerClass), u;
    });
    return Object.assign(o.value, {
      "--svgBorderColor": d.value,
      "--svgColor": r.value,
      "--svgBgColor": h.value,
      "--svgBgOpacity": f.value
    }), N(() => t.data, async (v) => {
      if (v) {
        const u = t.model.rawItem;
        if (!u)
          return;
        let m;
        const g = {
          ...v
        };
        u.contentType === "RAW" ? m = u.caption : u.contentType === "HTML" && (m = u.content), m && u.templateMode && (m = await ibiz.util.hbs.render(m.replace("//n", "\n"), Object.assign(g, {
          data: {
            ...v
          }
        }))), b.value = m;
      }
    }, {
      immediate: !0
    }), {
      ns: n,
      classArr: c,
      tempStyle: a,
      content: b,
      svgShape: y,
      svgStyle: o
    };
  },
  render() {
    if (!this.controller.state.visible)
      return;
    const e = M(this.svgShape);
    return l("div", {
      class: this.classArr,
      style: this.tempStyle,
      onClick: (n) => {
        this.controller.onClick(n);
      }
    }, [l("div", {
      class: this.ns.b("custon-btn"),
      style: this.svgStyle
    }, [e && ee(e), l(M("iBizRawItem"), {
      rawItem: this.modelData,
      content: this.content
    }, null)])]);
  }
});
class Un {
  constructor() {
    D(this, "component", "CustomButton");
  }
  async createController(n, t, s) {
    const a = new bt(n, t, s);
    return await a.init(), a;
  }
}
const Xn = x(Pe, function(e) {
  e.component(Pe.name, Pe), dt("CUSTOM_CUSTOM_BTN", () => new Un());
}), xe = /* @__PURE__ */ I({
  name: "WaterLevelPond",
  props: ut(),
  emits: et(),
  setup(e) {
    const n = P("water-level-pond"), t = e.controller;
    let s = ve;
    const a = $(null), o = E(() => {
      let r = Number(e.value);
      return t.maxItem && (r /= Number(e.data[t.maxItem])), t.valueFormat ? ibiz.util.text.format(r.toString(), t.valueFormat) : r;
    });
    return N(() => e.value, () => {
      let r = Number(e.value);
      t.maxItem && (r /= Number(e.data[t.maxItem])), t.setDate(r);
    }, {
      immediate: !0
    }), T(() => {
      a.value && t.drawCanvas(a.value), s = ae(window, "resize", () => {
        t.refresh();
      });
    }), q(() => {
      s !== ve && s(), t.cancelAnimation();
    }), {
      ns: n,
      canvas: a,
      curValue: o
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
    canvasWidth: n,
    // 轴长
    canvasHeight: t,
    // 轴高
    waveWidth: s = 0.055,
    // 波浪宽度,数越小越宽
    waveHeight: a = 6,
    // 波浪高度,数越大越高
    xOffset: o = 0,
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
    this.points = [], this.startX = 0, this.canvasWidth = n, this.canvasHeight = t, this.waveWidth = s / 100, this.waveHeight = a, this.xOffset = o, this.speed = r, this.color = d;
  }
  draw(n) {
    n.save();
    const t = this.points;
    n.beginPath();
    for (let s = 0; s < t.length; s += 1) {
      const a = t[s];
      n.lineTo(a[0], a[1]);
    }
    n.lineTo(this.canvasWidth, this.canvasHeight), n.lineTo(this.startX, this.canvasHeight), n.lineTo(t[0][0], t[0][1]), n.fillStyle = this.color, n.fill(), n.restore();
  }
  update({ nowRange: n } = {}) {
    this.points = [];
    const {
      startX: t,
      waveHeight: s,
      waveWidth: a,
      canvasWidth: o,
      canvasHeight: r,
      xOffset: d
    } = this;
    for (let y = t; y < t + o; y += 20 / o) {
      const h = Math.sin((t + y) * a + d), f = r * (1 - n / 100);
      this.points.push([y, f + h * s]);
    }
    this.xOffset += this.speed / 100;
  }
}
const re = /* @__PURE__ */ new Map(), yt = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, pt = /^(rgb|rgba|RGB|RGBA)/, Qn = (e) => {
  const n = yt.test(e), t = pt.test(e), s = e;
  return n || t || e ? s : (console.error("Color: Invalid color!"), "");
}, Kn = (e) => {
  const n = e.replace("#", ""), t = parseInt(n.substring(0, 2), 16), s = parseInt(n.substring(2, 4), 16), a = parseInt(n.substring(4, 6), 16);
  return [t, s, a];
}, Jn = (e) => e.replace(/rgb\(|rgba\(|\)/g, "").split(",").slice(0, 3).map(function(n) {
  return parseInt(n, 10);
}), Zn = (e) => {
  if (!e)
    return console.error("getRgbValue: Missing parameters!"), !1;
  const n = Qn(e);
  if (!n) return !1;
  const t = yt.test(n), s = pt.test(n), a = n.toLowerCase();
  if (t) return Kn(a);
  if (s) return Jn(a);
}, el = (e) => {
  if (!e)
    return console.error("getColorFromRgbValue: Missing parameters!"), !1;
  const n = e.length;
  if (n !== 3 && n !== 4)
    return console.error("getColorFromRgbValue: Value is illegal!"), !1;
  let t = n === 3 ? "rgb(" : "rgba(";
  return t += "".concat(e.join(","), ")"), t;
}, X = (e, n) => {
  const t = n || 100;
  if (!e)
    return console.error("fade: Missing parameters!"), !1;
  const s = Zn(e);
  if (!s) return !1;
  const a = [...s, t / 100];
  return el(a);
}, H = (e, n) => {
  const t = [];
  return e.forEach((s, a) => {
    n[a] ? t.push(n[a]) : t.push(s);
  }), t;
}, j = (e, n) => {
  if (e && !re.has(e)) {
    const t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s = new t(() => {
      n();
    });
    s.observe(e, {
      attributes: !0,
      childList: !0,
      attributeFilter: ["style"],
      attributeOldValue: !0,
      subtree: !0,
      characterData: !0
    }), re.set(e, s);
  }
}, _ = (e) => {
  if (e && re.has(e)) {
    const n = re.get(e);
    n.disconnect(), n.takeRecords(), re.delete(e);
  }
}, B = () => {
  const e = document.documentElement;
  return e ? getComputedStyle(e).getPropertyValue("--ibiz-color-primary") : null;
}, tl = (e) => e.filter((n) => typeof n == "number"), nl = (e) => tl(e).reduce((t, s) => t + s, 0), ll = (e, n) => {
  const t = Math.abs(e[0] - n[0]), s = Math.abs(e[1] - n[1]);
  return Math.sqrt(t * t + s * s);
}, at = (e) => {
  const t = new Array(e.length - 1).fill(0).map((s, a) => [e[a], e[a + 1]]).map((s) => ll(s[0], s[1]));
  return nl(t);
};
function oe(e, n, t, s) {
  let a = null;
  return function() {
    clearTimeout(a), a = setTimeout(() => {
      n.apply(t, s);
    }, e);
  };
}
function le(e, n) {
  const t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s = new t(n);
  return s.observe(e, {
    attributes: !0,
    childList: !0,
    attributeFilter: ["style"],
    attributeOldValue: !0,
    subtree: !0,
    characterData: !0
  }), s;
}
function lt(e, n, t) {
  const s = $(0), a = $(0);
  let o, r = null, d = null;
  const y = (v = !0) => new Promise((u) => {
    W(() => {
      d = e.value, s.value = e.value ? e.value.clientWidth : 0, a.value = e.value ? e.value.clientHeight : 0, e.value ? (!s.value || !a.value) && console.warn(
        "DataV: Component width or height is 0px, rendering abnormality may occur!"
      ) : console.warn(
        "DataV: Failed to get dom node, component rendering may be abnormal!"
      ), typeof n == "function" && v && n(), u(!0);
    });
  }), h = () => {
    o = oe(
      200,
      y,
      F(),
      null
    );
  }, f = () => {
    r = le(d, o), window.addEventListener(
      "resize",
      o
    );
  }, b = () => {
    r && (r.disconnect(), r.takeRecords(), r = null);
  }, c = async () => {
    await y(!1), h(), f(), typeof t == "function" && t();
  };
  return T(() => {
    c();
  }), Y(() => {
    b();
  }), Gt(c), jt(b), {
    width: s,
    height: a,
    initWH: y
  };
}
function ol(e, n) {
  let t = e;
  const s = Array.from({ length: n }, (a, o) => n - o).map((a) => {
    const o = 1 + Math.floor(Math.random() * (t / a * 2 - 1));
    return t -= o, o;
  });
  return s[n - 1] += t, s;
}
function sl(e) {
  const n = [];
  let t = 0;
  const s = e.length, a = e.sort((o, r) => r - o);
  for (; a.length > 1; ) {
    const o = a.pop(), r = a.pop();
    n[t] = r, n[s - (t + 1)] = o, t++;
  }
  return a.length === 1 && (n[t] = a.pop()), n;
}
function al(e, n) {
  let t = 0, s = 0, a = 0, o = 0;
  do
    t = Math.random() * 2 - 1, s = Math.random() * 2 - 1, a = t * t + s * s;
  while (a === 0 || a >= 1);
  return o = Math.sqrt(-2 * Math.log(a) / a), e + t * o * n;
}
function rl() {
  const e = Math.floor(Math.random() * 256), n = Math.floor(Math.random() * 256), t = Math.floor(Math.random() * 256);
  return "rgb(".concat(e, ",").concat(n, ",").concat(t, ")");
}
function rt(e) {
  const n = Math.floor(Math.random() * e.length);
  return e[n];
}
class il extends fe {
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
     * @description 获取主题色
     * @param {string} name
     * @memberof WaterLevelPondController
     */
    D(this, "getThemeVar", (t) => getComputedStyle(this.canvas).getPropertyValue(t));
  }
  async onInit() {
    super.onInit(), this.model.precision && ibiz.log.warn("滑动输入条不支持配置精度");
    const {
      SHAPE: t,
      WAVENUM: s,
      WAVEWIDTH: a,
      WAVEHEIGHT: o,
      WAVEOPACITY: r,
      SPEED: d,
      MAXITEM: y
    } = this.editorParams;
    t && (this.shape = t), s && (this.waveNum = se(s)), a && (this.waveWidth = se(a)), o && (this.waveHeight = se(o)), r && (this.waveOpacity = se(r)), d && (this.speed = se(d)), y && (this.maxItem = y);
  }
  /**
   * @description 绘制canvas
   * @param {HTMLCanvasElement} canvas
   * @memberof WaterLevelPondController
   */
  drawCanvas(t) {
    this.canvas = t, this.canvasWidth = t.scrollWidth, this.canvasHeight = t.offsetHeight, t.height = this.canvasHeight, t.width = this.canvasWidth, this.calcScale(t), this.nowRange = 0;
    const s = this.getThemeVar(
      "--ibiz-screen-dashboard-primary-color"
    ), a = X(s, this.waveOpacity);
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
    }), this.startDraw(t);
  }
  /**
   * @description 开始绘制
   * @param {HTMLCanvasElement} canvas
   * @memberof WaterLevelPondController
   */
  startDraw(t) {
    const s = t.getContext("2d");
    s.clearRect(0, 0, t.offsetWidth, t.offsetHeight), this.drawContainer(s), this.nowRange <= this.rangeValue && (this.nowRange += 1), this.nowRange > this.rangeValue && (this.nowRange -= 1), this.wave.update({
      nowRange: this.nowRange
    }), this.wave.draw(s), this.requestID = window.requestAnimationFrame(() => this.startDraw(t));
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
  drawContainer(t) {
    const s = this.shape;
    s === "circle" ? this.drawCircle(t) : s === "rect" && this.drawRect(t);
  }
  /**
   * @description 绘制圆
   * @param {CanvasRenderingContext2D} ctx
   * @memberof WaterLevelPondController
   */
  drawCircle(t) {
    const a = Math.min(this.canvasHeight, this.canvasWidth) / 2, o = 4, r = a - o, d = this.getThemeVar(
      "--ibiz-screen-dashboard-border-color"
    );
    t.lineWidth = o, t.beginPath(), t.arc(this.canvasWidth / 2, this.canvasHeight / 2, r, 0, 2 * Math.PI), t.strokeStyle = d, t.stroke(), t.clip();
  }
  /**
   * @description 绘制矩形
   * @param {CanvasRenderingContext2D} ctx
   * @memberof WaterLevelPondController
   */
  drawRect(t) {
    t.beginPath(), t.rect(
      10,
      10,
      this.canvasWidth - 2 * 10,
      this.canvasHeight - 2 * 10
    );
    const a = this.getThemeVar(
      "--ibiz-screen-dashboard-border-color"
    );
    t.strokeStyle = a, t.lineWidth = 2, t.closePath(), t.stroke(), t.clip();
  }
  /**
   * @description 计算缩放
   * @param {IData} canvas
   * @memberof WaterLevelPondController
   */
  calcScale(t) {
    const s = t.getContext("2d"), a = window.devicePixelRatio || 1, o = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1, r = a / o;
    if (a !== o) {
      const d = t.width, y = t.height;
      t.width = d * r, t.height = y * r, t.style.width = "".concat(d, "px"), t.style.height = "".concat(y, "px"), s.scale(r, r);
    }
  }
  /**
   * @description 设置值
   * @param {number} value
   * @memberof WaterLevelPondController
   */
  setDate(t) {
    this.rangeValue = t * 100;
  }
}
class ul {
  constructor() {
    D(this, "formEditor", "WaterLevelPond");
    D(this, "gridEditor", "WaterLevelPond");
  }
  async createController(n, t) {
    const s = new il(n, t);
    return await s.init(), s;
  }
}
const cl = x(
  xe,
  function(e) {
    e.component(xe.name, xe), ie(
      "SLIDER_WATER_LEVEL_POND",
      () => new ul()
    );
  }
), Ee = /* @__PURE__ */ I({
  name: "CustomImageSearchBox",
  props: Pt(),
  emits: et(),
  setup(e) {
    const n = P("custom-image-search-box"), t = e.controller, s = $(""), a = () => {
      if (e.controller.dashboard) {
        const r = e.controller.dashboard;
        r && r.refresh({
          query: s.value
        });
      }
    };
    return {
      c: t,
      ns: n,
      searchValue: s,
      onSearch: a,
      handleKeyUp: (r) => {
        r && r.code === "Enter" && a();
      }
    };
  },
  render() {
    var n;
    const e = (n = this.c.model.sysImage) == null ? void 0 : n.rawContent;
    return l("div", {
      class: [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : ""]
    }, [e ? l("img", {
      class: this.ns.e("image"),
      src: e
    }, null) : null, l(M("el-input"), {
      class: [this.ns.e("input"), e ? "has-image" : ""],
      modelValue: this.searchValue,
      "onUpdate:modelValue": (t) => this.searchValue = t,
      placeholder: this.c.placeholder,
      clearable: !1,
      "suffix-icon": l(M("ion-icon"), {
        onClick: this.onSearch,
        class: this.ns.e("search-icon"),
        name: "search"
      }, null),
      onKeyup: this.handleKeyUp
    }, null)]);
  }
});
class dl extends me {
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
      const { ctrlParams: t } = this.model.controlParam;
      t && t.PLACEHOLDER && (this.placeholder = t.PLACEHOLDER);
    }
  }
}
class vl {
  constructor() {
    D(this, "component", "CustomImageSearchBox");
  }
  async createController(n, t, s) {
    const a = new dl(
      n,
      t,
      s
    );
    return await a.init(), a;
  }
}
const fl = x(
  Ee,
  (e) => {
    e.component(Ee.name, Ee), de(
      "EDITOR_CUSTOMSTYLE_CUSTOM_IMAGE_SEARCH_BOX",
      () => new vl()
    );
  }
), it = /* @__PURE__ */ I({
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
    const n = P("custom-tag"), t = E(() => e.controller.customColorGroup.length > 0 ? rt(e.controller.customColorGroup) : rl()), s = E(() => e.controller.enableFontSizeRandom ? "".concat(al(e.controller.maxFontSize, e.controller.minFontSize), "px") : "".concat(e.controller.defaultFontSize, "px"));
    return {
      ns: n,
      setColor: t,
      normalSize: s,
      getRandomColorFromArray: rt
    };
  },
  render() {
    return l("a", {
      class: this.ns.b(),
      style: "color:".concat(this.setColor, ";font-size:").concat(this.normalSize)
    }, [this.tname]);
  }
});
class hl extends vt {
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
    var r;
    await super.onCreated();
    const {
      ENABLEFONTSIZERANDOM: t,
      RANDOMFONTSIZERANGE: s,
      DEFAULTFONTSIZE: a,
      CUSTOMCOLORGROUP: o
    } = (r = this.model.controlParam) == null ? void 0 : r.ctrlParams;
    if (t && (this.enableFontSizeRandom = JSON.parse(t)), s) {
      const d = JSON.parse(s), { min: y, max: h } = d;
      $e(y) && (this.minFontSize = y), $e(h) && (this.maxFontSize = h);
    }
    $e(a) && (this.defaultFontSize = a), o && (this.customColorGroup = JSON.parse(o));
  }
}
const Me = /* @__PURE__ */ I({
  name: "TaggedWall",
  component: [it],
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
    const e = tt((...o) => new hl(...o)), n = P("tagged-wall"), t = $([]), s = $([]), a = E(() => {
      const o = ol(s.value.length, 7);
      t.value = sl(o);
      const r = s.value.sort(() => Math.random() > 0.5 ? -1 : 1).concat();
      return t.value.map((d, y) => r.splice(0, d));
    });
    return N(() => e.state.items, () => {
      s.value = e.state.items;
    }), {
      c: e,
      ns: n,
      tags: a,
      tagList: s
    };
  },
  render() {
    return l("div", {
      class: this.ns.b()
    }, [l("div", {
      class: this.ns.e("tag-body")
    }, [l("div", {
      class: this.ns.e("tag-body-tags")
    }, [this.tags.map((e, n) => l("div", {
      key: n,
      class: this.ns.e("tag-body-tags-li")
    }, [e.map((t) => l(it, {
      key: t.id,
      tname: t.name,
      controller: this.c
    }, null))]))])])]);
  }
});
class ml {
  constructor() {
    D(this, "component", "TaggedWall");
  }
}
const $l = x(Me, function(e) {
  e.component(Me.name, Me), he(
    "LIST_RENDER_TAGGED_WALL",
    () => new ml()
  );
}), Be = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = [B() || "#0095ee", "#95d8f8"], s = ["left-top", "right-top", "left-bottom", "right-bottom"], a = $(), o = $(0), r = $(0), d = E(() => H(t, e.color || [])), y = "var(--ibiz-screen-dashboard-custom-dv-bg)", h = () => {
      const b = o.value - e.offsetX, c = r.value - e.offsetY, v = 8;
      return l("div", {
        class: [n.e("border-box")]
      }, [l("svg", {
        class: [n.e("border")],
        width: b,
        height: c
      }, [l("polygon", {
        fill: y,
        points: "10, 27 10, ".concat(r.value - 27 - e.offsetY, " 13, ").concat(r.value - 24 - e.offsetY, " 13, ").concat(r.value - 21 - e.offsetY, " 24, ").concat(r.value - 11 - e.offsetY, "\n        38, ").concat(r.value - 11 - e.offsetY, " 41, ").concat(r.value - 8 - e.offsetY, " 73, ").concat(r.value - 8 - e.offsetY, " 75, ").concat(r.value - 10 - e.offsetY, " 81, ").concat(r.value - 10 - e.offsetY, "\n        85, ").concat(r.value - 6 - e.offsetY, " ").concat(o.value - 85, ", ").concat(r.value - 6 - e.offsetY, " ").concat(o.value - 81, ", ").concat(r.value - 10 - e.offsetY, " ").concat(o.value - 75, ", ").concat(r.value - 10 - e.offsetY, "\n        ").concat(o.value - 73, ", ").concat(r.value - 8 - e.offsetY, " ").concat(o.value - 41, ", ").concat(r.value - 8 - e.offsetY, " ").concat(o.value - 38, ", ").concat(r.value - 11 - e.offsetY, "\n        ").concat(o.value - 24, ", ").concat(r.value - 11 - e.offsetY, " ").concat(o.value - 13, ", ").concat(r.value - 21 - e.offsetY, " ").concat(o.value - 13, ", ").concat(r.value - 24 - e.offsetY, "\n        ").concat(o.value - 10, ", ").concat(r.value - 27 - e.offsetY, " ").concat(o.value - 10, ", 27 ").concat(o.value - 13, ", 25 ").concat(o.value - 13, ", 21\n        ").concat(o.value - 24, ", 11 ").concat(o.value - 38, ", 11 ").concat(o.value - 41, ", 8 ").concat(o.value - 73, ", 8 ").concat(o.value - 75, ", 10\n        ").concat(o.value - 81, ", 10 ").concat(o.value - 85, ", 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24")
      }, null)]), s.map((u) => l("svg", {
        key: u,
        class: [n.e(u), n.e("border")]
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
      W(() => {
        const b = a.value;
        b && (o.value = b.clientWidth, r.value = b.clientHeight);
      });
    };
    return T(() => {
      f(), j(a.value, f), window.addEventListener("resize", f);
    }), Y(() => {
      _(a.value), window.removeEventListener("resize", f);
    }), {
      ns: n,
      customDv1: a,
      renderBorder: h
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv1",
      class: [this.ns.b(), this.ns.is("style-1", !0)],
      style: "--ibiz-style-1-offsetY:".concat(this.offsetY, "px")
    }, [l("div", {
      class: this.ns.e("wrapper")
    }, [this.renderBorder()]), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), gl = x(Be, function(e) {
  e.component(Be.name, Be);
}), ze = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = E(() => H(t, e.color || [])), d = "var(--ibiz-screen-dashboard-custom-dv-bg)", y = () => {
      const f = a.value - e.offsetX, b = o.value - e.offsetY, c = 8;
      return l("svg", {
        class: [n.em("border-svg", "container")],
        width: f,
        height: b,
        style: "--ibiz-style-2-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: d,
        points: "\n            ".concat(7 + c, ", ").concat(7 + c, " \n            ").concat(a.value - 7 - c, ", ").concat(7 + c, " \n            ").concat(a.value - 7 - c, ", ").concat(o.value - 7 - e.offsetY - c, " \n            ").concat(7 + c, ", ").concat(o.value - 7 - c - e.offsetY, "\n          ")
      }, null), l("polyline", {
        stroke: r.value[0],
        points: "\n            ".concat(2 + c, ", ").concat(2 + c, " \n            ").concat(a.value - 2 - c, ", ").concat(2 + c, " \n            ").concat(a.value - 2 - c, ", ").concat(o.value - 2 - e.offsetY - c, " \n            ").concat(2 + c, ", ").concat(o.value - 2 - e.offsetY - c, " \n            ").concat(2 + c, ", ").concat(2 + c, "\n          ")
      }, null), l("polyline", {
        stroke: r.value[1],
        points: "\n            ".concat(6 + c, ", ").concat(6 + c, " \n            ").concat(a.value - 6 - c, ", ").concat(6 + c, " \n            ").concat(a.value - 6 - c, ", ").concat(o.value - 6 - c - e.offsetY, " \n            ").concat(6 + c, ", ").concat(o.value - 6 - e.offsetY - c, " \n            ").concat(6 + c, ", ").concat(6 + c, "\n          ")
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
        cy: "".concat(o.value - 11 - c - e.offsetY),
        r: "1"
      }, null), l("circle", {
        fill: r.value[0],
        cx: "".concat(11 + c),
        cy: "".concat(o.value - 11 - c - e.offsetY),
        r: "1"
      }, null)]);
    }, h = () => {
      W(() => {
        const f = s.value;
        f && (a.value = f.clientWidth, o.value = f.clientHeight);
      });
    };
    return T(() => {
      h(), j(s.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", h);
    }), {
      ns: n,
      customDv2: s,
      renderBorder: y
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv2",
      class: [this.ns.b(), this.ns.is("style-2", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), bl = x(ze, function(e) {
  e.component(ze.name, ze);
}), Te = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = E(() => H(t, e.color || [])), d = "var(--ibiz-screen-dashboard-custom-dv-bg)", y = () => {
      const f = a.value - e.offsetX, b = o.value - e.offsetY, c = 8;
      return l("svg", {
        class: [n.em("border-svg", "container")],
        width: f,
        height: b,
        style: "--ibiz-style-3-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: d,
        points: "\n            ".concat(23 + c, ", ").concat(23 + c, " \n            ").concat(a.value - 24 - c, ", ").concat(23 + c, " \n            ").concat(a.value - 24 - c, ", ").concat(o.value - 24 - e.offsetY - c, " \n            ").concat(23 + c, ", ").concat(o.value - 24 - e.offsetY - c, "\n          ")
      }, null), l("polyline", {
        class: [n.e("bb3-line1")],
        stroke: r.value[0],
        points: "\n            ".concat(4 + c, ", ").concat(4 + c, " \n            ").concat(a.value - 22 - c, ", ").concat(4 + c, " \n            ").concat(a.value - 22 - c, ", ").concat(o.value - 22 - e.offsetY - c, " \n            ").concat(4 + c, ", ").concat(o.value - 22 - e.offsetY - c, " \n            ").concat(4 + c, ", ").concat(4 + c, "\n          ")
      }, null), l("polyline", {
        class: [n.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(10 + c, ", ").concat(10 + c, " \n            ").concat(a.value - 16 - c, ", ").concat(10 + c, " \n            ").concat(a.value - 16 - c, ", ").concat(o.value - 16 - e.offsetY - c, " \n            ").concat(10 + c, ", ").concat(o.value - 16 - e.offsetY - c, " \n            ").concat(10 + c, ", ").concat(10 + c, "\n          ")
      }, null), l("polyline", {
        class: [n.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(16 + c, ", ").concat(16 + c, " \n            ").concat(a.value - 10 - c, ", ").concat(16 + c, " \n            ").concat(a.value - 10 - c, ", ").concat(o.value - 10 - e.offsetY - c, " \n            ").concat(16 + c, ", ").concat(o.value - 10 - e.offsetY - c, " \n            ").concat(16 + c, ", ").concat(16 + c, "\n          ")
      }, null), l("polyline", {
        class: [n.e("bb3-line2")],
        stroke: r.value[1],
        points: "\n            ".concat(22 + c, ", ").concat(22 + c, " \n            ").concat(a.value - 4 - c, ", ").concat(22 + c, " \n            ").concat(a.value - 4 - c, ", ").concat(o.value - 4 - e.offsetY - c, " \n            ").concat(22 + c, ", ").concat(o.value - 4 - e.offsetY - c, " \n            ").concat(22 + c, ", ").concat(22 + c, "\n          ")
      }, null)]);
    }, h = () => {
      W(() => {
        const f = s.value;
        f && (a.value = f.clientWidth, o.value = f.clientHeight);
      });
    };
    return T(() => {
      h(), j(s.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", h);
    }), {
      ns: n,
      customDv3: s,
      renderBorder: y
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv3",
      class: [this.ns.b(), this.ns.is("style-3", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), yl = x(Te, function(e) {
  e.component(Te.name, Te);
}), Ne = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = $([]);
    let r, d;
    const y = "var(--ibiz-screen-dashboard-custom-dv-bg)", h = () => new Promise((g) => {
      W(() => {
        const p = a.value;
        t.value = p ? p.offsetWidth : 0, s.value = p ? p.offsetHeight : 0, p ? (!t.value || !s.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), g();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const g = a.value;
      d = le(g, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), o.value = [B() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      o.value = [];
      const g = [B() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          o.value[p] = e.color[p];
        o.value.length < 2 && o.value.push("rgba(0,0,255,0.7)");
      } else
        o.value = g;
    };
    N(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const g = t.value - e.offsetX, p = s.value - e.offsetY, i = 8;
      return l("svg", {
        class: [n.e("svg-container"), {
          [n.e("de-reverse")]: e.reverse
        }],
        width: g,
        height: p,
        style: "--ibiz-style-4-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(t.value - 15 - i, ", ").concat(22 + i, " \n            ").concat(170 - i, ", ").concat(22 + i, " \n            ").concat(150 - i, ", ").concat(7 + i, " \n            ").concat(40 - i, ", ").concat(7 + i, " \n            ").concat(40 - i, ", ").concat(28 + i, " \n            ").concat(21 - i, ", ").concat(32 + i, " \n            ").concat(16 - i, ", ").concat(42 + i, " \n            ").concat(16 - i, ", ").concat(s.value - 32 - e.offsetY + i, " \n            ").concat(41 - i, ", ").concat(s.value - 7 - e.offsetY + i, " \n            ").concat(t.value - 15 - i, ", ").concat(s.value - 7 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-1",
        stroke: o.value[0],
        points: "\n            ".concat(145 - i, ", ").concat(s.value - 5 - e.offsetY + i, " \n            ").concat(40 - i, ", ").concat(s.value - 5 - e.offsetY + i, " \n            ").concat(10 - i, ", ").concat(s.value - 35 - e.offsetY + i, " \n            ").concat(10 - i, ", ").concat(40 + i, " \n            ").concat(40 - i, ", ").concat(5 + i, " \n            ").concat(150 - i, ", ").concat(5 + i, " \n            ").concat(170 - i, ", ").concat(20 + i, " \n            ").concat(t.value - 15 - i, ", ").concat(20 + i, "\n          ")
      }, null), l("polyline", {
        stroke: o.value[1],
        class: "dv-bb4-line-2",
        points: "\n            ".concat(245 - i, ", ").concat(s.value - 1 - e.offsetY + i, " \n            ").concat(36 - i, ", ").concat(s.value - 1 - e.offsetY + i, " \n            ").concat(14 - i, ", ").concat(s.value - 23 - e.offsetY + i, " \n            ").concat(14 - i, ", ").concat(s.value - 100 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-3",
        stroke: o.value[0],
        points: "\n            ".concat(7 - i, ", ").concat(s.value - 40 - e.offsetY + i, " \n            ").concat(7 - i, ", ").concat(s.value - 75 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-4",
        stroke: o.value[0],
        points: "\n            ".concat(28 - i, ", ").concat(24 + i, " \n            ").concat(13 - i, ", ").concat(41 + i, " \n            ").concat(13 - i, ", ").concat(64 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-5",
        stroke: o.value[0],
        points: "\n            ".concat(5 - i, ", ").concat(45 + i, " \n            ").concat(5 - i, ", ").concat(140 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-6",
        stroke: o.value[1],
        points: "\n            ".concat(14 - i, ", ").concat(75 + i, " \n            ").concat(14 - i, ", ").concat(100 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-7",
        stroke: o.value[1],
        points: "\n            ".concat(55 - i, ", ").concat(11 + i, " \n            ").concat(147 - i, ", ").concat(11 + i, " \n            ").concat(167 - i, ", ").concat(26 + i, " \n            ").concat(250 - i, ", ").concat(26 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-8",
        stroke: o.value[1],
        points: "\n            ".concat(158 - i, ", ").concat(5 + i, " \n            ").concat(173 - i, ", ").concat(16 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-9",
        stroke: o.value[0],
        points: "\n            ".concat(200 - i, ", ").concat(17 + i, " \n            ").concat(t.value - 10 - i, ", ").concat(17 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb4-line-10",
        stroke: o.value[1],
        points: "\n            ".concat(385 - i, ", ").concat(17 + i, " \n            ").concat(t.value - 10 - i, ", ").concat(17 + i, "\n          ")
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const g = F();
      g && typeof g.afterAutoResizeMixinInit == "function" && g.afterAutoResizeMixinInit();
    };
    return T(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: n,
      myElement: a
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-4", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), pl = x(Ne, function(e) {
  e.component(Ne.name, Ne);
}), We = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = $([]);
    let r, d;
    const y = "var(--ibiz-screen-dashboard-custom-dv-bg)", h = () => new Promise((g) => {
      W(() => {
        const p = a.value;
        t.value = p ? p.offsetWidth : 0, s.value = p ? p.offsetHeight : 0, p ? (!t.value || !s.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), g();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const g = a.value;
      d = le(g, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), o.value = [B() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      o.value = [];
      const g = [B() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          o.value[p] = e.color[p];
        o.value.length < 2 && o.value.push("rgba(0,0,255,0.7)");
      } else
        o.value = g;
    };
    N(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const g = t.value - e.offsetX, p = s.value - e.offsetY, i = 8;
      return l("svg", {
        class: [n.e("svg-container"), {
          [n.e("de-reverse")]: e.reverse
        }],
        width: g,
        height: p,
        style: "--ibiz-style-5-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(10 + i, ", ").concat(22 + i, " \n            ").concat(t.value - 22 - i, ", ").concat(22 + i, " \n            ").concat(t.value - 22 - i, ", ").concat(s.value - 86 - e.offsetY + i, " \n            ").concat(t.value - 84 - i, ", ").concat(s.value - 24 - e.offsetY + i, " \n            ").concat(10 + i, ", ").concat(s.value - 24 - e.offsetY + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-1",
        stroke: o.value[0],
        points: "\n            ".concat(8 + i, ", ").concat(5 + i, " \n            ").concat(t.value - 5 - i, ", ").concat(5 + i, " \n            ").concat(t.value - 5 - i, ", ").concat(s.value - 100 - i, " \n            ").concat(t.value - 100 - i, ", ").concat(s.value - 5 - e.offsetY - i, " \n            ").concat(8 + i, ", ").concat(s.value - 5 - e.offsetY - i, " \n            ").concat(8 + i, ", ").concat(5 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-2",
        stroke: o.value[1],
        points: "\n            ".concat(3 + i, ", ").concat(5 + i, " \n            ").concat(t.value - 20 - i, ", ").concat(5 + i, " \n            ").concat(t.value - 20 - i, ", ").concat(s.value - 60 - e.offsetY - i, " \n            ").concat(t.value - 74 - i, ", ").concat(s.value - 5 - e.offsetY - i, " \n            ").concat(3 + i, ", ").concat(s.value - 5 - e.offsetY - i, " \n            ").concat(3 + i, ", ").concat(5 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-3",
        stroke: o.value[1],
        points: "\n            ".concat(50 + i, ", ").concat(13 + i, " \n            ").concat(t.value - 35 - i, ", ").concat(13 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-4",
        stroke: o.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(20 + i, " \n            ").concat(t.value - 35 - i, ", ").concat(20 + i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-5",
        stroke: o.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(s.value - 20 - e.offsetY - i, " \n            ").concat(t.value - 110 - i, ", ").concat(s.value - 20 - e.offsetY - i, "\n          ")
      }, null), l("polyline", {
        class: "dv-bb5-line-6",
        stroke: o.value[1],
        points: "\n            ".concat(15 + i, ", ").concat(s.value - 13 - e.offsetY - i, " \n            ").concat(t.value - 110 - i, ", ").concat(s.value - 13 - e.offsetY - i, "\n          ")
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const g = F();
      g && typeof g.afterAutoResizeMixinInit == "function" && g.afterAutoResizeMixinInit();
    };
    return T(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: n,
      myElement: a
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-5", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), wl = x(We, function(e) {
  e.component(We.name, We);
}), Ae = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = $([]);
    let r, d;
    const y = "var(--ibiz-screen-dashboard-custom-dv-bg)", h = () => new Promise((g) => {
      W(() => {
        const p = a.value;
        t.value = p ? p.offsetWidth : 0, s.value = p ? p.offsetHeight : 0, p ? (!t.value || !s.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), g();
      });
    }), f = () => {
      r = oe(100, h, F(), null);
    }, b = () => {
      const g = a.value;
      d = le(g, r), window.addEventListener("resize", r);
    }, c = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, v = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), o.value = [B() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      o.value = [];
      const g = [B() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let p = 0; p < e.color.length; p++)
          o.value[p] = e.color[p];
        o.value.length < 2 && o.value.push("rgba(0,0,255,0.7)");
      } else
        o.value = g;
    };
    N(() => e.color, () => {
      v();
    }, {
      deep: !0,
      immediate: !0
    });
    const u = () => {
      const g = t.value - e.offsetX, p = s.value - e.offsetY, i = 8;
      return l("svg", {
        class: [n.e("svg-container"), {
          [n.e("de-reverse")]: e.reverse
        }],
        width: g,
        height: p,
        style: "--ibiz-style-6-offsetY:".concat(e.offsetY, "px")
      }, [l("polygon", {
        fill: y,
        points: "\n            ".concat(9 + i, ", ").concat(7 + i, " \n            ").concat(g - 9 - i, ", ").concat(7 + i, " \n            ").concat(g - 9 - i, ", ").concat(p - 7 - i, " \n            ").concat(9 + i, ", ").concat(p - 7 - i, "\n          ")
      }, null), l("circle", {
        fill: o.value[1],
        cx: 5 + i,
        cy: 5 + i,
        r: 2
      }, null), l("circle", {
        fill: o.value[1],
        cx: g - 5 - i,
        cy: 5 + i,
        r: 2
      }, null), l("circle", {
        fill: o.value[1],
        cx: g - 5 - i,
        cy: p - 5 - i,
        r: 2
      }, null), l("circle", {
        fill: o.value[1],
        cx: 5 + i,
        cy: p - 5 - i,
        r: 2
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(10 + i, ", 4 ").concat(g - 10 - i, ", 4")
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(10 + i, ", ").concat(p - 4 - i, " ").concat(g - 10 - i, ", ").concat(p - 4 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(5 + i, ", 70 ").concat(5 + i, ", ").concat(p - 70 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(g - 5 - i, ", 70 ").concat(g - 5 - i, ", ").concat(p - 70 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(3 + i, ", 10 ").concat(3 + i, ", 50")
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(7 + i, ", 30 ").concat(7 + i, ", 80")
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(g - 3 - i, ", 10 ").concat(g - 3 - i, ", 50")
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(g - 7 - i, ", 30 ").concat(g - 7 - i, ", 80")
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(3 + i, ", ").concat(p - 10 - i, " ").concat(3 + i, ", ").concat(p - 50 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(7 + i, ", ").concat(p - 30 - i, " ").concat(7 + i, ", ").concat(p - 80 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(g - 3 - i, ", ").concat(p - 10 - i, " ").concat(g - 3 - i, ", ").concat(p - 50 - i)
      }, null), l("polyline", {
        stroke: o.value[0],
        points: " ".concat(g - 7 - i, ", ").concat(p - 30 - i, " ").concat(g - 7 - i, ", ").concat(p - 80 - i)
      }, null)]);
    }, m = async () => {
      await h(), f(), b();
      const g = F();
      g && typeof g.afterAutoResizeMixinInit == "function" && g.afterAutoResizeMixinInit();
    };
    return T(() => {
      v(), m();
    }), q(() => {
      c();
    }), {
      renderBorder: u,
      ns: n,
      myElement: a
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-6", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Cl = x(Ae, function(e) {
  e.component(Ae.name, Ae);
}), Oe = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = "var(--ibiz-screen-dashboard-border-color)";
    let r, d;
    const y = () => {
      const u = a.value;
      u && (t.value = u ? u.offsetWidth : 0, s.value = u ? u.offsetHeight : 0);
    }, h = () => {
      r = Xt(y, 100);
    }, f = () => {
      const u = a.value;
      d = le(u, r), window.addEventListener("resize", r);
    }, b = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, c = () => {
      const u = t.value - e.offsetX, m = s.value - e.offsetY, g = 8, p = 25, i = 10;
      return l("svg", {
        class: [n.e("svg-container")],
        width: u,
        height: m,
        style: "--ibiz-style-7-offsetY:".concat(e.offsetY, "px")
      }, [l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: o,
        points: "".concat(g, ", ").concat(g + p, " ").concat(g, ", ").concat(g, " ").concat(g + p, ", ").concat(g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: o,
        points: "".concat(u - p - g, ", ").concat(g, " ").concat(u - g, ", ").concat(g, " ").concat(u - g, ", ").concat(g + p)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: o,
        points: "".concat(u - p - g, ", ").concat(m - g, " ").concat(u - g, ", ").concat(m - g, " ").concat(u - g, ", ").concat(m - p - g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-2",
        stroke: o,
        points: "".concat(g, ", ").concat(m - p - g, " ").concat(g, ", ").concat(m - g, " ").concat(p + g, ", ").concat(m - g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: o,
        points: "".concat(g, ", ").concat(i + g, " ").concat(g, ", ").concat(g, " ").concat(i + g, ", ").concat(g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: o,
        points: "".concat(u - i - g, ", ").concat(g, " ").concat(u - g, ", ").concat(g, " ").concat(u - g, ", ").concat(i + g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: o,
        points: "".concat(u - i - g, ", ").concat(m - g, " ").concat(u - g, ", ").concat(m - g, " ").concat(u - g, ", ").concat(m - i - g)
      }, null), l("polyline", {
        class: "dv-bb7-line-width-5",
        stroke: o,
        points: "".concat(g, ", ").concat(m - i - g, " ").concat(g, ", ").concat(m - g, " ").concat(g + i, ", ").concat(m - g)
      }, null)]);
    }, v = async () => {
      await y(), h(), f();
      const u = F();
      u && typeof u.afterAutoResizeMixinInit == "function" && u.afterAutoResizeMixinInit();
    };
    return T(() => {
      v();
    }), q(() => {
      b();
    }), {
      renderBorder: c,
      ns: n,
      myElement: a,
      mergedColor: o
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-7", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Dl = x(Oe, function(e) {
  e.component(Oe.name, Oe);
}), Ye = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = $([]);
    let r, d;
    const y = te(), h = "border-box-8-path-".concat(y), f = "border-box-8-gradient-".concat(y), b = "border-box-8-mask-".concat(y), c = "var(--ibiz-screen-dashboard-custom-dv-bg)", v = E(() => (t.value + s.value - e.offsetY - 5) * 2), u = (L) => e.reverse ? "M ".concat(2.5 + L, ",").concat(2.5 + L, " L ").concat(2.5 + L, ",").concat(s.value - 2.5 - e.offsetY - L, " L ").concat(t.value - 2.5 - L, ",").concat(s.value - 2.5 - e.offsetY - L, " L ").concat(t.value - 2.5 - L, ",").concat(2.5 + L, " Z") : "M ".concat(2.5 + L, ",").concat(2.5 + L, " L ").concat(t.value - 2.5 - L, ",").concat(2.5 + L, " L ").concat(t.value - 2.5 - L, ",").concat(s.value - 2.5 - e.offsetY - L, " L ").concat(2.5 + L, ",").concat(s.value - 2.5 - e.offsetY - L, " Z"), m = () => new Promise((L) => {
      W(() => {
        const w = a.value;
        t.value = w ? w.offsetWidth : 0, s.value = w ? w.offsetHeight : 0, w ? (!t.value || !s.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), L();
      });
    }), g = () => {
      r = oe(100, m, F(), null);
    }, p = () => {
      const L = a.value;
      d = le(L, r), window.addEventListener("resize", r);
    }, i = () => {
      d && (d.disconnect(), d.takeRecords(), d = null, window.removeEventListener("resize", r));
    }, R = () => {
      if (!Array.isArray(e.color)) {
        console.warn("颜色配置错误，需要一个数组"), o.value = [B() || "#123afc", "rgba(0,0,255,0.7)"];
        return;
      }
      o.value = [];
      const L = [B() || "#123afc", "rgba(0,0,255,0.7)"];
      if (e.color.length > 0) {
        for (let w = 0; w < e.color.length; w++)
          o.value[w] = e.color[w];
        o.value.length < 2 && o.value.push("rgba(0,0,255,0.7)");
      } else
        o.value = L;
    };
    N(() => e.color, () => {
      R();
    }, {
      deep: !0,
      immediate: !0
    });
    const C = () => {
      const L = t.value - e.offsetX, w = s.value - e.offsetY, S = 8;
      return l("svg", {
        class: [n.e("svg-container")],
        width: L,
        height: w,
        style: "--ibiz-style-8-offsetY:".concat(e.offsetY, "px")
      }, [l("defs", null, [l("path", {
        id: h,
        d: u(S),
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
        d: u(S),
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
        points: "".concat(5 + S, ", ").concat(5 + S, " ").concat(t.value - 5 - S, ", ").concat(5 + S, " ").concat(t.value - 5 - S, " ").concat(s.value - 5 - e.offsetY - S, ", ").concat(5 + S, ", ").concat(s.value - 5 - e.offsetY - S)
      }, null), l("use", {
        stroke: o.value[0],
        "stroke-width": "1",
        "xlink:href": "#".concat(h)
      }, null), l("use", {
        stroke: o.value[1],
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
    }, V = async () => {
      await m(), g(), p();
      const L = F();
      L && typeof L.afterAutoResizeMixinInit == "function" && L.afterAutoResizeMixinInit();
    };
    return T(() => {
      R(), V();
    }), q(() => {
      i();
    }), {
      renderBorder: C,
      ns: n,
      myElement: a
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-8", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), kl = x(Ye, function(e) {
  e.component(Ye.name, Ye);
}), He = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = te(), s = $("border-box-9-gradient-".concat(t)), a = $("border-box-9-mask-".concat(t)), o = [B() || "#0095ee", "#95d8f8"], r = $(), d = $(0), y = $(0), h = E(() => H(o, e.color || [])), f = "var(--ibiz-screen-dashboard-custom-dv-bg)", b = () => {
      const v = d.value - e.offsetX, u = y.value - e.offsetY, m = 8;
      return l("svg", {
        class: [n.em("border-svg", "container")],
        width: v,
        height: u,
        style: "--ibiz-style-9-offsetY:".concat(e.offsetY, "px")
      }, [l("defs", null, [l("linearGradient", {
        id: s.value,
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
        height: u,
        fill: "url(#".concat(s.value, ")"),
        mask: "url(#".concat(a.value, ")")
      }, null)]);
    }, c = () => {
      W(() => {
        const v = r.value;
        v && (d.value = v.clientWidth, y.value = v.clientHeight);
      });
    };
    return T(() => {
      c(), j(r.value, c), window.addEventListener("resize", c);
    }), Y(() => {
      _(r.value), window.removeEventListener("resize", c);
    }), {
      ns: n,
      customDv9: r,
      renderBorder: b
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv9",
      class: [this.ns.b(), this.ns.is("style-9", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Sl = x(He, function(e) {
  e.component(He.name, He);
}), Ve = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = ["left-top", "right-top", "left-bottom", "right-bottom"], s = [B() || "#0095ee", "#95d8f8"], a = $(), o = $(0), r = $(0), d = E(() => H(s, e.color || [])), y = "var(--ibiz-screen-dashboard-custom-dv-bg)", h = $(e.offsetY), f = $(8), b = () => l("div", {
      class: [n.e("border-box")]
    }, [t.map((v) => l("svg", {
      width: "150px",
      height: "".concat(150 - e.offsetY / 2, "px"),
      key: v,
      class: [n.e(v), n.em("border-svg", "container")]
    }, [l("polygon", {
      fill: d.value[1],
      points: "\n               ".concat(40 + f.value, ", ").concat(0 + f.value, " \n               ").concat(5 + f.value, ", ").concat(0 + f.value, " \n               ").concat(0 + f.value, ", ").concat(5 + f.value, " \n               ").concat(0 + f.value, ", ").concat(16 + f.value, " \n               ").concat(3 + f.value, ", ").concat(19 + f.value, " \n               ").concat(3 + f.value, ", ").concat(7 + f.value, " \n               ").concat(7 + f.value, ", ").concat(3 + f.value, " \n               ").concat(35 + f.value, ", ").concat(3 + f.value, "\n             ")
    }, null)]))]), c = () => {
      W(() => {
        const v = a.value;
        v && (o.value = v.clientWidth, r.value = v.clientHeight);
      });
    };
    return T(() => {
      c(), j(a.value, c), window.addEventListener("resize", c);
    }), Y(() => {
      _(a.value), window.removeEventListener("resize", c);
    }), {
      ns: n,
      customDv10: a,
      mergedColor: d,
      renderBorder: b,
      backgroundColor: y,
      padding: f,
      offsety: h
    };
  },
  render() {
    var e, n;
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
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Rl = x(Ve, function(e) {
  e.component(Ve.name, Ve);
}), Fe = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = te(), s = [B() || "#0095ee", "#95d8f8"], a = $("".concat(n.b(), "-filterId-").concat(t)), o = $(), r = $(0), d = $(0), y = E(() => H(s, e.color || [])), h = "var(--ibiz-screen-dashboard-custom-dv-bg)", f = () => {
      const c = r.value - e.offsetX, v = d.value - e.offsetY, u = 8;
      return l("svg", {
        class: [n.em("border-svg", "container")],
        width: c,
        height: v
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
        fill: X(y.value[1] || s[1], 30) || "",
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
      W(() => {
        const c = o.value;
        c && (r.value = c.clientWidth, d.value = c.clientHeight);
      });
    };
    return T(() => {
      b(), j(o.value, b), window.addEventListener("resize", b);
    }), Y(() => {
      _(o.value), window.removeEventListener("resize", b);
    }), {
      ns: n,
      customDv11: o,
      renderBorder: f
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv11",
      class: [this.ns.b(), this.ns.is("style-11", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Ll = x(Fe, function(e) {
  e.component(Fe.name, Fe);
}), Ge = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = $(0), s = $(0), a = $(), o = $([]);
    let r, d;
    const y = te(), h = "borderr-box-12-filterId-".concat(y), f = "var(--ibiz-screen-dashboard-custom-dv-bg)", b = () => new Promise((i) => {
      W(() => {
        const R = a.value;
        t.value = R ? R.offsetWidth : 0, s.value = R ? R.offsetHeight : 0, R ? (!t.value || !s.value) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), i();
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
        console.warn("颜色配置错误，需要一个数组"), o.value = [B() || "#123afc", "#0000FF"];
        return;
      }
      o.value = [];
      const i = [B() || "#123afc", "#0000FF"];
      if (e.color.length > 0) {
        for (let R = 0; R < e.color.length; R++)
          o.value[R] = e.color[R];
        o.value.length < 2 && o.value.push("#0000FF");
      } else
        o.value = i;
    };
    N(() => e.color, () => {
      m();
    }, {
      deep: !0,
      immediate: !0
    });
    const g = () => {
      const i = t.value - e.offsetX, R = s.value - e.offsetY, C = 8;
      return l("svg", {
        class: [n.e("svg-container")],
        width: i,
        height: R,
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
        "flood-color": "rgba(".concat(o.value[1] || e.color[1], ",0.7)"),
        result: "glowColor"
      }, [l("animate", {
        attributeName: "flood-color",
        values: "\n                rgba(".concat(o.value[1] || e.color[1], ",0.7);\n                rgba(").concat(o.value[1] || e.color[1], ",0.3);\n                rgba(").concat(o.value[1] || e.color[1], ",0.7);\n              "),
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
      }, null)])])]), i && R ? l("path", {
        fill: f,
        "stroke-width": 2,
        stroke: o.value[0],
        d: "\n        M ".concat(15 + C, " 5 L ").concat(i - 15 - C, " 5 Q ").concat(i - 5 - C, " 5, ").concat(i - 5 - C, " 15\n        L ").concat(i - 5 - C, " ").concat(R - 15 - C, " Q ").concat(i - 5 - C, " ").concat(R - 5 - C, ", ").concat(i - 15 - C, " ").concat(R - 5 - C, "\n        L ").concat(15 + C, ", ").concat(R - 5 - C, " Q ").concat(5 + C, " ").concat(R - 5 - C, " ").concat(5 + C, " ").concat(R - 15 - C, " L ").concat(5 + C, " 15\n        Q ").concat(5 + C, " 5 ").concat(15 + C, " 5\n      ")
      }, null) : null, l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: o.value[1],
        d: "M ".concat(20 + C, " 5 L ").concat(15 + C, " 5 Q ").concat(5 + C, " 5 ").concat(5 + C, " 15 L ").concat(5 + C, " ").concat(R - 5 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: o.value[1],
        d: "M ".concat(i - 20 - C, " 5 L ").concat(i - 15 - C, " 5 Q ").concat(i - 5 - C, " 5 ").concat(i - 5 - C, " 15 L ").concat(i - 5 - C, " ").concat(R - 5 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: o.value[1],
        d: "M ".concat(i - 20 - C, " ").concat(R - 5 - C, " L ").concat(i - 15 - C, " ").concat(R - 5 - C, " Q ").concat(i - 5 - C, " ").concat(R - 5 - C, " ").concat(i - 5 - C, " ").concat(R - 15 - C, " L ").concat(i - 5 - C, " ").concat(R - 20 - C)
      }, null), l("path", {
        "stroke-width": 2,
        fill: "transparent",
        "stroke-linecap": "round",
        filter: "url(#".concat(h, ")"),
        stroke: o.value[1],
        d: "M ".concat(20 + C, " ").concat(R - 5 - C, " L ").concat(15 + C, " ").concat(R - 5 - C, " Q ").concat(5 + C, " ").concat(R - 5 - C, " ").concat(5 + C, " ").concat(R - 15 - C, " L ").concat(5 + C, " ").concat(R - 20 - C)
      }, null)]);
    }, p = async () => {
      await b(), c(), v();
      const i = F();
      i && typeof i.afterAutoResizeMixinInit == "function" && i.afterAutoResizeMixinInit();
    };
    return T(() => {
      m(), p();
    }), q(() => {
      u();
    }), {
      renderBorder: g,
      ns: n,
      myElement: a
    };
  },
  render() {
    var e, n;
    return l("div", {
      class: [this.ns.b(), this.ns.is("style-12", !0)],
      ref: (t) => {
        this.myElement = t;
      }
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Il = x(Ge, function(e) {
  e.component(Ge.name, Ge);
}), je = /* @__PURE__ */ I({
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
    const n = P("custom-border"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = E(() => H(t, e.color || [])), d = "var(--ibiz-screen-dashboard-custom-dv-bg)", y = () => {
      const f = a.value - e.offsetX, b = o.value - e.offsetY, c = 8;
      return l("svg", {
        class: [n.em("border-svg", "container")],
        width: f,
        height: b,
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
      W(() => {
        const f = s.value;
        f && (a.value = f.clientWidth, o.value = f.clientHeight);
      });
    };
    return T(() => {
      h(), j(s.value, h), window.addEventListener("resize", h);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", h);
    }), {
      ns: n,
      customDv13: s,
      renderBorder: y
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDv13",
      class: [this.ns.b(), this.ns.is("style-13", !0)]
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Pl = x(je, function(e) {
  e.component(je.name, je);
}), _e = /* @__PURE__ */ I({
  name: "CustomDecoration1",
  props: {
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const n = P("custom-decoration-1"), t = $(), s = $([20, 50]), a = $(4), o = $(20), r = $(2.5), d = $(r.value / 2), y = [B() || "#0095ee", "#95d8f8"], h = E(() => H(y, e.color || [])), f = $([]), b = $([]), c = $([1, 1]), v = () => {
      const [L, w] = s.value, S = L / (o.value + 1), k = w / (a.value + 1), z = Array.from({
        length: a.value
      }).fill(0).map((O, G) => Array.from({
        length: o.value
      }).fill(0).map((ne, Q) => [S * (Q + 1), k * (G + 1)]));
      b.value = z.reduce((O, G) => [...O, ...G], []);
    }, u = () => {
      const L = b.value[o.value * 2 - 1], w = b.value[o.value * 2 - 3];
      f.value = [L, w];
    }, m = () => {
      C();
    }, g = () => {
      C();
    }, {
      width: p,
      height: i
    } = lt(t, m, g), R = () => {
      const [L, w] = s.value;
      c.value = [p.value / L, i.value / w];
    }, C = () => {
      v(), u(), R();
    };
    return {
      ns: n,
      customDecoration1: t,
      renderBorder: () => l("svg", {
        width: "".concat(s.value[0], "px"),
        height: "".concat(s.value[1], "px"),
        style: "transform:scale(".concat(c.value[0], ", ").concat(c.value[1], ");")
      }, [b.value.map((L) => Math.random() > 0.6 ? l("rect", {
        key: L.join(","),
        fill: h.value[0],
        x: L[0] - d.value,
        y: L[1] - d.value,
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
    var e, n;
    return l("div", {
      ref: "customDecoration1",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), xl = x(
  _e,
  function(e) {
    e.component(_e.name, _e);
  }
), Ue = /* @__PURE__ */ I({
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
    const n = P("custom-decoration-2"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = $(0), d = $(0), y = $(0), h = $(0), f = E(() => H(t, e.color || [])), b = () => {
      e.reverse ? (r.value = 1, d.value = h.value, a.value = y.value / 2, o.value = 0) : (r.value = y.value, d.value = 1, a.value = 0, o.value = h.value / 2);
    };
    N(() => e.reverse, () => {
      b();
    }, {
      immediate: !0
    });
    const c = () => l("svg", {
      width: "".concat(y.value, "px"),
      height: "".concat(h.value, "px")
    }, [l("rect", {
      x: a.value,
      y: o.value,
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
      y: o.value,
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
      W(() => {
        const u = s.value;
        u && (y.value = u.clientWidth, h.value = u.clientHeight);
      });
    };
    return T(() => {
      v(), j(s.value, v), window.addEventListener("resize", v);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", v);
    }), {
      ns: n,
      customDecoration2: s,
      renderBorder: c
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration2",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), El = x(
  Ue,
  function(e) {
    e.component(Ue.name, Ue);
  }
), Xe = /* @__PURE__ */ I({
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
    const n = P("custom-decoration-3"), t = $(7), s = $([300, 35]), a = $([1, 1]), o = $(2), r = $(25), d = $(t.value / 2), y = $([]), h = [B() || "#0095ee", "#95d8f8"], f = $(), b = E(() => H(h, e.color || [])), c = () => {
      const [C, V] = s.value, L = C / (r.value + 1), w = V / (o.value + 1), S = Array.from({
        length: o.value
      }).fill(0).map((k, z) => Array.from({
        length: r.value
      }).fill(0).map((O, G) => [L * (G + 1), w * (z + 1)]));
      y.value = S.reduce((k, z) => [...k, ...z], []);
    }, v = () => l("svg", {
      width: "".concat(s.value[0], "px"),
      height: "".concat(s.value[1], "px"),
      style: "transform:scale(".concat(a.value[0], ",").concat(a.value[1], ");")
    }, [y.value.map((C) => l("rect", {
      key: C.join(),
      fill: b.value[0],
      x: C[0] - d.value,
      y: C[1] - d.value,
      width: t.value,
      height: t.value
    }, [Math.random() > 0.6 ? l("animate", {
      attributeName: "fill",
      values: "".concat(b.value.join(";")),
      dur: "".concat(Math.random() + 1, "s"),
      begin: Math.random() * 2,
      repeatCount: "indefinite"
    }, null) : null]))]), u = () => {
      m();
    }, m = () => {
      c(), R();
    }, g = () => {
      m();
    }, {
      width: p,
      height: i
    } = lt(f, g, u), R = () => {
      const [C, V] = s.value;
      a.value = [p.value / C, i.value / V];
    };
    return {
      ns: n,
      customDecoration3: f,
      renderBorder: v
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration3",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), Ml = x(
  Xe,
  function(e) {
    e.component(Xe.name, Xe);
  }
), qe = /* @__PURE__ */ I({
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
    const n = P("custom-decoration-4"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = E(() => H(t, e.color || [])), d = () => l("div", {
      class: "container ".concat(e.reverse ? "reverse" : "normal"),
      style: e.reverse ? "width:".concat(a.value, "px;height:5px;animation-duration:").concat(e.dur, "s") : "width:5px;height:".concat(o.value, "px;animation-duration:").concat(e.dur, "s")
    }, [l("svg", {
      width: e.reverse ? a.value : 5,
      height: e.reverse ? 5 : o.value
    }, [l("polyline", {
      stroke: r.value[0],
      points: e.reverse ? "0, 2.5 ".concat(a.value, ", 2.5") : "2.5, 0 2.5, ".concat(o.value)
    }, null), l("polyline", {
      class: "bold-line",
      stroke: r.value[1],
      "stroke-width": "3",
      "stroke-dasharray": "20, 80",
      "stroke-dashoffset": "-30",
      points: e.reverse ? "0, 2.5 ".concat(a.value, ", 2.5") : "2.5, 0 2.5, ".concat(o.value)
    }, null)])]), y = () => {
      W(() => {
        const h = s.value;
        h && (a.value = h.clientWidth, o.value = h.clientHeight);
      });
    };
    return T(() => {
      y(), j(s.value, y), window.addEventListener("resize", y);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", y);
    }), {
      ns: n,
      customDecoration4: s,
      renderBorder: d
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration4",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), Bl = x(
  qe,
  function(e) {
    e.component(qe.name, qe);
  }
), Qe = /* @__PURE__ */ I({
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
    const n = P("custom-decoration-5"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = $(""), d = $(""), y = $(0), h = $(0), f = E(() => H(t, e.color || [])), b = () => {
      const u = [[0, o.value * 0.2], [a.value * 0.18, o.value * 0.2], [a.value * 0.2, o.value * 0.4], [a.value * 0.25, o.value * 0.4], [a.value * 0.27, o.value * 0.6], [a.value * 0.72, o.value * 0.6], [a.value * 0.75, o.value * 0.4], [a.value * 0.8, o.value * 0.4], [a.value * 0.82, o.value * 0.2], [a.value, o.value * 0.2]], m = [[a.value * 0.3, o.value * 0.8], [a.value * 0.7, o.value * 0.8]], g = at(u), p = at(m);
      r.value = u.map((i) => i.join(",")).join(" "), d.value = m.map((i) => i.join(",")).join(" "), y.value = g, h.value = p;
    }, c = () => l("svg", {
      width: a.value,
      height: o.value
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
      W(() => {
        const u = s.value;
        u && (a.value = u.clientWidth, o.value = u.clientHeight, b());
      });
    };
    return T(() => {
      v(), j(s.value, v), window.addEventListener("resize", v);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", v);
    }), {
      ns: n,
      customDecoration5: s,
      renderBorder: c
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration5",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), zl = x(
  Qe,
  function(e) {
    e.component(Qe.name, Qe);
  }
), Ke = /* @__PURE__ */ I({
  name: "CustomDecoration6",
  props: {
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const n = P("custom-decoration-6"), t = $(7), s = $([300, 35]), a = $([1, 1]), o = $(1), r = $(40), d = $(t.value / 2), y = $([]), h = $([]), f = $([]), b = $([]), c = $(), v = [B() || "#0095ee", "#95d8f8"], u = E(() => H(v, e.color || [])), m = (S, k) => arguments.length === 1 ? Number.parseInt((Math.random() * S + 1).toString(), 10) : Number.parseInt((Math.random() * (k - S + 1) + S).toString(), 10), g = () => {
      const [S, k] = s.value, z = S / (r.value + 1), O = k / (o.value + 1), G = Array.from({
        length: o.value
      }).fill(0).map((Q, K) => Array.from({
        length: r.value
      }).fill(0).map((A, U) => [z * (U + 1), O * (K + 1)]));
      y.value = G.reduce((Q, K) => [...Q, ...K], []);
      const ne = Array.from({
        length: o.value * r.value
      }).fill(0).map(() => Math.random() > 0.8 ? m(0.7 * k, k) : m(0.2 * k, 0.5 * k));
      h.value = ne, f.value = Array.from({
        length: o.value * r.value
      }).fill(0).map((Q, K) => ne[K] * Math.random()), b.value = Array.from({
        length: o.value * r.value
      }).fill(0).map(() => Math.random() + 1.5);
    }, p = () => {
      g(), L();
    }, i = () => {
      p();
    }, R = () => {
      p();
    }, {
      width: C,
      height: V
    } = lt(c, i, R), L = () => {
      const [S, k] = s.value;
      a.value = [C.value / S, V.value / k];
    };
    return {
      ns: n,
      customDecoration6: c,
      renderBorder: () => l("svg", {
        width: "".concat(s.value[0], "px"),
        height: "".concat(s.value[1], "px"),
        style: "transform:scale(".concat(a.value[0], ",").concat(a.value[1], ");")
      }, [y.value.map((S, k) => l("rect", {
        key: k,
        fill: u.value[Math.random() > 0.5 ? 0 : 1],
        x: S[0] - d.value,
        y: S[1] - h.value[k] / 2,
        width: t.value,
        height: h.value[k]
      }, [l("animate", {
        attributeName: "y",
        values: "".concat(S[1] - f.value[k] / 2, ";").concat(S[1] - h.value[k] / 2, ";").concat(S[1] - f.value[k] / 2),
        dur: "".concat(b.value[k], "s"),
        keyTimes: "0;0.5;1",
        calcMode: "spline",
        keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
        begin: "0s",
        repeatCount: "indefinite"
      }, null), l("animate", {
        attributeName: "height",
        values: "".concat(f.value[k], ";").concat(h.value[k], ";").concat(f.value[k]),
        dur: "".concat(b.value[k], "s"),
        keyTimes: "0;0.5;1",
        calcMode: "spline",
        keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
        begin: "0s",
        repeatCount: "indefinite"
      }, null)]))])
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration6",
      class: this.ns.b()
    }, [this.renderBorder(), (n = (e = this.$slots).default) == null ? void 0 : n.call(e)]);
  }
}), Tl = x(
  Ke,
  function(e) {
    e.component(Ke.name, Ke);
  }
), Je = /* @__PURE__ */ I({
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
    const n = P("custom-decoration-11"), t = [B() || "#0095ee", "#95d8f8"], s = $(), a = $(0), o = $(0), r = E(() => H(t, e.color || [])), d = () => l("svg", {
      class: [n.em("border-svg", "container")],
      width: a.value,
      height: o.value
    }, [l("polygon", {
      fill: X(r.value[1] || t[1], 10) || "",
      stroke: r.value[1],
      points: "20 10, 25 4, 55 4 60 10"
    }, null), l("polygon", {
      fill: X(r.value[1] || t[1], 10) || "",
      stroke: r.value[1],
      points: "20 ".concat(o.value - 10, ", 25 ").concat(o.value - 4, ", 55 ").concat(o.value - 4, " 60 ").concat(o.value - 10)
    }, null), l("polygon", {
      fill: X(r.value[1] || t[1], 10) || "",
      stroke: r.value[1],
      points: "".concat(a.value - 20, " 10, ").concat(a.value - 25, " 4, ").concat(a.value - 55, " 4 ").concat(a.value - 60, " 10")
    }, null), l("polygon", {
      fill: X(r.value[1] || t[1], 10) || "",
      stroke: r.value[1],
      points: "".concat(a.value - 20, " ").concat(o.value - 10, ", ").concat(a.value - 25, " ").concat(o.value - 4, ", ").concat(a.value - 55, " ").concat(o.value - 4, " ").concat(a.value - 60, " ").concat(o.value - 10)
    }, null), l("polygon", {
      fill: X(r.value[0] || t[0], 20) || "",
      stroke: r.value[0],
      points: "\n          20 10, 5 ".concat(o.value / 2, " 20 ").concat(o.value - 10, "\n          ").concat(a.value - 20, " ").concat(o.value - 10, " ").concat(a.value - 5, " ").concat(o.value / 2, " ").concat(a.value - 20, " 10\n        ")
    }, null), l("polyline", {
      fill: "transparent",
      stroke: X(r.value[0] || t[0], 70) || "",
      points: "25 18, 15 ".concat(o.value / 2, " 25 ").concat(o.value - 18)
    }, null), l("polyline", {
      fill: "transparent",
      stroke: X(r.value[0] || t[0], 70) || "",
      points: "".concat(a.value - 25, " 18, ").concat(a.value - 15, " ").concat(o.value / 2, " ").concat(a.value - 25, " ").concat(o.value - 18)
    }, null)]), y = () => {
      W(() => {
        const h = s.value;
        h && (a.value = h.clientWidth, o.value = h.clientHeight);
      });
    };
    return T(() => {
      y(), j(s.value, y), window.addEventListener("resize", y);
    }), Y(() => {
      _(s.value), window.removeEventListener("resize", y);
    }), {
      ns: n,
      customDecoration5: s,
      renderBorder: d
    };
  },
  render() {
    var e, n;
    return l("div", {
      ref: "customDecoration5",
      class: this.ns.b()
    }, [this.renderBorder(), l("div", {
      class: this.ns.e("decoration-content")
    }, [(n = (e = this.$slots).default) == null ? void 0 : n.call(e)])]);
  }
}), Nl = x(
  Je,
  function(e) {
    e.component(Je.name, Je);
  }
), jl = {
  install(e) {
    e.use(Kt), e.use(Zt), e.use(nn), e.use($n), e.use(yn), e.use(Cn), e.use(kn), e.use(Ln), e.use(Wn), e.use(Yn), e.use(Xn), e.use(cl), e.use(fl), e.use($l), e.use(gl), e.use(bl), e.use(yl), e.use(pl), e.use(wl), e.use(Cl), e.use(Dl), e.use(kl), e.use(Sl), e.use(Rl), e.use(Ll), e.use(Il), e.use(Pl), e.use(xl), e.use(El), e.use(Ml), e.use(Bl), e.use(zl), e.use(Tl), e.use(Nl);
  }
};
export {
  jl as default
};
