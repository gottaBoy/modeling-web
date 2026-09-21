import { FormNotifyState } from '../../../../../controller';
import { IFormDetailState } from '../../../state';
import { IEnforceableController } from '../../common';
import { IFormController } from '../i-form.controller';
import { IFormDetailContainerController } from './i-form-detail-container.controller';
export interface IFormDetailController extends IEnforceableController {
    /**
     * 表单成员状态
     * @author lxm
     * @date 2023-05-24 07:46:30
     * @type {IFormDetailState}
     */
    state: IFormDetailState;
    /**
     * 表单控制器
     * @author lxm
     * @date 2023-05-24 07:12:19
     * @type {IFormController}
     */
    form: IFormController;
    /**
     * 父容器控制器(除了表单分页都存在)
     * @author lxm
     * @date 2023-05-24 07:12:28
     * @type {IFormDetailContainerController}
     */
    parent?: IFormDetailContainerController;
    /**
     * 表单数据变更通知(由表单控制器调用)
     *
     * @author lxm
     * @date 2022-09-20 18:09:56
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
}
//# sourceMappingURL=i-form-detail.controller.d.ts.map