import { ModelError } from '@ibiz-template/core';
import { IDELogicParam } from '@ibiz/model-core';
import { clone } from 'ramda';
import { DELogicContext } from '../de-logic-context';

/**
 * 界面逻辑参数
 *
 * @author lxm
 * @date 2023-02-07 21:02:45
 * @export
 * @class DELogicParam
 */
export class DELogicParam {
  /**
   * Creates an instance of DELogicParam.
   *
   * @author lxm
   * @date 2023-02-08 16:02:22
   * @param {DELogicParamModel} model
   */
  constructor(public model: IDELogicParam) {}

  /**
   * 向界面逻辑中计算基础参数
   *
   * @author lxm
   * @date 2023-02-08 20:02:33
   * @param {DELogicContext} ctx
   * @param {IContext} context
   * @param {IData} data
   * @param {IParams} [opt]
   */
  calc(ctx: DELogicContext): void {
    const tag = this.model.id!;
    const m = this.model;
    if (m.default) {
      // 配置了列表的拿数组数据
      if (m.entityListParam) {
        ctx.params[tag] = ctx.data || [];
      } else {
        ctx.params[tag] = ctx.data[0] || {};
      }
    } else if (m.appGlobalParam) {
      // 应用全局变量
      ctx.params[tag] = clone(ibiz.env);
    } else if (m.entityListParam) {
      // 数据对象列表
      ctx.params[tag] = [];
    } else if (m.entityPageParam) {
      ctx.params[tag] = {};
    } else if (m.entityParam) {
      // 数据对象变量
      ctx.params[tag] = {};
    } else if (m.lastReturnParam) {
      // 上一次调用返回
      ctx.initLastReturnParam(tag);
    } else if (m.appContextParam) {
      // 应用上下文
      ctx.params[tag] = ctx.parameters.context;
    } else if (m.simpleListParam) {
      // 简单数据列表
      ctx.params[tag] = [];
    } else if (m.simpleParam) {
      // 简单数据
      ctx.params[tag] = {};
    } else if (m.cloneParam) {
      // 克隆传入参数
      ctx.params[tag] = clone(ctx.data || {});
    } else if (m.envParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.environmentVariables'),
      );
    } else if (m.fileListParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.fileObjectListVariable'),
      );
    } else if (m.fileParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.fileObjectVariables'),
      );
    } else if (m.filterParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.filterObjectVariables'),
      );
    } else if (m.lastParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.finalDataVariables'),
      );
    } else if (m.originEntity) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.rawDataObjects'),
      );
    } else if (m.sessionParam) {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.operationSessionVariables'),
      );
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.calculateEntity', { tag }),
      ibiz.i18n.t('runtime.deLogic.deLogicNode.value'),
      { ...ctx.params[tag] },
    );
  }

  /**
   * 重新建立变量
   * @author lxm
   * @date 2023-03-24 09:20:42
   * @param {DELogicContext} ctx
   */
  renew(ctx: DELogicContext): void {
    const tag = this.model.id!;
    const m = this.model;
    if (m.entityListParam || m.simpleListParam || m.entityPageParam) {
      ctx.params[tag] = [];
    } else if (m.simpleParam || m.entityParam) {
      ctx.params[tag] = {};
    } else {
      throw new ModelError(
        m,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.recreatingVariables'),
      );
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.reEstablish', { tag }),
      ibiz.i18n.t('runtime.deLogic.deLogicNode.value'),
      { ...ctx.params[tag] },
    );
  }
}
