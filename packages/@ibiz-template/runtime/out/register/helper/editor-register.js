import { getPluginRegisterKey } from './common-register';
/** 编辑器适配器前缀 */
export const EDITOR_PROVIDER_PREFIX = 'EDITOR';
/**
 * 注册编辑器适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IEditorProvider} callback 生成编辑器适配器的回调
 */
export function registerEditorProvider(key, callback) {
    ibiz.register.register(`${EDITOR_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${EDITOR_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取编辑器适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IEditorProvider>}
 */
export async function getEditorProvider(model) {
    let provider;
    const { editorType, editorStyle, predefinedType, sysPFPluginId, appId } = model;
    // 找插件适配器
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey) {
            provider = getProvider(pluginKey);
        }
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.editorPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    // 再找编辑器类型和编辑器样式
    if (editorStyle && editorStyle !== 'DEFAULT') {
        const key = `${editorType}_${editorStyle}`;
        provider = getProvider(key);
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.editorStyleType', {
                editorType,
                editorStyle,
            }), model);
        }
        else {
            return provider;
        }
    }
    // 编辑器预置类型
    if (predefinedType) {
        let key = `${predefinedType}_${editorType}`;
        if (editorStyle && editorStyle !== 'DEFAULT') {
            key += `_${editorStyle}`;
        }
        provider = getProvider(key);
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.editorTypePredefinedType', {
                editorType,
                predefinedType,
            }), model);
        }
        else {
            return provider;
        }
    }
    // 找编辑器类型
    provider = getProvider(editorType);
    if (!provider) {
        ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.editorType', {
            editorType,
        }));
    }
    else {
        return provider;
    }
}
