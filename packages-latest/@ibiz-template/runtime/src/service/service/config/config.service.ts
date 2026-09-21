import { IAppService, IConfigService } from '../../../interface';

/**
 * 应用配置存储服务
 *
 * @author chitanda
 * @date 2023-09-22 10:09:05
 * @export
 * @class ConfigService
 */
export class ConfigService implements IConfigService {
  private app: IAppService;

  /**
   * Creates an instance of ConfigService.
   *
   * @author chitanda
   * @date 2023-09-22 10:09:16
   * @param {string} appId 应用标识
   * @param {string} folder 定义文件夹
   * @param {string} tag 存储标识
   */
  constructor(
    protected appId: string,
    protected folder: string,
    protected tag: string,
  ) {
    this.app = ibiz.hub.getApp(appId);
  }

  /**
   * 保存配置
   *
   * @author chitanda
   * @date 2023-09-22 10:09:05
   * @param {IData} data
   * @return {*}  {Promise<boolean>}
   */
  async save(data: IData): Promise<boolean> {
    const res = await this.app.net.put(
      `/configs/${this.folder}/${this.tag}`,
      data,
    );
    if (res.ok) {
      return res.data as unknown as boolean;
    }
    return false;
  }

  /**
   * 重置配置
   *
   * @author tony001
   * @date 2024-12-27 18:12:54
   * @return {*}  {Promise<boolean>}
   */
  async reset(): Promise<boolean> {
    const response = await this.app.net.request(
      `/configs/${this.folder}/${this.tag}`,
      {
        method: 'put',
        data: null,
      },
    );
    return response.status === 200;
  }

  /**
   * 加载配置
   *
   * @author chitanda
   * @date 2023-09-22 10:09:10
   * @return {*}  {Promise<IData>}
   */
  async load(): Promise<IData> {
    const res = await this.app.net.get(`/configs/${this.folder}/${this.tag}`);
    if (res.ok) {
      return res.data || {};
    }
    return {};
  }
}
