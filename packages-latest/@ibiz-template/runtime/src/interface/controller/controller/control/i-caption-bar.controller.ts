import { ICaptionBar } from '@ibiz/model-core';
import { ICaptionBarEvent } from '../../event';
import { ICaptionBarState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiCaptionBarController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 标题栏控制器接口
 * @export
 * @interface ICaptionBarController
 * @extends {IControlController<ICaptionBar, ICaptionBarState, ICaptionBarEvent>}
 */
export interface ICaptionBarController
  extends IControlController<ICaptionBar, ICaptionBarState, ICaptionBarEvent>,
    IApiCaptionBarController<ICaptionBar, ICaptionBarState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof ICaptionBarController
   */
  view: IViewController;
}
