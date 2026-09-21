import { IApiFilterPortletState } from '../../../state';
import { IApiPortletController } from './i-api-portlet.controller';
/**
 * @description 门户部件控制器（过滤器）
 * @export
 * @interface IApiFilterPortletController
 * @extends {IApiPortletController}
 */
export interface IApiFilterPortletController extends IApiPortletController {
    /**
     * @description 过滤器门户部件状态
     * @type {IApiFilterPortletState}
     * @memberof IApiFilterPortletController
     */
    state: IApiFilterPortletState;
    /**
     * @description 过滤器条件恢复默认值（返回true代表执行成功）
     * @returns {*}  {Promise<boolean>}
     * @memberof IApiFilterPortletController
     */
    resetFilter(): Promise<boolean>;
    /**
     * @description 过滤器执行搜索（返回true代表执行成功）
     * @returns {*}  {Promise<boolean>}
     * @memberof IApiFilterPortletController
     */
    search(): Promise<boolean>;
    /**
     * @description 高亮显示受影响的部件
     * @returns {*}  {Promise<void>}
     * @memberof IApiFilterPortletController
     */
    showEffectiveCtrl(): Promise<void>;
}
//# sourceMappingURL=i-api-filter-portlet.controller.d.ts.map