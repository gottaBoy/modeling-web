import { IAppDEACMode } from '@ibiz/model-core';
import { IAcItemProvider } from '../../interface';
/** 自填列表项适配器前缀 */
export declare const AC_ITEM_PROVIDER_PREFIX = "AC_ITEM";
/**
 * 注册自填列表项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-21 17:05:15
 * @export
 * @param {string} key
 * @param {() => IAcItemProvider} callback
 */
export declare function registerAcItemProvider(key: string, callback: () => IAcItemProvider): void;
/**
 * 获取自填列表项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-21 17:05:45
 * @export
 * @param {IAppDEACMode} model
 * @return {*}  {(Promise<IAcItemProvider | undefined>)}
 */
export declare function getAcItemProvider(model: IAppDEACMode): Promise<IAcItemProvider | undefined>;
//# sourceMappingURL=ac-item-register.d.ts.map