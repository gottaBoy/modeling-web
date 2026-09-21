/**
 * @description 获取标签props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getSpanProps<C>(): {
    /**
     * @description 编辑器值
     */
    value: (ObjectConstructor | ArrayConstructor | NumberConstructor | StringConstructor)[];
    /**
     * @description 是否显示title
     * @default true
     */
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
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
 * @description 获取表格标签props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridSpanProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    /**
     * @description 编辑器值
     */
    value: (ObjectConstructor | ArrayConstructor | NumberConstructor | StringConstructor)[];
    /**
     * @description 是否显示title
     * @default true
     */
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
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
//# sourceMappingURL=span.d.ts.map