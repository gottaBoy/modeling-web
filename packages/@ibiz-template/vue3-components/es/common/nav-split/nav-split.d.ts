import { Ref } from 'vue';
import './nav-split.scss';
export declare const IBizNavSplit: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    mode: {
        validator: (value: string) => boolean;
        default: string;
    };
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    outerWrapper: Ref<HTMLDivElement | null>;
    offset: Ref<number>;
    wrapperClasses: import("vue").ComputedRef<string[]>;
    paneClasses: import("vue").ComputedRef<string[]>;
    isHorizontal: import("vue").ComputedRef<boolean>;
    anotherOffset: import("vue").ComputedRef<number>;
    handleMousedown: (e: MouseEvent) => void;
    handleMove: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "on-move-start" | "on-moving" | "on-move-end")[], "update:modelValue" | "on-move-start" | "on-moving" | "on-move-end", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    mode: {
        validator: (value: string) => boolean;
        default: string;
    };
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onOn-move-start"?: ((...args: any[]) => any) | undefined;
    "onOn-moving"?: ((...args: any[]) => any) | undefined;
    "onOn-move-end"?: ((...args: any[]) => any) | undefined;
}, {
    mode: string;
    modelValue: string | number;
    max: string | number;
    min: string | number;
}, {}>;
