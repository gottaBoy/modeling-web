import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';
/** 面板成员适配器前缀 */
export const PANELITEM_PROVIDER_PREFIX = 'PANELITEM';
/**
 * 注册面板成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key 忽略大小写
 * @param {() => IPanelItemProvider} callback 生成面板成员适配器的回调
 */
export function registerPanelItemProvider(key, callback) {
    ibiz.register.register(`${PANELITEM_PROVIDER_PREFIX}_${key.toUpperCase()}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${PANELITEM_PROVIDER_PREFIX}_${key.toUpperCase()}`);
}
/**
 * 获取面板成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPanelItemProvider>}
 */
export async function getPanelItemProvider(model, panelModel, viewModel) {
    var _a;
    let provider;
    const { itemType, sysPFPluginId, appId, controlRenders, id } = model;
    // 找自定义注册的适配器
    const registerKey = CustomRegister.getRegisterKey(PANELITEM_PROVIDER_PREFIX, {
        mainModel: model,
        view: viewModel,
        control: panelModel,
    });
    provider = getProvider(registerKey);
    if (!provider) {
        ibiz.log.debug(ibiz.i18n.t('runtime.register.helper.panelItemCustomRegistration', {
            registerKey,
        }));
    }
    else {
        return provider;
    }
    // 找插件适配器
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey) {
            provider = getProvider(pluginKey);
        }
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.panelMemberPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    const renders = (controlRenders === null || controlRenders === void 0 ? void 0 : controlRenders.filter(render => render.id !== `${id === null || id === void 0 ? void 0 : id.toLowerCase()}_tooltip`)) || [];
    if (renders.length > 0) {
        // 默认预定义 绘制器
        provider = getProvider('PREDEFINE_RENDER');
    }
    else {
        // 特殊容器类型
        if (itemType === 'CONTAINER') {
            const predefinedType = model.predefinedType || 'DEFAULT';
            const key = `CONTAINER_${predefinedType}`;
            provider = getProvider(key);
            if (!provider) {
                ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.panelContainerPredefined', {
                    predefinedType,
                    key,
                }));
            }
            else {
                return provider;
            }
        }
        // 特殊直接内容类型
        if (itemType === 'RAWITEM') {
            const predefinedType = ((_a = model.rawItem) === null || _a === void 0 ? void 0 : _a.predefinedType) || 'DEFAULT';
            const key = `RAWITEM_${predefinedType}`;
            provider = getProvider(key);
            if (!provider) {
                ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.panelMemberDirectContent', {
                    predefinedType,
                    key,
                }));
            }
            else {
                return provider;
            }
        }
        if (itemType === 'FIELD') {
            const { editor } = model;
            if (editor && editor.predefinedType) {
                const key = `FIELD_${editor.predefinedType.toUpperCase()}`;
                provider = getProvider(key);
                if (provider) {
                    return provider;
                }
            }
        }
        // 特殊部件占位
        if (itemType === 'CTRLPOS') {
            const key = `CTRLPOS_${id === null || id === void 0 ? void 0 : id.toUpperCase()}`;
            provider = getProvider(key);
            if (provider) {
                return provider;
            }
        }
        // 找面板成员类型
        provider = getProvider(itemType);
    }
    if (!provider) {
        ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.panelMemberType', {
            itemType,
        }));
    }
    else {
        return provider;
    }
}
