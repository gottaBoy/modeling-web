'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class CalendarViewEngine extends runtime.MDViewEngine {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async onXDataActive(event) {
  }
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.calendar) {
      this.view.slotProps.calendar = {};
    }
    this.view.slotProps.calendar.mdctrlActiveMode = model.mdctrlActiveMode;
  }
}

exports.CalendarViewEngine = CalendarViewEngine;
