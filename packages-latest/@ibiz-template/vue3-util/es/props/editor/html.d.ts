/**
 * @description 获取html编辑框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getHtmlProps<C>(): {
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
 * @description 获取表格html编辑框props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridHtmlProps<C>(): {
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
/**
 * @description 获取HTML编辑器通用emits
 * @export
 * @returns {*}
 * @editoremits
 */
export declare function getHtmlEmits(): {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    focus: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    enter: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
    customAction: (_value: {
        tag: string;
        data: import("@ibiz-template/core").IApiData[];
    }) => boolean;
};
//# sourceMappingURL=html.d.ts.map