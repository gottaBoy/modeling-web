import { convertNavData } from '@ibiz-template/runtime';
import { NavgationBaseProvider } from './navigation-base.provider.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ChartNavigationProvider extends NavgationBaseProvider {
  constructor(controller) {
    super(controller);
    /**
     * 图表导航栈数据
     *
     * @type {IData[]}
     * @memberof ChartNavigationProvider
     */
    __publicField(this, "chartNavStack", []);
    if (controller.state.enableNavView) {
      controller.evt.on("onActive", (event) => {
        this.xDataActive(event);
      });
    }
  }
  /**
   * 获取默认激活数据
   *
   * @return {*}  {(IData | undefined)}
   * @memberof ChartNavigationProvider
   */
  getDefaultActiveData() {
    const activeSeriesGenerator = this.controller.generator.seriesGenerators.find((generator) => {
      return generator.chartDataArr.length > 0 && generator.model.navAppViewId;
    });
    if (activeSeriesGenerator && activeSeriesGenerator.groupData) {
      const firstGroupName = Object.keys(activeSeriesGenerator.groupData)[0];
      const { chartData } = activeSeriesGenerator.groupData[firstGroupName].values().next().value;
      return chartData;
    }
  }
  /**
   * 图表数据激活
   *
   * @param {EventBase} event
   * @memberof ChartNavigationProvider
   */
  xDataActive(event) {
    const { data } = event;
    this.navViewMsg.value = this.getNavViewMsg(data[0]);
    this.chartNavStack.unshift(data[0]);
  }
  /**
   * 通过栈数据导航
   *
   * @return {*}  {void}
   * @memberof ChartNavigationProvider
   */
  onNavDataByStack() {
    const data = this.getDefaultActiveData();
    if (!data)
      return this.clearNavigation();
    this.controller.setActive(data);
    this.controller.setSelection([data]);
  }
  /**
   * 解析参数
   *
   * @param {(INavigatable & { appDataEntityId?: string })} XDataModel
   * @param {IData} data
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {{ context: IContext; params: IParams }}
   * @memberof ChartNavigationProvider
   */
  prepareParams(XDataModel, data, context, params) {
    var _a;
    const { context: tempContext, params: tempParams } = super.prepareParams(
      XDataModel,
      data,
      context,
      params
    );
    if (data._seriesModelId) {
      const seriesModel = (_a = this.controller.model.dechartSerieses) == null ? void 0 : _a.find(
        (series) => {
          return series.id === data._seriesModelId;
        }
      );
      if (seriesModel) {
        const { navigateContexts, navigateParams } = seriesModel;
        const tempContext2 = convertNavData(
          navigateContexts,
          data,
          params,
          tempContext
        );
        const tempParams2 = convertNavData(
          navigateParams,
          data,
          params,
          tempParams
        );
        if (data.navParams)
          Object.assign(tempParams2, data.navParams);
        return {
          context: Object.assign(tempContext.clone(), tempContext2),
          params: tempParams2
        };
      }
    }
    return { context: tempContext, params: tempParams };
  }
  /**
   * 获取导航视图信息
   *
   * @param {IData} data
   * @return {*}  {INavViewMsg}
   * @memberof ChartNavigationProvider
   */
  getNavViewMsg(data) {
    var _a;
    let viewModelId;
    if (data._seriesModelId) {
      const seriesModel = (_a = this.controller.model.dechartSerieses) == null ? void 0 : _a.find(
        (series) => {
          return series.id === data._seriesModelId;
        }
      );
      viewModelId = seriesModel == null ? void 0 : seriesModel.navAppViewId;
    }
    const result = this.prepareParams(
      this.controller.model,
      data,
      this.controller.context,
      this.controller.params
    );
    return {
      key: data._uuid,
      context: result.context,
      params: result.params,
      viewId: viewModelId
    };
  }
}

export { ChartNavigationProvider };
