import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CalendarWeek } from './calendar-week';

export const IBizCalendarWeek = withInstall(CalendarWeek, function (v: App) {
  v.component(CalendarWeek.name, CalendarWeek);
});

export default IBizCalendarWeek;
