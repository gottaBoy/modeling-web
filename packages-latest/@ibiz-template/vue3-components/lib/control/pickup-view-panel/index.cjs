'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var pickupViewPanel = require('./pickup-view-panel.cjs');
var pickupViewPanel_provider = require('./pickup-view-panel.provider.cjs');

"use strict";
const IBizPickupViewPanelControl = vue3Util.withInstall(
  pickupViewPanel.PickupViewPanelControl,
  function(v) {
    v.component(pickupViewPanel.PickupViewPanelControl.name, pickupViewPanel.PickupViewPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.PICKUP_VIEW_PANEL,
      () => new pickupViewPanel_provider.PickupViewPanelProvider()
    );
  }
);

exports.IBizPickupViewPanelControl = IBizPickupViewPanelControl;
exports.default = IBizPickupViewPanelControl;
