import { NavgationBaseProvider } from './navigation-base.provider.mjs';
import { CalendarNavigationProvider } from './calendar-navigation.provider.mjs';
import { TreeNavigationProvider } from './tree-navigation.provider.mjs';
import { MapNavigationProvider } from './map-navigation.provider.mjs';
import { ChartNavigationProvider } from './chart-navigation.provider.mjs';

"use strict";
function getNavigationProvider(controller) {
  const { controlType } = controller.model;
  if (controlType === "CALENDAR")
    return new CalendarNavigationProvider(controller);
  if (controlType === "TREEVIEW" || controlType === "TREEGRIDEX")
    return new TreeNavigationProvider(controller);
  if (controlType === "MAP")
    return new MapNavigationProvider(controller);
  if (controlType === "CHART")
    return new ChartNavigationProvider(controller);
  return new NavgationBaseProvider(controller);
}

export { getNavigationProvider };
