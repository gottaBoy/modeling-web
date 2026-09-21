import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarUser2 } from './calendar-user2.mjs';

"use strict";
const IBizCalendarUser2 = withInstall(CalendarUser2, (v) => {
  v.component(CalendarUser2.name, CalendarUser2);
});

export { IBizCalendarUser2, IBizCalendarUser2 as default };
