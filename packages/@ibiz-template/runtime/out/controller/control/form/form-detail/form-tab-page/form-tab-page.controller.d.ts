import { IDEFormTabPage } from '@ibiz/model-core';
import { IFormDetailContainerController } from '../../../../../interface';
import { FormDetailController } from '../form-detail';
import { FormTabPageState } from './form-tab-page.state';
/**
 * 表单分页部件分页控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormTabPageController
 * @extends {FormDetailController}
 */
export declare class FormTabPageController extends FormDetailController<IDEFormTabPage> implements IFormDetailContainerController {
    state: FormTabPageState;
    protected createState(): FormTabPageState;
    /**
     * 是否激活的分页
     * @author lxm
     * @date 2024-01-17 03:16:24
     * @readonly
     * @type {boolean}
     */
    get isActive(): boolean;
}
//# sourceMappingURL=form-tab-page.controller.d.ts.map