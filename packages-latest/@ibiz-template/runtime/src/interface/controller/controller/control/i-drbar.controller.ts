import { IDRBar } from '@ibiz/model-core';
import { IDRBarEvent } from '../../event';
import { IDRBarState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiDRBarController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 数据关系栏控制器接口
 * @export
 * @interface IDRBarController
 * @extends {IControlController<IDRBar, IDRBarState, IDRBarEvent>}
 * @extends {IApiDRBarController<IDRBar, IDRBarState>}
 */
export interface IDRBarController
  extends IControlController<IDRBar, IDRBarState, IDRBarEvent>,
    IApiDRBarController<IDRBar, IDRBarState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IDRBarController
   */
  view: IViewController;

  /**
   * @description 处理选中改变
   * @param {string} key
   * @memberof IDRBarController
   */
  handleSelectChange(key: string): void;
}
