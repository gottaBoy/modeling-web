/**
 * @description 获取代码编辑器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getCodeProps<C>(): {
    /**
     * @description 编辑器值
     */
    value: StringConstructor;
    /**
     * @description 代码语言类型
     */
    language: {
        type: StringConstructor;
    };
    /**
     * @description 主题类型
     */
    theme: {
        type: StringConstructor;
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
 * @description 获取表格代码编辑器props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridCodeProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    /**
     * @description 编辑器值
     */
    value: StringConstructor;
    /**
     * @description 代码语言类型
     */
    language: {
        type: StringConstructor;
    };
    /**
     * @description 主题类型
     */
    theme: {
        type: StringConstructor;
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
 * @description 获取Code编辑器通用emits
 * @export
 * @returns {*}
 * @editoremits
 */
export declare function getCodeEmits(): {
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
//# sourceMappingURL=code.d.ts.map