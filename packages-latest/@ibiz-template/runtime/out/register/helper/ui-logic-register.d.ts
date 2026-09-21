import { IAppDataEntity, IDEUILogic } from '@ibiz/model-core';
import { IUILogicProvider } from '../../interface';
/** 界面逻辑适配器前缀 */
export declare const UILOGIC_PROVIDER_PREFIX = "UILOGIC";
/**
 * @description 注册界面逻辑适配器
 * @export
 * @param {string} key
 * @param {Callback} callback
 */
export declare function registerUILogicProvider(key: string, callback: (uiLogic: IDEUILogic, entity: IAppDataEntity) => IUILogicProvider): void;
/**
 * @description 获取界面逻辑适配器
 * @export
 * @param {IDEUILogic} model
 * @param {IAppDataEntity} entity
 * @returns {*}  {IUILogicProvider}
 */
export declare function getUILogicProvider(mainModel: IDEUILogic, entity: IAppDataEntity): IUILogicProvider;
//# sourceMappingURL=ui-logic-register.d.ts.map