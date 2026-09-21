import { IApiJsonRepairOption, IApiJsonRepairResult, IApiJsonUtil } from '../../interface';
export declare class JsonUtil implements IApiJsonUtil {
    /**
     * @description json修复，用于提取大语言模型中的json数据
     * @param {string} value
     * @param {IApiJsonRepairOption} [options={}]
     * @returns {*}  {(IData | IData[] | string)}
     * @memberof JsonUtil
     */
    repairJson(value: string, options?: IApiJsonRepairOption): IData | IData[] | string;
    /**
     * @description 加载字符串中的JSON数据，直接返回json数据对象
     * @param {string} value
     * @param {IApiJsonRepairOption} [options={}]
     * @returns {*}  {(IData | IData[])}
     * @memberof JsonUtil
     */
    loads(value: string, options?: IApiJsonRepairOption): IData | IData[];
    /**
     * @description 判断给定的值是否为 JSON 对象
     * @param value
     * @returns boolean
     */
    isJsonObject(value: unknown): boolean;
    /**
     * @description 判断给定的值是否为 JSON 数组
     * @param value
     * @returns boolean
     */
    isJsonArray(value: unknown): boolean;
    /**
     * @description json修复，用于提取大语言模型中的json数据
     * @param {string} value
     * @param {IApiJsonRepairOption} [options={}]
     * @returns {*}  {IApiJsonRepairResult}
     * @memberof JsonUtil
     */
    parseJson(value: string, options?: IApiJsonRepairOption): IApiJsonRepairResult;
}
//# sourceMappingURL=json-util.d.ts.map