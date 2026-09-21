import { PortletPartState } from '../portlet-part';
/**
 * @description 过滤器门户部件控件状态
 * @export
 * @class FilterPortletState
 * @extends {PortletPartState}
 * @implements {IApiFilterPortletState}
 */
export class FilterPortletState extends PortletPartState {
    constructor() {
        super(...arguments);
        /**
         * 过滤器节点
         *
         * @author tony001
         * @date 2024-07-26 21:07:08
         * @type {IFilterNode}
         */
        this.filterNode = {
            nodeType: 'GROUP',
            logicType: 'AND',
            children: [],
        };
    }
}
