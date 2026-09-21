/* eslint-disable no-shadow */
import qs from 'qs';
import { clone } from 'ramda';
import { ValueOP } from '../../constant';
export var DataType;
(function (DataType) {
    /**
     * 字符串
     */
    DataType["STRING"] = "STRING";
    /**
     * 数字
     */
    DataType["NUMBER"] = "NUMBER";
    /**
     * 日期
     */
    DataType["DATE"] = "DATE";
    /**
     * 代码表
     */
    DataType["CODELIST"] = "CODELIST";
    /**
     * 外键值
     */
    DataType["FOREIGNKEY"] = "FOREIGNKEY";
    /**
     * 子数据
     */
    DataType["CHILD"] = "CHILD";
})(DataType || (DataType = {}));
/**
 * JsonSchema工具类
 *
 * @author tony001
 * @date 2024-07-25 00:07:22
 * @export
 * @class JsonSchemaUtil
 */
export class JsonSchemaUtil {
    constructor() {
        /**
         * 值操作数组
         *
         * @author tony001
         * @date 2024-07-25 00:07:57
         * @private
         */
        this.valueOPArray = [
            { valueOP: ValueOP.EQ, label: '等于', sqlOP: '=' },
            { valueOP: ValueOP.NOT_EQ, label: '不等于', sqlOP: '<>' },
            { valueOP: ValueOP.GT, label: '大于', sqlOP: '>' },
            { valueOP: ValueOP.GT_AND_EQ, label: '大于等于', sqlOP: '>=' },
            { valueOP: ValueOP.LT, label: '小于', sqlOP: '<' },
            { valueOP: ValueOP.LT_AND_EQ, label: '小于等于', sqlOP: '<=' },
            { valueOP: ValueOP.IS_NULL, label: '为空', sqlOP: 'IS NULL' },
            { valueOP: ValueOP.IS_NOT_NULL, label: '非空', sqlOP: 'IS NOT NULL' },
            { valueOP: ValueOP.IN, label: '属于', sqlOP: 'IN' },
            { valueOP: ValueOP.NOT_IN, label: '不属于', sqlOP: 'NOT IN' },
            { valueOP: ValueOP.LIKE, label: '文本包含', sqlOP: 'LIKE' },
            { valueOP: ValueOP.LIFT_LIKE, label: '文本左包含', sqlOP: '' },
            { valueOP: ValueOP.RIGHT_LIKE, label: '文本右包含', sqlOP: '' },
            { valueOP: ValueOP.EXISTS, label: '存在', sqlOP: '' },
            { valueOP: ValueOP.NOT_EXISTS, label: '不存在', sqlOP: '' },
        ];
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
        this.DataTypeToOPs = {
            [DataType.STRING]: [
                ValueOP.EQ,
                ValueOP.NOT_EQ,
                ValueOP.IS_NULL,
                ValueOP.IS_NOT_NULL,
                ValueOP.USER_LIKE,
                ValueOP.LIKE,
                ValueOP.LIFT_LIKE,
                ValueOP.RIGHT_LIKE,
            ],
            [DataType.NUMBER]: [
                ValueOP.EQ,
                ValueOP.GT,
                ValueOP.GT_AND_EQ,
                ValueOP.LT,
                ValueOP.LT_AND_EQ,
                ValueOP.NOT_EQ,
                ValueOP.IS_NULL,
                ValueOP.IS_NOT_NULL,
                ValueOP.IN,
                ValueOP.NOT_IN,
            ],
            [DataType.DATE]: [
                ValueOP.EQ,
                ValueOP.GT,
                ValueOP.GT_AND_EQ,
                ValueOP.LT,
                ValueOP.LT_AND_EQ,
                ValueOP.NOT_EQ,
                ValueOP.IS_NULL,
                ValueOP.IS_NOT_NULL,
                ValueOP.IN,
                ValueOP.NOT_IN,
            ],
            [DataType.CODELIST]: [
                ValueOP.EQ,
                ValueOP.NOT_EQ,
                ValueOP.IS_NULL,
                ValueOP.IS_NOT_NULL,
                ValueOP.IN,
                ValueOP.NOT_IN,
            ],
            [DataType.FOREIGNKEY]: [
                ValueOP.EQ,
                ValueOP.NOT_EQ,
                ValueOP.IS_NULL,
                ValueOP.IS_NOT_NULL,
                ValueOP.IN,
                ValueOP.NOT_IN,
            ],
            [DataType.CHILD]: [ValueOP.EXISTS, ValueOP.NOT_EXISTS],
        };
        /**
         * 排除操作符
         *
         * @author tony001
         * @date 2024-07-25 17:07:51
         * @private
         * @type {string[]}
         */
        this.excludeOPs = [
            ValueOP.IS_NULL,
            ValueOP.IS_NOT_NULL,
            ValueOP.EXISTS,
            ValueOP.NOT_EXISTS,
        ];
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
        this.DataTypeToEditor = {
            [DataType.STRING]: {
                appId: '',
                editorType: 'TEXTBOX',
            },
            [DataType.NUMBER]: {
                appId: '',
                editorType: 'NUMBER',
            },
            [DataType.DATE]: {
                appId: '',
                editorType: 'DATEPICKEREX',
                dateTimeFormat: 'YYYY-MM-DD',
            },
            [DataType.CODELIST]: {
                appId: '',
                valueType: 'SIMPLE',
                editorType: 'MDROPDOWNLIST',
                appCodeListId: '',
                editorParams: {
                    overflowMode: 'ellipsis',
                },
            },
            [DataType.FOREIGNKEY]: {
                appId: '',
                editorType: 'ADDRESSPICKUP',
                appDEDataSetId: 'fetchdefault',
                objectIdField: 'srfkey',
                objectNameField: 'srfmajortext',
                valueType: 'OBJECTS',
                editorParams: {
                    overflowMode: 'ellipsis',
                },
            },
            [DataType.CHILD]: undefined,
        };
    }
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
    async getEntitySchemaFields(entityId, context, params = {}) {
        var _a;
        const result = [];
        const strParams = qs.stringify(params);
        const app = ibiz.hub.getApp(context.srfappid);
        const entity = await ibiz.hub.getAppDataEntity(entityId, context.srfappid);
        let url = `/jsonschema/${entity.name}`;
        if (entity.dynaSysMode === 0 && ibiz.appData) {
            url += `?dynamodeltag=${ibiz.appData.dynamodeltag}${strParams ? `&${strParams}` : ''}`;
        }
        else {
            url += `${strParams ? `?${strParams}` : ''}`;
        }
        const res = await app.net.get(url);
        const { data } = res;
        if (!data.properties) {
            return result;
        }
        const { properties } = data;
        if (!(Object.keys(properties).length > 0)) {
            return result;
        }
        for (let i = 0; i < Object.keys(properties).length; i++) {
            const key = Object.keys(properties)[i];
            const item = properties[key];
            let type = DataType.STRING;
            const originalType = item.type;
            // 子数据类型属性和扩展属性暂忽略
            if (originalType === 'array' || item.extension) {
                continue;
            }
            switch (originalType) {
                case 'string':
                    if (item.$ref) {
                        type = DataType.FOREIGNKEY;
                    }
                    if (item.enumSource) {
                        type = DataType.CODELIST;
                    }
                    if (item.format === 'date-time') {
                        type = DataType.DATE;
                    }
                    break;
                case 'integer':
                case 'number':
                    type = DataType.NUMBER;
                    if (item.enumSource) {
                        type = DataType.CODELIST;
                    }
                    break;
                default:
                    if (item.$ref) {
                        type = DataType.FOREIGNKEY;
                    }
                    break;
            }
            result.push({
                type,
                originalType,
                appDEFieldId: key,
                caption: item.description,
                appCodeListId: item.enumSource,
                appDataEntityId: (_a = item.$ref) === null || _a === void 0 ? void 0 : _a.split('.')[0],
            });
        }
        return result;
    }
    /**
     * 通过数据类型获取可使用操作标识集合
     *
     * @author tony001
     * @date 2024-07-25 16:07:24
     * @param {string} dataType
     * @return {*}  {IData[]}
     */
    getValueOPsByDataType(dataType) {
        let result = [];
        result = this.valueOPArray.filter(mode => this.DataTypeToOPs[dataType].includes(mode.valueOP));
        return result;
    }
    /**
     * 获取仿真编辑器
     *
     * @author tony001
     * @date 2024-07-25 17:07:11
     * @param {IContext} context
     * @param {IData} item
     * @return {*}  {Promise<IData>}
     */
    getMockEditor(context, item, valueOP) {
        // 排除类型操作符无编辑器
        if (valueOP && this.excludeOPs.includes(valueOP))
            return;
        const baseMockEditor = clone(this.DataTypeToEditor[item.type]);
        if (!baseMockEditor)
            return;
        baseMockEditor.appId = context.srfappid;
        if (item.type === DataType.CODELIST) {
            baseMockEditor.appCodeListId = item.appCodeListId;
        }
        if (item.type === DataType.FOREIGNKEY) {
            baseMockEditor.appDataEntityId = item.appDataEntityId;
        }
        // 后续特殊处理放这儿
        return baseMockEditor;
    }
    /**
     * 排序属性
     *
     * @author zhanghengfeng
     * @date 2024-07-30 19:07:28
     * @param {[string, IData][]} data
     * @param {('asc' | 'desc')} [order='asc']
     * @return {*}  {[string, IData][]}
     */
    sortProperties(data, order = 'asc') {
        data.sort((a, b) => {
            const obj = order === 'asc' ? a[1] : b[1];
            const obj2 = order === 'asc' ? b[1] : a[1];
            if (obj.extension !== obj2.extension) {
                return (obj.extension || 0) - (obj2.extension || 0);
            }
            return (obj.description || '').localeCompare(obj2.description || '');
        });
        return data;
    }
}
