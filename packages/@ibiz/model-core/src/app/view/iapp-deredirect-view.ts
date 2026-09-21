import { IAppDEView } from './iapp-deview';
import { IAppRedirectView } from './iapp-redirect-view';

/**
 *
 * 继承父接口类型值[DEREDIRECTVIEW]
 * @export
 * @interface IAppDERedirectView
 */
export interface IAppDERedirectView extends IAppRedirectView, IAppDEView {
  /**
   * 获取数据应用实体行为
   *
   * @type {string}
   * 来源  getGetDataPSAppDEAction
   */
  getDataAppDEActionId?: string;

  /**
   * 应用实体数据类型识别属性
   *
   * @type {string}
   * 来源  getTypePSAppDEField
   */
  typeAppDEFieldId?: string;

  /**
   * 自定义获取数据行为
   * @type {boolean}
   * 来源  isEnableCustomGetDataAction
   */
  enableCustomGetDataAction?: boolean;

  /**
   * 启用工作流
   * @type {boolean}
   * 来源  isEnableWorkflow
   */
  enableWorkflow?: boolean;
}
