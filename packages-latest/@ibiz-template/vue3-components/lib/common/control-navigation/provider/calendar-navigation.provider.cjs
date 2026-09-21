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
class CalendarNavigationProvider extends navigationBase_provider.NavgationBaseProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "keyName", "navId");
  }
  /**
   * @description 通过栈数据导航
   * - 特殊处理仅使用开始时间绘制的日历
   * @memberof CalendarNavigationProvider
   */
  onNavDataByStack() {
    var _a;
    const { controlParams, state, model } = this.controller;
    const calendarStyle = (_a = model.calendarStyle) == null ? void 0 : _a.toLowerCase();
    const items = state.items.filter((item) => {
      if (calendarStyle === "month" && controlParams.showmode !== "daterange" || calendarStyle === "user")
        return runtime.compareDateEqualByScale(
          item.beginTime,
          state.selectedDate,
          calendarStyle === "user" ? "week" : "month"
        );
      return true;
    });
    const navData = this.navStack.map((key) => items.find((item) => item[this.keyName] === key)).find((item) => item !== void 0) || items[0];
    if (navData) {
      this.setNavData(navData);
    } else {
      this.clearNavigation();
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
        params,
        context,
        key: item.navId,
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
