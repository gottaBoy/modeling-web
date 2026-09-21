'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class CalendarExpViewEngine extends runtime.ViewEngineBase {
  /**
   * 树导航栏
   *
   * @readonly
   * @memberof CalendarExpViewEngine
   */
  get calendarExpBar() {
    return this.view.getController(
      "calendarexpbar"
    );
  }
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("calendarexpbar");
    if (!this.view.slotProps.calendarexpbar) {
      this.view.slotProps.calendarexpbar = {};
    }
    this.view.slotProps.calendarexpbar.srfnav = this.view.state.srfnav;
  }
  async onMounted() {
    await super.onMounted();
    const { model } = this.view;
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.calendarExpBar.load();
    }
  }
}

exports.CalendarExpViewEngine = CalendarExpViewEngine;
