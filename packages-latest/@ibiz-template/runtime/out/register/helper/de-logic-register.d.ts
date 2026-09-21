import { IAppDELogic, IAppDataEntity } from '@ibiz/model-core';
import { IDELogicProvider } from '../../interface';
/** 实体逻辑适配器前缀 */
export declare const DELOGIC_PROVIDER_PREFIX = "DELOGIC";
/**
 * @description 注册实体逻辑适配器
 * @export
 * @param {string} key
 * @param {Callback} callback
 */
export declare function registerDELogicProvider(key: string, callback: (deLogic: IAppDELogic, entity: IAppDataEntity) => IDELogicProvider): void;
/**
 * @description 获取实体逻辑适配器
 * @export
 * @param {IAppDELogic} model
 * @param {IAppDataEntity} entity
 * @returns {*}  {IDELogicProvider}
 */
export declare function getDELogicProvider(mainModel: IAppDELogic, entity: IAppDataEntity): IDELogicProvider;
//# sourceMappingURL=de-logic-register.d.ts.map