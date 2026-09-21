'use strict';

var runtime = require('@ibiz-template/runtime');
var navigationBase_provider = require('./navigation-base.provider.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MapNavigationProvider extends navigationBase_provider.NavgationBaseProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "keyName", "_id");
  }
  /**
   * @description 导航数据变化
   * @param {IMapEvent['onNavDataChange']['event']} event
   * @memberof MapNavigationProvider
   */
  onNavDataChange(event) {
    var _a;
    const { navData } = event;
    if (((_a = this.navViewMsg.value) == null ? void 0 : _a.key) !== navData[this.keyName]) {
      this.navStack.unshift(navData[this.keyName]);
      this.navViewMsg.value = this.getNavViewMsg(navData);
    }
  }
  onNavDataByStack() {
    const { items } = this.controller.state;
    const navData = this.navStack.map((key) => items.find((item) => item[this.keyName] === key)).find((item) => item !== void 0) || items[0];
    if (navData) {
      if (navData._itemStyle.startsWith("REGION")) {
        const data = { ...navData };
        if (navData._areaCode) {
          data.areaCode = this.controller.state.strAreaCode ? "".concat(navData._areaCode) : Number(navData._areaCode);
          data.areaLevel = runtime.getAreaLevelByCode(navData._areaCode.toString());
        }
        this.setNavData(data);
      } else {
        this.setNavData(navData);
      }
    } else {
      this.clearNavigation();
    }
  }
  getNavViewMsg(item) {
    var _a, _b;
    const { sysMapItems } = this.model;
    const { areaCode, areaLevel } = item;
    const itemModel = sysMapItems == null ? void 0 : sysMapItems.find((_item) => _item.id === item._mapItemId);
    if (itemModel) {
      const tempContext = this.controller.context.clone();
      const tempParams = { ...this.controller.params };
      if ((_a = itemModel.itemStyle) == null ? void 0 : _a.startsWith("POINT")) {
        const deName = runtime.calcDeCodeNameById(itemModel.appDataEntityId);
        tempContext[deName] = item._deData.srfkey;
      }
      if ((_b = itemModel.itemStyle) == null ? void 0 : _b.startsWith("REGION")) {
        tempParams.srfareacode = areaCode;
        tempParams.srfarealevel = areaLevel;
        tempParams.srfarealevelnum = areaLevel ? runtime.getAreaLevelNum(areaLevel) : 1;
      }
      const { context, params } = this.prepareParams(
        itemModel,
        { ...item._deData, areaCode, areaLevel },
        tempContext,
        tempParams
      );
      Object.assign(params, tempParams);
      return {
        params,
        context,
        key: item[this.keyName],
        viewId: itemModel.navAppViewId
      };
    }
    return {
      key: item[this.keyName],
      context: this.controller.context,
      params: this.controller.params
    };
  }
}

exports.MapNavigationProvider = MapNavigationProvider;
