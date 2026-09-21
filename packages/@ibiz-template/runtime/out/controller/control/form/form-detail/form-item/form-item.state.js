import { FormDetailState } from '../form-detail/form-detail.state';
/**
 * 表单项状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export class FormItemState extends FormDetailState {
    constructor(parent) {
        super(parent);
        this.parent = parent;
        /**
         * 值规则校验错误信息
         *
         * @author lxm
         * @date 2022-09-01 22:09:02
         * @type {string}
         */
        this.error = null;
        /**
         * 启用条件的禁用状态
         *
         * @author lxm
         * @date 2022-09-19 16:09:18
         */
        this.enableCondDisabled = false;
        let $disabled = false;
        Object.defineProperty(this, 'disabled', {
            enumerable: true,
            configurable: true,
            get() {
                if (this.enableCondDisabled) {
                    return true;
                }
                return $disabled;
            },
            set(val) {
                $disabled = val;
                return true;
            },
        });
    }
}
