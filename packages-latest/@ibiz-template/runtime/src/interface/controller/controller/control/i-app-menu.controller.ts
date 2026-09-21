import { IAppMenu } from '@ibiz/model-core';
import { IAppMenuEvent } from '../../event';
import { IAppMenuState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiMenuController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 应用菜单控制器接口
 * @export
 * @interface IAppMenuController
 * @extends {IControlController<IAppMenu, IAppMenuState, IAppMenuEvent>}
 * @extends {IApiMenuController<IAppMenu, IAppMenuState>}
 */
export interface IAppMenuController
  extends IControlController<IAppMenu, IAppMenuState, IAppMenuEvent>,
    IApiMenuController<IAppMenu, IAppMenuState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IAppMenuController
   */
  view: IViewController;
}
