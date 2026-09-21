import { IDashboard } from '@ibiz/model-core';
import { ConfigService, UtilService } from '../../../service';
import { IMobCustomDesign } from '../../../interface';
import { DashboardController } from './dashboard.controller';
export declare class MobCustomDashboardController implements IMobCustomDesign {
    model: IDashboard;
    dashboard: DashboardController;
    /**
     * @description 应用配置存储服务
     * @type {(ConfigService | undefined)}
     * @memberof MobCustomDashboardController
     */
    config: ConfigService | undefined;
    /**
     * @description 应用功能组件服务
     * @type {(UtilService | undefined)}
     * @memberof MobCustomDashboardController
     */
    util: UtilService | undefined;
    /**
     * @description 上下文对象
     * @type {IContext}
     * @memberof MobCustomDashboardController
     */
    context: IContext;
    /**
     * @description 视图参数
     * @type {IParams}
     * @memberof MobCustomDashboardController
     */
    params: IParams;
    /**
     * @description 门户部件列表
     * @type {(string[] | undefined)}
     * @memberof MobCustomDashboardController
     */
    portlets: string[] | undefined;
    /**
     * @description 忽略的门户部件类型列表
     * @type {string[]}
     * @memberof MobCustomDashboardController
     */
    ignoreType: string[];
    /**
     * @description 自定义定制范围类型（public：公开，personal：个人，data：数据，默认是按照个人区分，配置了应用功能组件才生效）
     * @type {('public' | 'personal' | 'data')}
     * @memberof MobCustomDashboardController
     */
    type: 'public' | 'personal' | 'data';
    /**
     * @description 所属数据类型（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     * @type {string}
     * @memberof MobCustomDashboardController
     */
    ownerType: string;
    /**
     * @description 所属数据标识（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     * @type {string}
     * @memberof MobCustomDashboardController
     */
    ownerId: string;
    /**
     * @description 多数据模式，启用时请求参数从上下文中获取srfdynadashboardid的值
     * @type {boolean}
     * @memberof MobCustomDashboardController
     */
    multiMode: boolean;
    constructor(model: IDashboard, dashboard: DashboardController);
    /**
     * @description 初始化
     * @private
     * @param {IData} controlParams
     * @memberof MobCustomDashboardController
     */
    private init;
    /**
     * @description 获取资源标识（仅用于功能组件服务）
     * @private
     * @returns {*}  {string}
     * @memberof MobCustomDashboardController
     */
    private getResourceTag;
    /**
     * @description 更新门户部件状态
     * @memberof MobCustomDashboardController
     */
    updatePortletState(): void;
    /**
     * @description 加载门户部件数据
     * @returns {*}  {Promise<void>}
     * @memberof MobCustomDashboardController
     */
    load(): Promise<void>;
    /**
     * @description 保存门户部件数据
     * @param {string[]} portlets
     * @returns {*}  {Promise<void>}
     * @memberof MobCustomDashboardController
     */
    save(portlets: string[]): Promise<void>;
}
//# sourceMappingURL=mob-custom-dashboard.controller.d.ts.map