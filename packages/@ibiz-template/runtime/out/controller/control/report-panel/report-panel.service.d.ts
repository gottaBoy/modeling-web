import { IDEReportPanel, IAppDataEntity } from '@ibiz/model-core';
import { IHttpResponse } from '@ibiz-template/core';
import { ControlService, ControlVO } from '../../../service';
export declare class ReportPanelService<T extends IDEReportPanel = IDEReportPanel> extends ControlService<T> {
    /**
     * 当前部件对应的应用实体对象
     *
     * @protected
     * @type {IAppDataEntity}
     */
    protected dataEntity: IAppDataEntity;
    /**
     * 执行查询报表数据的方法
     *
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    fetch(context: IContext, params?: IParams): Promise<IHttpResponse<ControlVO>>;
}
//# sourceMappingURL=report-panel.service.d.ts.map