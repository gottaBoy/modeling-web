import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarUser } from './calendar-user';

export const IBizCalendarUser = withInstall(CalendarUser, function (v: App) {
  v.component(CalendarUser.name!, CalendarUser);
});

export default IBizCalendarUser;
