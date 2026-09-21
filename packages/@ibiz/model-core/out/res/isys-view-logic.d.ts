import { IViewLogic } from '../view/iview-logic';
/**
 *
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
