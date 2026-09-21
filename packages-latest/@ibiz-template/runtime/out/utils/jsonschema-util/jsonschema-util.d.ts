import { IJsonSchemaUtil } from '../../interface';
import { ValueOP } from '../../constant';
export declare enum DataType {
    /**
     * 字符串
     */
    'STRING' = "STRING",
    /**
     * 数字
     */
    'NUMBER' = "NUMBER",
    /**
     * 日期
     */
    'DATE' = "DATE",
    /**
     * 代码表
     */
    'CODELIST' = "CODELIST",
    /**
     * 外键值
     */
    'FOREIGNKEY' = "FOREIGNKEY",
    /**
     * 子数据
     */
    'CHILD' = "CHILD"
}
/**
 * JsonSchema工具类
 *
 * @author tony001
 * @date 2024-07-25 00:07:22
 * @export
 * @class JsonSchemaUtil
 */
export declare class JsonSchemaUtil implements IJsonSchemaUtil {
    /**
     * @description 获取值操作数组
     * @returns {*}  {IData[]}
     * @memberof JsonSchemaUtil
     */
    getValueOPArray(): IData[];
    /**
     * 数据类型映射操作符
     *
     * @author tony001
     * @date 2024-07-25 00:07:31
     * @private
     * @type {{
     *     [p: string]: ValueOP[];
     *   }}
     */
    private DataTypeToOPs;
    /**
     * 排除操作符
     *
     * @author tony001
     * @date 2024-07-25 17:07:51
     * @private
     * @type {string[]}
     */
    private excludeOPs;
    /**
     * 数据类型映射编辑器
     *
     * @author tony001
     * @date 2024-07-25 00:07:07
     * @private
     * @type {({
     *     [p: string]: IData| undefined;
     *   })}
     */
    private DataTypeToEditor;
    /**
     * 获取jsonschema属性数据
     *
     * @author tony001
     * @date 2024-07-25 00:07:49
     * @param {string} entityId
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IData[]>}
     */
    getEntitySchemaFields(entityId: string, context: IContext, params?: IParams): Promise<IData[]>;
    /**
     * 通过数据类型获取可使用操作标识集合
     *
     * @author tony001
     * @date 2024-07-25 16:07:24
     * @param {string} dataType
     * @return {*}  {IData[]}
     */
    getValueOPsByDataType(dataType: string): IData[];
    /**
     * 获取仿真编辑器
     *
     * @author tony001
     * @date 2024-07-25 17:07:11
     * @param {IContext} context
     * @param {IData} item
     * @return {*}  {Promise<IData>}
     */
    getMockEditor(context: IContext, item: IData, valueOP?: ValueOP): IData | undefined;
    /**
     * 排序属性
     *
     * @author zhanghengfeng
     * @date 2024-07-30 19:07:28
     * @param {[string, IData][]} data
     * @param {('asc' | 'desc')} [order='asc']
     * @return {*}  {[string, IData][]}
     */
    sortProperties(data: [string, IData][], order?: 'asc' | 'desc'): [string, IData][];
}
//# sourceMappingURL=jsonschema-util.d.ts.map