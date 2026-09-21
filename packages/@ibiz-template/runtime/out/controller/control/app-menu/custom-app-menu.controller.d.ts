import { IAppMenu } from '@ibiz/model-core';
import { ConfigService, UtilService } from '../../../service';
import { AppMenuController } from './app-menu.controller';
import { ICustomDesign } from '../../../interface';
/**
 * 自定义菜单控制器
 *
 * @author tony001
 * @date 2024-05-09 15:05:50
 * @export
 * @class CustomAppMenuController
 */
export declare class CustomAppMenuController implements ICustomDesign {
    protected model: IAppMenu;
    protected menu: AppMenuController;
    /**
     * 应用配置存储服务
     *
     * @author tony001
     * @date 2024-05-09 15:05:49
     * @type {(ConfigService | undefined)}
     */
    config: ConfigService | undefined;
    /**
     *  自定义模型数据
     *
     * @author tony001
     * @date 2024-07-26 16:07:05
     * @type {IData[]}
     */
    customModelData: IData[];
    /**
     * 应用功能组件服务
     *
     * @author tony001
     * @date 2024-05-09 15:05:33
     * @type {(UtilService | undefined)}
     */
    util: UtilService | undefined;
    /**
     * 上下文对象
     *
     * @author tony001
     * @date 2024-05-09 15:05:43
     * @type {IContext}
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2024-05-09 15:05:54
     * @type {IParams}
     */
    params: IParams;
    /**
     *自定义定制范围类型（public：公开，personal：个人，data：数据，默认是按照个人区分，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-05-09 17:05:43
     * @type {('public' | 'personal' | 'data')}
     */
    type: 'public' | 'personal' | 'data';
    /**
     *所属数据类型（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-05-09 17:05:55
     * @type {string}
     */
    ownerType: string;
    /**
     *所属数据标识（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
     *
     * @author tony001
     * @date 2024-05-09 17:05:10
     * @type {string}
     */
    ownerId: string;
    /**
     * Creates an instance of CustomAppMenuController.
     * @author tony001
     * @date 2024-05-09 15:05:33
     * @param {IAppMenu} model
     * @param {AppMenuController} menu
     */
    constructor(model: IAppMenu, menu: AppMenuController);
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-05-09 15:05:40
     * @private
     */
    private init;
    /**
     * 获取资源标识（仅用于功能组件服务）
     *
     * @author tony001
     * @date 2024-05-09 16:05:48
     * @private
     * @return {*}  {string}
     */
    private getResourceTag;
    /**
     * 加载自定义模型
     *
     * @author tony001
     * @date 2024-05-09 17:05:57
     * @return {*}  {Promise<IData>}
     */
    loadCustomModelData(): Promise<IData[]>;
    /**
     * 重置自定义模型
     *
     * @author tony001
     * @date 2024-05-09 17:05:14
     * @return {*}  {Promise<IData>}
     */
    resetCustomModelData(): Promise<IData>;
    /**
     * 保存自定义模型
     *
     * @author tony001
     * @date 2024-05-09 17:05:51
     * @param {IData[]} model
     * @param {IData} [config={}]
     * @return {*}  {Promise<IData>}
     */
    saveCustomModelData(model: IData[], config?: IData): Promise<IData>;
}
//# sourceMappingURL=custom-app-menu.controller.d.ts.map