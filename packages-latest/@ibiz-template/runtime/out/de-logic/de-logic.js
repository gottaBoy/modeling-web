/* eslint-disable no-await-in-loop */
import { IBizContext, RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { ScriptFactory } from '../utils';
import { DELogicContext } from './de-logic-context';
import { DELogicParam } from './de-logic-param/de-logic-param';
import { getDELogicNodeProvider } from '../register';
/**
 * @description 实体逻辑
 * @export
 * @class DELogic
 * @implements {IDELogic}
 */
export class DELogic {
    /**
     * Creates an instance of DELogic.
     * @param {IAppDELogic} model
     * @param {IAppDataEntity} entity
     * @memberof DELogic
     */
    constructor(model, entity) {
        this.model = model;
        this.entity = entity;
        /**
         * 所有节点实例
         *
         * @author lxm
         * @date 2023-02-08 21:02:38
         * @protected
         * @type {Map<string, IDeLogicNode>}
         */
        this.nodes = new Map();
        /**
         * 所有参数实例
         *
         * @author lxm
         * @date 2023-02-08 21:02:25
         * @protected
         * @type {Map<string, DELogicParam>}
         */
        this.params = new Map();
    }
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof DELogic
     */
    async init() {
        var _a, _b;
        if (this.model.customCode) {
            if (!this.model.scriptCode)
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.noScriptCode'));
            this.scriptFn = ScriptFactory.createScriptFn([], this.model.scriptCode, {
                isAsync: true,
            });
            return;
        }
        if (!((_a = this.model.delogicNodes) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.noConfigurationLogicNode'));
        }
        await Promise.all(this.model.delogicNodes.map(async (node) => {
            const provider = await getDELogicNodeProvider(node, this.model, this.entity);
            if (provider)
                this.nodes.set(node.id, provider);
        }));
        // 将已经实例化的逻辑节点挂载到逻辑连接上
        this.nodes.forEach(node => {
            node.links.forEach(link => {
                link.srcNode = node;
                if (this.nodes.has(link.model.thenId)) {
                    link.dstNode = this.nodes.get(link.model.thenId);
                }
            });
        });
        (_b = this.model.delogicParams) === null || _b === void 0 ? void 0 : _b.forEach(param => {
            this.params.set(param.id, new DELogicParam(param));
        });
    }
    /**
     * @description 初始化当前环境的逻辑参数的实例
     * @protected
     * @param {DELogicContext} ctx
     * @memberof DELogic
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
     * @param {IDeLogicParams} parameters 逻辑参数
     * @returns {*}  {Promise<unknown>}
     * @memberof DELogic
     */
    async exec(parameters) {
        // 克隆传入应用上下文参数和视图参数
        parameters.context = IBizContext.create(parameters.context);
        parameters.params = clone(parameters.params || {});
        if (this.scriptFn) {
            return this.scriptFn.exec(Object.assign({}, parameters));
        }
        const ctx = new DELogicContext(this.params, parameters);
        this.initLogicParams(ctx);
        const { startDELogicNodeId } = this.model;
        if (startDELogicNodeId && this.nodes.has(startDELogicNodeId)) {
            const start = this.nodes.get(startDELogicNodeId);
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
     * @param {IDeLogicNode} node
     * @param {DELogicContext} ctx
     * @returns {*}  {Promise<void>}
     * @memberof DELogic
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
