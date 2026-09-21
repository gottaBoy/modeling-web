import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarExpBarControl } from './calendar-exp-bar.mjs';
import { CalendarExpBarProvider } from './calendar-exp-bar.provider.mjs';

"use strict";
const IBizCalendarExpBarControl = withInstall(
  CalendarExpBarControl,
  function(v) {
    v.component(CalendarExpBarControl.name, CalendarExpBarControl);
    registerControlProvider(
      ControlType.CALENDAR_EXPBAR,
      () => new CalendarExpBarProvider()
    );
  }
);

export { IBizCalendarExpBarControl, IBizCalendarExpBarControl as default };
