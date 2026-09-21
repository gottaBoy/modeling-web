import { PropType } from 'vue';
import { BIReportDesignController } from '../../../controller';
declare const _default: import("vue").DefineComponent<{
    caption: {
        type: StringConstructor;
        required: true;
    };
    items: {
        type: {
            (arrayLength: number): IData[];
            (...items: IData[]): IData[];
            new (arrayLength: number): IData[];
            new (...items: IData[]): IData[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    isSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchValue: {
        type: StringConstructor;
        default: string;
    };
    collapse: {
        type: BooleanConstructor;
        default: boolean;
    };
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
    type: {
        type: PropType<"measure" | "dimension" | "filter" | "period" | "group">;
        required: true;
    };
}, {
    ns: Namespace;
    renderItem: (item: IData) => (JSX.Element | undefined)[] | null;
    switchCollapse: () => void;
    onAdd: () => void;
    computeNumber: () => number;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("add" | "collapse")[], "add" | "collapse", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    caption: {
        type: StringConstructor;
        required: true;
    };
    items: {
        type: {
            (arrayLength: number): IData[];
            (...items: IData[]): IData[];
            new (arrayLength: number): IData[];
            new (...items: IData[]): IData[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    isSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchValue: {
        type: StringConstructor;
        default: string;
    };
    collapse: {
        type: BooleanConstructor;
        default: boolean;
    };
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
    type: {
        type: PropType<"measure" | "dimension" | "filter" | "period" | "group">;
        required: true;
    };
}>> & {
    onAdd?: ((...args: any[]) => any) | undefined;
    onCollapse?: ((...args: any[]) => any) | undefined;
}, {
    items: IData[];
    collapse: boolean;
    isSearch: boolean;
    searchValue: string;
}, {}>;
export default _default;
