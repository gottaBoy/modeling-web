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
export class PanelRememberMeController extends PanelItemController<IPanelContainer> {
  declare state: PanelRememberMeState;

  protected createState(): PanelRememberMeState {
    return new PanelRememberMeState(this.parent?.state);
  }
}
