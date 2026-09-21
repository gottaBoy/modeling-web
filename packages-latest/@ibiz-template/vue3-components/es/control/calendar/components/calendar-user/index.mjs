import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarUser } from './calendar-user.mjs';

"use strict";
const IBizCalendarUser = withInstall(CalendarUser, function(v) {
  v.component(CalendarUser.name, CalendarUser);
});

export { IBizCalendarUser, IBizCalendarUser as default };
