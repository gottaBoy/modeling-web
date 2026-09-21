import { IDEReportPanel, IAppDataEntity } from '@ibiz/model-core';
import { MDCtrlLoadParams, IReportPanelEvent, IReportPanelState, IReportPanelController } from '../../../interface';
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
     * @description 是否为BI报表设计
     * @readonly
     * @type {boolean}
     * @memberof ReportPanelController
     */
    get isBIReportDesign(): boolean;
    /**
     * @description 获取数据
     * @returns {*}  {IData[]}
     * @memberof ReportPanelController
     */
    getData(): IData[];
    /**
     * @description 初始化状态
     * @protected
     * @memberof ReportPanelController
     */
    protected initState(): void;
    /**
     * @description 生命周期-创建完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    protected onCreated(): Promise<void>;
    /**
     * @description 生命周期-加载完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    protected onMounted(): Promise<void>;
    /**
     * @description 获取报表参数
     * @protected
     * @returns {*}  {IParams}
     * @memberof ReportPanelController
     */
    protected getReportParams(): IParams;
    /**
     * @description 获取请求过滤参数
     * @param {IParams} [extraParams]
     * @returns {*}  {Promise<IParams>}
     * @memberof ReportPanelController
     */
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * @description 加载数据
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<IData>}
     * @memberof ReportPanelController
     */
    load(args?: MDCtrlLoadParams): Promise<IData>;
    /**
     * @description 部件加载后处理
     * @param {MDCtrlLoadParams} args
     * @param {IData} data
     * @returns {*}  {Promise<IData>}
     * @memberof ReportPanelController
     */
    afterLoad(args: MDCtrlLoadParams, data: IData[]): Promise<IData>;
    /**
     * @description 刷新
     * @returns {*}  {Promise<void>}
     * @memberof ReportPanelController
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=report-panel.controller.d.ts.map