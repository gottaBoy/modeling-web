import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IAppViewParam
 */
export interface IAppViewParam extends IModelObject {
    /**
     * 说明
     * @type {string}
     * 来源  getDesc
     */
    desc?: string;
    /**
     * 参数
     * @type {string}
     * 来源  getKey
     */
    key?: string;
    /**
     * 值
     * @type {string}
     * 来源  getValue
     */
    value?: string;
}
