import { PropType } from 'vue';
/**
 * @description 获取时间范围（可选单位）props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getDateRangeSelectProps<C>(): {
    /**
     * @description 编辑器值，该值用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    value: {
        type: PropType<{
            unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
            type: 'DYNAMIC' | 'STATIC';
            start: string | number;
            end: string | number;
        }>;
    };
    controller: import("..").RequiredProp<PropType<C>, undefined, undefined>;
    data: import("..").RequiredProp<PropType<import("@ibiz-template/core").IApiData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor; /**
         * 值变更事件
         * @description 值变更事件。_value用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
         */
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
 * @description 获取时间范围（可选单位）emits
 * @export
 * @template V
 * @returns {*}
 * @editoremits
 */
export declare function getDateRangeSelectEmits(): {
    /**
     * 值变更事件
     * @description 值变更事件。_value用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    change: (_value: {
        unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
        type: 'DYNAMIC' | 'STATIC';
        start: string | number;
        end: string | number;
    }, _name?: string, _ignore?: boolean) => boolean;
    blur: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    focus: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    enter: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
    customAction: (_value: {
        tag: string;
        data: import("@ibiz-template/core").IApiData[];
    }) => boolean;
};
/**
 * @description 获取表格时间范围（可选单位）的props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridDateRangeSelectProps<C>(): {
    /**
     * @description 编辑器值，该值用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
     */
    value: {
        type: PropType<{
            unit: "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR";
            type: "DYNAMIC" | "STATIC";
            start: string | number;
            end: string | number;
        }>;
    };
    controller: import("..").RequiredProp<PropType<C>, undefined, undefined>;
    data: import("..").RequiredProp<PropType<import("@ibiz-template/core").IApiData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor; /**
         * 值变更事件
         * @description 值变更事件。_value用于表示时间范围信息，包含几个关键属性：`unit`（时间单位）、`type`（类型，可选值为 'DYNAMIC'（动态时间）和 'STATIC'（固定时间））、`start`（开始时间）、`end`（结束时间）
         */
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
    hasError: {
        type: BooleanConstructor;
    };
};
//# sourceMappingURL=date-range-select.d.ts.map