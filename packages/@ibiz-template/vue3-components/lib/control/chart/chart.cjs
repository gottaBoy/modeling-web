'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var echarts = require('echarts');
var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
require('./chart.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ChartControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizChartControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    loadDefault: {
      type: Boolean,
      default: true
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    data: {
      type: Array,
      required: false
    }
  },
  emits: ["drillDetail"],
  setup(props, {
    emit
  }) {
    const c = vue3Util.useControlController((...args) => new runtime.ChartController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const chartRef = vue.ref();
    const maxHeight = vue.ref(0);
    const uuid = qxUtil.createUUID();
    const showCheck = vue.ref(false);
    const drillDetailPos = vue.ref({});
    const drillDetailRef = vue.ref();
    let tempParams;
    const initSimpleData = () => {
      if (!props.data) {
        return;
      }
      c.state.items = props.data.map((item) => new runtime.ControlVO(item));
      c.afterLoad({}, c.state.items);
    };
    c.evt.on("onCreated", async () => {
      if (props.isSimple) {
        initSimpleData();
        c.state.isSimple = true;
        c.state.isLoaded = true;
      }
    });
    vue.watch(() => props.data, () => {
      if (props.isSimple) {
        initSimpleData();
      }
    }, {
      deep: true
    });
    const setHeight = async () => {
      await vue.nextTick();
      const el = document.getElementById(uuid);
      if (el) {
        if (c.state.gridPosition === "bottom" || c.state.gridPosition === "top") {
          maxHeight.value = el.offsetHeight / 2 - 8;
        } else {
          maxHeight.value = el.offsetHeight - 16;
        }
      }
    };
    const getGridData = () => {
      return c.state.gridData || [];
    };
    const computedDrillDetailPos = (params) => {
      if (params.event) {
        const event = params.event.event;
        const {
          offsetX,
          offsetY
        } = params.event;
        const {
          clientWidth
        } = event.target;
        if (offsetX + 160 > clientWidth) {
          drillDetailPos.value = {
            top: "".concat(offsetY - 20, "px"),
            left: "".concat(offsetX - 160, "px")
          };
        } else {
          drillDetailPos.value = {
            top: "".concat(offsetY, "px"),
            left: "".concat(offsetX + 16, "px")
          };
        }
      }
    };
    const setDrillState = () => {
      showCheck.value = false;
    };
    const setTipState = () => {
      if (!showCheck.value) {
        c.changeTooltipState(true);
      }
    };
    let resizeObserver;
    vue.onMounted(() => {
      var _a, _b;
      const chart = echarts.init(chartRef.value);
      c.initChart(chart);
      window.addEventListener("resize", setHeight);
      window.addEventListener("pointerdown", setDrillState);
      window.addEventListener("click", setTipState);
      if (chartRef.value && ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          c.resizeChart();
        });
        resizeObserver.observe(chartRef.value);
      }
      setHeight();
      const drillDetails = (_b = (_a = props.modelData.controlParam) == null ? void 0 : _a.ctrlParams) == null ? void 0 : _b.ENABLEDRILLDETAIL;
      if (drillDetails == null ? void 0 : drillDetails.length) {
        chart.on("click", (params) => {
          const serieModel = c.computedClickSerieModel(params);
          if (!serieModel || ibiz.fullscreenUtil.isFullScreen) {
            return;
          }
          const tempDrill = drillDetails.find((item) => {
            return item.name === serieModel.valueField;
          });
          if (!tempDrill || !tempDrill.isDrill) {
            return;
          }
          tempParams = params;
          computedDrillDetailPos(params);
          chart.dispatchAction({
            type: "hideTip"
          });
          c.changeTooltipState(false);
          showCheck.value = true;
        });
      }
    });
    const openDrillDetail = (_event) => {
      _event.stopPropagation();
      _event.preventDefault();
      showCheck.value = false;
      c.changeTooltipState(true);
      const param = c.computedDrillDetailParam(tempParams);
      emit("drillDetail", param);
    };
    vue.watch(() => c.state.showGrid, () => {
      setHeight();
    }, {
      immediate: true
    });
    const renderGrid = () => {
      let _slot;
      return vue.createVNode(vue.resolveComponent("el-table"), {
        "ref": "tableRef",
        "data": getGridData(),
        "border": true,
        "style": {
          width: "100%"
        },
        "max-height": maxHeight.value,
        "header-row-class-name": ns.e("grid-header")
      }, _isSlot(_slot = c.state.gridHeaders.map((column) => {
        return vue.createVNode(vue.resolveComponent("el-table-column"), {
          "prop": column.id,
          "align": "center",
          "label": column.name
        }, null);
      })) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderNoData = () => {
      if (c.state.items.length === 0) {
        const noDataSlots = {};
        if (vue3Util.hasEmptyPanelRenderer(c)) {
          Object.assign(noDataSlots, {
            customRender: () => vue.createVNode(vue3Util.IBizCustomRender, {
              "controller": c
            }, null)
          });
        }
        return vue.createVNode(vue.resolveComponent("iBizNoData"), {
          "text": c.model.emptyText,
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
          "hideNoDataImage": c.state.hideNoDataImage
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
    };
    vue.onBeforeUnmount(() => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("pointerdown", setDrillState);
      window.removeEventListener("click", setTipState);
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
    });
    return {
      c,
      ns,
      chartRef,
      uuid,
      showCheck,
      drillDetailPos,
      drillDetailRef,
      openDrillDetail,
      renderGrid,
      renderNoData
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode("div", {
        "id": this.uuid,
        "class": this.ns.b("chart-container")
      }, [this.renderNoData(), vue.createVNode("div", {
        "class": [this.ns.e("chart-grid"), this.ns.is("no-data", this.c.state.items.length === 0), this.ns.is("show-grid", this.c.state.showGrid), {
          [this.ns.em("chart-grid", this.c.state.gridPosition)]: this.c.state.showGrid
        }]
      }, [vue.createVNode("div", {
        "class": [this.ns.e("chart-grid-container"), this.ns.is(this.c.state.gridPosition, this.c.state.showGrid), this.ns.is("no-grid", !this.c.state.showGrid)]
      }, [vue.createVNode("div", {
        "ref": "chartRef",
        "class": [this.ns.e("chart")]
      }, [ibiz.i18n.t("control.chart.chartPlaceholder")]), this.showCheck ? vue.createVNode("div", {
        "ref": "drillDetailRef",
        "class": this.ns.e("drill-detail"),
        "style": this.drillDetailPos,
        "onPointerdown": this.openDrillDetail
      }, [vue.createVNode("div", {
        "class": this.ns.em("drill-detail", "item")
      }, [vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false",
        "fill": "currentColor"
      }, [vue.createVNode("g", {
        "id": "aspnormal/preview",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M11.626 0c1.057 0 1.923.818 2 1.855l.005.15v3.411a.6.6 0 0 1-1.192.097l-.008-.097.001-1.348V2.005c0-.41-.31-.749-.705-.799l-.101-.006h-9.62c-.41 0-.75.308-.8.704l-.006.101v11.989c0 .41.308.75.705.8l.101.006h5.906l.017-.004.016-.003h2.074a.598.598 0 1 1 .107 1.187l-.095.01V16H2.006a2.006 2.006 0 0 1-2-1.856L0 13.994V2.005C0 .948.818.082 1.856.005L2.006 0h9.62zm-1.595 6.328a3.669 3.669 0 0 1 3.665 3.665c0 .79-.251 1.523-.678 2.123l2.412 2.412a.6.6 0 1 1-.848.85l-2.41-2.412a3.646 3.646 0 0 1-2.14.692 3.67 3.67 0 0 1-3.667-3.665 3.67 3.67 0 0 1 3.666-3.665zm-5.106 5.29a.6.6 0 0 1 .097 1.191l-.097.008H2.85a.6.6 0 0 1-.097-1.192l.097-.008h2.074zm5.106-4.09a2.468 2.468 0 0 0-2.466 2.465 2.468 2.468 0 0 0 2.466 2.466 2.47 2.47 0 0 0 2.466-2.466 2.469 2.469 0 0 0-2.466-2.465zm-4.815-.126a.6.6 0 0 1 .097 1.193l-.097.007h-2.35A.6.6 0 0 1 2.77 7.41l.098-.008h2.349zm5.58-4a.6.6 0 0 1 .097 1.192l-.097.008H2.867A.6.6 0 0 1 2.77 3.41l.097-.008h7.929z",
        "id": "asp\u5408\u5E76\u5F62\u72B6"
      }, null)])]), vue.createVNode("div", {
        "class": this.ns.em("drill-detail", "item-text")
      }, [ibiz.i18n.t("control.chart.drillDetail")])])]) : null]), this.c.state.showGrid ? vue.createVNode("div", {
        "class": this.ns.e("grid")
      }, [this.renderGrid()]) : null])])]
    });
  }
});

exports.default = ChartControl;
