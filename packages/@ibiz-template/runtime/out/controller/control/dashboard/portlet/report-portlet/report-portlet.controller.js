import { PortletPartController } from '../portlet-part/portlet-part.controller';
export class ReportPortletController extends PortletPartController {
    /**
     * 内容控制器
     *
     * @author tony001
     * @date 2024-05-07 14:05:02
     * @readonly
     * @type {(IController | undefined)}
     */
    get contentController() {
        const { controls = [] } = this.model;
        const reportPanel = controls.find(x => x.controlType === 'REPORTPANEL');
        if (reportPanel && reportPanel.codeName) {
            return this.dashboard.getController(reportPanel.codeName);
        }
    }
    /**
     * 刷新报表部件
     *
     * @author tony001
     * @date 2024-07-23 22:07:16
     * @return {*}  {Promise<void>}
     */
    async refresh() {
        await super.refresh();
        if (this.contentController) {
            this.dashboard.evt.emit('onItemModelReset', {
                name: this.model.id,
            });
        }
    }
}
