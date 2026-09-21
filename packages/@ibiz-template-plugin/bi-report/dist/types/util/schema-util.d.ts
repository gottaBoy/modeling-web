import { ISchemaField } from '../interface';
/**
 * 获取实体的jsonschema
 *
 * @export
 * @param {string} entityId 实体标识
 * @return {*}  {Promise<IData>}
 */
export declare function getSchemaByEntity(entityId: string): Promise<IData>;
/**
 * 根据jsonSchema模型计算出Schema属性
 *
 * @export
 * @param {IData} jsonSchema jsonSchema数据对象
 * @return {*}  {Promise<ISchemaField[]>}
 */
export declare function calcSchemaFieldBySchema(jsonSchema: IData): Promise<ISchemaField[]>;
