export type DefaultValueOrigins = {
    data: IData;
    context: IContext;
    params: IParams;
};
export type DefaultValueOpts = {
    /**
     * 属性名称
     * @author lxm
     * @date 2023-09-18 03:47:18
     * @type {string}
     */
    name: string;
    /**
     * 默认值类型
     * @author lxm
     * @date 2023-09-18 03:47:24
     * @type {string}
     */
    valueType?: string;
    /**
     * 默认值
     * @author lxm
     * @date 2023-09-18 03:47:31
     * @type {string}
     */
    defaultValue?: string;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-09-18 03:47:36
     * @type {string}
     */
    valueFormat?: string;
};
export declare function getDefaultValue(opts: DefaultValueOpts, origins: DefaultValueOrigins): unknown;
//# sourceMappingURL=value-default.d.ts.map