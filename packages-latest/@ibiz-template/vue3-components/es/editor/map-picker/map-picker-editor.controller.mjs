import { EditorController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MapPickerEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * @description 预设标记点
     * @type {IData}
     * @memberof MapPickerEditorController
     */
    __publicField(this, "presetMarkers", []);
    /**
     * @description 标记点图标
     * @type {string}
     * @memberof MapPickerEditorController
     */
    __publicField(this, "markerIcon", "".concat(ibiz.env.assetsUrl, "/images/poi-marker-default.png"));
    /**
     * @description 默认中心点坐标
     * @memberof MapPickerEditorController
     */
    __publicField(this, "defaultCenter", []);
    /**
     * @description 默认城市
     * @memberof MapPickerEditorController
     */
    __publicField(this, "defaultCity", "");
  }
  async onInit() {
    await super.onInit();
    const { mapDataSetId, mapEntityId, defaultCenter, defaultCity } = this.editorParams;
    let { mapFieldMap } = this.editorParams;
    if (mapFieldMap) {
      mapFieldMap = JSON.parse(mapFieldMap);
    }
    if (mapEntityId && mapDataSetId) {
      const deService = await ibiz.hub.getApp(this.model.appId).deService.getService(this.context, mapEntityId);
      const res = await deService.exec(mapDataSetId, this.context);
      if (res.ok) {
        this.presetMarkers = res.data.map((item) => {
          const marker = {};
          for (const key in mapFieldMap) {
            if (mapFieldMap.hasOwnProperty(key)) {
              const field = mapFieldMap[key];
              marker[key] = item[field];
              if (["longitude", "latitude"].includes(key)) {
                marker[key] = parseFloat(marker[key]);
              }
            }
          }
          return marker;
        });
        const ns = useNamespace("map-picker");
        this.presetMarkers.forEach((item, index) => {
          if (!item.content) {
            item.content = '<div><img src="'.concat(this.markerIcon, '" width="25"><span class="').concat(ns.b("dialog-map-marker-index"), '">').concat(index + 1, "</span></div>");
          }
        });
      }
    }
    if (defaultCenter) {
      this.defaultCenter = defaultCenter.split(",");
    }
    if (defaultCity) {
      this.defaultCity = defaultCity;
    }
  }
}

export { MapPickerEditorController };
