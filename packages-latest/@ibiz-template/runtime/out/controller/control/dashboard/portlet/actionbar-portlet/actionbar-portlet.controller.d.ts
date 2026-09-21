import { IDBToolbarPortlet, IUIActionGroupDetail } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiActionBarPortletController } from '../../../../../interface';
/**
 * @description 门户部件控制器（操作栏）
 * @export
 * @class ActionBarPortletController
 * @extends {PortletPartController<IDBToolbarPortlet>}
 * @implements {IApiActionBarPortletController}
 */
export declare class ActionBarPortletController extends PortletPartController<IDBToolbarPortlet> implements IApiActionBarPortletController {
    /**
     * 行为点击
     *
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IData[]} [data=[]]
     * @return {*}  {Promise<void>}
     * @memberof ActionBarPortletController
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent, data?: IData[]): Promise<void>;
}
//# sourceMappingURL=actionbar-portlet.controller.d.ts.map