import { IDBViewPortletPart } from '@ibiz/model-core';
import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { IApiViewPortletController, IController } from '../../../../../interface';
/**
 * @description 门户部件控制器（视图）
 * @export
 * @class ViewPortletController
 * @extends {PortletPartController<IDBViewPortletPart>}
 * @implements {IApiViewPortletController}
 */
export declare class ViewPortletController extends PortletPartController<IDBViewPortletPart> implements IApiViewPortletController {
    /**
     * 定时器标识
     *
     * @author tony001
     * @date 2024-10-24 18:10:50
     * @private
     * @type {(NodeJS.Timeout | undefined)}
     */
    private timer;
    /**
     * 内容控制器
     *
     * @author tony001
     * @date 2024-05-07 14:05:02
     * @readonly
     * @type {(IController | undefined)}
     */
    get contentController(): IController | undefined;
    /**
     * @description 内容元素
     * @readonly
     * @type {(HTMLDivElement | null)}
     * @memberof PortletPartController
     */
    get contentElement(): HTMLDivElement | null;
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:30
     */
    refresh(): Promise<void>;
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-10-24 18:10:55
     * @return {*}  {Promise<void>}
     */
    destroyed(): Promise<void>;
}
//# sourceMappingURL=view-portlet.controller.d.ts.map