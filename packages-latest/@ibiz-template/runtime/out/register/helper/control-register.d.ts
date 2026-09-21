import { IControl } from '@ibiz/model-core';
import { IControlProvider } from '../../interface';
/** 部件适配器前缀 */
export declare const CONTROL_PROVIDER_PREFIX = "CONTROL";
/**
 * 注册部件适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IControlProvider} callback 生成部件适配器的回调
 */
export declare function registerControlProvider(key: string, callback: () => IControlProvider): void;
/**
 * 获取部件适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IControlProvider>}
 */
export declare function getControlProvider(model: IControl): Promise<IControlProvider | undefined>;
//# sourceMappingURL=control-register.d.ts.map