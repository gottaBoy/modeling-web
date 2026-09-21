import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelAppLoginViewState } from './panel-app-login-view.state';
/**
 * 面板容器（应用登录视图）控制器
 *
 * @export
 * @class PanelAppLoginViewController
 * @extends {PanelItemController}
 */
export declare class PanelAppLoginViewController extends PanelItemController<IPanelContainer> {
    state: PanelAppLoginViewState;
    protected createState(): PanelAppLoginViewState;
}
