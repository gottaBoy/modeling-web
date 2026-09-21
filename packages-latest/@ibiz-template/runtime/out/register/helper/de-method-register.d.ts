import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { IDEMethodProvider } from '../../interface';
/** 实体行为适配器前缀 */
export declare const DEMETHOD_PROVIDER_PREFIX = "DEMETHOD";
/**
 * 注册实体行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IDEMethodProvider} callback 生成实体行为适配器的回调
 */
export declare function registerDEMethodProvider(key: string, callback: () => IDEMethodProvider): void;
/**
 * 获取实体行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IDEMethodProvider>}
 */
export declare function getDEMethodProvider(model: IAppDEMethod, entity?: IAppDataEntity): Promise<IDEMethodProvider>;
//# sourceMappingURL=de-method-register.d.ts.map