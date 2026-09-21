import { IApiFormItemState, IFormDetailContainerState } from '../../../../../interface';
import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * @description 表单项状态
 * @export
 * @class FormItemState
 * @extends {FormDetailState}
 * @implements {IApiFormItemState}
 */
export declare class FormItemState extends FormDetailState implements IApiFormItemState {
    protected parent?: IFormDetailContainerState | undefined;
    constructor(parent?: IFormDetailContainerState | undefined);
    /**
     * 值规则校验错误信息
     *
     * @author lxm
     * @date 2022-09-01 22:09:02
     * @type {string}
     */
    error: string | null;
    /**
     * 启用条件的禁用状态
     *
     * @author lxm
     * @date 2022-09-19 16:09:18
     */
    enableCondDisabled: boolean;
    /**
     * 输入提示信息
     *
     * @type {(string | undefined)}
     * @memberof FormItemState
     */
    inputTip: string | undefined;
    /**
     * 输入提示链接
     *
     * @type {(string | undefined)}
     * @memberof FormItemState
     */
    inputTipUrl: string | undefined;
    /**
     * 编辑器类名集合
     *
     * @type {string[]}
     * @memberof FormItemState
     */
    editorClass: string[];
}
//# sourceMappingURL=form-item.state.d.ts.map