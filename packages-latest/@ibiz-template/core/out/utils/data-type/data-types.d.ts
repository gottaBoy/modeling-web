/**
 * @description 数据类型转换识别工具类
 * @export
 * @class DataTypes
 */
export declare class DataTypes {
    /**
     * @description 数字类型映射字符串类型
     * @static
     * @type {{ [p: number]: string }}
     * @memberof DataTypes
     */
    static readonly typeMap: {
        [p: number]: string;
    };
    /**
     * @description 是否是数值类型
     * @static
     * @param {number} dataType
     * @returns {*}  {boolean}
     * @memberof DataTypes
     */
    static isNumber(dataType: number): boolean;
    /**
     * @description 是否是日期类型数据
     * @static
     * @param {number} dataType
     * @returns {*}  {boolean}
     * @memberof DataTypes
     */
    static isDate(dataType: number): boolean;
    /**
     * @description 获取字符串数据类型
     * @static
     * @param {number} dataType
     * @returns {*}  {string}
     * @memberof DataTypes
     */
    static toString(dataType: number): string;
}
//# sourceMappingURL=data-types.d.ts.map