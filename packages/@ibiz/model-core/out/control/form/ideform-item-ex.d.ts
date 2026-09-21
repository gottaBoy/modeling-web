import { IDEFormDetail } from './ideform-detail';
import { IDEFormItem } from './ideform-item';
/**
 *
 * 继承父接口类型值[FORMITEMEX]
 * @export
 * @interface IDEFormItemEx
 */
export interface IDEFormItemEx extends IDEFormDetail, IDEFormItem {
    /**
     * 表单项成员集合
     *
     * @type {IDEFormItem[]}
     * 来源  getPSDEFormItems
     */
    deformItems?: IDEFormItem[];
}
