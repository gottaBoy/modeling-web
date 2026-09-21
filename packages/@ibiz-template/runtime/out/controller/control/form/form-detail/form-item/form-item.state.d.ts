import { IFormDetailContainerState } from '../../../../../interface';
import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * 表单项状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export declare class FormItemState extends FormDetailState {
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
}
//# sourceMappingURL=form-item.state.d.ts.map