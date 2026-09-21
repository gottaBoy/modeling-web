import { IAppDELogic, IAppDataEntity } from '@ibiz/model-core';
import { ScriptFunction } from '../utils';
import { DELogicContext } from './de-logic-context';
import { DELogicParam } from './de-logic-param/de-logic-param';
import { IDeLogic, IDeLogicNode, IDeLogicParams } from '../interface';
/**
 * @description 实体逻辑
 * @export
 * @class DELogic
 * @implements {IDELogic}
 */
export declare class DELogic implements IDeLogic {
    model: IAppDELogic;
    entity: IAppDataEntity;
    /**
     * 所有节点实例
     *
     * @author lxm
     * @date 2023-02-08 21:02:38
     * @protected
     * @type {Map<string, IDeLogicNode>}
     */
    protected nodes: Map<string, IDeLogicNode>;
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
     * @param {IAppDELogic} model
     * @param {IAppDataEntity} entity
     * @memberof DELogic
     */
    constructor(model: IAppDELogic, entity: IAppDataEntity);
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof DELogic
     */
    init(): Promise<void>;
    /**
     * @description 初始化当前环境的逻辑参数的实例
     * @protected
     * @param {DELogicContext} ctx
     * @memberof DELogic
     */
    protected initLogicParams(ctx: DELogicContext): void;
    /**
     * @description 执行逻辑
     * @param {IDeLogicParams} parameters 逻辑参数
     * @returns {*}  {Promise<unknown>}
     * @memberof DELogic
     */
    exec(parameters: IDeLogicParams): Promise<unknown>;
    /**
     * @description 开始根据连线递归执行逻辑
     * @protected
     * @param {IDeLogicNode} node
     * @param {DELogicContext} ctx
     * @returns {*}  {Promise<void>}
     * @memberof DELogic
     */
    protected deepExec(node: IDeLogicNode, ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=de-logic.d.ts.map