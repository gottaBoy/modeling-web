/**
 * 获取数据选择的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getDataPickerProps<C>(): {
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
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
 * 获取表格数据选择的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridDataPickerProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    value: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
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
//# sourceMappingURL=data-picker.d.ts.map