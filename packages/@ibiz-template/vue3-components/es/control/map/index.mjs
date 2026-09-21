import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import MapControl from './map.mjs';
import { MapProvider } from './map.provider.mjs';

"use strict";
const IBizMapControl = {
  install(v) {
    v.component(MapControl.name, MapControl);
    registerControlProvider(ControlType.MAP, () => new MapProvider());
  }
};

export { IBizMapControl, IBizMapControl as default };
