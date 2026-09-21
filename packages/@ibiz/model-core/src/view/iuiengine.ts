import { IUIEngineParam } from './iuiengine-param';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IUIEngine
 */
export interface IUIEngine extends IModelObject {
  /**
   * 引擎参数集合
   *
   * @type {IUIEngineParam[]}
   * 来源  getPSUIEngineParams
   */
  params?: IUIEngineParam[];
}
