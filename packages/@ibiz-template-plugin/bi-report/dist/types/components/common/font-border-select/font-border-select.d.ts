import { PropType } from 'vue';
/** 字体线条选择组件 */
declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
    };
    mode: {
        type: PropType<"FONT" | "BORDER">;
        default: string;
    };
    value: {
        type: PropType<IData>;
        default: () => void;
    };
    fontMax: {
        type: NumberConstructor;
        default: number;
    };
    fontMin: {
        type: NumberConstructor;
        default: number;
    };
    borderMax: {
        type: NumberConstructor;
        default: number;
    };
    borderMin: {
        type: NumberConstructor;
        default: number;
    };
    useDotted: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    fontItem: {
        value: string;
        label: string;
    }[];
    borderItem: {
        value: string;
        label: string;
    }[];
    normalBorder: () => JSX.Element;
    dashed: () => JSX.Element;
    doubleDashed: () => JSX.Element;
    dotted: () => JSX.Element;
    selectValue: import("vue").Ref<string>;
    number: import("vue").Ref<number>;
    numberPx: import("vue").WritableComputedRef<string>;
    addNumber: () => JSX.Element;
    minusNumber: () => JSX.Element;
    handleColNumberChange: (event: MouseEvent) => void;
    changeNumber: (mode: string) => void;
    currentColor: import("vue").Ref<string | null>;
    selectChange: () => void;
    colorChange: () => void;
    predefineColors: import("vue").Ref<string[]>;
    onDropDownClick: (item: IData) => void;
    arrowSvg: () => JSX.Element;
    dropDownVisible: (visible: boolean) => void;
    isVisible: import("vue").Ref<boolean>;
    isFocus: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
    };
    mode: {
        type: PropType<"FONT" | "BORDER">;
        default: string;
    };
    value: {
        type: PropType<IData>;
        default: () => void;
    };
    fontMax: {
        type: NumberConstructor;
        default: number;
    };
    fontMin: {
        type: NumberConstructor;
        default: number;
    };
    borderMax: {
        type: NumberConstructor;
        default: number;
    };
    borderMin: {
        type: NumberConstructor;
        default: number;
    };
    useDotted: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    value: IData;
    mode: "FONT" | "BORDER";
    disabled: boolean;
    fontMax: number;
    fontMin: number;
    borderMax: number;
    borderMin: number;
    useDotted: boolean;
}, {}>;
export default _default;
