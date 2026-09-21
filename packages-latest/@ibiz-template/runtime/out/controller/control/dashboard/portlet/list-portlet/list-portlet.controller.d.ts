import { IDBListPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiListPortletController } from '../../../../../interface';
/**
 * @description 门户部件控制器（列表）
 * @export
 * @class ListPortletController
 * @extends {PortletPartController<IDBListPortletPart>}
 * @implements {IApiListPortletController}
 */
export declare class ListPortletController extends PortletPartController<IDBListPortletPart> implements IApiListPortletController {
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:41
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
}
//# sourceMappingURL=list-portlet.controller.d.ts.map