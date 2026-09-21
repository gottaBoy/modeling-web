import { ViewController, ICalendarViewEvent, ICalendarViewState, MDViewEngine, EventBase } from '@ibiz-template/runtime';
import { IAppDECalendarView } from '@ibiz/model-core';
export declare class CalendarViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDECalendarView, ICalendarViewState, ICalendarViewEvent>;
    protected onXDataActive(event: EventBase): Promise<void>;
    onCreated(): Promise<void>;
}
