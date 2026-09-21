import { ValueOP } from '../../../constant';

export interface IJsonSchemaUtil {
  /**
   * 获取jsonschema属性数据
   *
   * @author tony001
   * @date 2024-07-25 00:07:33
   * @param {string} entityId
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {Promise<IData[]>}
   */
  getEntitySchemaFields(
    entityId: string,
    context: IContext,
    params: IParams,
  ): Promise<IData[]>;

  /**
   * 通过数据类型获取可使用操作标识集合
   *
   * @author tony001
   * @date 2024-07-25 17:07:42
   * @param {string} dataType
   * @return {*}  {IData[]}
   */
  getValueOPsByDataType(dataType: string): IData[];

  /**
   * 获取仿真编辑器
   *
   * @author tony001
   * @date 2024-07-25 17:07:31
   * @param {IContext} context
   * @param {IData} item
   * @param {ValueOP} [valueOP]
   * @return {*}  {(IData | undefined)}
   */
  getMockEditor(
    context: IContext,
    item: IData,
    valueOP?: ValueOP,
  ): IData | undefined;
}
