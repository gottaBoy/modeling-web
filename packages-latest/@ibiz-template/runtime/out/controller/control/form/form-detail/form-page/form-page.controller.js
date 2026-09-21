import { FormGroupPanelController } from '../form-group-panel';
import { FormPageState } from './form-page.state';
/**
 * @description 表单分页控制器
 * @export
 * @class FormPageController
 * @extends {FormGroupPanelController<IDEFormPage>}
 * @implements {IApiFormPageController}
 */
export class FormPageController extends FormGroupPanelController {
    createState() {
        var _a;
        return new FormPageState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
}
