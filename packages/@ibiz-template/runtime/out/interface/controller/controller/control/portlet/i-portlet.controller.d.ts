import { IPortletState } from '../../../state';
import { IDashboardController } from '../i-dashboard.controller';
import { IPortletContainerController } from './i-portlet-container.controller';
/**
 * 门户部件接口
 * @author lxm
 * @date 2023-07-07 04:03:19
 * @export
 * @interface IPortletController
 */
export interface IPortletController {
    /**
     * 数据看板控制器
     * @author lxm
     * @date 2023-05-24 07:12:19
     * @type {IFormController}
     */
    dashboard: IDashboardController;
    /**
     * 父容器控制器(除了根成员都存在)
     * @author lxm
     * @date 2023-05-24 07:12:28
     * @type {IPortletContainerController}
     */
    parent?: IPortletContainerController;
    /**
     * 成员状态
     * @author lxm
     * @date 2023-05-29 07:38:39
     * @type {IPortletState}
     */
    state: IPortletState;
    /**
     * 视图参数
     *
     * @type {IParams}
     * @memberof IPortletController
     */
    params: IParams;
    /**
     * 门户配置
     *
     * @type {IData}
     * @memberof IPortletController
     */
    config: IData;
    /**
     * 原始模型
     *
     * @author tony001
     * @date 2024-07-26 13:07:23
     * @type {IModel}
     */
    model: IModel;
    /**
     * 数据变更通知
     * @author lxm
     * @date 2023-08-03 09:53:20
     * @param {IData} data
     * @return {*}  {Promise<void>}
     */
    dataChangeNotify(data: IData): Promise<void>;
    /**
     * 销毁方法
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-22 16:55:47
     */
    destroyed(): Promise<void>;
    /**
     * 设置自定义配置
     *
     * @param {IData} config
     * @memberof IPortletController
     */
    setConfig(config: IData): void;
    /**
     * 重置自定义配置
     *
     * @memberof IPortletController
     */
    resetConfig(): void;
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-07-23 22:07:14
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 高亮
     *
     * @author zzq
     * @date 2024-07-23 22:07:14
     * @return {*}  {void}
     */
    hightLight(): void;
}
//# sourceMappingURL=i-portlet.controller.d.ts.map