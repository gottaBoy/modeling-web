/* eslint-disable no-await-in-loop */
import { AsyncSeriesHook } from 'qx-util';
export class ViewShellHooks {
    constructor() {
        this.hooks = {
            viewCreated: new AsyncSeriesHook(),
            viewMounted: new AsyncSeriesHook(),
            viewDestroyed: new AsyncSeriesHook(),
        };
    }
}
