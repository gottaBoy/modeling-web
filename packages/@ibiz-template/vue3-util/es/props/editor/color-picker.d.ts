/**
 * 获取颜色选择器的props
 *
 * @author zzq
 * @date 2323-8-14 19:42:00
 * @export
 * @template C
 * @returns {*}
 */
export declare function getColorPickerProps<C>(): {
    value: StringConstructor;
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
 * 获取表格颜色选择器的props
 *
 * @author zzq
 * @date 2323-8-14 19:42:00
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridColorPickerProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    value: StringConstructor;
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
//# sourceMappingURL=color-picker.d.ts.map