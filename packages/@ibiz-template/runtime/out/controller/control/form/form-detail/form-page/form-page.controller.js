import { FormGroupPanelController } from '../form-group-panel';
import { FormPageState } from './form-page.state';
/**
 * 表单分页控制器
 *
 * @author lxm
 * @date 2022-09-04 15:09:52
 * @export
 * @class FormPageController
 * @extends {FormContainerController}
 */
export class FormPageController extends FormGroupPanelController {
    createState() {
        var _a;
        return new FormPageState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
}
