import { IDBToolbarPortlet, IUIActionGroupDetail } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
export declare class ActionBarPortletController extends PortletPartController<IDBToolbarPortlet> {
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