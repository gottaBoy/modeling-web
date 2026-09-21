import { RuntimeError } from '@ibiz-template/core';
import { CustomRegister } from '../custom-register';
/** 界面逻辑适配器前缀 */
export const UILOGIC_PROVIDER_PREFIX = 'UILOGIC';
/**
 * @description 注册界面逻辑适配器
 * @export
 * @param {string} key
 * @param {Callback} callback
 */
export function registerUILogicProvider(key, callback) {
    ibiz.register.register(`${UILOGIC_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key, uiLogic, entity) {
    return ibiz.register.get(`${UILOGIC_PROVIDER_PREFIX}_${key}`, uiLogic, entity);
}
/**
 * @description 获取界面逻辑适配器
 * @export
 * @param {IDEUILogic} model
 * @param {IAppDataEntity} entity
 * @returns {*}  {IUILogicProvider}
 */
export function getUILogicProvider(mainModel, entity) {
    // 找自定义注册的适配器
    const registerKey = CustomRegister.getRegisterKey(UILOGIC_PROVIDER_PREFIX, {
        mainModel,
        entity,
    });
    let provider = getProvider(registerKey, mainModel, entity);
    if (provider)
        return provider;
    ibiz.log.debug(ibiz.i18n.t('runtime.register.helper.uiLogicCustomRegistration', {
        registerKey,
    }));
    // 找默认适配器
    provider = getProvider('DEFAULT', mainModel, entity);
    if (!provider)
        throw new RuntimeError(ibiz.i18n.t('runtime.register.helper.uiLogic'));
    return provider;
}
