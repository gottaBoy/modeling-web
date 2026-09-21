import { ISchemaField } from '../interface';
/**
 * 校验控制器
 *
 * @export
 * @class BIVerifyController
 */
export declare class BIVerifyController {
    /**
     * 校验规则Map
     *
     * @private
     * @memberof BIVerifyController
     */
    private verifyMap;
    /**
     * 当前图表类型属性配置
     *
     * @private
     * @type {IData}
     * @memberof BIVerifyController
     */
    private config;
    /**
     * 当前Schema数据集
     *
     * @private
     * @type {Array<ISchemaField>}
     * @memberof BIVerifyController
     */
    private schemaFields;
    /**
     * Creates an instance of BIVerifyController.
     * @param {ISchemaField[]} schemaFields
     * @param {IData[]} config 传递的是配置里的data.details
     * @memberof BIVerifyController
     */
    constructor();
    /**
     * 初始化校验规则
     *
     * @private
     * @memberof BIVerifyController
     */
    private initVerifyMap;
    /**
     * 初始化schemaFields属性和图表配置
     *
     * @param {Array<ISchemaField>} schemaFields
     * @param {IData} [config={}]
     * @memberof BIVerifyController
     */
    init(schemaFields: Array<ISchemaField>, config?: IData): void;
    /**
     * 根据传递的标识校验错误
     *
     * @param {string} name
     * @param {unknown} value
     * @param {string[]} tags
     * @return {*}
     * @memberof BIVerifyController
     */
    verifyState(name: string, value: unknown, tags: string[], opts?: IData): IData;
    /**
     * 检查是否符合必填要求
     *
     * @private
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}
     * @memberof BIVerifyController
     */
    private checkRequire;
    /**
     * 检查是否达到最大选择数量
     *
     * @private
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}  {{
     *     ok: boolean;
     *     msg: string;
     *   }}
     * @memberof BIVerifyController
     */
    private checkLimit;
    /**
     * 校验拖入类型是否符合配置要求
     *
     * @private
     * @param {IData} args
     * @return {*}  {{
     *     ok: boolean;
     *     msg: string;
     *   }}
     * @memberof BIVerifyController
     */
    private checkTypeLimit;
    /**
     * 判断的当前项是否为日期项
     *
     * @private
     * @param {IData} item
     * @return {*}
     * @memberof BIVerifyController
     */
    private checkIsDate;
    /**
     * 检查是否允许拖入计算属性
     *
     * @private
     * @param {string} name
     * @param {unknown} _value
     * @param {ISchemaField[]} _schemaFields
     * @param {IData} _config
     * @param {IData} _opts
     * @memberof BIVerifyController
     */
    private checkEnableDragCalcField;
}
