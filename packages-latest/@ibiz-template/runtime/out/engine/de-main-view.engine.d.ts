import { IHttpResponse, IMarkOpenData } from '@ibiz-template/core';
import { MarkOpenDataActionType, IPanelItemCoopPosController } from '../interface';
import { ViewEngineBase } from './view-base.engine';
/**
 * 实体主数据视图引擎
 *
 * @export
 * @class DEMainViewEngine
 * @extends {ViewEngineBase}
 */
export declare class DEMainViewEngine extends ViewEngineBase {
    /**
     * 协同消息占位
     *
     * @readonly
     * @type {(IPanelItemCoopPosController | undefined)}
     * @memberof DEMainViewEngine
     */
    get coopPos(): IPanelItemCoopPosController | undefined;
    /**
     * 标记数据行为类型
     *
     * @protected
     * @type {MarkOpenDataActionType[]}
     * @memberof DEMainViewEngine
     */
    protected doActions: MarkOpenDataActionType[];
    /**
     * 标记模式
     *
     * @protected
     * @type {string[]}
     * @memberof DEMainViewEngine
     */
    protected markModes: string[];
    /**
     * 实体名称
     *
     * @protected
     * @type {string}
     * @memberof DEMainViewEngine
     */
    protected deName: string;
    /**
     * 是否打开刷新提示消息框
     *
     * @protected
     * @type {boolean}
     * @memberof DEMainViewEngine
     */
    protected hasOpenConfirm: boolean;
    /**
     * 是否已监听数据标记行为
     *
     * @protected
     * @type {boolean}
     * @memberof DEMainViewEngine
     */
    protected hasSubscribe: boolean;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    onMounted(): Promise<void>;
    /**
     * 刷新确认
     *
     * @protected
     * @return {*}  {Promise<boolean>}
     * @memberof DEMainViewEngine
     */
    protected reloadConfirm(): Promise<boolean>;
    /**
     * 刷新
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    protected refresh(): Promise<void>;
    /**
     * 标记打开数据模式回调
     *
     * @protected
     * @param {IMarkOpenData} data
     * @param {string} dataInfo
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    protected markOpenDataCallback(data: IMarkOpenData, dataInfo?: string): Promise<void>;
    /**
     * 初始化标记打开数据相关逻辑
     *
     * @protected
     * @return {*}  {void}
     * @memberof DEMainViewEngine
     */
    protected initMarkOpenData(): void;
    /**
     * 发送查看数据标记行为
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    protected sendViewDataAction(): Promise<void>;
    /**
     * 发送标记数据行为
     *
     * @protected
     * @param {string} key
     * @memberof DEMainViewEngine
     */
    protected sendMarkDataAction(action: MarkOpenDataActionType, key?: string): Promise<IHttpResponse<IData>>;
    /**
     * 监听标记数据行为
     *  - 只存在一个监听
     * @protected
     * @param {string} key
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    protected subscribeMarkDataAction(key: string): void;
    /**
     * 执行标记数据行为
     * - VIEW, EDIT, UPDATE 子类实现
     * @protected
     * @memberof DEMainViewEngine
     */
    protected doMarkDataAction(): void;
}
//# sourceMappingURL=de-main-view.engine.d.ts.map