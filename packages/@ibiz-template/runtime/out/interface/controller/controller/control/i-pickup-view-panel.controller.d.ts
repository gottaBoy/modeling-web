import { IDEPickupViewPanel } from '@ibiz/model-core';
import { IPickupViewPanelEvent } from '../../event';
import { IPickupViewPanelState } from '../../state';
import { IViewController } from '../view';
import { IControlController } from './i-control.controller';
/**
 * 选择视图面板控制器
 *
 * @export
 * @interface IPickupViewPanelController
 * @extends {IControlController<IDEPickupViewPanel, IPickupViewPanelState, IPickupViewPanelEvent>}
 */
export interface IPickupViewPanelController extends IControlController<IDEPickupViewPanel, IPickupViewPanelState, IPickupViewPanelEvent> {
    /**
     * 选择视图嵌入视图控制器
     *
     * @author zk
     * @date 2023-08-04 08:08:43
     * @type {IViewController}
     * @memberof IPickupViewPanelController
     */
    embedView: IViewController;
    /**
     * 获取选中数据
     *
     * @author zk
     * @date 2023-05-26 02:05:17
     * @return {*}  {IData[]}
     * @memberof IPickupViewPanelController
     */
    getSelectedData(): Promise<IData[]>;
    /**
     * 获取所有数据
     *
     * @author zk
     * @date 2023-05-26 02:05:17
     * @return {*}  {IData[]}
     * @memberof IPickupViewPanelController
     */
    getAllData(): Promise<IData[]>;
}
//# sourceMappingURL=i-pickup-view-panel.controller.d.ts.map