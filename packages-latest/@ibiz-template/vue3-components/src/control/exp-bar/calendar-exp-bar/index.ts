import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { CalendarExpBarControl } from './calendar-exp-bar';
import { CalendarExpBarProvider } from './calendar-exp-bar.provider';

export const IBizCalendarExpBarControl = withInstall(
  CalendarExpBarControl,
  function (v: App) {
    v.component(CalendarExpBarControl.name, CalendarExpBarControl);
    registerControlProvider(
      ControlType.CALENDAR_EXPBAR,
      () => new CalendarExpBarProvider(),
    );
  },
);

export default IBizCalendarExpBarControl;
