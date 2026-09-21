import { IDEFormDetail } from '@ibiz/model-core';
import { IApiFormContainerController } from '../../../../../interface';
import { FormDetailController } from '../form-detail/form-detail.controller';
import { FormContainerState } from './form-container.state';
export declare class FormContainerController<T extends IDEFormDetail = IDEFormDetail> extends FormDetailController<T> implements IApiFormContainerController {
    /**
     * @description 表单容器状态
     * @type {FormContainerState}
     * @memberof FormContainerController
     */
    state: FormContainerState;
    /**
     * @description 创建表单容器状态对象
     * @protected
     * @returns {*}  {FormContainerState}
     * @memberof FormContainerController
     */
    protected createState(): FormContainerState;
    /**
     * @description 开始加载中
     * @param {(string | undefined)} [loadingText] 加载提示文本
     * @memberof FormContainerController
     */
    startLoading(loadingText?: string): void;
    /**
     * @description 结束加载中
     * @memberof FormContainerController
     */
    endLoading(): void;
}
//# sourceMappingURL=form-container.controller.d.ts.map