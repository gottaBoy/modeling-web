import { MDViewEngine } from '@ibiz-template/runtime';

"use strict";
class MapViewEngine extends MDViewEngine {
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

export { MapViewEngine };
