import { registerMap, init } from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import { listenJSEvent } from '@ibiz-template/core';
import { getJsonUrl, findData } from './map-chart-user.util.mjs';

"use strict";
function useMapManager(controller, opts, calcEchartsOpts) {
  const mapInfos = /* @__PURE__ */ new Map();
  const currentName = ref("");
  const historyNames = ref([]);
  let chart;
  const chartRef = ref();
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
  const setOption = async (data) => {
    controller.options = data;
    await controller.evt.emit("onBeforeUpdate", { data });
    chart.setOption(data);
  };
  const registerMap$1 = async (name) => {
    if (mapInfos.has(name)) {
      return;
    }
    const json = await getJsonUrl(opts.value.jsonBaseUrl, name);
    mapInfos.set(name, parseJson(json));
    registerMap(name, json);
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
    if (!isInit) {
      controller.onMapChange(areaCode);
    }
    const strName = "".concat(name);
    if (!mapInfos.has(strName)) {
      await registerMap$1(strName);
    }
    controller.state.mapInfo = getCityInfo();
    currentName.value = strName;
    historyNames.value.push(strName);
    refresh();
  };
  const goBack = async () => {
    if (historyNames.value.length > 1) {
      historyNames.value.pop();
      const name = historyNames.value.pop();
      const areaCode = opts.value.strAreaCode ? "".concat(name) : Number(name);
      controller.state.areaCode = areaCode;
      await controller.evt.emit("onBackClick", void 0);
      changeMap(name, areaCode);
    }
  };
  const cleanup = listenJSEvent(window, "resize", () => {
    if (chart) {
      chart.resize();
    }
  });
  onMounted(() => {
    chart = init(chartRef.value);
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
          const { pointData, areaData } = controller.state;
          const data = findData(params.data._id, "point", pointData, areaData);
          if (data) {
            controller.onPointClick(data);
          }
          return;
        }
        if (params.seriesType === "map") {
          const areaCode = opts.value.strAreaCode ? "".concat(params.name) : Number(params.name);
          controller.state.areaCode = areaCode;
          if (params.data) {
            const { pointData, areaData } = controller.state;
            const data = findData(params.data._id, "area", pointData, areaData);
            if (data) {
              controller.onAreaClick(data);
            }
          }
          if (params.name !== currentName.value) {
            changeMap(params.name, areaCode);
          }
        }
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
  onUnmounted(() => {
    cleanup();
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
  });
  return {
    chartRef,
    historyNames,
    currentName,
    changeMap,
    getCityInfo,
    goBack,
    refresh
  };
}

export { useMapManager };
