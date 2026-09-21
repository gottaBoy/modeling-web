import { ISchemaField } from '../interface';
/**
 * 计算界面行为标识
 *
 * @export
 * @param {IData} item
 * @return {*}  {(string | undefined)}
 */
export declare function calcUIActionTag(item: IData): Promise<string | undefined>;
/**
 * 获取schema属性
 *
 * @export
 * @param {string} appDeId 应用实体
 * @param {string} appDEFieldId 应用实体属性
 * @param {ISchemaField[]} schemaFields schema属性集合
 * @return {*}  {(Promise<ISchemaField | undefined>)}
 */
export declare function getSchemaField(item: IData, schemaFields: ISchemaField[]): Promise<ISchemaField | undefined>;
