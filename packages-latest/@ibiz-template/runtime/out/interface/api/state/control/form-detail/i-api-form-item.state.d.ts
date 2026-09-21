import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单项状态
 * @export
 * @interface IApiFormItemState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormItemState extends IApiFormDetailState {
    /**
     * @description 值规则校验错误信息
     * @type {(string | null)}
     * @memberof IApiFormItemState
     */
    error: string | null;
    /**
     * @description 启用条件的禁用状态
     * @type {boolean}
     * @memberof IApiFormItemState
     */
    enableCondDisabled: boolean;
    /**
     * @description 输入提示信息
     * @type {(string | undefined)}
     * @memberof IApiFormItemState
     */
    inputTip: string | undefined;
    /**
     * @description 输入提示链接
     * @type {(string | undefined)}
     * @memberof IApiFormItemState
     */
    inputTipUrl: string | undefined;
    /**
     * @description 编辑器类名集合
     * @type {(string[])}
     * @memberof IApiFormItemState
     */
    editorClass: string[];
}
//# sourceMappingURL=i-api-form-item.state.d.ts.map