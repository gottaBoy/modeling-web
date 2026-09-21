import { IDEFormRawItem } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormRawItemState } from './form-rawitem.state';
import { IApiFormRawItemController } from '../../../../../interface';
/**
 * @description 表单直接内容控制器
 * @export
 * @class FormRawItemController
 * @extends {FormDetailController<IDEFormRawItem>}
 * @implements {IApiFormRawItemController}
 */
export declare class FormRawItemController extends FormDetailController<IDEFormRawItem> implements IApiFormRawItemController {
    state: FormRawItemState;
    protected createState(): FormRawItemState;
    /**
     * @description 计算动态样式表
     * @protected
     * @param {IData} data
     * @memberof FormRawItemController
     */
    protected calcDynaClass(data: IData): void;
}
//# sourceMappingURL=form-rawitem.controller.d.ts.map