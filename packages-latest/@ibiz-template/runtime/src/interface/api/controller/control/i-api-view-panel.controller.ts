import { IDEViewPanel } from '@ibiz/model-core';
import { IApiControlController } from './i-api-control.controller';
import { IApiViewPanelState } from '../../state';
import { IApiViewController } from '../view';

/**
 * @description 视图面板控制器
 * @primary
 * @export
 * @interface IApiViewPanelController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiViewPanelController<
  T extends IDEViewPanel = IDEViewPanel,
  S extends IApiViewPanelState = IApiViewPanelState,
> extends IApiControlController<T, S> {
  /**
   * @description 嵌入视图控制器
   * @type {(IApiViewController | undefined)}
   * @memberof IApiViewPanelController
   */
  embedView: IApiViewController | undefined;
}
