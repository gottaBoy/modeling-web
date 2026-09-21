'use strict';

var navigationBase_provider = require('./navigation-base.provider.cjs');
var calendarNavigation_provider = require('./calendar-navigation.provider.cjs');
var treeNavigation_provider = require('./tree-navigation.provider.cjs');

"use strict";
function getNavigationProvider(controller) {
  const { controlType } = controller.model;
  if (controlType === "CALENDAR") {
    return new calendarNavigation_provider.CalendarNavigationProvider(controller);
  }
  if (controlType === "TREEVIEW") {
    return new treeNavigation_provider.TreeNavigationProvider(controller);
  }
  return new navigationBase_provider.NavgationBaseProvider(controller);
}

exports.getNavigationProvider = getNavigationProvider;
