/* eslint-disable no-await-in-loop */
import { IBizContext, RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { IAppDELogic, IAppDataEntity } from '@ibiz/model-core';
import { ScriptFactory, ScriptFunction } from '../utils';
import { DELogicContext } from './de-logic-context';
import { DELogicParam } from './de-logic-param/de-logic-param';
import { IDeLogic, IDeLogicNode, IDeLogicParams } from '../interface';
import { getDELogicNodeProvider } from '../register';

/**
 * @description 实体逻辑
 * @export
 * @class DELogic
 * @implements {IDELogic}
 */
export class DELogic implements IDeLogic {
  /**
   * 所有节点实例
   *
   * @author lxm
   * @date 2023-02-08 21:02:38
   * @protected
   * @type {Map<string, IDeLogicNode>}
   */
  protected nodes: Map<string, IDeLogicNode> = new Map();

  /**
   * 所有参数实例
   *
   * @author lxm
   * @date 2023-02-08 21:02:25
   * @protected
   * @type {Map<string, DELogicParam>}
   */
  protected params: Map<string, DELogicParam> = new Map();

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
   * @param {IAppDELogic} model
   * @param {IAppDataEntity} entity
   * @memberof DELogic
   */
  constructor(
    public model: IAppDELogic,
    public entity: IAppDataEntity,
  ) {}

  /**
   * @description 初始化
   * @returns {*}  {Promise<void>}
   * @memberof DELogic
   */
  async init(): Promise<void> {
    if (this.model.customCode) {
      if (!this.model.scriptCode)
        throw new RuntimeModelError(
          this.model,
          ibiz.i18n.t('runtime.deLogic.deLogicNode.noScriptCode'),
        );
      this.scriptFn = ScriptFactory.createScriptFn([], this.model.scriptCode, {
        isAsync: true,
      });
      return;
    }
    if (!this.model.delogicNodes?.length) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.noConfigurationLogicNode'),
      );
    }
    await Promise.all(
      this.model.delogicNodes.map(async node => {
        const provider = await getDELogicNodeProvider(
          node,
          this.model,
          this.entity,
        );
        if (provider) this.nodes.set(node.id!, provider);
      }),
    );
    // 将已经实例化的逻辑节点挂载到逻辑连接上
    this.nodes.forEach(node => {
      node.links.forEach(link => {
        link.srcNode = node;
        if (this.nodes.has(link.model.thenId!)) {
          link.dstNode = this.nodes.get(link.model.thenId!)!;
        }
      });
    });
    this.model.delogicParams?.forEach(param => {
      this.params.set(param.id!, new DELogicParam(param));
    });
  }

  /**
   * @description 初始化当前环境的逻辑参数的实例
   * @protected
   * @param {DELogicContext} ctx
   * @memberof DELogic
   */
  protected initLogicParams(ctx: DELogicContext): void {
    this.params.forEach(param => {
      if (param.model.default) {
        ctx.defaultParamName = param.model.id!;
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
  async exec(parameters: IDeLogicParams): Promise<unknown> {
    // 克隆传入应用上下文参数和视图参数
    parameters.context = IBizContext.create(parameters.context);
    parameters.params = clone(parameters.params || {});
    if (this.scriptFn) {
      return this.scriptFn.exec({ ...parameters });
    }
    const ctx = new DELogicContext(this.params, parameters);
    this.initLogicParams(ctx);
    const { startDELogicNodeId } = this.model;
    if (startDELogicNodeId && this.nodes.has(startDELogicNodeId)) {
      const start = this.nodes.get(startDELogicNodeId)!;
      await this.deepExec(start, ctx);
    } else {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.noSetStartNode'),
      );
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
  protected async deepExec(
    node: IDeLogicNode,
    ctx: DELogicContext,
  ): Promise<void> {
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
