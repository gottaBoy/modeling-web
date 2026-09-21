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
export class FormRawItemController extends FormDetailController {
    createState() {
        var _a;
        return new FormRawItemState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
}
