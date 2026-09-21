import { IDBReportPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IController } from '../../../../../interface';
export declare class ReportPortletController extends PortletPartController<IDBReportPortletPart> {
    /**
     * 内容控制器
     *
     * @author tony001
     * @date 2024-05-07 14:05:02
     * @readonly
     * @type {(IController | undefined)}
     */
    get contentController(): IController | undefined;
    /**
     * 刷新报表部件
     *
     * @author tony001
     * @date 2024-07-23 22:07:16
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=report-portlet.controller.d.ts.map