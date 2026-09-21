/**
 * 时间范围接口
 *
 * @author tony001
 * @date 2024-07-07 14:07:43
 * @export
 * @interface AppBIPeriodData
 */
export interface AppBIPeriodData {
    /**
     * 属性名
     *
     * @author tony001
     * @date 2024-07-07 14:07:59
     * @type {string}
     */
    field: string;
    /**
     * 单位
     *
     * @author tony001
     * @date 2024-07-07 14:07:08
     * @type {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')}
     */
    unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
    /**
     * 类型
     * STATIC:需指定开始及结束时间（以秒为单位）
     * DYNAMIC：相对于当前时间的前后偏移,（以当前选择的单位为单位）
     *
     * @author tony001
     * @date 2024-07-07 14:07:02
     * @type {('STATIC' | 'DYNAMIC')}
     */
    type: 'STATIC' | 'DYNAMIC';
    /**
     * 起始时间
     * 静态类型以秒为单位，动态类型以选择的单位为单位
     *
     * @author tony001
     * @date 2024-07-07 14:07:15
     * @type {number}
     */
    start: number;
    /**
     * 结束时间
     * 静态类型以秒为单位，动态类型以选择的单位为单位
     *
     * @author tony001
     * @date 2024-07-07 14:07:21
     * @type {number}
     */
    end: number;
    /**
     * 环比次数，默认为1
     *
     * @author tony001
     * @date 2024-07-07 15:07:03
     * @type {number}
     */
    pop: number;
    /**
     * 同比次数，默认为0
     *
     * @author tony001
     * @date 2024-07-07 15:07:37
     * @type {number}
     */
    yoy: number;
}
