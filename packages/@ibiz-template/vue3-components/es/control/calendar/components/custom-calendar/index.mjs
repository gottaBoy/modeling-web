import { withInstall } from '@ibiz-template/vue3-util';
import { CustomCalendar } from './custom-calendar.mjs';

"use strict";
const IBizCustomCalendar = withInstall(
  CustomCalendar,
  function(v) {
    v.component(CustomCalendar.name, CustomCalendar);
  }
);

export { IBizCustomCalendar, IBizCustomCalendar as default };
