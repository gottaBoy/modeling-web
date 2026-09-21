/**
 * 获取代码编辑器的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getCodeProps<C>(): {
    value: StringConstructor;
    language: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
    };
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
    /**
     * 获取表格代码编辑器的props
     *
     * @author lxm
     * @date 2022-11-01 19:11:12
     * @export
     * @template C
     * @returns {*}
     */
    data: import("..").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
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
 * 获取表格代码编辑器的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridCodeProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    value: StringConstructor;
    language: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
    };
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
    /**
     * 获取表格代码编辑器的props
     *
     * @author lxm
     * @date 2022-11-01 19:11:12
     * @export
     * @template C
     * @returns {*}
     */
    data: import("..").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
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
//# sourceMappingURL=code.d.ts.map