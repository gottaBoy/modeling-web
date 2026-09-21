import { ViewController, IEditFormController, EventBase, IEditViewState, IEditViewEvent, IPanelItemCoopPosController, DEMainViewEngine, FormSaveParams } from '@ibiz-template/runtime';
import { IAppDEEditView } from '@ibiz/model-core';
export declare class EditViewEngine extends DEMainViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDEEditView,
     *     IEditViewState,
     *     IEditViewEvent
     *   >}
     * @memberof EditViewEngine
     */
    protected view: ViewController<IAppDEEditView, IEditViewState, IEditViewEvent>;
    get form(): IEditFormController;
    get coopPos(): IPanelItemCoopPosController | undefined;
    protected init(): void;
    /**
     * 模态事件钩子
     *
     * @param {{ allowClose?: boolean }} context
     * @return {*}  {Promise<void>}
     * @memberof EditViewEngine
     */
    modalEventHook(context: {
        allowClose?: boolean;
    }): Promise<void>;
    onCreated(): Promise<void>;
    /**
     * @description 监控form事件
     * @param {EventBase} event
     * @memberof EditViewEngine
     */
    formDataStateChange(event: EventBase): void;
    onMounted(): Promise<void>;
    getData(): IData[];
    load(): Promise<IData>;
    save(args?: FormSaveParams): Promise<IData>;
    refresh(): Promise<void>;
    call(key: string, args: any): Promise<any>;
    /**
     * 保存并新建
     *
     * @author zk
     * @date 2023-06-01 01:06:59
     * @return {*}
     * @memberof EditViewEngine
     */
    saveAndNew(): Promise<void>;
    /**
     * 工作流启动
     *
     * @author lxm
     * @date 2022-09-29 20:09:27
     * @returns {*}  {Promise<void>}
     */
    wfStart(): Promise<void>;
    /**
     * 工作流提交
     *
     * @author lxm
     * @date 2022-09-29 20:09:27
     * @returns {*}  {Promise<void>}
     */
    wfSubmit(): Promise<void>;
    /**
     * 工作流撤回
     *
     * @author zk
     * @date 2023-11-22 11:11:55
     * @return {*}  {Promise<void>}
     * @memberof MobEditViewEngine
     */
    wfWithdraw(): Promise<void>;
    /**
     * 执行数据标记行为
     *
     * @memberof EditViewEngine
     */
    doMarkDataAction(): void;
    /**
     * 刷新确认
     * @author lxm
     * @date 2024-02-06 11:40:36
     * @return {*}  {Promise<boolean>}
     */
    reloadConfirm(): Promise<boolean>;
    /**
     * 变更当前页面的数据
     * @author lxm
     * @date 2024-04-01 01:11:58
     * @param {string} type
     */
    changeRecord(type: string): Promise<void>;
    /**
     * 视图destroyed生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof EditViewEngine
     */
    onDestroyed(): Promise<void>;
}
