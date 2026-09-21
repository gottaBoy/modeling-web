'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var mapChart_util = require('./map-chart.util.cjs');
var mapManager = require('./map-manager.cjs');
require('./map-chart.css');

"use strict";
const IBizMapChart = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMapChart",
  props: {
    areaData: {
      type: Array
    },
    pointData: {
      type: Array
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("map-chart");
    const options = vue.computed(() => {
      return ramda.mergeDeepWithKey((_key, x, z) => {
        return ramda.isNil(z) ? x : z;
      }, mapChart_util.defaultOpts, props.options);
    });
    const findData = (id, type) => {
      if (type === "area" && props.areaData) {
        return props.areaData.find((item) => item._id === id);
      }
      if (type === "point" && props.pointData) {
        return props.pointData.find((item) => item._id === id);
      }
    };
    const {
      chartRef,
      historyNames,
      changeMap,
      getCityName,
      goBack,
      refresh
    } = mapManager.useMapManager(options, (mapName) => {
      const {
        visualMap,
        pointSymbol,
        areaColor,
        hoverAreaColor,
        areaBorderColor
      } = options.value;
      const areaData2 = props.areaData || [];
      const pointData2 = props.pointData || [];
      const result = {
        geo: {
          map: mapName
        },
        tooltip: {
          trigger: "item",
          // 全局的tooltip样式
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          backgroundColor: "rgba(0, 0, 0, 0.47)",
          borderWidth: 0,
          extraCssText: "backdrop-filter: blur(3px);"
        },
        visualMap: {
          min: visualMap.min,
          max: visualMap.max,
          text: visualMap.text,
          realtime: false,
          hoverLink: false,
          inRange: {
            color: visualMap.rangeColor
          }
        },
        series: [
          // 地图区块序列
          {
            type: "map",
            map: mapName,
            // 地图JSON里和name匹配的属性名称
            nameProperty: "adcodeStr",
            itemStyle: {
              // 默认区域颜色
              areaColor,
              borderColor: areaBorderColor,
              borderWidth: 2
            },
            // 悬浮样式
            emphasis: {
              itemStyle: {
                areaColor: hoverAreaColor
              }
            },
            tooltip: {
              formatter: (params) => {
                if (!params.data) {
                  return;
                }
                const find = findData(params.data._id, "area");
                if (!find) {
                  return;
                }
                return find._tooltip;
              }
            },
            label: {
              // 区块文字固定显示
              show: true,
              // 字体样式
              color: "#000000",
              fontSize: 14,
              formatter: (params) => {
                return getCityName(params.name);
              }
            },
            select: {
              disabled: true
            },
            data: areaData2.map((item) => ({
              name: "".concat(item._areaCode),
              value: item._value,
              _id: item._id
            }))
          },
          // 地图散点序列
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol: pointSymbol,
            symbolSize: 20,
            visualMap: false,
            itemStyle: {
              color: "#FF1D00"
            },
            label: {
              show: true,
              // 字体样式
              color: "#000000",
              fontSize: 14,
              textShadowBlur: 0,
              formatter: (params) => {
                const find = findData(params.data._id, "point");
                return find == null ? void 0 : find._text;
              },
              // 偏移
              position: "left",
              offset: [10, -15]
            },
            tooltip: {
              formatter: (params) => {
                const find = findData(params.data._id, "point");
                return find == null ? void 0 : find._tooltip;
              }
            },
            data: pointData2.map((item) => {
              return {
                _id: item._id,
                symbol: item._symbol ? "image://".concat(item._symbol) : void 0,
                value: [Number(item._longitude), Number(item._latitude)],
                // 每个点逃离visualMap
                visualMap: false
              };
            })
          }
        ]
      };
      return result;
    }, (name, e) => {
      switch (name) {
        case "mapChange":
          emit("mapChange", e);
          break;
        case "pointClick":
          emit("pointClick", {
            data: findData(e._id, "point")
          });
          break;
        case "areaClick":
          emit("areaClick", {
            data: findData(e._id, "area")
          });
          break;
        default:
          break;
      }
    });
    vue.onMounted(() => {
      changeMap(options.value.defaultAreaCode, true);
    });
    const {
      areaData,
      pointData
    } = vue.toRefs(props);
    vue.watch([areaData, pointData], () => {
      refresh();
    });
    return {
      ns,
      chartRef,
      historyNames,
      goBack
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("chart"),
      "ref": "chartRef"
    }, null), this.historyNames.length > 1 && vue.createVNode("div", {
      "class": this.ns.e("goback"),
      "onClick": () => {
        this.goBack();
      }
    }, [ibiz.i18n.t("app.return")])]);
  }
});

exports.IBizMapChart = IBizMapChart;
exports.default = IBizMapChart;
