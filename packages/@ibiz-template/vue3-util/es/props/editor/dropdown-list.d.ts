/**
 * 获取下拉列表的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getDropdownProps<C>(): {
    value: (StringConstructor | NumberConstructor)[];
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
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
 * 获取表格下拉列表的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridDropdownProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    value: (StringConstructor | NumberConstructor)[];
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
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
//# sourceMappingURL=dropdown-list.d.ts.map