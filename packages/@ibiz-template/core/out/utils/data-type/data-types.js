/**
 * 数据类型转换识别工具类
 * @author lxm
 * @date 2023-08-25 04:33:49
 * @export
 * @class DataTypes
 */
export class DataTypes {
    /**
     * 是否是数值类型
     * @author lxm
     * @date 2023-08-25 04:53:30
     * @static
     * @param {number} dataType 数据类型（数值）
     * @return {*}  {boolean}
     */
    static isNumber(dataType) {
        const numberTypes = [
            'BIGINT',
            'BINARY',
            'DECIMAL',
            'FLOAT',
            'INT',
            'MONEY',
            'NUMERIC',
            'REAL',
            'SMALLINT',
            'SMALLMONEY',
            'TINYINT',
            'VARBINARY',
        ];
        return numberTypes.includes(this.toString(dataType));
    }
    /**
     * 是否是日期类型数据
     *
     * @static
     * @param {number} dataType
     * @return {*}
     * @memberof DataTypes
     */
    static isDate(dataType) {
        const dateTypes = ['DATETIME', 'SMALLDATETIME', 'DATE', 'TIME'];
        return dateTypes.includes(this.toString(dataType));
    }
    /**
     * 获取字符串数据类型
     * @author lxm
     * @date 2023-08-25 04:53:58
     * @static
     * @param {number} dataType 数据类型（数值）
     * @return {*}  {string}
     */
    static toString(dataType) {
        return this.typeMap[dataType];
    }
}
/**
 * 数字类型映射字符串类型
 * @author lxm
 * @date 2023-08-25 04:49:52
 * @static
 * @type {{ [p: number]: string }}
 */
DataTypes.typeMap = {
    0: 'UNKNOWN',
    1: 'BIGINT',
    2: 'BINARY',
    3: 'BIT',
    4: 'CHAR',
    5: 'DATETIME',
    6: 'DECIMAL',
    7: 'FLOAT',
    8: 'IMAGE',
    9: 'INT',
    10: 'MONEY',
    11: 'NCHAR',
    12: 'NTEXT',
    13: 'NVARCHAR',
    14: 'NUMERIC',
    15: 'REAL',
    16: 'SMALLDATETIME',
    17: 'SMALLINT',
    18: 'SMALLMONEY',
    19: 'SQL_VARIANT',
    20: 'SYSNAME',
    21: 'TEXT',
    22: 'TIMESTAMP',
    23: 'TINYINT',
    24: 'VARBINARY',
    25: 'VARCHAR',
    26: 'UNIQUEIDENTIFIER',
    27: 'DATE', // 纯日期型
    28: 'TIME', // 纯时间
    29: 'BIGDECIMAL', // 大数值
};
