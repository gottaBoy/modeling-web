/* eslint-disable no-await-in-loop */
import { IBizContext, RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { UILogicContext } from './ui-logic-context';
import { UILogicParam } from './ui-logic-param/ui-logic-param';
import { getUILogicNodeProvider } from '../register';
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
     * @param {IDEUILogic} model
     * @param {IAppDataEntity} entity
     * @memberof UILogic
     */
    constructor(model, entity) {
        this.model = model;
        this.entity = entity;
        /**
         * 所有节点实例
         *
         * @author chitanda
         * @date 2023-02-08 21:02:38
         * @protected
         * @type {Map<string, IUILogicNode>}
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
    }
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof UILogic
     */
    async init() {
        var _a;
        if (!((_a = this.model.deuilogicNodes) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.noLogicalNodesConfigured'));
        }
        await Promise.all(this.model.deuilogicNodes.map(async (node) => {
            const provider = await getUILogicNodeProvider(node, this.model, this.entity);
            if (provider)
                this.nodes.set(node.id, provider);
        }));
        // 将已经实例化的逻辑节点挂载到逻辑连接上
        this.nodes.forEach(node => {
            node.links.forEach(link => {
                link.srcNode = node;
                if (this.nodes.has(link.model.dstDEUILogicNodeId)) {
                    link.dstNode = this.nodes.get(link.model.dstDEUILogicNodeId);
                }
            });
        });
        this.model.deuilogicParams.forEach(param => {
            this.params.set(param.id, new UILogicParam(param));
        });
    }
    /**
     * @description 初始化逻辑参数
     * @protected
     * @param {UILogicContext} ctx
     * @memberof UILogic
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
     * @description 执行逻辑
     * @param {IUILogicParams} parameters 逻辑参数
     * @returns {*}  {Promise<unknown>}
     * @memberof UILogic
     */
    async exec(parameters) {
        // 克隆传入应用上下文参数和视图参数
        parameters.context = IBizContext.create(parameters.context);
        parameters.params = clone(parameters.params || {});
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
     * @description 开始根据连线递归执行逻辑
     * @protected
     * @param {IUILogicNode} node
     * @param {UILogicContext} ctx
     * @returns {*}  {Promise<void>}
     * @memberof UILogic
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
