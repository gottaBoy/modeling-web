import { IAppView } from '@ibiz/model-core';
import { IViewController, IViewEvent, IWFStepTraceViewState } from '../../../interface';
import { ViewController } from './view.controller';
export declare class WFStepTraceViewController<T extends IAppView = IAppView, S extends IWFStepTraceViewState = IWFStepTraceViewState, E extends IViewEvent = IViewEvent> extends ViewController<T, S, E> implements IViewController<T, S, E> {
    protected initState(): void;
    protected onCreated(): Promise<void>;
}
//# sourceMappingURL=wf-step-trace-view.controller.d.ts.map