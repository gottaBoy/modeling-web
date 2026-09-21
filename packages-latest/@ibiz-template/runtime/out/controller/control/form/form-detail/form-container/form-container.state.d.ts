import { IApiFormContainerState } from '../../../../../interface';
import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * @description 表单容器状态
 * @export
 * @class FormContainerState
 * @extends {FormDetailState}
 * @implements {IApiFormContainerState}
 */
export declare class FormContainerState extends FormDetailState implements IApiFormContainerState {
    loading: boolean;
    loadingText: string;
}
//# sourceMappingURL=form-container.state.d.ts.map