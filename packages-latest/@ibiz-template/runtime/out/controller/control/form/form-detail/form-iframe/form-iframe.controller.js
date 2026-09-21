import { StringUtil } from '@ibiz-template/core';
import { FormDetailController } from '../form-detail';
/**
 * @description 表单内嵌iframe
 * @export
 * @class FormIFrameController
 * @extends {FormDetailController}
 */
export class FormIFrameController extends FormDetailController {
    /**
     * @description 计算嵌入路径
     * @returns {*}  {string}
     * @memberof FormIFrameController
     */
    calcIFrameUrl() {
        if (this.model.iframeUrl) {
            const url = StringUtil.fill(this.model.iframeUrl, this.context, this.params, this.form.data);
            return url;
        }
        return '';
    }
}
