import { MDViewEngine } from '@ibiz-template/runtime';

"use strict";
class CalendarViewEngine extends MDViewEngine {
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
  async openData(args) {
    const { data, event } = args;
    const result = await this.xdataControl.openData(data[0], event);
    return result;
  }
  async newData(args) {
    const { data, event } = args;
    const result = await this.xdataControl.newData(data[0], event);
    return result;
  }
}

export { CalendarViewEngine };
