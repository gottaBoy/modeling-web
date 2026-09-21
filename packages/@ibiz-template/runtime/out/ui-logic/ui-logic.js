/* eslint-disable no-await-in-loop */
import { ModelError, RuntimeModelError } from '@ibiz-template/core';
import { UILogicContext } from './ui-logic-context';
import { AppendParamNode, BindParamNode, CopyParamNode, DataSetNode, DEActionNode, DebugParamNode, DEUIActionNode, EndNode, ExecuteDELogicNode, MsgBoxNode, PFPluginNode, PrepareJSParamNode, RawJSCodeNode, RenewParamNode, ResetParamNode, SortParamNode, StartNode, ThrowExceptionNode, ViewCtrlFireEventNode, ViewCtrlInvokeNode, } from './ui-logic-node';
import { UILogicParam } from './ui-logic-param/ui-logic-param';
/**
 * 界面逻辑
 *
 * @author chitanda
 * @date 2023-02-07 16:02:48
 * @export
 * @class UILogic
 */
export class UILogic {
    /**
     * Creates an instance of UILogic.
     * @author chitanda
     * @date 2023-02-08 17:02:26
     * @param {IDEUILogic} model
     */
    constructor(model) {
        var _a;
        this.model = model;
        /**
         * 所有节点实例
         *
         * @author chitanda
         * @date 2023-02-08 21:02:38
         * @protected
         * @type {Map<string, UILogicNode>}
         */
        this.nodes = new Map();
        /**
         * 所有参数实例
         *
         * @author chitanda
         * @date 2023-02-08 21:02:25
         * @protected
         * @type {Map<string, UILogicParam>}
         */
        this.params = new Map();
        if (!((_a = model.deuilogicNodes) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new RuntimeModelError(model, ibiz.i18n.t('runtime.uiLogic.noLogicalNodesConfigured'));
        }
        model.deuilogicNodes.forEach(node => {
            const { logicNodeType } = node;
            let logicNode;
            switch (logicNodeType) {
                case 'BEGIN': // 开始
                    logicNode = new StartNode(node);
                    break;
                case 'END': // 结束
                    logicNode = new EndNode(node);
                    break;
                case 'DEACTION': // 实体行为
                    logicNode = new DEActionNode(node);
                    break;
                case 'DEUIACTION': // 实体界面行为调用
                    logicNode = new DEUIActionNode(node);
                    break;
                case 'PREPAREJSPARAM': // 准备参数
                    logicNode = new PrepareJSParamNode(node);
                    break;
                case 'RESETPARAM': // 重置参数
                    logicNode = new ResetParamNode(node);
                    break;
                case 'COPYPARAM': // 拷贝参数
                    logicNode = new CopyParamNode(node);
                    break;
                case 'BINDPARAM': // 绑定参数
                    logicNode = new BindParamNode(node);
                    break;
                case 'VIEWCTRLINVOKE': // 视图部件调用
                    logicNode = new ViewCtrlInvokeNode(node);
                    break;
                case 'MSGBOX': // 消息弹窗
                    logicNode = new MsgBoxNode(node);
                    break;
                case 'DEBUGPARAM': // 调试逻辑参数
                    logicNode = new DebugParamNode(node);
                    break;
                case 'APPENDPARAM': // 附加到数组参数
                    logicNode = new AppendParamNode(node);
                    break;
                case 'SORTPARAM': // 排序数组参数
                    logicNode = new SortParamNode(node);
                    break;
                case 'RENEWPARAM': // 重新建立参数
                    logicNode = new RenewParamNode(node);
                    break;
                case 'DEDATASET': // 实体数据集
                    logicNode = new DataSetNode(node);
                    break;
                case 'THROWEXCEPTION': // 抛出异常
                    logicNode = new ThrowExceptionNode(node);
                    break;
                case 'VIEWCTRLFIREEVENT': // 视图部件事件触发
                    logicNode = new ViewCtrlFireEventNode(node);
                    break;
                case 'DELOGIC': // 实体逻辑
                    logicNode = new ExecuteDELogicNode(node);
                    break;
                case 'PFPLUGIN': // 前端插件调用
                    logicNode = new PFPluginNode(node);
                    break;
                case 'RAWJSCODE':
                    logicNode = new RawJSCodeNode(node);
                    break;
                default:
                    throw new ModelError(node, ibiz.i18n.t('runtime.deLogic.deLogicNode.unsupportedLogical', {
                        logicNodeType,
                    }));
            }
            this.nodes.set(node.id, logicNode);
        });
        model.deuilogicParams.forEach(param => {
            this.params.set(param.id, new UILogicParam(param));
        });
        // 将已经实例化的逻辑节点挂载到逻辑连接上
        this.nodes.forEach(node => {
            node.links.forEach(link => {
                link.srcNode = node;
                if (this.nodes.has(link.model.dstDEUILogicNodeId)) {
                    link.dstNode = this.nodes.get(link.model.dstDEUILogicNodeId);
                }
            });
        });
    }
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
    initLogicParams(ctx) {
        this.params.forEach(param => {
            if (param.model.default) {
                ctx.defaultParamName = param.model.id;
            }
            param.calc(ctx);
        });
    }
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
    async exec(parameters) {
        const ctx = new UILogicContext(this.params, parameters);
        this.initLogicParams(ctx);
        const { startDEUILogicNodeId } = this.model;
        if (startDEUILogicNodeId && this.nodes.has(startDEUILogicNodeId)) {
            const start = this.nodes.get(startDEUILogicNodeId);
            await this.deepExec(start, ctx);
        }
        else {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.noSetStartNode'));
        }
        if (ctx.isEndNode) {
            return ctx.result;
        }
        if (ctx.params[ctx.defaultParamName]) {
            return ctx.params[ctx.defaultParamName];
        }
        return null;
    }
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
    async deepExec(node, ctx) {
        // 执行逻辑节点
        await node.exec(ctx);
        const { links } = node;
        // 遍历所有节点连接，递归执行下级连接节点
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            const bol = await link.exec(ctx);
            if (bol && link.dstNode) {
                await this.deepExec(link.dstNode, ctx);
                // 平行输出: 在满足连接条件并逻辑执行完毕后若是非平行输出则执行完成
                if (node.model.parallelOutput !== true) {
                    break;
                }
            }
        }
    }
}
