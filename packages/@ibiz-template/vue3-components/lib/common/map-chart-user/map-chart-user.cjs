'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var mapChartUser_util = require('./map-chart-user.util.cjs');
var mapUserManager = require('./map-user-manager.cjs');
require('./map-chart-user.css');

"use strict";
const IBizMapChartUser = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMapChartUser",
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
    },
    controller: {
      type: runtime.MapController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("map-chart-user");
    const c = props.controller;
    let option = mapChartUser_util.defaultOpts;
    if (c.controlParams.defaultopts) {
      const data = JSON.parse(c.controlParams.defaultopts);
      option = ramda.mergeDeepLeft(data, option);
    }
    const options = vue.computed(() => {
      return ramda.mergeDeepWithKey((_key, x, z) => {
        return ramda.isNil(z) ? x : z;
      }, option, props.options);
    });
    const {
      chartRef,
      historyNames,
      changeMap,
      getCityInfo,
      goBack
    } = mapUserManager.useMapManager(props.controller, options, (mapName) => {
      const areaData = props.areaData || [];
      const pointData = props.pointData || [];
      const tooltip = mapChartUser_util.getTooltip();
      const visualMap = mapChartUser_util.getVisualMap(options.value);
      const cityInfo = getCityInfo();
      const pointOption = {
        ...mapChartUser_util.getPointStaticOption(options.value),
        ...mapChartUser_util.getPointOption(pointData, areaData)
      };
      const areaOption = {
        ...mapChartUser_util.getAreaStaticOption(options.value),
        ...mapChartUser_util.getAreaOption(mapName, pointData, areaData, cityInfo)
      };
      const result = {
        geo: {
          map: mapName
        },
        tooltip,
        visualMap,
        series: [
          // 地图区块序列
          areaOption,
          // 地图散点序列
          pointOption
        ]
      };
      return result;
    });
    vue.onMounted(() => {
      const name = options.value.defaultAreaCode;
      const areaCode = c.state.strAreaCode ? "".concat(name) : Number(name);
      c.state.areaCode = areaCode;
      changeMap(name, areaCode, true);
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

exports.IBizMapChartUser = IBizMapChartUser;
exports.default = IBizMapChartUser;
