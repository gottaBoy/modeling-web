import { IUIEngineParam } from './iuiengine-param';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面引擎模型基础对象接口
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
