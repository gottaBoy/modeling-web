import { PanelItemController } from '@ibiz-template/runtime';
import { viewPageCaptionState } from './panel-ctrl-view-page-caption.state';

export class PanelCtrlViewPageCaptionController extends PanelItemController {
  /**
   * @description 视图标题状态
   * @exposedoc
   * @type {PanelFieldState}
   * @memberof PanelCtrlViewPageCaptionController
   */
  declare state: viewPageCaptionState;

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PanelCtrlViewPageCaptionController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    this.state.caption = this.panel.view.model.caption || '';
    this.panel.view.evt.on(
      'onViewInfoChange',
      ({ caption: _caption, dataInfo }) => {
        this.state.caption = `${this.panel.view.model.caption}${
          dataInfo ? `-${dataInfo}` : ''
        }`;
      },
    );
  }
}
