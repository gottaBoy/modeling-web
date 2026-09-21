import { ViewController, ViewEngineBase, ICalendarExpBarController, ICalendarExpViewEvent, ICalendarExpViewState } from '@ibiz-template/runtime';
import { IAppDECalendarExplorerView } from '@ibiz/model-core';
export declare class CalendarExpViewEngine extends ViewEngineBase {
    /**
     * 日历导航视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDECalendarExplorerView,
     *     ICalendarExpViewState,
     *     ICalendarExpViewEvent
     *   >}
     * @memberof CalendarExpViewEngine
     */
    protected view: ViewController<IAppDECalendarExplorerView, ICalendarExpViewState, ICalendarExpViewEvent>;
    /**
     * 树导航栏
     *
     * @readonly
     * @memberof CalendarExpViewEngine
     */
    get calendarExpBar(): ICalendarExpBarController;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
}
