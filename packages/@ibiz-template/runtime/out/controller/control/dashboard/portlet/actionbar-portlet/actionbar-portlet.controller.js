import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { UIActionUtil } from '../../../../../ui-action';
import { SysUIActionTag } from '../../../../../constant';
export class ActionBarPortletController extends PortletPartController {
    /**
     * 行为点击
     *
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IData[]} [data=[]]
     * @return {*}  {Promise<void>}
     * @memberof ActionBarPortletController
     */
    async onActionClick(detail, event, data = []) {
        var _a, _b;
        const actionId = detail.uiactionId;
        const eventArgs = {
            context: this.context,
            params: this.params,
            data,
            view: this.dashboard.view,
            ctrl: this.dashboard,
            event,
        };
        const result = await UIActionUtil.exec(actionId, eventArgs, detail.appId);
        if (result.closeView) {
            this.dashboard.view.closeView();
        }
        else if (result.refresh) {
            switch (result.refreshMode) {
                // 刷新当前节点的子
                case 1:
                    this.refresh();
                    break;
                // 刷新当前节点的父节点的子
                case 2:
                    (_a = this.dashboard.view) === null || _a === void 0 ? void 0 : _a.callUIAction(SysUIActionTag.REFRESH);
                    break;
                // 刷新所有节点数据
                case 3:
                    (_b = this.dashboard.view
                        .getTopView()) === null || _b === void 0 ? void 0 : _b.callUIAction(SysUIActionTag.REFRESH);
                    break;
                default:
            }
        }
    }
}
