import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { App } from 'vue';
import MapControl from './map';
import { MapProvider } from './map.provider';

export const IBizMapControl = {
  install(v: App): void {
    v.component(MapControl.name, MapControl);
    registerControlProvider(ControlType.MAP, () => new MapProvider());
  },
};

export default IBizMapControl;
