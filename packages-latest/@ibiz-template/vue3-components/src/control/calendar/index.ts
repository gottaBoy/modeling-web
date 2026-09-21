import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { CalendarControl } from './calendar';
import { CalendarProvider } from './calendar.provider';
import IBizCustomCalendar from './components/custom-calendar';

export const IBizCalendarControl = withInstall(
  CalendarControl,
  function (v: App) {
    v.use(IBizCustomCalendar);
    v.component(CalendarControl.name, CalendarControl);
    registerControlProvider(ControlType.CALENDAR, () => new CalendarProvider());
  },
);

export default IBizCalendarControl;
