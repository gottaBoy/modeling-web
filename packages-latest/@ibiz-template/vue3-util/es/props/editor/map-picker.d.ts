/**
 * @description 获取地图选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getMapPickerProps<C>(): {
    /**
     * @description 编辑器值
     */
    value: StringConstructor;
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
 * @description 获取表格地图选择器props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridMapPickerProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    /**
     * @description 编辑器值
     */
    value: StringConstructor;
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
//# sourceMappingURL=map-picker.d.ts.map