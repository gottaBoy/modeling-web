export type ValueExOptions = {
    /**
     * 值类型
     */
    valueType?: string | 'SIMPLE' | 'SIMPLES' | 'OBJECT' | 'OBJECTS';
    /**
     * 对象标识属性
     */
    objectIdField?: string;
    /**
     * 对象名称属性(显示文本)
     */
    objectNameField?: string;
    /**
     * 对象值属性
     */
    objectValueField?: string;
    /**
     * 多项值分隔符
     */
    valueSeparator?: string;
    /**
     * 多项文本分隔符
     */
    textSeparator?: string;
};
export declare class ValueExUtil {
    /**
     * 合并默认值
     * @author lxm
     * @date 2023-08-30 02:06:58
     * @static
     * @param {ValueExOptions} options
     * @return {*}  {ValueExOptions}
     */
    static mergeDefault(options: ValueExOptions): ValueExOptions;
    /**
     * 转成显示用的文本
     * @author lxm
     * @date 2023-08-30 01:55:38
     * @param {ValueExOptions} options
     * @param {unknown} value
     * @return {*}  {string}
     */
    static toText(options: ValueExOptions, value: unknown): string;
}
//# sourceMappingURL=value-ex.d.ts.map