/**
 * 获取单选框的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getRadioProps<C>(): {
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
 * 获取表格单选框的props
 *
 * @author lxm
 * @date 2022-11-01 19:11:12
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridRadioProps<C>(): {
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
//# sourceMappingURL=radio-button-list.d.ts.map