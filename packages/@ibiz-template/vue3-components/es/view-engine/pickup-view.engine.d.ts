import { ViewEngineBase, ViewController, IPickupViewPanelController, IPickupViewState, IPickupViewEvent } from '@ibiz-template/runtime';
import { IAppDEPickupView } from '@ibiz/model-core';
export declare class PickupViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEPickupView, IPickupViewState, IPickupViewEvent>}
     * @memberof PickupViewEngine
     */
    protected view: ViewController<IAppDEPickupView, IPickupViewState, IPickupViewEvent>;
    /**
     * 选中数据
     *
     * @type {IData[]}
     * @memberof PickupViewEngine
     */
    selectData: IData[];
    /**
     * 选择视图面板
     *
     * @readonly
     * @memberof PickupViewEngine
     */
    get pickupViewPanel(): IPickupViewPanelController;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof PickupViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof PickupViewEngine
     */
    onMounted(): Promise<void>;
    /**
     *  选则面板激活数据
     *
     * @author zk
     * @date 2023-05-26 05:05:13
     * @param {*} data
     * @memberof PickupViewEngine
     */
    protected pickupViewPanelDataActive(data: IData[]): void;
    call(key: string, args: IData | undefined): Promise<IData | null | undefined>;
    /**
     * 确认
     *
     * @memberof PickupViewEngine
     */
    confirm(): void;
    /**
     * 取消
     *
     * @memberof PickupViewEngine
     */
    cancel(): void;
}
