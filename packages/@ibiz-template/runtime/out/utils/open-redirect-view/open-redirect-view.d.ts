import { IAppDERedirectView, IAppDataEntity, IAppRedirectView } from '@ibiz/model-core';
import { IModalData, IOpenViewOptions } from '../../interface';
/**
 * 解析view://协议的字符串
 * @author lxm
 * @date 2024-02-06 09:26:20
 * @export
 * @param {string} urlStr
 * @return {*}  {{
 *   context: IParams;
 *   params: IParams;
 *   viewId: string;
 * }}
 */
export declare function parseViewProtocol(urlStr: string): {
    context: IParams;
    params: IParams;
    viewId: string;
};
type ToViewParams = {
    context: IContext;
    params: IParams;
    opts: IOpenViewOptions;
    viewId: string;
};
/**
 * 打开重定向视图
 *
 * @author chitanda
 * @date 2022-09-28 16:09:13
 * @export
 * @param {IAppRedirectView} appView 应用重定向视图
 * @param {IContext}
 * @param {IParams} [params={}]
 * @param {IData} [data={}]
 * @return {*}  {Promise<IModalData>}
 */
export declare function openRedirectView(appView: IAppRedirectView, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData>;
/**
 * 本地打开工作流重定向视图
 *
 * @description 工作流 appredirectview 特殊处理，全局通过 appredirectview 跳转工作流重定向，均使用此方法
 * @author zk
 * @date 2024-01-02 11:01:16
 * @export
 * @param {IContext} context
 * @param {string} linkUrl
 * @param {IOpenViewOptions} [opts={}]
 * @return {*}  {Promise<void>}
 */
export declare function toLocalOpenWFRedirectView(context: IContext, linkUrl: string, opts?: IOpenViewOptions): Promise<void>;
/**
 * 获取本地打开工作流重定向视图的相关信息
 *
 * @author zk
 * @date 2024-01-02 11:01:38
 * @export
 * @param {IContext} context
 * @param {string} linkUrl
 * @param {IOpenViewOptions} [opts={}]
 * @return {*}  {Promise<ToViewParams>}
 */
export declare function getLocalOpenWFRedirectView(context: IContext, linkUrl: string, opts?: IOpenViewOptions): Promise<ToViewParams>;
/**
 * 获取处理后的重定向视图最终要跳转视图的相关信息
 * @author lxm
 * @date 2023-12-26 11:16:02
 * @export
 * @param {IAppDERedirectView} appView
 * @param {IContext} context
 * @param {IParams} [params={}]
 * @param {IOpenViewOptions} [opts={}]
 * @return {*}  {(Promise<({ type: 'view' } & ToViewParams) | { type: 'url'; url: string }>)}
 */
export declare function getDERedirectToView(appView: IAppDERedirectView, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<({
    type: 'view';
} & ToViewParams) | {
    type: 'url';
    url: string;
}>;
/**
 * 打开实体重定向视图
 *
 * @author chitanda
 * @date 2022-09-28 16:09:15
 * @export
 * @param {IAppDERedirectView} appView
 * @param {IContext}
 * @param {IParams} [params={}]
 * @param {IData[]} [data=[]]
 * @return {*}  {Promise<IModalData>}
 */
export declare function openDERedirectView(appView: IAppDERedirectView, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData>;
/**
 * 计算重定向标识
 *
 * @author chitanda
 * @date 2022-10-25 16:10:48
 * @export
 * @param {IAppDataEntity} entity 重定向视图所在应用实体
 * @param {IAppDERedirectView} rdView 重定向视图
 * @param {string} wfStep 流程步骤
 * @param {IData} data 当前数据
 * @return {*}  {Promise<string>}
 */
export declare function calcDERdTag(entity: IAppDataEntity, rdView: IAppDERedirectView, params: IParams, data: IData): Promise<string>;
export {};
//# sourceMappingURL=open-redirect-view.d.ts.map