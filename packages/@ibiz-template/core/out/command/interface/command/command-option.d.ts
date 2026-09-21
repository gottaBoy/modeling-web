/**
 * 指令参数, 主要用于在指令呈现时的展示参数
 *
 * @author chitanda
 * @date 2022-06-28 17:06:47
 * @export
 * @interface ICommandOption
 */
export interface ICommandOption {
    readonly id: string;
    readonly title: string;
    readonly tooltip?: string;
    readonly description?: string;
    /**
     * 只支持 svg 图标
     *
     * @author chitanda
     * @date 2022-06-29 14:06:42
     * @type {string}
     */
    readonly icon?: string;
}
//# sourceMappingURL=command-option.d.ts.map