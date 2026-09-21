import { FormDetailState } from '../form-detail';
/**
 * 表单分页部件状态
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-01-04 10:26:34
 */
export class FormTabPanelState extends FormDetailState {
    constructor() {
        super(...arguments);
        /**
         * 当前激活的分页
         * @author lxm
         * @date 2024-01-17 02:05:58
         * @type {string}
         */
        this.activeTab = '';
    }
}
