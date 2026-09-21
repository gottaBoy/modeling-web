import { IMDControl } from '@ibiz/model-core';
import { IDataAbilityParams } from '../../../common';
import { IMDControlEvent } from '../../event';
import { IMDControlState } from '../../state';
import { IControlController } from './i-control.controller';
import {
  IApiMDControlController,
  IApiMDCtrlLoadParams,
  IApiMDCtrlRemoveParams,
  IApiExportParams,
} from '../../../api';
import { IViewController } from '../view';
/**
 * @description 多数据部件控制器加载参数
 * @export
 * @interface MDCtrlLoadParams
 * @extends {IDataAbilityParams}
 * @extends {IApiMDCtrlLoadParams}
 */
export interface MDCtrlLoadParams
  extends IDataAbilityParams,
    IApiMDCtrlLoadParams {}

/**
 * @description 多数据部件控制器删除参数
 * @export
 * @interface MDCtrlRemoveParams
 * @extends {IDataAbilityParams}
 * @extends {IApiMDCtrlRemoveParams}
 */
export interface MDCtrlRemoveParams
  extends IDataAbilityParams,
    IApiMDCtrlRemoveParams {}

/**
 * @description 多数据部件控制器
 * @export
 * @interface IMDControlController
 * @extends {IControlController<T, S, E>}
 * @extends {IApiMDControlController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IMDControlController<
  T extends IMDControl = IMDControl,
  S extends IMDControlState = IMDControlState,
  E extends IMDControlEvent = IMDControlEvent,
> extends IControlController<T, S, E>,
    IApiMDControlController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IMDControlController
   */
  view: IViewController;

  /**
   * @description 内置导航视图显示变化
   * @memberof IMDControlController
   */
  onShowNavViewChange(): void;

  /**
   * @description 打开内置导航视图,默认为当前激活数据
   * @param {IData} [data]
   * @memberof IMDControlController
   */
  openNavView(data?: IData): void;

  /**
   * @description 导出数据
   * @param {{ event?: MouseEvent; params?: IApiExportParams }} _args
   * @returns {*}  {Promise<void>}
   * @memberof IMDControlController
   */
  exportData(_args: {
    event?: MouseEvent;
    params?: IApiExportParams;
  }): Promise<void>;
}
