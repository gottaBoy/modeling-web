import { FormTabPageState } from './form-tab-page.state';
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
export class FormTabPageController extends FormContainerController {
    createState() {
        var _a;
        return new FormTabPageState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * @description 是否激活的分页
     * @readonly
     * @type {boolean}
     * @memberof FormTabPageController
     */
    get isActive() {
        return (this.parent.state.activeTab === this.model.id);
    }
}
