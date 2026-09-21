import { ViewController, IMPickupViewState, IMPickupViewEvent, IListController } from '@ibiz-template/runtime';
import { IAppDEPickupView } from '@ibiz/model-core';
import { PickupViewEngine } from './pickup-view.engine';
/**
 * 多数据选择视图引擎
 *
 * @author zk
 * @date 2023-05-25 03:05:17
 * @export
 * @class MPickupViewEngine
 * @extends {ViewEngineBase}
 */
export declare class MPickupViewEngine extends PickupViewEngine {
    protected view: ViewController<IAppDEPickupView, IMPickupViewState, IMPickupViewEvent>;
    /**
     * 简单列表控制器
     *
     * @author zk
     * @date 2023-05-26 03:05:43
     * @readonly
     * @memberof MPickupViewEngine
     */
    get simpleList(): IListController;
    /**
     * 视图created生命周期执行逻辑
     *
     * @author zk
     * @date 2023-05-26 05:05:36
     * @return {*}  {Promise<void>}
     * @memberof MPickupViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @author zk
     * @date 2023-05-26 05:05:27
     * @return {*}  {Promise<void>}
     * @memberof MPickupViewEngine
     */
    onMounted(): Promise<void>;
    call(key: string, args: IData | undefined): Promise<IData | null | undefined>;
    /**
     *  选则面板激活数据
     *
     * @author zk
     * @date 2023-05-26 05:05:13
     * @param {*} data
     * @memberof PickupViewEngine
     */
    protected pickupViewPanelDataActive(data: IData[]): void;
    /**
     * 列表激活
     *
     * @author zk
     * @date 2023-05-26 05:05:47
     * @param {IData[]} data
     * @memberof MPickupViewEngine
     */
    protected simpleListActive(data: IData[]): void;
    /**
     * 添加选中
     *
     * @author zk
     * @date 2023-05-25 05:05:10
     * @memberof MPickupViewEngine
     */
    addSelection(): Promise<void>;
    /**
     * 处理添加简单列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:41
     * @param {IData[]} data
     * @memberof MPickupViewEngine
     */
    protected handlePushSimpleListItems(data: IData[]): void;
    /**
     * 去重数组
     *
     * @author zk
     * @date 2023-05-26 03:05:08
     * @param {IData[]} arr
     * @return {*}
     * @memberof MPickupViewEngine
     */
    protected handleUniqueItems(arr: IData[]): IData[];
    /**
     * 添加所有
     *
     * @author zk
     * @date 2023-05-25 05:05:12
     * @memberof MPickupViewEngine
     */
    addAll(): Promise<void>;
    /**
     * 删除所有
     *
     * @author zk
     * @date 2023-05-25 05:05:14
     * @memberof MPickupViewEngine
     */
    removeAll(): void;
    /**
     * 删除选中
     *
     * @author zk
     * @date 2023-05-25 05:05:16
     * @memberof MPickupViewEngine
     */
    protected removeSelection(): void;
    /**
     * 提交
     *
     * @author zk
     * @date 2023-05-25 06:05:42
     * @memberof MPickupViewEngine
     */
    confirm(): void;
}
