import { IAppDELogic } from './iapp-delogic';
import { IDEFLogic } from '../../dataentity/logic/ideflogic';

/**
 *
 * 应用实体属性逻辑模型对象接口
 * 继承父接口类型值[DEFIELD]
 * @export
 * @interface IAppDEFLogic
 */
export interface IAppDEFLogic extends IAppDELogic, IDEFLogic {
  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;
}
