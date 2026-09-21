import { PortletPartController } from '../portlet-part/portlet-part.controller';
export class ChartPortletController extends PortletPartController {
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:01
     * @return {*}  {Promise<void>}
     */
    async refresh() {
        await super.refresh();
        if (this.contentController) {
            this.contentController.refresh();
        }
    }
}
