import { IDEForm, IDEFormDetail } from '@ibiz/model-core';
import { IFormDetailProvider } from '../../interface';
/** 表单成员适配器前缀 */
export declare const FORMDETAIL_PROVIDER_PREFIX = "FORMDETAIL";
/**
 * 注册表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IFormDetailProvider} callback 生成表单成员适配器的回调
 */
export declare function registerFormDetailProvider(key: string, callback: () => IFormDetailProvider): void;
/**
 * 获取表单成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IFormDetailProvider>}
 */
export declare function getFormDetailProvider(model: IDEFormDetail, formModel: IDEForm): Promise<IFormDetailProvider | undefined>;
//# sourceMappingURL=form-detail-register.d.ts.map