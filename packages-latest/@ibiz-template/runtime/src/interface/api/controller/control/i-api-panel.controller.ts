import { IApiData } from '@ibiz-template/core';
import { IPanel } from '@ibiz/model-core';
import { IApiController } from '../common';
import { IApiControlController } from './i-api-control.controller';
import { IApiPanelState } from '../../state';
import { IApiPanelItemController } from './panel-item';

/**
 * 面板
 * @description 解析树型结构布局模型，按照层级关系逐级渲染面板内容，确保布局模型与渲染内容完全一致。
 * @primary
 * @export
 * @interface IApiPanelController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiPanelController<
  T extends IPanel = IPanel,
  S extends IApiPanelState = IApiPanelState,
> extends IApiControlController<T, S> {
  /**
   * @description 所有面板成员的控制器
   * @type {{ [key: string]: IApiPanelItemController }}
   * @memberof IApiPanelController
   */
  panelItems: { [key: string]: IApiPanelItemController };

  /**
   * @description 面板数据
   * @type {IApiData}
   * @memberof IApiPanelController
   */
  data: IApiData;

  /**
   * @description 容器控制器（可能是视图控制器，也可能是部件控制器）
   * @type {IApiController}
   * @memberof IApiPanelController
   */
  container?: IApiController;

  /**
   * @description 设置面板数据的值
   * @param {string} name 要设置的数据的属性名称
   * @param {unknown} value 要设置的值
   * @returns {*}  {Promise<void>}
   * @memberof IApiPanelController
   */
  setDataValue(name: string, value: unknown): Promise<void>;

  /**
   * @description 加载数据
   * @returns {*}  {Promise<void>}
   * @memberof IApiPanelController
   */
  load(): Promise<void>;

  /**
   * @description 获取面板成员控制器
   * @param {string} name 面板成员名称
   * @returns {*}  {(IApiPanelItemController | undefined)}
   * @memberof IApiPanelController
   */
  findPanelItemByName(name: string): IApiPanelItemController | undefined;
}
