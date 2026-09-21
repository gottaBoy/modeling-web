import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarDaily } from './calendar-daily.mjs';

"use strict";
const IBizCalendarDaily = withInstall(CalendarDaily, function(v) {
  v.component(CalendarDaily.name, CalendarDaily);
});

export { IBizCalendarDaily, IBizCalendarDaily as default };
