'use strict';

var navigationBase_provider = require('./navigation-base.provider.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CalendarNavigationProvider extends navigationBase_provider.NavgationBaseProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "keyName", "navId");
  }
  onNavDataByStack() {
    const { items } = this.controller.state;
    const navData = this.navStack.map((key) => items.find((item) => item.navId === key)).find((item) => item !== void 0) || items[0];
    if (navData) {
      const date = new Date(navData.beginTime);
      this.controller.setSelectDate(date);
      this.controller.setNavData(navData);
    } else {
      this.navStack = [];
      this.controller.setSelectDate(/* @__PURE__ */ new Date());
      this.navViewMsg.value = void 0;
    }
  }
  getNavViewMsg(item) {
    const { sysCalendarItems } = this.model;
    const itemModel = sysCalendarItems == null ? void 0 : sysCalendarItems.find(
      (_item) => _item.itemType === item.itemType
    );
    if (itemModel) {
      const { context, params } = this.prepareParams(
        itemModel,
        item.deData ? item.deData : item,
        this.controller.context,
        this.controller.params
      );
      return {
        key: item.navId,
        context,
        params,
        viewId: itemModel.navAppViewId
      };
    }
    return {
      key: item.navId,
      context: this.controller.context,
      params: this.controller.params
    };
  }
}

exports.CalendarNavigationProvider = CalendarNavigationProvider;
