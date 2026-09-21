import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelRememberMeState } from './panel-remember-me.state';
/**
 * 面板容器（记住我）控制器
 *
 * @export
 * @class PanelRememberMeController
 * @extends {PanelItemController}
 */
export declare class PanelRememberMeController extends PanelItemController<IPanelContainer> {
    state: PanelRememberMeState;
    protected createState(): PanelRememberMeState;
}
