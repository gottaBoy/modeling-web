import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';

/**
 * 大屏面板容器控制器
 *
 * @export
 * @class ScreenPanelContainerController
 * @extends {PanelItemController}
 */
export declare class ScreenPanelContainerController extends PanelItemController<IPanelContainer> {
    /**
     * @description 边框样式
     * @type {string}
     * @memberof ScreenPanelContainerController
     */
    borderStyle: string;
    protected onInit(): Promise<void>;
}
