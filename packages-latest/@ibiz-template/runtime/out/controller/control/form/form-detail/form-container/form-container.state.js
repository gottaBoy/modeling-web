import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * @description 表单容器状态
 * @export
 * @class FormContainerState
 * @extends {FormDetailState}
 * @implements {IApiFormContainerState}
 */
export class FormContainerState extends FormDetailState {
    constructor() {
        super(...arguments);
        this.loading = false;
        this.loadingText = '';
    }
}
