import { RuntimeError } from '@ibiz-template/core';
import { CustomRegister } from '../custom-register';
/** 实体逻辑适配器前缀 */
export const DELOGIC_PROVIDER_PREFIX = 'DELOGIC';
/**
 * @description 注册实体逻辑适配器
 * @export
 * @param {string} key
 * @param {Callback} callback
 */
export function registerDELogicProvider(key, callback) {
    ibiz.register.register(`${DELOGIC_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key, logic, entity) {
    return ibiz.register.get(`${DELOGIC_PROVIDER_PREFIX}_${key}`, logic, entity);
}
/**
 * @description 获取实体逻辑适配器
 * @export
 * @param {IAppDELogic} model
 * @param {IAppDataEntity} entity
 * @returns {*}  {IDELogicProvider}
 */
export function getDELogicProvider(mainModel, entity) {
    // 找自定义注册的适配器
    const registerKey = CustomRegister.getRegisterKey(DELOGIC_PROVIDER_PREFIX, {
        mainModel,
        entity,
    });
    let provider = getProvider(registerKey, mainModel, entity);
    if (provider)
        return provider;
    ibiz.log.debug(ibiz.i18n.t('runtime.register.helper.deLogicCustomRegistration', {
        registerKey,
    }));
    // 找默认适配器
    provider = getProvider('DEFAULT', mainModel, entity);
    if (!provider)
        throw new RuntimeError(ibiz.i18n.t('runtime.register.helper.deLogic'));
    return provider;
}
