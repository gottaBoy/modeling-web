import { IDBToolbarPortlet, IUIActionGroupDetail } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { UIActionUtil } from '../../../../../ui-action';
import { SysUIActionTag } from '../../../../../constant';
import { IApiActionBarPortletController } from '../../../../../interface';

/**
 * @description 门户部件控制器（操作栏）
 * @export
 * @class ActionBarPortletController
 * @extends {PortletPartController<IDBToolbarPortlet>}
 * @implements {IApiActionBarPortletController}
 */
export class ActionBarPortletController
  extends PortletPartController<IDBToolbarPortlet>
  implements IApiActionBarPortletController
{
  /**
   * 行为点击
   *
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @param {IData[]} [data=[]]
   * @return {*}  {Promise<void>}
   * @memberof ActionBarPortletController
   */
  async onActionClick(
    detail: IUIActionGroupDetail,
    event: MouseEvent,
    data: IData[] = [],
  ): Promise<void> {
    const actionId = detail.uiactionId;
    const eventArgs = {
      context: this.context,
      params: this.params,
      data,
      view: this.dashboard.view,
      ctrl: this.dashboard,
      event,
    };
    const result = await UIActionUtil.exec(actionId!, eventArgs, detail.appId);
    if (result.closeView) {
      this.dashboard.view.closeView();
    } else if (result.refresh) {
      switch (result.refreshMode) {
        // 刷新当前节点的子
        case 1:
          this.refresh();
          break;
        // 刷新当前节点的父节点的子
        case 2:
          this.dashboard.view?.callUIAction(SysUIActionTag.REFRESH);
          break;
        // 刷新所有节点数据
        case 3:
          this.dashboard.view
            .getTopView()
            ?.callUIAction(SysUIActionTag.REFRESH);
          break;
        default:
      }
    }
  }
}
