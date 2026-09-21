import { AsyncSeriesHook } from 'qx-util';
import { EventBase, IViewShellHooks } from '../../interface';
export declare class ViewShellHooks implements IViewShellHooks {
    hooks: {
        viewCreated: AsyncSeriesHook<[], EventBase>;
        viewMounted: AsyncSeriesHook<[], EventBase>;
        viewDestroyed: AsyncSeriesHook<[], EventBase>;
    };
}
//# sourceMappingURL=view-shell-hooks.d.ts.map