import { IModelObject } from '../imodel-object';
/**
 *
 * @export
 * @interface ISysUserDR
 */
export interface ISysUserDR extends IModelObject {
    /**
     * 自定义模式
     * @type {string}
     * 来源  getCustomMode
     */
    customMode?: string;
}
