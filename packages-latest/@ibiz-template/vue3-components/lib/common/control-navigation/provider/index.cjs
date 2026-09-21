'use strict';

var navigationBase_provider = require('./navigation-base.provider.cjs');
var calendarNavigation_provider = require('./calendar-navigation.provider.cjs');
var treeNavigation_provider = require('./tree-navigation.provider.cjs');
var mapNavigation_provider = require('./map-navigation.provider.cjs');
var chartNavigation_provider = require('./chart-navigation.provider.cjs');

"use strict";
function getNavigationProvider(controller) {
  const { controlType } = controller.model;
  if (controlType === "CALENDAR")
    return new calendarNavigation_provider.CalendarNavigationProvider(controller);
  if (controlType === "TREEVIEW" || controlType === "TREEGRIDEX")
    return new treeNavigation_provider.TreeNavigationProvider(controller);
  if (controlType === "MAP")
    return new mapNavigation_provider.MapNavigationProvider(controller);
  if (controlType === "CHART")
    return new chartNavigation_provider.ChartNavigationProvider(controller);
  return new navigationBase_provider.NavgationBaseProvider(controller);
}

exports.getNavigationProvider = getNavigationProvider;
