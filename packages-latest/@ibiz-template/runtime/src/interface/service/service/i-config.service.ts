export interface IConfigService {
  /**
   * 保存配置
   *
   * @author chitanda
   * @date 2023-09-22 10:09:05
   * @param {IData} data
   * @return {*}  {Promise<boolean>}
   */
  save(data: IData): Promise<boolean>;

  /**
   * 重置配置
   *
   * @author tony001
   * @date 2024-12-27 18:12:07
   * @return {*}  {Promise<boolean>}
   */
  reset(): Promise<boolean>;

  /**
   * 加载配置
   *
   * @author chitanda
   * @date 2023-09-22 10:09:10
   * @return {*}  {Promise<IData>}
   */
  load(): Promise<IData>;
}
