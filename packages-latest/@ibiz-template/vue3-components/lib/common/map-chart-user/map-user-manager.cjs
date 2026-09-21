'use strict';

var echarts = require('echarts');
var vue = require('vue');
var core = require('@ibiz-template/core');
var lodashEs = require('lodash-es');
var mapChartUser_util = require('./map-chart-user.util.cjs');

"use strict";
function useMapManager(controller, opts, calcEchartsOpts) {
  const mapInfos = /* @__PURE__ */ new Map();
  const currentName = vue.ref("");
  const historyNames = vue.ref([]);
  const areaLevelMap = /* @__PURE__ */ new Map();
  const processing = vue.ref(false);
  let chart;
  const chartRef = vue.ref();
  let resizeObserver;
  const parseJson = (json) => {
    const info = {
      cityNames: {},
      noChild: json.features.length === 1
    };
    json.features.forEach((item) => {
      const { adcode, name, level } = item.properties;
      info.cityNames[adcode] = name;
      areaLevelMap.set(adcode, level);
    });
    return info;
  };
  const setOption = async (data) => {
    controller.options = data;
    await controller.evt.emit("onBeforeUpdate", { data });
    chart.setOption(data, true);
  };
  const registerMap = async (name) => {
    if (mapInfos.has(name)) {
      return;
    }
    const json = await mapChartUser_util.getJsonUrl(opts.value.jsonBaseUrl, name);
    mapInfos.set(name, parseJson(json));
    echarts.registerMap(name, json);
  };
  const getCityInfo = () => {
    return mapInfos.get(currentName.value);
  };
  const refresh = () => {
    if (currentName.value) {
      const options = calcEchartsOpts(currentName.value);
      setOption(options);
      chart.resize();
    }
  };
  const changeMap = async (name, areaCode, isInit = false) => {
    const strName = "".concat(name);
    if (!mapInfos.has(strName)) {
      await registerMap(strName);
    }
    if (!isInit) {
      await controller.onMapChange(areaCode);
    } else {
      const areaLevel = areaLevelMap.get(lodashEs.toNumber(areaCode)) || "";
      controller.state.areaLevel = areaLevel;
    }
    currentName.value = strName;
    controller.state.mapInfo = getCityInfo();
    historyNames.value.push(strName);
    refresh();
  };
  const goBack = async () => {
    if (historyNames.value.length > 1) {
      historyNames.value.pop();
      const name = historyNames.value.pop();
      const areaCode = opts.value.strAreaCode ? "".concat(name) : Number(name);
      const areaLevel = areaLevelMap.get(lodashEs.toNumber(areaCode)) || "";
      controller.state.areaCode = areaCode;
      controller.state.areaLevel = areaLevel;
      changeMap(name, areaCode);
    }
  };
  const cleanup = core.listenJSEvent(window, "resize", () => {
    if (chart) {
      chart.resize();
    }
  });
  vue.onMounted(() => {
    chart = echarts.init(chartRef.value);
    controller.chart = chart;
    if (chartRef.value && ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        chart == null ? void 0 : chart.resize();
      });
      resizeObserver.observe(chartRef.value);
    }
    chart.on("click", (params) => {
      if (params.componentType === "series") {
        if (params.seriesType === "scatter") {
          if (!params.data) {
            return;
          }
          processing.value = true;
          const { pointData, areaData } = controller.state;
          const data = mapChartUser_util.findData(params.data._id, "point", pointData, areaData);
          if (data) {
            controller.onPointClick(data);
          }
          processing.value = false;
          return;
        }
        if (params.seriesType === "map") {
          processing.value = true;
          const areaCode = opts.value.strAreaCode ? "".concat(params.name) : Number(params.name);
          const areaLevel = areaLevelMap.get(lodashEs.toNumber(areaCode)) || "";
          const { pointData, areaData, enabledDrillDown, mdctrlActiveMode } = controller.state;
          if (params.data) {
            const data = mapChartUser_util.findData(params.data._id, "area", pointData, areaData);
            if (data) {
              controller.onAreaClick(data, areaCode, areaLevel);
            }
          }
          if (params.name !== currentName.value && enabledDrillDown && mdctrlActiveMode !== 2) {
            if (lodashEs.toNumber(areaCode) > lodashEs.toNumber(controller.state.areaCode)) {
              controller.evt.emit("onDrillDown", { data: { areaCode } });
            }
            controller.state.areaCode = areaCode;
            controller.state.areaLevel = areaLevel || "";
            changeMap(params.name, areaCode);
          }
          processing.value = false;
        }
      }
    });
    chart.on("dblclick", (params) => {
      const { enabledDrillDown, mdctrlActiveMode } = controller.state;
      if (params.componentType === "series" && params.seriesType === "map" && mdctrlActiveMode === 2 && enabledDrillDown) {
        processing.value = true;
        const areaCode = opts.value.strAreaCode ? "".concat(params.name) : Number(params.name);
        const areaLevel = areaLevelMap.get(lodashEs.toNumber(areaCode)) || "";
        if (lodashEs.toNumber(areaCode) > lodashEs.toNumber(controller.state.areaCode)) {
          controller.evt.emit("onDrillDown", { data: { areaCode } });
        }
        controller.state.areaCode = areaCode;
        controller.state.areaLevel = areaLevel;
        if (params.name !== currentName.value) {
          changeMap(params.name, areaCode);
        }
        processing.value = false;
      }
    });
    chart.on("mouseover", function(data) {
      controller.evt.emit("onMouseOver", { data });
      if (data.componentType === "series") {
        if (data.seriesType === "scatter") {
          const dataIndex = data.dataIndex;
          const options = chart.getOption();
          const seriesData = options.series[data.seriesIndex].data;
          const originSize = options.series[data.seriesIndex].symbolSize;
          seriesData[dataIndex].symbolSize = originSize + 10;
          setOption(options);
        }
      }
    });
    chart.on("mouseout", function(data) {
      controller.evt.emit("onMouseOut", { data });
      if (data.componentType === "series") {
        if (data.seriesType === "scatter") {
          const dataIndex = data.dataIndex;
          const options = chart.getOption();
          const seriesData = options.series[data.seriesIndex].data;
          delete seriesData[dataIndex].symbolSize;
          setOption(options);
        }
      }
    });
  });
  vue.onUnmounted(() => {
    cleanup();
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
  });
  return {
    chartRef,
    historyNames,
    currentName,
    processing,
    areaLevelMap,
    changeMap,
    getCityInfo,
    goBack,
    refresh
  };
}

exports.useMapManager = useMapManager;
