import { FormDetailState } from '../form-detail';
/**
 * 表单关系界面状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export class FormDruipartState extends FormDetailState {
    constructor() {
        super(...arguments);
        /**
         * 是否显示遮罩
         * @author lxm
         * @date 2023-07-28 04:11:57
         * @type {boolean}
         */
        this.showMask = false;
    }
}
