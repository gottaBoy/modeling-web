import { IDELogicNodeParam } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 准备参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class PrepareParamNode
 * @extends {DELogicNode}
 */
export declare class PrepareParamNode extends DELogicNode {
    exec(ctx: DELogicContext): Promise<void>;
    /**
     * 拷贝变量
     * @author lxm
     * @date 2023-03-24 09:50:02
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     * @return {*}  {*}
     */
    protected copyParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 绑定参数
     * @author lxm
     * @date 2023-06-13 05:43:43
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected bindParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 设置变量
     * @author lxm
     * @date 2023-03-17 03:34:02
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected setParamValue(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 重置变量
     * @author lxm
     * @date 2023-03-24 09:46:57
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected resetParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:46:47
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected renewParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 附加到数组变量
     * @author lxm
     * @date 2023-03-24 09:46:47
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected appendParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
    /**
     * 排序数组变量
     * @author lxm
     * @date 2023-03-24 10:23:01
     * @protected
     * @param {IDELogicNodeParam} nodeParam
     * @param {DELogicContext} ctx
     */
    protected sortParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void;
}
//# sourceMappingURL=prepare-param-node.d.ts.map