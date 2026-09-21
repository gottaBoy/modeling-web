import { defineComponent, computed, onMounted, createVNode } from 'vue';
import { mergeDeepLeft, mergeDeepWithKey, isNil } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { MapController } from '@ibiz-template/runtime';
import { defaultOpts, getTooltip, getVisualMap, getPointStaticOption, getPointOption, getAreaStaticOption, getAreaOption } from './map-chart-user.util.mjs';
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
    if (c.controlParams.defaultopts) {
      const data = JSON.parse(c.controlParams.defaultopts);
      option = mergeDeepLeft(data, option);
    }
    const options = computed(() => {
      return mergeDeepWithKey((_key, x, z) => {
        return isNil(z) ? x : z;
      }, option, props.options);
    });
    const {
      chartRef,
      historyNames,
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
      const areaOption = {
        ...getAreaStaticOption(options.value),
        ...getAreaOption(mapName, pointData, areaData, cityInfo)
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
    onMounted(() => {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("chart"),
      "ref": "chartRef"
    }, null), this.historyNames.length > 1 && createVNode("div", {
      "class": this.ns.e("goback"),
      "onClick": () => {
        this.goBack();
      }
    }, [ibiz.i18n.t("app.return")])]);
  }
});

export { IBizMapChartUser, IBizMapChartUser as default };
