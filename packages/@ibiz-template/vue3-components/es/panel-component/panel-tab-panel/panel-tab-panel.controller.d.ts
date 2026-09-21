import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelTabPanel } from '@ibiz/model-core';
import { PanelTabPanelState } from './panel-tab-panel.state';
export declare class PanelTabPanelController extends PanelItemController<IPanelTabPanel> {
    state: PanelTabPanelState;
    /**
     * 新建状态
     *
     * @author tony001
     * @date 2024-05-12 14:05:16
     * @protected
     * @return {*}  {PanelTabPanelState}
     */
    protected createState(): PanelTabPanelState;
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-05-12 14:05:51
     * @return {*}  {Promise<void>}
     */
    onInit(): Promise<void>;
    /**
     * 分页点击切换处理
     *
     * @author tony001
     * @date 2024-05-12 14:05:11
     * @param {string} tabId
     */
    onTabChange(tabId: string): void;
}
