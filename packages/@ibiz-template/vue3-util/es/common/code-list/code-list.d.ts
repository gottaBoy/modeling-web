import { CodeListItem } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import { IAppCodeList } from '@ibiz/model-core';
import './code-list.scss';
export declare const IBizCodeList: import("vue").DefineComponent<{
    codeListItems: {
        type: {
            (arrayLength: number): CodeListItem[];
            (...items: CodeListItem[]): CodeListItem[];
            new (arrayLength: number): CodeListItem[];
            new (...items: CodeListItem[]): CodeListItem[];
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
    codeList: {
        type: PropType<IAppCodeList>;
        required: true;
    };
    value: {
        type: (StringConstructor | NumberConstructor)[];
    };
    convertToCodeItemText: {
        type: BooleanConstructor;
        default: boolean;
    };
    valueFormat: {
        type: StringConstructor;
    };
    unitName: {
        type: StringConstructor;
    };
    showMode: {
        type: PropType<"DEFAULT" | "ICON" | "TEXT">;
        default: string;
    };
}, {
    items: import("vue").Ref<IData[]>;
    ns: import("@ibiz-template/core").Namespace;
    emptyText: string;
    textSeparator: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    infoTextChange: (_text: string) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    codeListItems: {
        type: {
            (arrayLength: number): CodeListItem[];
            (...items: CodeListItem[]): CodeListItem[];
            new (arrayLength: number): CodeListItem[];
            new (...items: CodeListItem[]): CodeListItem[];
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
    codeList: {
        type: PropType<IAppCodeList>;
        required: true;
    };
    value: {
        type: (StringConstructor | NumberConstructor)[];
    };
    convertToCodeItemText: {
        type: BooleanConstructor;
        default: boolean;
    };
    valueFormat: {
        type: StringConstructor;
    };
    unitName: {
        type: StringConstructor;
    };
    showMode: {
        type: PropType<"DEFAULT" | "ICON" | "TEXT">;
        default: string;
    };
}>> & {
    onInfoTextChange?: ((_text: string) => any) | undefined;
}, {
    convertToCodeItemText: boolean;
    showMode: "DEFAULT" | "ICON" | "TEXT";
}, {}>;
//# sourceMappingURL=code-list.d.ts.map