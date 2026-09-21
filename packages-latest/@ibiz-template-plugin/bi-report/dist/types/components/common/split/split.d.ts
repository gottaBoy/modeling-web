import { Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    mode: {
        validator: (value: string) => boolean;
        default: string;
    };
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}, {
    ns: Namespace;
    outerWrapper: Ref<HTMLDivElement | null>;
    offset: Ref<number>;
    wrapperClasses: import("vue").ComputedRef<any[]>;
    paneClasses: import("vue").ComputedRef<any[]>;
    isHorizontal: import("vue").ComputedRef<boolean>;
    anotherOffset: import("vue").ComputedRef<number>;
    handleMousedown: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "on-move-start" | "on-moving" | "on-move-end")[], "update:modelValue" | "on-move-start" | "on-moving" | "on-move-end", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    mode: {
        validator: (value: string) => boolean;
        default: string;
    };
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onOn-move-start"?: ((...args: any[]) => any) | undefined;
    "onOn-moving"?: ((...args: any[]) => any) | undefined;
    "onOn-move-end"?: ((...args: any[]) => any) | undefined;
}, {
    mode: string;
    max: string | number;
    modelValue: string | number;
    min: string | number;
}, {}>;
export default _default;
