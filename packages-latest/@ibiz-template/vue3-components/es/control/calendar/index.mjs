import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarControl } from './calendar.mjs';
import { CalendarProvider } from './calendar.provider.mjs';
import { IBizCustomCalendar } from './components/custom-calendar/index.mjs';

"use strict";
const IBizCalendarControl = withInstall(
  CalendarControl,
  function(v) {
    v.use(IBizCustomCalendar);
    v.component(CalendarControl.name, CalendarControl);
    registerControlProvider(ControlType.CALENDAR, () => new CalendarProvider());
  }
);

export { IBizCalendarControl, IBizCalendarControl as default };
