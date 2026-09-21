import { getPluginRegisterKey } from './common-register';
import { CustomRegister } from '../custom-register';
/** 表单成员适配器前缀 */
export const FORMDETAIL_PROVIDER_PREFIX = 'FORMDETAIL';
/**
 * 注册表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IFormDetailProvider} callback 生成表单成员适配器的回调
 */
export function registerFormDetailProvider(key, callback) {
    ibiz.register.register(`${FORMDETAIL_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${FORMDETAIL_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IFormDetailProvider>}
 */
export async function getFormDetailProvider(model, formModel) {
    let provider;
    const { detailType, sysPFPluginId, appId } = model;
    // 找自定义注册的适配器
    const registerKey = CustomRegister.getRegisterKey(FORMDETAIL_PROVIDER_PREFIX, {
        controlItemModel: model,
        controlModel: formModel,
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
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.formMemberPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    // 找表单成员类型
    provider = getProvider(detailType);
    if (!provider) {
        ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.formMemberType', {
            detailType,
        }));
    }
    else {
        return provider;
    }
}
