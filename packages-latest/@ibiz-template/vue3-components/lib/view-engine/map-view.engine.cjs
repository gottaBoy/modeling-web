'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class MapViewEngine extends runtime.MDViewEngine {
  get map() {
    return this.view.getController("map");
  }
  async onCreated() {
    super.onCreated();
    if (!this.view.slotProps.map) {
      this.view.slotProps.map = {};
    }
  }
}

exports.MapViewEngine = MapViewEngine;
