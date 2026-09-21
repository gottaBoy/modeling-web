import { IDashboard } from '@ibiz/model-core';
import { ConfigService, UtilService } from '../../../service';
import { DashboardController } from './dashboard.controller';
import { ICustomDesign } from '../../../interface';
/**
 * 自定义数据看板部件控制器
 * @author lxm
 * @date 2023-07-07 03:27:29
 * @export
 * @class CustomDashboardController
 */
export declare class CustomDashboardController implements ICustomDesign {
    model: IDashboard;
    dashboard: DashboardController;
    /**
     * 自定义布局模型数据
     *
     * @author: zhujiamin
     * @Date: 2023-09-20 16:42:36
     */
    customModelData: IData[];
    /**
     * 动态设计水平列数
     *
     * @author: zhujiamin
     * @Date: 2023-09-20 16:43:39
     */
    layoutColNum: number;
    /**
     * 动态设计单元格高度，80px
     *
     * @author: zhujiamin
     * @Date: 2023-09-20 16:43:39
     */
    layoutRowH: number;
    /**
     * 门户配置
     *
     * @type {IData}
     * @memberof CustomDashboardController
     */
    portletConfig: IData;
    /**
     * 门户过滤器参数
     *
     * @author tony001
     * @date 2024-07-26 21:07:22
     * @type {IData}
     */
    portletFilter: IData;
    /**
     * 应用配置存储服务
     *
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-22 18:07:42
     */
    config: ConfigService | undefined;
    /**
     * 应用功能组件服务
     *
     * @author tony001
     * @date 2024-04-24 14:04:46
     * @type {UtilService}
     */
    util: UtilService | undefined;
    /**
     * 上下文对象
     *
     * @author tony001
     * @date 2024-04-24 14:04:35
     * @type {IContext}
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2024-04-24 14:04:42
     * @type {IParams}
     */
    params: IParams;
    /**
     * 自定义定制范围类型（public：公开，personal：个人，data：数据，默认是按照个人区分，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-04-24 19:04:47
     * @type {('public' | 'personal' | 'data')}
     */
    type: 'public' | 'personal' | 'data';
    /**
     * 所属数据类型（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-04-24 19:04:06
     * @type {string}
     */
    ownerType: string;
    /**
     * 所属数据标识（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-04-24 19:04:18
     * @type {string}
     */
    ownerId: string;
    /**
     * 多数据模式，启用时请求参数从上下文中获取srfdynadashboardid的值
     *
     * @author tony001
     * @date 2024-07-08 14:07:51
     * @type {boolean}
     */
    multiMode: boolean;
    /**
     * 展示设计按钮，启用定制默认会展示
     *
     * @author tony001
     * @date 2024-07-08 14:07:15
     * @type {boolean}
     */
    showDesignBtn: boolean;
    /**
     * Creates an instance of BaseController.
     * @author lxm
     * @date 2023-04-26 06:46:21
     * @param {CTX} ctx 跨组件上下文环境，内部机制不暴露
     */
    constructor(model: IDashboard, dashboard: DashboardController);
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-04-24 20:04:14
     * @private
     */
    private init;
    /**
     * 获取资源标识（仅用于功能组件服务）
     *
     * @author tony001
     * @date 2024-04-24 14:04:55
     * @private
     * @return {*}  {string}
     */
    private getResourceTag;
    /**
     * 加载自定义布局模型数据
     *
     * @author: zhujiamin
     * @Date: 2023-09-20 16:22:49
     */
    loadCustomModelData(): Promise<IData>;
    /**
     * 重置自定义布局模型
     *
     * @memberof CustomDashboardController
     */
    resetCustomModelData(): Promise<IData>;
    /**
     * 保存自定义布局模型数据
     *
     * @author tony001
     * @date 2024-07-26 16:07:30
     * @param {IData[]} model
     * @param {IData} [config={}]
     * @param {IData} [filter={}]
     * @return {*}  {Promise<IData>}
     */
    saveCustomModelData(model: IData[], config?: IData, filter?: IData): Promise<IData>;
}
//# sourceMappingURL=custom-dashboard.controller.d.ts.map