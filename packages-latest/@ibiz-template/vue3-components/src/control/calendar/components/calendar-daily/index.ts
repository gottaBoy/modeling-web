import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarDaily } from './calendar-daily';

export const IBizCalendarDaily = withInstall(CalendarDaily, function (v: App) {
  v.component(CalendarDaily.name, CalendarDaily);
});

export default IBizCalendarDaily;
