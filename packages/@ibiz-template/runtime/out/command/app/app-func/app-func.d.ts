import { IAppFunc } from '@ibiz/model-core';
/**
 * 执行应用功能
 *
 * @author chitanda
 * @date 2022-07-25 11:07:07
 * @export
 * @class AppFuncCommand
 */
export declare class AppFuncCommand {
    /**
     * 指令标识
     *
     * @author chitanda
     * @date 2022-07-25 17:07:20
     * @see 具体实现 {@link AppFuncCommand.exec}
     * @static
     */
    static readonly TAG = "ibiz.app-func.exec";
    constructor();
    /**
     * 执行应用功能
     *
     * @author chitanda
     * @date 2022-07-25 17:07:35
     * @param {IAppFunc} appFunc 应用功能模型
     * @param {IContext} [context] 执行上下文
     * @param {IParams} [params={}] 参数
     * @param {IData} [opts={}] 额外参数，与具体执行对象规划好的额外参数。如需要给飘窗使用的 event 事件对象.
     * @return {*}  {Promise<void>}
     */
    exec(appFuncId: string, context: IContext, params?: IParams, opts?: IData): Promise<void>;
    /**
     * 打开应用视图
     *
     * @author chitanda
     * @date 2022-07-25 18:07:49
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<void>}
     */
    protected openAppView(appFunc: IAppFunc, context: IContext, params?: IParams, opts?: IData): Promise<void>;
    /**
     * 打开HTML页面
     *
     * @author chitanda
     * @date 2022-07-25 18:07:56
     * @protected
     * @param {IAppFunc} appFunc
     */
    protected openHtmlPage(appFunc: IAppFunc): void;
    /**
     * 应用预置功能
     *
     * @author chitanda
     * @date 2022-07-25 18:07:22
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    protected openPdAppFunc(appFunc: IAppFunc, context?: IContext, params?: IParams): void;
    /**
     * 执行 JavaScript 脚本
     *
     * @author chitanda
     * @date 2022-07-25 18:07:09
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    protected executeJavaScript(appFunc: IAppFunc, context?: IContext, params?: IParams): void;
    /**
     * 自定义应用功能
     *
     * @author chitanda
     * @date 2022-07-25 18:07:51
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    protected custom(appFunc: IAppFunc, context?: IContext, params?: IParams): void;
}
//# sourceMappingURL=app-func.d.ts.map