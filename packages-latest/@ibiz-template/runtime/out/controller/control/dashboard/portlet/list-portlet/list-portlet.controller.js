import { PortletPartController } from '../portlet-part/portlet-part.controller';
/**
 * @description 门户部件控制器（列表）
 * @export
 * @class ListPortletController
 * @extends {PortletPartController<IDBListPortletPart>}
 * @implements {IApiListPortletController}
 */
export class ListPortletController extends PortletPartController {
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:41
     * @return {*}  {Promise<void>}
     */
    async refresh() {
        await super.refresh();
        if (this.contentController) {
            this.contentController.refresh();
        }
    }
}
