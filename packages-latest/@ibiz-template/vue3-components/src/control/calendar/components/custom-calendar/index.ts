import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { CustomCalendar } from './custom-calendar';

export const IBizCustomCalendar = withInstall(
  CustomCalendar,
  function (v: App) {
    v.component(CustomCalendar.name, CustomCalendar);
  },
);

export default IBizCustomCalendar;
