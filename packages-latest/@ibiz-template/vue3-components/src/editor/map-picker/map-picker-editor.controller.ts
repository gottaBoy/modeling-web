/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import { EditorController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IMapPicker } from '@ibiz/model-core';

/**
 * @description 地图选择器编辑器控制器
 * @export
 * @class MapPickerEditorController
 * @extends {EditorController<IMapPicker>}
 */
export class MapPickerEditorController extends EditorController<IMapPicker> {
  /**
   * @description 预设标记点
   * @type {IData}
   * @memberof MapPickerEditorController
   */
  public presetMarkers: IData[] = [];

  /**
   * @description 标记点图标
   * @type {string}
   * @memberof MapPickerEditorController
   */
  public markerIcon: string = `${ibiz.env.assetsUrl}/images/poi-marker-default.png`;

  /**
   * @description 默认中心点坐标
   * @memberof MapPickerEditorController
   */
  public defaultCenter = [];

  /**
   * @description 默认城市
   * @memberof MapPickerEditorController
   */
  public defaultCity = '';

  protected async onInit(): Promise<void> {
    await super.onInit();
    const { mapDataSetId, mapEntityId, defaultCenter, defaultCity } =
      this.editorParams;
    let { mapFieldMap } = this.editorParams;
    if (mapFieldMap) {
      mapFieldMap = JSON.parse(mapFieldMap);
    }

    // 获取预设点数据
    if (mapEntityId && mapDataSetId) {
      const deService = await ibiz.hub
        .getApp(this.model.appId)
        .deService.getService(this.context, mapEntityId);
      const res = await deService.exec(mapDataSetId, this.context);
      if (res.ok) {
        this.presetMarkers = res.data.map((item: IData) => {
          const marker: IData = {};
          for (const key in mapFieldMap) {
            if (mapFieldMap.hasOwnProperty(key)) {
              const field = mapFieldMap[key];
              marker[key] = item[field];
              // 经纬度字段转换为数字
              if (['longitude', 'latitude'].includes(key)) {
                marker[key] = parseFloat(marker[key]);
              }
            }
          }
          return marker;
        });
        // 调整预设点样式
        const ns = useNamespace('map-picker');
        this.presetMarkers.forEach((item: IData, index: number) => {
          // 存在图标属性并且无内容属性
          if (!item.content) {
            item.content = `<div><img src="${this.markerIcon}" width="25"><span class="${ns.b('dialog-map-marker-index')}">${index + 1}</span></div>`;
          }
        });
      }
    }
    if (defaultCenter) {
      this.defaultCenter = defaultCenter.split(',');
    }
    if (defaultCity) {
      this.defaultCity = defaultCity;
    }
  }
}
