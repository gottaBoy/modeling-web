import { IDEUIRawCodeLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 直接脚本，同步执行方式写法
 * 1）`return new Promise((resolve) => {
 *       uiLogic.reportpanel.openReportDesignPage().then((result) =>{
 *          resolve(result);
 *       })
 *     });`
 * 2）`return await uiLogic.reportpanel.openReportDesignPage()`
 *
 * @author tony001
 * @date 2024-06-25 14:06:02
 * @export
 * @class RawJSCodeNode
 * @extends {UILogicNode}
 */
export declare class RawJSCodeNode extends UILogicNode {
    model: IDEUIRawCodeLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=raw-js-code-node.d.ts.map