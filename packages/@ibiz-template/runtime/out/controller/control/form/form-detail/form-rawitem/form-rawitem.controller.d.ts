import { IDEFormRawItem } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormRawItemState } from './form-rawitem.state';
/**
 * 表单直接内容控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormRawItemController
 * @extends {FormDetailController}
 */
export declare class FormRawItemController extends FormDetailController<IDEFormRawItem> {
    state: FormRawItemState;
    protected createState(): FormRawItemState;
}
//# sourceMappingURL=form-rawitem.controller.d.ts.map