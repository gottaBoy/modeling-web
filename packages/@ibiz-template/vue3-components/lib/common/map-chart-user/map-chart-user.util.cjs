'use strict';

var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
async function getJsonUrl(baseUrl, code) {
  const res = await ibiz.net.axios({
    url: "".concat(baseUrl, "/").concat(code, ".json")
  });
  return res.data;
}
const GradientColors = ["#90d1e7", "#fff600", "#ff5200"];
const defaultOpts = {
  /** true地图code标识使用字符串，false使用数字 */
  strAreaCode: false,
  /** 热力图配置 */
  visualMap: {
    /** 两端的文本，如 ['高', '低'] */
    text: [
      ibiz.i18n.t("component.mapChart.high"),
      ibiz.i18n.t("component.mapChart.low")
    ],
    /** 底部代表的值 */
    min: 0,
    /** 顶部代表的值 */
    max: 100,
    /** 热力图渐变颜色数组 */
    rangeColor: GradientColors
  },
  /** 区块颜色 */
  areaColor: "#87cefa",
  /** 区块边界颜色 */
  areaBorderColor: "#FFF",
  /** 悬浮时区块颜色 */
  hoverAreaColor: "#fbdb2f",
  /** 点图标 */
  pointSymbol: "pin",
  /** 地图json数据基础路径 */
  jsonBaseUrl: "./assets/json/map",
  /** 默认打开的区域编码 */
  defaultAreaCode: 1e5
};
const findData = (id, type, pointData = [], areaData = []) => {
  if (type === "area") {
    return areaData.find((item) => item._id === id);
  }
  if (type === "point") {
    return pointData.find((item) => item._id === id);
  }
};
const getCssVarByName = (name) => {
  let result = name;
  const styles = window.getComputedStyle(document.documentElement);
  if (styles) {
    result = styles.getPropertyValue(name) || result;
  }
  return result;
};
const getPointStaticOption = (params) => {
  const { pointSymbol } = params;
  const ns = vue3Util.useNamespace("map-chart-user");
  const textColor = getCssVarByName(ns.cssVarName("color-text-1"));
  const fontSize = getCssVarByName(ns.cssVarName("font-size-header-4"));
  const options = {
    type: "scatter",
    coordinateSystem: "geo",
    symbol: pointSymbol,
    symbolSize: Number(fontSize.slice(0, 2)),
    visualMap: false,
    itemStyle: {
      color: textColor
    }
  };
  return options;
};
const getPointOption = (pointData, areaData) => {
  const options = {};
  const ns = vue3Util.useNamespace("map-chart-user");
  const textColor = getCssVarByName(ns.cssVarName("color-text-1"));
  const fontSize = getCssVarByName(ns.cssVarName("font-size-regular"));
  options.label = {
    show: true,
    color: textColor,
    fontSize: Number(fontSize.slice(0, 2)),
    textShadowBlur: 0,
    formatter: (params) => {
      if (!params.data) {
        return;
      }
      const find = findData(params.data._id, "point", pointData, areaData);
      return find == null ? void 0 : find._text;
    },
    // 偏移
    position: "left",
    offset: [10, -15]
  };
  options.tooltip = {
    formatter: (params) => {
      if (!params.data) {
        return;
      }
      const find = findData(params.data._id, "point", pointData, areaData);
      return '<div style="color:'.concat(find._color, ";background: ").concat(find._bgcolor, '" class="').concat(find._className, " ").concat(ns.e("popper"), '">').concat(find == null ? void 0 : find._tooltip, "</div>");
    },
    padding: 0
  };
  options.data = pointData.map((item) => {
    let symbol;
    if (item._symbol) {
      symbol = "image://".concat(item._symbol);
    }
    return {
      _id: item._id,
      symbol,
      value: [Number(item._longitude), Number(item._latitude)],
      // 每个点逃离visualMap
      visualMap: false
    };
  });
  return options;
};
const getAreaStaticOption = (params) => {
  const { areaColor, areaBorderColor, hoverAreaColor } = params;
  const options = {
    type: "map",
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
    }
  };
  return options;
};
const getAreaOption = (mapName, pointData, areaData, cityInfo = []) => {
  const options = {};
  const ns = vue3Util.useNamespace("map-chart-user");
  const textColor = getCssVarByName(ns.cssVarName("color-text-1"));
  const fontSize = getCssVarByName(ns.cssVarName("font-size-regular"));
  options.map = mapName;
  options.label = {
    show: true,
    color: textColor,
    fontSize: Number(fontSize.slice(0, 2)),
    formatter: (params) => {
      return cityInfo.cityNames[params.name];
    }
  };
  options.tooltip = {
    formatter: (params) => {
      if (!params.data) {
        return;
      }
      const find = findData(params.data._id, "area", pointData, areaData);
      return '<div style="color:'.concat(find._color, ";background: ").concat(find._bgcolor, '" class="').concat(find._className, " ").concat(ns.e("popper"), '">').concat(find == null ? void 0 : find._tooltip, "</div>");
    },
    padding: 0
  };
  options.data = areaData.map((item) => {
    return {
      name: "".concat(item._areaCode),
      value: item._value,
      _id: item._id
    };
  });
  options.select = {
    disabled: true
  };
  return options;
};
const getTooltip = () => {
  const ns = vue3Util.useNamespace("map-chart-user");
  const textColor = getCssVarByName(ns.cssVarName("color-text-1"));
  const fontSize = getCssVarByName(ns.cssVarName("font-size-regular"));
  const backgroundColor = getCssVarByName(ns.cssVarName("color-bg-0"));
  return {
    trigger: "item",
    textStyle: {
      color: textColor,
      fontSize: Number(fontSize.slice(0, 2))
    },
    backgroundColor,
    borderWidth: 0,
    extraCssText: "backdrop-filter: blur(3px);"
  };
};
const getVisualMap = (options) => {
  const { visualMap } = options;
  return {
    min: visualMap.min,
    max: visualMap.max,
    text: visualMap.text,
    realtime: false,
    hoverLink: false,
    inRange: {
      color: visualMap.rangeColor
    }
  };
};

exports.GradientColors = GradientColors;
exports.defaultOpts = defaultOpts;
exports.findData = findData;
exports.getAreaOption = getAreaOption;
exports.getAreaStaticOption = getAreaStaticOption;
exports.getCssVarByName = getCssVarByName;
exports.getJsonUrl = getJsonUrl;
exports.getPointOption = getPointOption;
exports.getPointStaticOption = getPointStaticOption;
exports.getTooltip = getTooltip;
exports.getVisualMap = getVisualMap;
