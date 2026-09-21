import { Ref } from 'vue';
import './ibiz-array.scss';
import { ArrayEditorController } from '../array-editor.controller';
export declare const IBizArray: import("vue").DefineComponent<{
    value: ({
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
    } | {
        (arrayLength: number): number[];
        (...items: number[]): number[];
        new (arrayLength: number): number[];
        new (...items: number[]): number[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T_5>(arrayLike: ArrayLike<T_5>): T_5[];
        from<T_1_1, U_2>(arrayLike: ArrayLike<T_1_1>, mapfn: (v: T_1_1, k: number) => U_2, thisArg?: any): U_2[];
        from<T_2_1>(iterable: Iterable<T_2_1> | ArrayLike<T_2_1>): T_2_1[];
        from<T_3_1, U_1_1>(iterable: Iterable<T_3_1> | ArrayLike<T_3_1>, mapfn: (v: T_3_1, k: number) => U_1_1, thisArg?: any): U_1_1[];
        of<T_4_1>(...items: T_4_1[]): T_4_1[];
        readonly [Symbol.species]: ArrayConstructor;
    })[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<ArrayEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
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
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: ArrayEditorController;
    editorStyle: string;
    type: string;
    size: string;
    limit: number;
    maxLength: number | undefined;
    showWordLimit: boolean;
    prepend: string;
    append: string;
    target: string;
    items: Ref<IData[]>;
    getUrl: (value: string) => string;
    addItem: (index?: number) => void;
    removeItem: (index: number) => void;
    handleChange: (value: string | number, index: number) => void;
    handleInput: (value: string | number, index: number) => void;
    onBlur: (e: IData) => void;
    onFocus: (e: IData) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: IData | undefined) => boolean;
    focus: (_event?: IData | undefined) => boolean;
    enter: (_event?: IData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: ({
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
    } | {
        (arrayLength: number): number[];
        (...items: number[]): number[];
        new (arrayLength: number): number[];
        new (...items: number[]): number[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T_5>(arrayLike: ArrayLike<T_5>): T_5[];
        from<T_1_1, U_2>(arrayLike: ArrayLike<T_1_1>, mapfn: (v: T_1_1, k: number) => U_2, thisArg?: any): U_2[];
        from<T_2_1>(iterable: Iterable<T_2_1> | ArrayLike<T_2_1>): T_2_1[];
        from<T_3_1, U_1_1>(iterable: Iterable<T_3_1> | ArrayLike<T_3_1>, mapfn: (v: T_3_1, k: number) => U_1_1, thisArg?: any): U_1_1[];
        of<T_4_1>(...items: T_4_1[]): T_4_1[];
        readonly [Symbol.species]: ArrayConstructor;
    })[];
    controller: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<ArrayEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<import("vue").PropType<IData>, undefined, undefined>;
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
}>> & {
    onFocus?: ((_event?: IData | undefined) => any) | undefined;
    onBlur?: ((_event?: IData | undefined) => any) | undefined;
    onChange?: ((_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => any) | undefined;
    onEnter?: ((_event?: IData | undefined) => any) | undefined;
    onInfoTextChange?: ((_text: string) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    autoFocus: boolean;
}, {}>;
