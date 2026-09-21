import './form-item-container.scss';
export declare const IBizFormItemContainer: import("vue").DefineComponent<{
    required: {
        type: BooleanConstructor;
        required: true;
    };
    error: {
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    labelClass: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
    };
    labelPos: {
        type: StringConstructor;
        required: true;
    };
    labelWidth: {
        type: NumberConstructor;
        default: number;
    };
    enableInputTip: {
        type: BooleanConstructor;
    };
    inputTip: {
        type: StringConstructor;
    };
    inputTipUrl: {
        type: StringConstructor;
    };
    inputTipClosable: {
        type: BooleanConstructor;
    };
    labelSysImg: {
        type: ObjectConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    cssVars: import("vue").ComputedRef<Record<string, string>>;
    tooltip: import("vue").Ref<any>;
    renderLabel: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    required: {
        type: BooleanConstructor;
        required: true;
    };
    error: {
        type: StringConstructor;
    };
    label: {
        type: StringConstructor;
    };
    labelClass: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
    };
    labelPos: {
        type: StringConstructor;
        required: true;
    };
    labelWidth: {
        type: NumberConstructor;
        default: number;
    };
    enableInputTip: {
        type: BooleanConstructor;
    };
    inputTip: {
        type: StringConstructor;
    };
    inputTipUrl: {
        type: StringConstructor;
    };
    inputTipClosable: {
        type: BooleanConstructor;
    };
    labelSysImg: {
        type: ObjectConstructor;
    };
}>>, {
    labelWidth: number;
    enableInputTip: boolean;
    inputTipClosable: boolean;
}, {}>;
