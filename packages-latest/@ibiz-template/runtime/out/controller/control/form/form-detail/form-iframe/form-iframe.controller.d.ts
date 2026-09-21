import { IDEFormIFrame } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormIFrameState } from './form-iframe.state';
/**
 * @description 表单内嵌iframe
 * @export
 * @class FormIFrameController
 * @extends {FormDetailController}
 */
export declare class FormIFrameController extends FormDetailController<IDEFormIFrame> {
    /**
     * @description 状态
     * @type {FormIFrameState}
     * @memberof FormIFrameController
     */
    state: FormIFrameState;
    /**
     * @description 计算嵌入路径
     * @returns {*}  {string}
     * @memberof FormIFrameController
     */
    calcIFrameUrl(): string;
}
//# sourceMappingURL=form-iframe.controller.d.ts.map