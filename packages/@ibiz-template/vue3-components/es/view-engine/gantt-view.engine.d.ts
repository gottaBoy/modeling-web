import { MDViewEngine, ViewController, IGanttViewState, IGanttViewEvent, IGanttController, EventBase } from '@ibiz-template/runtime';
import { IAppDEGanttView } from '@ibiz/model-core';
export declare class GanttViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEGanttView, IGanttViewState, IGanttViewEvent>;
    get gantt(): IGanttController;
    call(key: string, args: any): Promise<IData | null | undefined>;
    protected onXDataActive(event: EventBase): Promise<void>;
    onCreated(): Promise<void>;
}
