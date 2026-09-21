'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var lodashEs = require('lodash-es');
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
    const mapRef = vue.ref();
    const isFull = vue.ref(false);
    if (c.controlParams.defaultopts) {
      const data = JSON.parse(c.controlParams.defaultopts);
      option = ramda.mergeDeepLeft(data, option);
    }
    const options = vue.computed(() => {
      return ramda.mergeDeepWithKey((_key, x, z) => {
        return ramda.isNil(z) ? x : z;
      }, option, props.options);
    });
    let cleanup = core.NOOP;
    const {
      chartRef,
      historyNames,
      processing,
      areaLevelMap,
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
      const {
        top,
        bottom
      } = options.value;
      const areaOption = {
        top,
        bottom,
        ...mapChartUser_util.getAreaStaticOption(options.value),
        ...mapChartUser_util.getAreaOption(mapName, pointData, areaData, cityInfo)
      };
      const result = {
        geo: {
          map: mapName,
          top,
          bottom
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
      c.state.areaLevel = runtime.getAreaLevelByCode(areaCode.toString());
      changeMap(name, areaCode, true);
      c.evt.on("onDrillDown", async (args) => {
        if (!processing.value) {
          const {
            data
          } = args;
          const code = data.areaCode;
          const curAreaCode = c.state.strAreaCode ? "".concat(code) : Number(code);
          const areaLevel = areaLevelMap.get(lodashEs.toNumber(curAreaCode)) || "";
          c.state.areaCode = curAreaCode;
          c.state.areaLevel = areaLevel;
          await changeMap(code, code);
        }
      });
      c.evt.on("onBackClick", () => {
        if (!processing.value) {
          goBack();
        }
      });
      cleanup = core.listenJSEvent(window, "resize", () => {
        if (isFull.value) {
          isFull.value = ibiz.fullscreenUtil.isFullScreen;
        }
      });
    });
    vue.onBeforeUnmount(() => {
      if (cleanup !== core.NOOP) {
        cleanup();
      }
    });
    const onBack = async () => {
      processing.value = true;
      await c.evt.emit("onBackClick", void 0);
      goBack();
      processing.value = false;
    };
    const toggleFullScreen = () => {
      if (mapRef.value) {
        if (isFull.value) {
          ibiz.fullscreenUtil.closeElementFullscreen();
        } else {
          ibiz.fullscreenUtil.openElementFullscreen(mapRef.value);
        }
        isFull.value = !isFull.value;
      }
    };
    return {
      c,
      ns,
      mapRef,
      isFull,
      chartRef,
      historyNames,
      onBack,
      toggleFullScreen
    };
  },
  render() {
    const {
      enabledFullScreen
    } = this.c.state;
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "ref": "mapRef"
    }, [enabledFullScreen ? vue.createVNode(vue.resolveComponent("el-button"), {
      "type": "info",
      "onClick": this.toggleFullScreen,
      "class": this.ns.e("fullscreen"),
      "title": this.isFull ? ibiz.i18n.t("app.cancelFullscreen") : ibiz.i18n.t("app.fullscreen")
    }, {
      default: () => [vue.createVNode("ion-icon", {
        "name": this.isFull ? "contract-outline" : "expand-outline"
      }, null)]
    }) : null, vue.createVNode("div", {
      "class": this.ns.e("chart"),
      "ref": "chartRef"
    }, null), this.historyNames.length > 1 && vue.createVNode("div", {
      "class": this.ns.e("goback"),
      "onClick": () => {
        this.onBack();
      }
    }, [ibiz.i18n.t("app.return")])]);
  }
});

exports.IBizMapChartUser = IBizMapChartUser;
exports.default = IBizMapChartUser;
