import { defineComponent, isVNode, createVNode, resolveComponent, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useControlController, useNamespace, useSemanticNode, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { init } from 'echarts';
import { createUUID } from 'qx-util';
import { isArray } from 'lodash-es';
import { ChartController, ControlVO } from '@ibiz-template/runtime';
import './chart.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ChartControl = /* @__PURE__ */ defineComponent({
  name: "IBizChartControl",
  props: {
    /**
     * @description 图表模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 部件激活模式，值为0：表示无激活,1：表示单击激活,2：表示双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 简单模式下传入的数据
     */
    data: {
      type: Array,
      required: false
    }
  },
  emits: ["drillDetail"],
  setup(props, {
    emit
  }) {
    const c = useControlController((...args) => new ChartController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const chartRef = ref();
    const maxHeight = ref(0);
    const uuid = createUUID();
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const showCheck = ref(false);
    const drillDetailPos = ref({});
    const drillDetailRef = ref();
    let tempParams;
    const initSimpleData = () => {
      if (!props.data) {
        return;
      }
      c.state.items = props.data.map((item) => new ControlVO(item));
      c.afterLoad({}, c.state.items);
    };
    c.evt.on("onCreated", async () => {
      if (props.isSimple) {
        initSimpleData();
        c.state.isSimple = true;
        c.state.isLoaded = true;
      }
    });
    watch(() => props.data, () => {
      if (props.isSimple) {
        initSimpleData();
      }
    }, {
      deep: true
    });
    const setHeight = async () => {
      await nextTick();
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
    onMounted(() => {
      var _a, _b;
      const chart = init(chartRef.value);
      ibiz.log.debug("\u521D\u59CB\u5316\u56FE\u8868\u5143\u7D20\uFF0C\u6E90dom\u5BF9\u8C61\uFF1A", chartRef.value, "\u76EE\u6807\u56FE\u8868\u5BF9\u8C61\uFF1A", chart);
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
      let drillDetails = ((_b = (_a = props.modelData.controlParam) == null ? void 0 : _a.ctrlParams) == null ? void 0 : _b.ENABLEDRILLDETAIL) || c.controlParams.enabledrilldetail;
      if (drillDetails && !isArray(drillDetails)) {
        try {
          drillDetails = JSON.parse(drillDetails);
        } catch (error) {
          ibiz.log.error(error);
          drillDetails = void 0;
        }
      }
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
    watch(() => c.state.showGrid, () => {
      setHeight();
    }, {
      immediate: true
    });
    const renderGrid = () => {
      let _slot;
      return createVNode(resolveComponent("el-table"), {
        "ref": "tableRef",
        "border": true,
        "data": getGridData(),
        "style": {
          width: "100%"
        },
        "max-height": maxHeight.value,
        "span-method": c.spanMethod.bind(c),
        "header-row-style": (...args) => semanticStyle("table.header.row", args),
        "header-row-class-name": (...args) => {
          return [ns.em("grid", "header-row"), semanticClass("table.header.row", args)].join(" ");
        },
        "header-cell-style": (...args) => semanticStyle("table.header.cell", args),
        "header-cell-class-name": (...args) => {
          return [ns.em("grid", "header-cell"), semanticClass("table.header.cell", args)].join(" ");
        },
        "row-style": (...args) => semanticStyle("table.body.row", args),
        "row-class-name": (...args) => {
          return [ns.em("grid", "body-row"), semanticClass("table.body.row", args)].join(" ");
        },
        "cell-style": (...args) => semanticStyle("table.body.cell", args),
        "cell-class-name": (...args) => {
          return [ns.em("grid", "body-cell"), semanticClass("table.body.cell", args)].join(" ");
        }
      }, _isSlot(_slot = c.state.gridHeaders.map((column) => {
        return createVNode(resolveComponent("el-table-column"), {
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
        if (hasEmptyPanelRenderer(c)) {
          Object.assign(noDataSlots, {
            customRender: () => createVNode(IBizCustomRender, {
              "controller": c
            }, null)
          });
        }
        return createVNode(resolveComponent("iBizNoData"), {
          "text": c.model.emptyText,
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
          "hideNoDataImage": c.state.hideNoDataImage
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
    };
    onBeforeUnmount(() => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("pointerdown", setDrillState);
      window.removeEventListener("click", setTipState);
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
    });
    return {
      c,
      ns,
      uuid,
      chartRef,
      showCheck,
      semanticClass,
      semanticStyle,
      drillDetailPos,
      drillDetailRef,
      openDrillDetail,
      renderGrid,
      renderNoData
    };
  },
  render() {
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": this.semanticClass("root"),
        "style": this.semanticStyle("root")
      }, {
        default: () => [createVNode("div", {
          "id": this.uuid,
          "class": [this.ns.b("chart-container"), this.semanticClass("content")],
          "style": this.semanticStyle("content")
        }, [this.renderNoData(), createVNode("div", {
          "class": [this.ns.e("chart-grid"), this.ns.is("no-data", this.c.state.items.length === 0), this.ns.is("show-grid", this.c.state.showGrid), {
            [this.ns.em("chart-grid", this.c.state.gridPosition)]: this.c.state.showGrid
          }]
        }, [createVNode("div", {
          "class": [this.ns.e("chart-grid-container"), this.ns.is(this.c.state.gridPosition, this.c.state.showGrid), this.ns.is("no-grid", !this.c.state.showGrid)]
        }, [createVNode("div", {
          "ref": "chartRef",
          "class": [this.ns.e("chart"), this.semanticClass("chart")],
          "style": this.semanticStyle("chart")
        }, [ibiz.i18n.t("control.chart.chartPlaceholder")]), this.showCheck ? createVNode("div", {
          "ref": "drillDetailRef",
          "class": this.ns.e("drill-detail"),
          "style": this.drillDetailPos,
          "onPointerdown": this.openDrillDetail
        }, [createVNode("div", {
          "class": this.ns.em("drill-detail", "item")
        }, [createVNode("svg", {
          "viewBox": "0 0 16 16",
          "xmlns": "http://www.w3.org/2000/svg",
          "height": "1em",
          "width": "1em",
          "focusable": "false",
          "fill": "currentColor"
        }, [createVNode("g", {
          "id": "aspnormal/preview",
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [createVNode("path", {
          "d": "M11.626 0c1.057 0 1.923.818 2 1.855l.005.15v3.411a.6.6 0 0 1-1.192.097l-.008-.097.001-1.348V2.005c0-.41-.31-.749-.705-.799l-.101-.006h-9.62c-.41 0-.75.308-.8.704l-.006.101v11.989c0 .41.308.75.705.8l.101.006h5.906l.017-.004.016-.003h2.074a.598.598 0 1 1 .107 1.187l-.095.01V16H2.006a2.006 2.006 0 0 1-2-1.856L0 13.994V2.005C0 .948.818.082 1.856.005L2.006 0h9.62zm-1.595 6.328a3.669 3.669 0 0 1 3.665 3.665c0 .79-.251 1.523-.678 2.123l2.412 2.412a.6.6 0 1 1-.848.85l-2.41-2.412a3.646 3.646 0 0 1-2.14.692 3.67 3.67 0 0 1-3.667-3.665 3.67 3.67 0 0 1 3.666-3.665zm-5.106 5.29a.6.6 0 0 1 .097 1.191l-.097.008H2.85a.6.6 0 0 1-.097-1.192l.097-.008h2.074zm5.106-4.09a2.468 2.468 0 0 0-2.466 2.465 2.468 2.468 0 0 0 2.466 2.466 2.47 2.47 0 0 0 2.466-2.466 2.469 2.469 0 0 0-2.466-2.465zm-4.815-.126a.6.6 0 0 1 .097 1.193l-.097.007h-2.35A.6.6 0 0 1 2.77 7.41l.098-.008h2.349zm5.58-4a.6.6 0 0 1 .097 1.192l-.097.008H2.867A.6.6 0 0 1 2.77 3.41l.097-.008h7.929z",
          "id": "asp\u5408\u5E76\u5F62\u72B6"
        }, null)])]), createVNode("div", {
          "class": this.ns.em("drill-detail", "item-text")
        }, [ibiz.i18n.t("control.chart.drillDetail")])])]) : null]), this.c.state.showGrid ? createVNode("div", {
          "style": this.semanticStyle("table"),
          "class": [this.ns.e("grid"), this.semanticClass("table")]
        }, [this.renderGrid()]) : null])])]
      })]
    });
  }
});

export { ChartControl as default };
