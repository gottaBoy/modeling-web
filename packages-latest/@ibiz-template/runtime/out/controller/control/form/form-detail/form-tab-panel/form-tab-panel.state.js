import { FormContainerState } from '../form-container';
/**
 * @description 表单分页部件状态
 * @export
 * @class FormTabPanelState
 * @extends {FormContainerState}
 * @implements {IApiFormTabPanelState}
 */
export class FormTabPanelState extends FormContainerState {
    constructor() {
        super(...arguments);
        /**
         * @description 当前激活的分页
         * @type {string}
         * @memberof FormTabPanelState
         */
        this.activeTab = '';
    }
}
