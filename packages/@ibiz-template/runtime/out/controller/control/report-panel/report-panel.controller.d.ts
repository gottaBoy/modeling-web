import { IDEReportPanel, IAppDataEntity } from '@ibiz/model-core';
import { MDCtrlLoadParams, IReportPanelController, IReportPanelEvent, IReportPanelState } from '../../../interface';
import { ControlController } from '../../common';
import { ReportPanelService } from './report-panel.service';
import { ControllerEvent } from '../../utils';
import { ReportPanelBaseGenerator } from './generator/base-generator';
export declare class ReportPanelController extends ControlController<IDEReportPanel, IReportPanelState, IReportPanelEvent> implements IReportPanelController {
    /**
     * 报表部件服务
     *
     * @type {ReportPanelService}
     */
    protected service: ReportPanelService;
    /**
     * 当前部件对应的应用实体对象
     *
     * @protected
     * @type {IAppDataEntity}
     */
    protected dataEntity: IAppDataEntity;
    /**
     * 报表生成器
     *
     * @protected
     * @type {ReportPanelBaseGenerator}
     * @memberof ReportPanelController
     */
    generator: ReportPanelBaseGenerator;
    /**
     * 事件对象
     *
     * @readonly
     * @protected
     * @type {ControllerEvent<IReportPanelEvent>}
     * @memberof ReportPanelController
     */
    protected get _evt(): ControllerEvent<IReportPanelEvent>;
    /**
     * 是否为bi报表
     *
     * @author tony001
     * @date 2024-06-19 18:06:02
     * @readonly
     */
    get isBIReport(): boolean;
    /**
     * 初始化状态
     *
     * @protected
     * @memberof ReportPanelController
     */
    protected initState(): void;
    /**
     * 初始化方法
     *
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onCreated(): Promise<void>;
    /**
     * 挂载
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    protected onMounted(): Promise<void>;
    /**
     * 销毁
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    protected onDestroyed(): Promise<void>;
    /**
     * 加载数据
     *
     * @public
     * @param {(MDCtrlLoadParams)} [args]
     * @return {*}  {Promise<IData>}
     * @memberof ReportPanelController
     */
    load(args?: MDCtrlLoadParams): Promise<IData>;
    /**
     * 部件加载后处理
     *
     * @author chitanda
     * @date 2023-06-21 15:06:44
     * @param {MDCtrlLoadParams} args 本次请求参数
     * @param {IData[]} items 上游处理的数据（默认是后台数据）
     * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
     */
    afterLoad(args: MDCtrlLoadParams, data: IData): Promise<IData>;
    /**
     * 获取请求过滤参数（整合了视图参数，各种过滤条件，排序，分页）
     * @param {IParams} [extraParams] 额外视图参数，附加在最后
     * @return {*}  {Promise<IParams>}
     */
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * 报表数据
     *
     * @return {*}  {IData[]}
     * @memberof ReportPanelController
     */
    getData(): IData[];
    /**
     * 部件刷新，走初始加载
     * @date 2023-05-23 03:42:41
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=report-panel.controller.d.ts.map