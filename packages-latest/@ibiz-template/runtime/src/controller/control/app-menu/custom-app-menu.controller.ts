/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAppMenu, IAppUtil } from '@ibiz/model-core';
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
export class CustomAppMenuController implements ICustomDesign {
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
  customModelData: IData[] = [];

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
  type: 'public' | 'personal' | 'data' = 'personal';

  /**
   *所属数据类型（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
   *
   * @author tony001
   * @date 2024-05-09 17:05:55
   * @type {string}
   */
  ownerType: string = '';

  /**
   *所属数据标识（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
   *
   * @author tony001
   * @date 2024-05-09 17:05:10
   * @type {string}
   */
  ownerId: string = '';

  /**
   * Creates an instance of CustomAppMenuController.
   * @author tony001
   * @date 2024-05-09 15:05:33
   * @param {IAppMenu} model
   * @param {AppMenuController} menu
   */
  constructor(
    protected model: IAppMenu,
    protected menu: AppMenuController,
  ) {
    this.context = menu.context;
    this.params = menu.params;
    this.init();
  }

  /**
   * 初始化
   *
   * @author tony001
   * @date 2024-05-09 15:05:40
   * @private
   */
  private init(): void {
    // 默认走个人
    this.type = 'personal';
    this.ownerId = this.context.srfpersonid;
    // 初始化服务
    const app = ibiz.hub.getApp(this.context.srfappid);
    const menuUtil = app.getAppUtil('DYNAMENU', 'CUSTOM') as IAppUtil;
    if (menuUtil) {
      this.util = new UtilService(menuUtil);
    } else {
      this.config = new ConfigService(
        this.model.appId!,
        'menu',
        `menu_${(this.menu.view as IData).name.toLowerCase()}_${this.model.codeName?.toLowerCase()}`,
      );
    }
  }

  /**
   * 获取资源标识（仅用于功能组件服务）
   *
   * @author tony001
   * @date 2024-05-09 16:05:48
   * @private
   * @return {*}  {string}
   */
  private getResourceTag(): string {
    const base = `${this.context.srfappid}_menu_${(
      this.menu.view as IData
    ).name.toLowerCase()}_${this.model.codeName?.toLowerCase()}`;
    switch (this.type) {
      case 'personal':
        return `${base}_${this.context.srfpersonid}`;
      case 'data':
        return `${base}_${this.ownerType}_${this.ownerId}`;
      default:
        return base;
    }
  }

  /**
   * 加载自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:57
   * @return {*}  {Promise<IData>}
   */
  async loadCustomModelData(): Promise<IData[]> {
    let res;
    if (this.util) {
      res = await this.util!.load(
        this.getResourceTag(),
        this.context,
        this.params,
      );
    } else {
      res = await this.config!.load();
    }
    if (res && res.model) {
      const result = JSON.parse(res.model);
      return result;
    }
    return [];
  }

  /**
   * 重置自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:14
   * @return {*}  {Promise<IData>}
   */
  async resetCustomModelData(): Promise<IData> {
    return this.saveCustomModelData([]);
  }

  /**
   * 保存自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:51
   * @param {IData[]} model
   * @param {IData} [config={}]
   * @return {*}  {Promise<IData>}
   */
  async saveCustomModelData(
    model: IData[],
    config: IData = {},
  ): Promise<IData> {
    const data: IData = {
      model: JSON.stringify(model),
    };
    if (this.util) {
      await this.util!.save(
        this.getResourceTag(),
        this.context,
        {
          ...this.params,
          type: this.type,
          ownerType: this.ownerType,
          ownerId: this.ownerId,
          modelId: this.model.id,
        },
        data,
      );
    } else {
      await this.config!.save(data);
    }
    return model;
  }
}
