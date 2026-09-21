import { UILogicLink } from '../ui-logic-link/ui-logic-link';
/**
 * 逻辑节点
 *
 * @author chitanda
 * @date 2023-02-07 19:02:16
 * @export
 * @class UILogicNode
 */
export class UILogicNode {
    /**
     * Creates an instance of UILogicNode.
     * @param {IDEUILogicNode} model
     * @memberof UILogicNode
     */
    constructor(model) {
        this.model = model;
        this.links = (model.deuilogicLinks || []).map(link => new UILogicLink(link));
    }
}
