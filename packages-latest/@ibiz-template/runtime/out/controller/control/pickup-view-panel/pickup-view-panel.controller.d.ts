import { IAppDEGridView, IDEPickupViewPanel } from '@ibiz/model-core';
import { IViewController, IPickupGridViewState, IPickupGridViewEvent, IPickupViewPanelState, IPickupViewPanelEvent, IPickupViewPanelController } from '../../../interface';
import { ControlController } from '../../common';
/**
 * 选择面板控制器
 *
 * @export
 * @class PickupViewPanelController
 * @extends {ControlController<IDEPickupViewPanel, IPickupViewPanelState, IPickupViewPanelEvent>}
 * @implements {IPickupViewPanelController}
 */
export declare class PickupViewPanelController extends ControlController<IDEPickupViewPanel, IPickupViewPanelState, IPickupViewPanelEvent> implements IPickupViewPanelController {
    /**
     * 嵌入视图控制器
     *
     * @type {IViewController}
     * @memberof PickupViewPanelController
     */
    embedView: IViewController<IAppDEGridView, IPickupGridViewState, IPickupGridViewEvent>;
    /**
     * 生命周期-创建完成
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PickupViewPanelController
     */
    protected onCreated(): Promise<void>;
    updateContextParams(opts: {
        context?: IContext | undefined;
        params?: IParams | undefined;
    }): void;
    /**
     * 初始化导航参数
     *
     * @memberof PickupViewPanelController
     */
    initNavParam(): void;
    /**
     * 设置嵌入视图
     *
     * @param {IViewController} view
     * @memberof PickupViewPanelController
     */
    setEmbedView(view: IViewController<IAppDEGridView, IPickupGridViewState, IPickupGridViewEvent>): void;
    /**
     * 获取选中数据
     *
     * @author zk
     * @date 2023-05-26 03:05:53
     * @return {*}  {Promise<IData[]>}
     * @memberof PickupViewPanelController
     */
    getSelectedData(): Promise<IData[]>;
    /**
     * @description 设置选中数据
     * @param {IData[]} items
     * @returns {*}  {Promise<void>}
     * @memberof PickupViewPanelController
     */
    setSelectedData(items: IData[]): Promise<void>;
    /**
     * 获取全部数据
     *
     * @author zk
     * @date 2023-05-26 03:05:49
     * @return {*}  {Promise<IData[]>}
     * @memberof PickupViewPanelController
     */
    getAllData(): Promise<IData[]>;
}
//# sourceMappingURL=pickup-view-panel.controller.d.ts.map