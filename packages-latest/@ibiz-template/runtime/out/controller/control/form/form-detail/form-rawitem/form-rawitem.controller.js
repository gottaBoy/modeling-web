import { FormDetailController } from '../form-detail';
import { FormRawItemState } from './form-rawitem.state';
import { calcDynaClass } from '../../../../../model';
/**
 * @description 表单直接内容控制器
 * @export
 * @class FormRawItemController
 * @extends {FormDetailController<IDEFormRawItem>}
 * @implements {IApiFormRawItemController}
 */
export class FormRawItemController extends FormDetailController {
    createState() {
        var _a;
        return new FormRawItemState((_a = this.parent) === null || _a === void 0 ? void 0 : _a.state);
    }
    /**
     * @description 计算动态样式表
     * @protected
     * @param {IData} data
     * @memberof FormRawItemController
     */
    calcDynaClass(data) {
        var _a;
        super.calcDynaClass(data);
        if ((_a = this.model.rawItem) === null || _a === void 0 ? void 0 : _a.dynaClass) {
            const dynaClass = calcDynaClass(this.model.rawItem.dynaClass, data);
            this.state.class.containerDyna = dynaClass;
        }
    }
}
