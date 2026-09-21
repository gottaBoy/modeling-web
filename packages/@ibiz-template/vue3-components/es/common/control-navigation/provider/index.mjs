import { NavgationBaseProvider } from './navigation-base.provider.mjs';
import { CalendarNavigationProvider } from './calendar-navigation.provider.mjs';
import { TreeNavigationProvider } from './tree-navigation.provider.mjs';

"use strict";
function getNavigationProvider(controller) {
  const { controlType } = controller.model;
  if (controlType === "CALENDAR") {
    return new CalendarNavigationProvider(controller);
  }
  if (controlType === "TREEVIEW") {
    return new TreeNavigationProvider(controller);
  }
  return new NavgationBaseProvider(controller);
}

export { getNavigationProvider };
