import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';
/** 部件适配器前缀 */
export const CONTROL_PROVIDER_PREFIX = 'CONTROL';
/**
 * 注册部件适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IControlProvider} callback 生成部件适配器的回调
 */
export function registerControlProvider(key, callback) {
    ibiz.register.register(`${CONTROL_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${CONTROL_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取部件适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IControlProvider>}
 */
export async function getControlProvider(model) {
    let provider;
    const { controlType, controlStyle, sysPFPluginId, appId } = model;
    // 找自定义注册的适配器
    const registerKey = CustomRegister.getRegisterKey(CONTROL_PROVIDER_PREFIX, {
        controlModel: model,
    });
    provider = getProvider(registerKey);
    if (!provider) {
        ibiz.log.debug(ibiz.i18n.t('runtime.register.helper.customRegistration', {
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
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.widgetPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    // 再找部件类型和部件样式
    if (controlStyle && controlStyle !== 'DEFAULT') {
        const key = `${controlType}_${controlStyle}`;
        provider = getProvider(key);
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.widgetStyleType', {
                controlType,
                controlStyle,
            }), model);
        }
        else {
            return provider;
        }
    }
    // 找部件类型
    provider = getProvider(controlType);
    if (!provider) {
        switch (controlType) {
            case 'DATAINFOBAR':
                return;
            default:
                ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.widgetType', {
                    controlType,
                }));
        }
    }
    else {
        return provider;
    }
}
