/**
 * 数据类型转换识别工具类
 * @author lxm
 * @date 2023-08-25 04:33:49
 * @export
 * @class DataTypes
 */
export declare class DataTypes {
    /**
     * 数字类型映射字符串类型
     * @author lxm
     * @date 2023-08-25 04:49:52
     * @static
     * @type {{ [p: number]: string }}
     */
    static readonly typeMap: {
        [p: number]: string;
    };
    /**
     * 是否是数值类型
     * @author lxm
     * @date 2023-08-25 04:53:30
     * @static
     * @param {number} dataType 数据类型（数值）
     * @return {*}  {boolean}
     */
    static isNumber(dataType: number): boolean;
    /**
     * 是否是日期类型数据
     *
     * @static
     * @param {number} dataType
     * @return {*}
     * @memberof DataTypes
     */
    static isDate(dataType: number): boolean;
    /**
     * 获取字符串数据类型
     * @author lxm
     * @date 2023-08-25 04:53:58
     * @static
     * @param {number} dataType 数据类型（数值）
     * @return {*}  {string}
     */
    static toString(dataType: number): string;
}
//# sourceMappingURL=data-types.d.ts.map