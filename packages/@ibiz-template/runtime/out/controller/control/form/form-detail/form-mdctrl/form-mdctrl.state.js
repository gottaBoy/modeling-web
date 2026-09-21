import { FormDetailState } from '../form-detail';
export class FormMDCtrlState extends FormDetailState {
    constructor() {
        super(...arguments);
        /**
         * 界面行为组状态
         *
         * @type {(IButtonContainerState | null)}
         * @memberof PortletPartState
         */
        this.actionGroupState = null;
    }
}
