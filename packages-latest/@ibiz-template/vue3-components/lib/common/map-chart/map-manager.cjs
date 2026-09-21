'use strict';

var echarts = require('echarts');
var vue = require('vue');
var mapJson = require('./map-json.cjs');

"use strict";
function useMapManager(controller, opts, calcEchartsOpts, emit) {
  const mapInfos = /* @__PURE__ */ new Map();
  const currentName = vue.ref("");
  const historyNames = vue.ref([]);
  let chart;
  const chartRef = vue.ref();
  let resizeObserver;
  const parseJson = (json) => {
    const info = {
      cityNames: {},
      noChild: json.features.length === 1
    };
    json.features.forEach((item) => {
      const { adcode, name } = item.properties;
      info.cityNames[adcode] = name;
    });
    return info;
  };
  const registerMap = async (name) => {
    if (mapInfos.has(name)) {
      return;
    }
    const json = await mapJson.getJsonUrl(opts.value.jsonBaseUrl, name);
    mapInfos.set(name, parseJson(json));
    echarts.registerMap(name, json);
  };
  const getCityName = (mapName) => {
    const info = mapInfos.get(currentName.value);
    if (info) {
      return info.cityNames[mapName];
    }
  };
  const refresh = () => {
    if (currentName.value) {
      const options = calcEchartsOpts(currentName.value);
      chart.setOption(options);
      chart.resize();
    }
  };
  const changeMap = async (name, isInit = false) => {
    if (!isInit) {
      const areaCode = opts.value.strAreaCode ? "".concat(name) : Number(name);
      await controller.onMapChange(areaCode);
    }
    const strName = "".concat(name);
    if (!mapInfos.has(strName)) {
      await registerMap(strName);
    }
    currentName.value = strName;
    historyNames.value.push(strName);
    refresh();
  };
  const goBack = () => {
    if (historyNames.value.length > 1) {
      historyNames.value.pop();
      const name = historyNames.value.pop();
      changeMap(name);
    }
  };
  const resize = () => {
    chart == null ? void 0 : chart.resize();
  };
  vue.onMounted(() => {
    chart = echarts.init(chartRef.value);
    window.addEventListener("resize", resize);
    if (chartRef.value && ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(chartRef.value);
    }
    chart.on("click", (params) => {
      if (params.componentType === "series") {
        if (params.seriesType === "scatter") {
          emit("pointClick", params.data);
          return;
        }
        if (params.seriesType === "map") {
          if (params.data) {
            emit("areaClick", params.data);
          }
          if (params.name !== currentName.value) {
            changeMap(params.name);
          }
        }
      }
    });
    chart.on("mouseover", function(params) {
      if (params.componentType === "series") {
        if (params.seriesType === "scatter") {
          const dataIndex = params.dataIndex;
          const option = chart.getOption();
          const seriesData = option.series[params.seriesIndex].data;
          const originSize = option.series[params.seriesIndex].symbolSize;
          seriesData[dataIndex].symbolSize = originSize + 10;
          chart.setOption(option);
        }
      }
    });
    chart.on("mouseout", function(params) {
      if (params.componentType === "series") {
        if (params.seriesType === "scatter") {
          const dataIndex = params.dataIndex;
          const option = chart.getOption();
          const seriesData = option.series[params.seriesIndex].data;
          delete seriesData[dataIndex].symbolSize;
          chart.setOption(option);
        }
      }
    });
  });
  vue.onUnmounted(() => {
    window.removeEventListener("resize", resize);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
  });
  return {
    chartRef,
    historyNames,
    currentName,
    changeMap,
    getCityName,
    goBack,
    refresh
  };
}

exports.useMapManager = useMapManager;
