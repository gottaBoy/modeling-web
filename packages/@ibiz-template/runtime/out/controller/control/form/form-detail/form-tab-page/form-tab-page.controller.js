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
export class FormTabPageController extends FormDetailController {
    createState() {
        var _a;
        return new FormTabPageState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * 是否激活的分页
     * @author lxm
     * @date 2024-01-17 03:16:24
     * @readonly
     * @type {boolean}
     */
    get isActive() {
        return (this.parent.state.activeTab === this.model.id);
    }
}
