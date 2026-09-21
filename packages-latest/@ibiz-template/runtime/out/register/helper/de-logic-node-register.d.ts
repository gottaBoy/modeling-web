import { IAppDELogic, IDELogicNode, IAppDataEntity } from '@ibiz/model-core';
import { IDELogicNodeProvider } from '../../interface';
/** 实体逻辑节点适配器前缀 */
export declare const DELOGICNODE_PROVIDER_PREFIX = "DE_LOGIC_NODE";
/**
 * 注册实体逻辑节点适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IDELogicNodeProvider} callback 生成实体行为适配器的回调
 */
export declare function registerDELogicNodeProvider(key: string, callback: (node: IDELogicNode) => IDELogicNodeProvider): void;
/**
 * @description 获取实体逻辑节点适配器
 * @export
 * @param {IDELogicNode} model
 * @param {IAppDELogic} logic
 * @param {IAppDataEntity} entity
 * @returns {*}  {Promise<IDELogicNodeProvider>}
 */
export declare function getDELogicNodeProvider(model: IDELogicNode, logic: IAppDELogic, entity: IAppDataEntity): Promise<IDELogicNodeProvider>;
//# sourceMappingURL=de-logic-node-register.d.ts.map