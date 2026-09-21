import { IViewLogic } from '../view/iview-logic';

/**
 *
 * 系统视图逻辑模型对象接口
 * @export
 * @interface ISysViewLogic
 */
export interface ISysViewLogic extends IViewLogic {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;
}
