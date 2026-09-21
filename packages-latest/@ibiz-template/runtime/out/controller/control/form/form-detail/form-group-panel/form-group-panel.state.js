import { FormContainerState } from '../form-container';
/**
 * 表单分组状态
 *
 * @author chitanda
 * @date 2023-01-04 10:01:28
 * @export
 * @class FormGroupPanelState
 * @extends {FormContainerState}
 */
export class FormGroupPanelState extends FormContainerState {
    constructor() {
        super(...arguments);
        /**
         *  是否显示更多内容
         * @author lxm
         * @date 2023-03-17 02:14:30
         * @type {boolean}
         */
        this.isShowMore = false;
        /**
         * 界面行为组状态
         *
         * @type {(IButtonContainerState | null)}
         * @memberof PortletPartState
         */
        this.actionGroupState = null;
        /**
         * @description 是否折叠
         * @type {boolean}
         * @memberof FormGroupPanelState
         */
        this.collapse = false;
    }
}
