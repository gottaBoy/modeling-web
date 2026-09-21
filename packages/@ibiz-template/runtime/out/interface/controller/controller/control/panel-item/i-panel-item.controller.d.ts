import { IPanelItem } from '@ibiz/model-core';
import { PanelNotifyState } from '../../../../../controller';
import { IPanelItemState } from '../../../state';
import { IPanelController } from '../i-panel.controller';
import { IPanelItemContainerController } from './i-panel-item-container.controller';
export interface IPanelItemController {
    /**
     * 成员模型
     * @author lxm
     * @date 2023-07-14 07:50:33
     * @type {IPanelItem}
     */
    model: IPanelItem;
    /**
     * 面板控制器
     * @author lxm
     * @date 2023-05-24 07:12:19
     * @type {IFormController}
     */
    panel: IPanelController;
    /**
     * 父容器控制器(除了根成员都存在)
     * @author lxm
     * @date 2023-05-24 07:12:28
     * @type {IPanelItemContainerController}
     */
    parent?: IPanelItemContainerController;
    /**
     * 成员状态
     * @author lxm
     * @date 2023-05-29 07:38:39
     * @type {IPanelItemState}
     */
    state: IPanelItemState;
    /**
     * 数据对象
     * @author lxm
     * @date 2024-03-20 01:57:05
     * @type {IData}
     */
    data: IData;
    /**
     * 面板数据变更通知(由面板控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 面板状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    panelStateNotify(state: PanelNotifyState): Promise<void>;
    /**
     * 值校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof IPanelItemController
     */
    validate(): Promise<boolean>;
    /**
     * 销毁方法
     * @author lxm
     * @date 2023-11-02 03:31:29
     */
    destroy(): void;
}
//# sourceMappingURL=i-panel-item.controller.d.ts.map