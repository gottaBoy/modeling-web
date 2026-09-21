import { IDRTab } from '@ibiz/model-core';
import { IDRTabEvent } from '../../event';
import { IDRTabState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiDRTabController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 数据关系分页控制器接口
 * @export
 * @interface IDRTabController
 * @extends {IControlController<IDRTab, IDRTabState, IDRTabEvent>}
 */
export interface IDRTabController
  extends IControlController<IDRTab, IDRTabState, IDRTabEvent>,
    IApiDRTabController<IDRTab, IDRTabState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IDRTabController
   */
  view: IViewController;
}
