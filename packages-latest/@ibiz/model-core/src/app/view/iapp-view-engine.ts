import { IUIEngine } from '../../view/iuiengine';

/**
 *
 * 应用视图界面引擎模型对象接口
 * @export
 * @interface IAppViewEngine
 */
export interface IAppViewEngine extends IUIEngine {
  /**
   * 引擎分类
   * @type {string}
   * 来源  getEngineCat
   */
  engineCat?: string;

  /**
   * 引擎类型
   * @type {string}
   * 来源  getEngineType
   */
  engineType?: string;
}
