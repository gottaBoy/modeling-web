import { IApiContext, IApiParams } from '@ibiz-template/core';
/**
 * @description 表单多数据部件表单项对象
 * @export
 * @interface IApiFormMDCtrlFormItem
 */
export interface IApiFormMDCtrlFormItem {
    /**
     * @description 唯一标识
     * @type {string}
     * @memberof IApiFormMDCtrlFormItem
     */
    id: string;
    /**
     * @description 上下文
     * @type {IApiContext}
     * @memberof IApiFormMDCtrlFormItem
     */
    context: IApiContext;
    /**
     * @description 视图参数
     * @type {IApiParams}
     * @memberof IApiFormMDCtrlFormItem
     */
    params: IApiParams;
    /**
     * @description 表单标题
     * @type {string}
     * @memberof IApiFormMDCtrlFormItem
     */
    title?: string;
}
//# sourceMappingURL=i-api-from-mdctrl-form-item.d.ts.map