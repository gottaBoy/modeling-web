import { ViewEngineBase, ViewController, IEditFormController, IOptViewState, IOptViewEvent } from '@ibiz-template/runtime';
import { IAppDEEditView } from '@ibiz/model-core';
export declare class OptViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEEditView, IOptViewState, IOptViewEvent>}
     * @memberof OptViewEngine
     */
    protected view: ViewController<IAppDEEditView, IOptViewState, IOptViewEvent>;
    /**
     * 表单部件
     *
     * @readonly
     * @memberof OptViewEngine
     */
    get form(): IEditFormController;
    protected init(): void;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof OptViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof OptViewEngine
     */
    onMounted(): Promise<void>;
    /**
     * 视图destroyed生命周期执行逻辑
     *
     * @author tony001
     * @date 2024-09-14 15:09:50
     * @return {*}  {Promise<void>}
     */
    onDestroyed(): Promise<void>;
    /**
     * 模态事件钩子
     *
     * @author tony001
     * @date 2024-09-14 15:09:59
     * @param {{ allowClose?: boolean }} context
     * @return {*}  {Promise<void>}
     */
    modalEventHook(context: {
        allowClose?: boolean;
    }): Promise<void>;
    /**
     * 获取数据
     *
     * @return {*}  {IData[]}
     * @memberof OptViewEngine
     */
    getData(): IData[];
    /**
     * 加载
     *
     * @memberof OptViewEngine
     */
    load(): Promise<IData>;
    call(key: string, args: any): Promise<any>;
    /**
     * 确认
     *
     * @memberof OptViewEngine
     */
    confirm(): Promise<void>;
    /**
     * 取消
     *
     * @memberof OptViewEngine
     */
    cancel(): void;
}
