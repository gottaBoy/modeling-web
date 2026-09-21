import { IControlState } from './i-control.state';
export interface IReportPanelState extends IControlState {
    /**
     * 是否加载完数据
     *
     * @type {boolean}
     */
    isLoaded: boolean;
    /**
     * 搜索部件的查询参数
     * @type {IParams}
     */
    searchParams: IParams;
    /**
     * 报表数据
     *
     * @type {IData}
     */
    data: IData | IData[];
    /**
     * 是否正在处理中
     * @type {boolean}
     */
    processing: boolean;
    /**
     * 报表类型
     *
     * @type {string}
     * @memberof IReportPanelState
     */
    reportType: string;
}
//# sourceMappingURL=i-report-panel.state.d.ts.map