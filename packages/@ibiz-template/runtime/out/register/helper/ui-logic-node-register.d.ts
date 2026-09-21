import { IDEUIPFPluginLogic } from '@ibiz/model-core';
import { IUILogicNodeProvider } from '../../interface';
/** 界面逻辑节点适配器前缀 */
export declare const UILOGINNODE_PROVIDER_PREFIX = "UI_LOGIN_NODE";
/**
 * 注册界面逻辑节点适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IUILogicNodeProvider} callback 生成界面行为适配器的回调
 */
export declare function registerUILogicNodeProvider(key: string, callback: () => IUILogicNodeProvider): void;
/**
 * 获取界面逻辑节点适配器
 *
 * @author chitanda
 * @date 2023-11-01 17:11:43
 * @export
 * @param {IDEUIPFPluginLogic} model
 * @return {*}  {Promise<IUILogicNodeProvider>}
 */
export declare function getUILogicNodeProvider(model: IDEUIPFPluginLogic): Promise<IUILogicNodeProvider | undefined>;
//# sourceMappingURL=ui-logic-node-register.d.ts.map