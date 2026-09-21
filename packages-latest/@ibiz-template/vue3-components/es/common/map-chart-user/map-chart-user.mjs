import { defineComponent, createVNode, resolveComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { mergeDeepLeft, mergeDeepWithKey, isNil } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getAreaLevelByCode, MapController } from '@ibiz-template/runtime';
import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { toNumber } from 'lodash-es';
import { defaultOpts, getTooltip, getVisualMap, getPointOption, getPointStaticOption, getAreaOption, getAreaStaticOption } from './map-chart-user.util.mjs';
import { useMapManager } from './map-user-manager.mjs';
import './map-chart-user.css';

"use strict";
const IBizMapChartUser = /* @__PURE__ */ defineComponent({
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
      type: MapController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("map-chart-user");
    const c = props.controller;
    let option = defaultOpts;
    const mapRef = ref();
    const isFull = ref(false);
    if (c.controlParams.defaultopts) {
      const data = JSON.parse(c.controlParams.defaultopts);
      option = mergeDeepLeft(data, option);
    }
    const options = computed(() => {
      return mergeDeepWithKey((_key, x, z) => {
        return isNil(z) ? x : z;
      }, option, props.options);
    });
    let cleanup = NOOP;
    const {
      chartRef,
      historyNames,
      processing,
      areaLevelMap,
      changeMap,
      getCityInfo,
      goBack
    } = useMapManager(props.controller, options, (mapName) => {
      const areaData = props.areaData || [];
      const pointData = props.pointData || [];
      const tooltip = getTooltip();
      const visualMap = getVisualMap(options.value);
      const cityInfo = getCityInfo();
      const pointOption = {
        ...getPointStaticOption(options.value),
        ...getPointOption(pointData, areaData)
      };
      const {
        top,
        bottom
      } = options.value;
      const areaOption = {
        top,
        bottom,
        ...getAreaStaticOption(options.value),
        ...getAreaOption(mapName, pointData, areaData, cityInfo)
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
    onMounted(() => {
      const name = options.value.defaultAreaCode;
      const areaCode = c.state.strAreaCode ? "".concat(name) : Number(name);
      c.state.areaCode = areaCode;
      c.state.areaLevel = getAreaLevelByCode(areaCode.toString());
      changeMap(name, areaCode, true);
      c.evt.on("onDrillDown", async (args) => {
        if (!processing.value) {
          const {
            data
          } = args;
          const code = data.areaCode;
          const curAreaCode = c.state.strAreaCode ? "".concat(code) : Number(code);
          const areaLevel = areaLevelMap.get(toNumber(curAreaCode)) || "";
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
      cleanup = listenJSEvent(window, "resize", () => {
        if (isFull.value) {
          isFull.value = ibiz.fullscreenUtil.isFullScreen;
        }
      });
    });
    onBeforeUnmount(() => {
      if (cleanup !== NOOP) {
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
    return createVNode("div", {
      "class": this.ns.b(),
      "ref": "mapRef"
    }, [enabledFullScreen ? createVNode(resolveComponent("el-button"), {
      "type": "info",
      "onClick": this.toggleFullScreen,
      "class": this.ns.e("fullscreen"),
      "title": this.isFull ? ibiz.i18n.t("app.cancelFullscreen") : ibiz.i18n.t("app.fullscreen")
    }, {
      default: () => [createVNode("ion-icon", {
        "name": this.isFull ? "contract-outline" : "expand-outline"
      }, null)]
    }) : null, createVNode("div", {
      "class": this.ns.e("chart"),
      "ref": "chartRef"
    }, null), this.historyNames.length > 1 && createVNode("div", {
      "class": this.ns.e("goback"),
      "onClick": () => {
        this.onBack();
      }
    }, [ibiz.i18n.t("app.return")])]);
  }
});

export { IBizMapChartUser, IBizMapChartUser as default };
