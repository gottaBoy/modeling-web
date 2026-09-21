import { IAppDataEntity, IDEUILogic } from '@ibiz/model-core';
import { IUILogic, IUILogicParams, IUILogicNode } from '../interface';
import { UILogicContext } from './ui-logic-context';
import { UILogicParam } from './ui-logic-param/ui-logic-param';
/**
 * 界面逻辑
 *
 * @author chitanda
 * @date 2023-02-07 16:02:48
 * @export
 * @class UILogic
 */
export declare class UILogic implements IUILogic {
    model: IDEUILogic;
    entity: IAppDataEntity;
    /**
     * 所有节点实例
     *
     * @author chitanda
     * @date 2023-02-08 21:02:38
     * @protected
     * @type {Map<string, IUILogicNode>}
     */
    protected nodes: Map<string, IUILogicNode>;
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
     * @param {IDEUILogic} model
     * @param {IAppDataEntity} entity
     * @memberof UILogic
     */
    constructor(model: IDEUILogic, entity: IAppDataEntity);
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof UILogic
     */
    init(): Promise<void>;
    /**
     * @description 初始化逻辑参数
     * @protected
     * @param {UILogicContext} ctx
     * @memberof UILogic
     */
    protected initLogicParams(ctx: UILogicContext): void;
    /**
     * @description 执行逻辑
     * @param {IUILogicParams} parameters 逻辑参数
     * @returns {*}  {Promise<unknown>}
     * @memberof UILogic
     */
    exec(parameters: IUILogicParams): Promise<unknown>;
    /**
     * @description 开始根据连线递归执行逻辑
     * @protected
     * @param {IUILogicNode} node
     * @param {UILogicContext} ctx
     * @returns {*}  {Promise<void>}
     * @memberof UILogic
     */
    protected deepExec(node: IUILogicNode, ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=ui-logic.d.ts.map