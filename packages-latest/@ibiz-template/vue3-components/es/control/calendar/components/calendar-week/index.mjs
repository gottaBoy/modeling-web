import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarWeek } from './calendar-week.mjs';

"use strict";
const IBizCalendarWeek = withInstall(CalendarWeek, function(v) {
  v.component(CalendarWeek.name, CalendarWeek);
});

export { IBizCalendarWeek, IBizCalendarWeek as default };
