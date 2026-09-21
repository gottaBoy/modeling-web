import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { IMEditViewPanelEvent } from '../../event';
import { IMEditViewPanelState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiMEditViewPanelController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 多编辑视图面板控制器接口
 * @export
 * @interface IMEditViewPanelController
 * @extends {IMDControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export interface IMEditViewPanelController<
  T extends IDEMultiEditViewPanel = IDEMultiEditViewPanel,
  S extends IMEditViewPanelState = IMEditViewPanelState,
  E extends IMEditViewPanelEvent = IMEditViewPanelEvent,
> extends IMDControlController<T, S, E>,
    IApiMEditViewPanelController<T, S> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IMEditViewPanelController
   */
  view: IViewController;

  /**
   * @description 处理添加
   * @returns {*}  {Promise<void>}
   * @memberof IMEditViewPanelController
   */
  handleAdd(): Promise<void>;
}
