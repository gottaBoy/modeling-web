/**
 * 动态设计通用接口
 *
 * @author tony001
 * @date 2024-05-09 17:05:25
 * @export
 * @interface ICustomDesign
 */
export interface ICustomDesign {
  /**
   * 自定义模型
   *
   * @author tony001
   * @date 2024-07-26 16:07:12
   * @type {IData[]}
   */
  customModelData: IData[];
  /**
   * 加载自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:49
   * @return {*}  {Promise<IData>}
   */
  loadCustomModelData(): Promise<IData>;

  /**
   * 重置自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:09
   * @return {*}  {Promise<IData>}
   */
  resetCustomModelData(): Promise<IData>;

  /**
   * 保存自定义模型
   *
   * @author tony001
   * @date 2024-05-09 17:05:05
   * @param {IData[]} model 布局参数
   * @param {IData} [config] 配置参数
   * @param {IData} [filter] 过滤参数
   * @return {*}  {Promise<IData>}
   */
  saveCustomModelData(
    model: IData[],
    config?: IData,
    filter?: IData,
  ): Promise<IData>;
}
