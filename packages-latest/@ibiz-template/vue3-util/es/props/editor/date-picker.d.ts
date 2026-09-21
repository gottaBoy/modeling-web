/**
 * @description 获取日期选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getDatePickerProps<C>(): {
    /**
     * 值
     * @description 编辑器的值
     */
    value: (NumberConstructor | StringConstructor)[];
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
    data: import("..").RequiredProp<import("vue").PropType<import("@ibiz-template/core").IApiData>, undefined, undefined>;
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
 * @description 获取表格日期选择器props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridDatePickerProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    /**
     * 值
     * @description 编辑器的值
     */
    value: (NumberConstructor | StringConstructor)[];
    controller: import("..").RequiredProp<import("vue").PropType<C>, undefined, undefined>;
    data: import("..").RequiredProp<import("vue").PropType<import("@ibiz-template/core").IApiData>, undefined, undefined>;
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
//# sourceMappingURL=date-picker.d.ts.map