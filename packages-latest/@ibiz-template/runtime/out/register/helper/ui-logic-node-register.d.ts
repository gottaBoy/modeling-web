import { IDEUILogic, IDEUILogicNode, IAppDataEntity, IDEUIPFPluginLogic } from '@ibiz/model-core';
import { IUILogicNodeProvider } from '../../interface';
/** 界面逻辑节点适配器前缀 */
export declare const UILOGICNODE_PROVIDER_PREFIX = "UI_LOGIC_NODE";
/**
 * 注册界面逻辑节点适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IUILogicNodeProvider} callback 生成界面行为适配器的回调
 */
export declare function registerUILogicNodeProvider(key: string, callback: (node: IDEUILogicNode) => IUILogicNodeProvider): void;
/**
 * @description 获取界面逻辑节点插件适配器
 * @export
 * @param {IDEUIPFPluginLogic} model
 * @returns {*}  {(Promise<IUILogicNodeProvider | undefined>)}
 */
export declare function getUILogicNodePluginProvider(model: IDEUIPFPluginLogic): Promise<IUILogicNodeProvider | undefined>;
/**
 * @description 获取界面逻辑节点适配器
 * @export
 * @param {IDEUILogicNode} model
 * @returns {*}  {(Promise<IUILogicNodeProvider>)}
 */
export declare function getUILogicNodeProvider(model: IDEUILogicNode, logic: IDEUILogic, entity: IAppDataEntity): Promise<IUILogicNodeProvider>;
//# sourceMappingURL=ui-logic-node-register.d.ts.map