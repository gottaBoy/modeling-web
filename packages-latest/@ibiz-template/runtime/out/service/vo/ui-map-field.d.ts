/**
 * 界面映射字段信息
 *
 * @author lxm
 * @date 2022-10-18 14:10:24
 * @export
 * @class UIMapField
 */
export declare class UIMapField {
    /**
     * 界面字段名
     *
     * @author lxm
     * @date 2022-10-18 14:10:32
     * @type {string}
     */
    uiKey: string;
    /**
     * 映射数据字段名
     *
     * @author lxm
     * @date 2022-10-18 14:10:34
     * @type {string}
     */
    dataKey: string;
    /**
     * 数据类型
     * @author lxm
     * @date 2023-09-11 07:30:31
     * @type {number}
     */
    dataType?: number;
    /**
     * 是否存储到origin里面(默认false)
     *
     * @author lxm
     * @date 2022-10-18 14:10:24
     * @type {boolean}
     */
    isOriginField: boolean;
    /**
     * 当前项数据属性是否对应多个表单项
     *
     * @author tony001
     * @date 2025-01-14 14:01:29
     * @type {boolean}
     */
    isOneToMultiField: boolean;
    /**
     * 是否是请求需要的字段(默认true)
     *
     * @author lxm
     * @date 2022-10-18 14:10:44
     * @type {boolean}
     */
    isRequestNeed: boolean;
    constructor(uiKey: string, dataKey: string, opts?: {
        isOriginField?: boolean;
        dataType?: number;
        isOneToMultiField?: boolean;
    });
    /**
     * 值转换
     * @author lxm
     * @date 2023-09-14 06:45:44
     * @param {unknown} value 原值
     */
    convertVal(value: unknown): unknown;
}
//# sourceMappingURL=ui-map-field.d.ts.map