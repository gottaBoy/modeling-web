import { IDEFormTabPage } from '@ibiz/model-core';
import { FormTabPageState } from './form-tab-page.state';
import { IApiFormTabPageController } from '../../../../../interface';
import { FormContainerController } from '../form-container';
/**
 * 表单分页部件分页控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormTabPageController
 * @extends {FormContainerController}
 */
export declare class FormTabPageController extends FormContainerController<IDEFormTabPage> implements IApiFormTabPageController {
    state: FormTabPageState;
    protected createState(): FormTabPageState;
    /**
     * @description 是否激活的分页
     * @readonly
     * @type {boolean}
     * @memberof FormTabPageController
     */
    get isActive(): boolean;
}
//# sourceMappingURL=form-tab-page.controller.d.ts.map