import { IDEUILogicNodeParam } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 准备参数
 *
 * @author chitanda
 * @date 2023-02-09 21:02:20
 * @export
 * @class PrepareJSParamNode
 * @extends {UILogicNode}
 */
export declare class PrepareJSParamNode extends UILogicNode {
    exec(ctx: UILogicContext): Promise<void>;
    /**
     * 设置变量
     * @author lxm
     * @date 2023-03-17 03:34:02
     * @protected
     * @param {IPSDELogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected setParamValue(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 拷贝变量
     * @author lxm
     * @date 2023-03-24 09:50:02
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     * @return {*}  {*}
     */
    protected copyParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 绑定参数
     * @author lxm
     * @date 2023-06-13 05:43:43
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected bindParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 重置变量
     * @author lxm
     * @date 2023-03-24 09:46:57
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected resetParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:46:47
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected renewParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 附加到数组变量
     * @author lxm
     * @date 2023-03-24 09:46:47
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected appendParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
    /**
     * 排序数组变量
     * @author lxm
     * @date 2023-03-24 10:23:01
     * @protected
     * @param {IDEUILogicNodeParam} nodeParam
     * @param {UILogicContext} ctx
     */
    protected sortParam(nodeParam: IDEUILogicNodeParam, ctx: UILogicContext): void;
}
//# sourceMappingURL=prepare-js-param-node.d.ts.map