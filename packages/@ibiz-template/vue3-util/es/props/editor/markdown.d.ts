/**
 * 获取MARKDOWN的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getMarkDownProps<C>(): {
    data: {
        type: ObjectConstructor;
        required: boolean;
    };
    controller: {
        type: ObjectConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        required: boolean;
    };
    value: StringConstructor;
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
};
/**
 * 获取表格MARKDOWN的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridMarkDownProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    data: {
        type: ObjectConstructor;
        required: boolean;
    };
    controller: {
        type: ObjectConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        required: boolean;
    };
    value: StringConstructor;
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
};
//# sourceMappingURL=markdown.d.ts.map