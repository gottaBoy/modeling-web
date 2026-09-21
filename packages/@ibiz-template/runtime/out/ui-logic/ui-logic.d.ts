import { IDEUILogic } from '@ibiz/model-core';
import { IUILogicParams } from '../interface';
import { UILogicContext } from './ui-logic-context';
import { UILogicNode } from './ui-logic-node';
import { UILogicParam } from './ui-logic-param/ui-logic-param';
/**
 * 界面逻辑
 *
 * @author chitanda
 * @date 2023-02-07 16:02:48
 * @export
 * @class UILogic
 */
export declare class UILogic {
    protected model: IDEUILogic;
    /**
     * 所有节点实例
     *
     * @author chitanda
     * @date 2023-02-08 21:02:38
     * @protected
     * @type {Map<string, UILogicNode>}
     */
    protected nodes: Map<string, UILogicNode>;
    /**
     * 所有参数实例
     *
     * @author chitanda
     * @date 2023-02-08 21:02:25
     * @protected
     * @type {Map<string, UILogicParam>}
     */
    protected params: Map<string, UILogicParam>;
    /**
     * Creates an instance of UILogic.
     * @author chitanda
     * @date 2023-02-08 17:02:26
     * @param {IDEUILogic} model
     */
    constructor(model: IDEUILogic);
    /**
     * 初始化逻辑参数
     *
     * @author chitanda
     * @date 2023-02-08 21:02:58
     * @protected
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     */
    protected initLogicParams(ctx: UILogicContext): void;
    /**
     * 执行视图逻辑
     *
     * @author chitanda
     * @date 2023-02-08 21:02:09
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     * @return {*}  {Promise<IData>}
     */
    exec(parameters: IUILogicParams): Promise<unknown>;
    /**
     * 开始根据连线递归执行逻辑
     *
     * @author chitanda
     * @date 2023-02-09 15:02:32
     * @protected
     * @param {UILogicNode} node
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {(IData[] | null)} data
     * @param {IParams} params
     * @param {IParams} [opt]
     * @return {*}  {(Promise<IData | null>)}
     */
    protected deepExec(node: UILogicNode, ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=ui-logic.d.ts.map