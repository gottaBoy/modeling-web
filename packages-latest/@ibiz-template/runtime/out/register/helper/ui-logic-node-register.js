import { RuntimeError } from '@ibiz-template/core';
import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';
/** 界面逻辑节点适配器前缀 */
export const UILOGICNODE_PROVIDER_PREFIX = 'UI_LOGIC_NODE';
/**
 * 注册界面逻辑节点适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IUILogicNodeProvider} callback 生成界面行为适配器的回调
 */
export function registerUILogicNodeProvider(key, callback) {
    ibiz.register.register(`${UILOGICNODE_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key, logic) {
    return ibiz.register.get(`${UILOGICNODE_PROVIDER_PREFIX}_${key}`, logic);
}
/**
 * @description 获取界面逻辑节点插件适配器
 * @export
 * @param {IDEUIPFPluginLogic} model
 * @returns {*}  {(Promise<IUILogicNodeProvider | undefined>)}
 */
export async function getUILogicNodePluginProvider(model) {
    let provider;
    const { sysPFPluginId, appId } = model;
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey)
            provider = getProvider(pluginKey, model);
        if (!provider)
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.frontEndPluginNode', {
                pluginKey,
            }));
    }
    return provider;
}
/**
 * @description 获取界面逻辑节点适配器
 * @export
 * @param {IDEUILogicNode} model
 * @returns {*}  {(Promise<IUILogicNodeProvider>)}
 */
export async function getUILogicNodeProvider(model, logic, entity) {
    let provider;
    const { logicNodeType } = model;
    // 自定义注册
    const registerKey = CustomRegister.getRegisterKey(UILOGICNODE_PROVIDER_PREFIX, {
        mainModel: model,
        logic,
        entity,
    });
    provider = getProvider(registerKey, model);
    if (provider)
        return provider;
    ibiz.log.debug(ibiz.i18n.t('runtime.register.helper.uiLogicNodeCustomRegistration', {
        registerKey,
    }));
    // 找插件适配器
    provider = await getUILogicNodePluginProvider(model);
    if (provider)
        return provider;
    // 找节点类型适配器
    provider = getProvider(logicNodeType, model);
    if (provider)
        return provider;
    throw new RuntimeError(ibiz.i18n.t('runtime.register.helper.frontEndTypeNode', {
        logicNodeType,
    }));
}
