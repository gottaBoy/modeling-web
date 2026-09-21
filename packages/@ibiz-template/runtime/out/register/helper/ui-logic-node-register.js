import { RuntimeError } from '@ibiz-template/core';
import { getPluginRegisterKey } from './common-register';
/** 界面逻辑节点适配器前缀 */
export const UILOGINNODE_PROVIDER_PREFIX = 'UI_LOGIN_NODE';
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
    ibiz.register.register(`${UILOGINNODE_PROVIDER_PREFIX}_${key}`, callback);
}
/**
 * 获取界面逻辑节点适配器
 *
 * @author chitanda
 * @date 2023-11-01 17:11:43
 * @export
 * @param {IDEUIPFPluginLogic} model
 * @return {*}  {Promise<IUILogicNodeProvider>}
 */
export async function getUILogicNodeProvider(model) {
    let provider;
    const { sysPFPluginId, appId } = model;
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
        provider = ibiz.register.get(`${UILOGINNODE_PROVIDER_PREFIX}_${pluginKey}`);
        if (provider) {
            return provider;
        }
        throw new RuntimeError(ibiz.i18n.t('runtime.register.helper.frontEndPluginNode', {
            pluginKey,
        }));
    }
}
