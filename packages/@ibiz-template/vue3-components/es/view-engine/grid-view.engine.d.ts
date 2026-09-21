import { ViewController, IGridViewEvent, IGridViewState, MDViewEngine, IGridController } from '@ibiz-template/runtime';
import { IAppDEGridView } from '@ibiz/model-core';
export declare class GridViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEGridView, IGridViewState, IGridViewEvent>;
    call(key: string, args: any): Promise<IData | null | undefined>;
    get grid(): IGridController;
    onCreated(): Promise<void>;
}
