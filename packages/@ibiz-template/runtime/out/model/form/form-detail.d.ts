import { IDEFormDetail } from '@ibiz/model-core';
/**
 * 查找子表单成员集合
 * @author lxm
 * @date 2023-06-13 06:57:30
 * @export
 * @param {IDEFormDetail} parent 父表单成员
 * @return {*}  {IDEFormDetail[]}
 */
export declare function findChildFormDetails(parent: IDEFormDetail): IDEFormDetail[];
/**
 * 是否是表单数据容器成员（多数据部件）
 * @author lxm
 * @date 2023-11-13 05:49:35
 * @export
 * @param {IDEFormDetail} detail
 * @return {*}  {boolean}
 */
export declare function isFormDataContainer(detail: IDEFormDetail): boolean;
//# sourceMappingURL=form-detail.d.ts.map