import { IDBChartPortlet } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiChartPortletController } from '../../../../../interface';
/**
 * @description  门户部件控制器（图表）
 * @export
 * @class ChartPortletController
 * @extends {PortletPartController<IDBChartPortlet>}
 * @implements {IApiChartPortletController}
 */
export declare class ChartPortletController extends PortletPartController<IDBChartPortlet> implements IApiChartPortletController {
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:01
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=chart-portlet.controller.d.ts.map