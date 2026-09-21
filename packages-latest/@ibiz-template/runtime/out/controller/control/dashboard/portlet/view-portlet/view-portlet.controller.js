import { Namespace } from '@ibiz-template/core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { SysUIActionTag } from '../../../../../constant';
/**
 * @description 门户部件控制器（视图）
 * @export
 * @class ViewPortletController
 * @extends {PortletPartController<IDBViewPortletPart>}
 * @implements {IApiViewPortletController}
 */
export class ViewPortletController extends PortletPartController {
    /**
     * 内容控制器
     *
     * @author tony001
     * @date 2024-05-07 14:05:02
     * @readonly
     * @type {(IController | undefined)}
     */
    get contentController() {
        const { portletAppView } = this.model;
        if (portletAppView && portletAppView.name) {
            return this.dashboard.getController(portletAppView.name);
        }
    }
    /**
     * @description 内容元素
     * @readonly
     * @type {(HTMLDivElement | null)}
     * @memberof PortletPartController
     */
    get contentElement() {
        if (this.contentController) {
            const { codeName = '' } = this.contentController.model;
            if (codeName) {
                const ns = new Namespace('view', ibiz.env.namespace);
                return document.querySelector(`.${ns.m(codeName)}`);
            }
        }
        return null;
    }
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:30
     */
    async refresh() {
        await super.refresh();
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        if (this.contentController) {
            this.timer = setTimeout(() => {
                this.contentController.callUIAction(SysUIActionTag.REFRESH);
            }, 0);
        }
    }
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-10-24 18:10:55
     * @return {*}  {Promise<void>}
     */
    async destroyed() {
        await super.destroyed();
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }
}
