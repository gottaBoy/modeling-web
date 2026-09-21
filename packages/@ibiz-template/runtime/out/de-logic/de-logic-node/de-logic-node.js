import { DELogicLink } from '../de-logic-link/de-logic-link';
/**
 * 逻辑节点
 *
 * @author lxm
 * @date 2023-02-07 19:02:16
 * @export
 * @class DELogicNode
 */
export class DELogicNode {
    /**
     * Creates an instance of DELogicNode.
     *
     * @author lxm
     * @date 2023-02-08 16:02:19
     * @param {DELogicNodeModel} model
     */
    constructor(model) {
        var _a;
        this.model = model;
        this.links = (_a = (model.links || [])) === null || _a === void 0 ? void 0 : _a.map(link => new DELogicLink(link));
    }
}
