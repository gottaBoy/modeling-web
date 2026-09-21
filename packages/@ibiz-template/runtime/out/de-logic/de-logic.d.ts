import { IAppDELogic } from '@ibiz/model-core';
import { ScriptFunction } from '../utils';
import { DELogicContext } from './de-logic-context';
import { DELogicNode } from './de-logic-node';
import { DELogicParam } from './de-logic-param/de-logic-param';
/**
 * 界面逻辑
 *
 * @author lxm
 * @date 2023-02-07 16:02:48
 * @export
 * @class DELogic
 */
export declare class DELogic {
    protected model: IAppDELogic;
    /**
     * 所有节点实例
     *
     * @author lxm
     * @date 2023-02-08 21:02:38
     * @protected
     * @type {Map<string, DELogicNode>}
     */
    protected nodes: Map<string, DELogicNode>;
    /**
     * 所有参数实例
     *
     * @author lxm
     * @date 2023-02-08 21:02:25
     * @protected
     * @type {Map<string, DELogicParam>}
     */
    protected params: Map<string, DELogicParam>;
    /**
     * 脚本函数
     * @author lxm
     * @date 2023-09-13 04:25:27
     * @protected
     * @type {ScriptFunction}
     */
    protected scriptFn?: ScriptFunction;
    /**
     * Creates an instance of DELogic.
     * @author lxm
     * @date 2023-02-08 17:02:26
     * @param {IAppDELogic} model
     */
    constructor(model: IAppDELogic);
    /**
     * 初始化当前环境的逻辑参数的实例
     *
     * @author lxm
     * @date 2023-02-08 21:02:58
     * @protected
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     */
    protected initLogicParams(ctx: DELogicContext): void;
    /**
     * 执行逻辑
     *
     * @author lxm
     * @date 2023-02-08 21:02:09
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     * @return {*}  {Promise<IData>}
     */
    exec(context: IContext, data: IData | IData[], params: IParams): Promise<unknown>;
    /**
     * 开始根据连线递归执行逻辑
     *
     * @author lxm
     * @date 2023-06-13 08:29:36
     * @protected
     * @param {DELogicNode} node 逻辑节点
     * @param {DELogicContext} ctx 逻辑上下文
     * @return {*}  {Promise<void>}
     */
    protected deepExec(node: DELogicNode, ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=de-logic.d.ts.map