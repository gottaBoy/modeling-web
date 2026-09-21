import { IDEFormIFrame } from '@ibiz/model-core';
import { StringUtil } from '@ibiz-template/core';
import { FormDetailController } from '../form-detail';
import { FormIFrameState } from './form-iframe.state';

/**
 * @description 表单内嵌iframe
 * @export
 * @class FormIFrameController
 * @extends {FormDetailController}
 */
export class FormIFrameController extends FormDetailController<IDEFormIFrame> {
  /**
   * @description 状态
   * @type {FormIFrameState}
   * @memberof FormIFrameController
   */
  declare state: FormIFrameState;

  /**
   * @description 计算嵌入路径
   * @returns {*}  {string}
   * @memberof FormIFrameController
   */
  calcIFrameUrl(): string {
    if (this.model.iframeUrl) {
      const url = StringUtil.fill(
        this.model.iframeUrl,
        this.context,
        this.params,
        this.form.data,
      );
      return url;
    }
    return '';
  }
}
