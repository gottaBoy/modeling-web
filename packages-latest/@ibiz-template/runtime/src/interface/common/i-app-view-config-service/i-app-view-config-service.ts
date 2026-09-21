/**
 * 视图配置
 * @author lxm
 * @date 2023-07-03 07:00:43
 * @export
 * @interface IViewConfig
 */
export interface IViewConfig {
  /**
   * 唯一标识
   */
  id: string;
  /**
   * 应用视图所归属的应用 id
   *
   * @author chitanda
   * @date 2023-12-21 16:12:11
   * @type {string}
   */
  appId: string;
  /**
   * 代码标识
   */
  codeName: string;
  /**
   * 打开方式
   */
  openMode: string;
  /**
   * 视图类型
   */
  viewType: string;
  /**
   * 宽度
   */
  width?: number;
  /**
   * 高度
   */
  height?: number;
  /**
   * 应用实体id
   */
  appDataEntityId?: string;
  /**
   * 是否是重定向视图
   */
  redirectView?: boolean;
  /**
   * modal参数
   */
  modalOption?: IData;
}

export interface IAppViewConfigService {
  /**
   * 是否存在视图 config
   *
   * @author chitanda
   * @date 2023-10-20 11:10:55
   * @param {string} key
   * @return {*}  {boolean}
   */
  has(key: string): boolean;

  /**
   * 添加视图 config
   * @author lxm
   * @date 2023-07-03 07:04:29
   * @param {string} id
   * @param {IViewConfig} viewConfig
   */
  set(id: string, viewConfig: IViewConfig): void;

  /**
   * 获取视图 config，不存在会请求视图模型并设置，不存在会抛出异常
   * @author lxm
   * @date 2023-07-03 07:05:13
   * @param {string} key
   * @return {*}  {Promise<IViewConfig>}
   */
  get(key: string): Promise<IViewConfig>;

  /**
   * 同步获取视图 config，只能获取已经存在的视图 config，不存在返回 null
   *
   * @author chitanda
   * @date 2023-10-19 14:10:52
   * @param {string} key
   * @return {*}  {(IViewConfig | null)}
   */
  getSync(key: string): IViewConfig | null;
}
