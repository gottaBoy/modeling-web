import { IDEWizardPanel } from '@ibiz/model-core';
import { IWizardPanelEvent } from '../../event';
import { IWizardPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { IViewController } from '../view';
import { IApiWizardPanelController } from '../../../api';

/**
 * @description 向导面板控制器
 * @export
 * @interface IWizardPanelController
 * @extends {IControlController<T, S, E>}
 * @extends {IApiWizardPanelController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IWizardPanelController<
  T extends IDEWizardPanel = IDEWizardPanel,
  S extends IWizardPanelState = IWizardPanelState,
  E extends IWizardPanelEvent = IWizardPanelEvent,
> extends IControlController<T, S, E>,
    IApiWizardPanelController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IWizardPanelController
   */
  view: IViewController;

  /**
   * @description 执行初始化操作
   * @returns {*}  {Promise<void>}
   * @memberof IWizardPanelController
   */
  initialize(): Promise<void>;

  /**
   * @description 执行完成操作
   * @returns {*}  {Promise<void>}
   * @memberof IWizardPanelController
   */
  finish(): Promise<void>;

  /**
   * @description 处理上一步按钮点击
   * @returns {*}  {Promise<void>}
   * @memberof IWizardPanelController
   */
  onPrevClick(): Promise<void>;

  /**
   * @description 处理下一步按钮点击
   * @returns {*}  {Promise<void>}
   * @memberof IWizardPanelController
   */
  onNextClick(): Promise<void>;

  /**
   * @description 处理完成按钮点击
   * @returns {*}  {Promise<void>}
   * @memberof IWizardPanelController
   */
  onFinishClick(): Promise<void>;
}
