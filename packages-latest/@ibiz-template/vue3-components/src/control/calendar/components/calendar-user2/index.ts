import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarUser2 } from './calendar-user2';

export const IBizCalendarUser2 = withInstall(CalendarUser2, (v: App) => {
  v.component(CalendarUser2.name!, CalendarUser2);
});

export default IBizCalendarUser2;
