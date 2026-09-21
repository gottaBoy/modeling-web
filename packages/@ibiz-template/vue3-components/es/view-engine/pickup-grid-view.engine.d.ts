import { ViewController, IPickupGridViewEvent, IPickupGridViewState, IGridController } from '@ibiz-template/runtime';
import { IAppDEGridView } from '@ibiz/model-core';
import { GridViewEngine } from './grid-view.engine';
export declare class PickupGridViewEngine extends GridViewEngine {
    protected view: ViewController<IAppDEGridView, IPickupGridViewState, IPickupGridViewEvent>;
    /**
     * 表格控制器
     *
     * @author zk
     * @date 2023-05-26 05:05:43
     * @readonly
     * @memberof PickupGridViewEngine
     */
    get grid(): IGridController;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
