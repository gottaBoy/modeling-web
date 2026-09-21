import 'dayjs/locale/zh-cn';
import './week-range-select.scss';
declare const _default: import("vue").DefineComponent<{
    value: {
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
        default: () => never[];
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    curValue: import("vue").Ref<any>;
    weekRangeRef: import("vue").Ref<any>;
    isInRange: (cell: IData) => boolean;
    isInHoverRange: (cell: IData) => boolean;
    isEnded: (cell: IData) => boolean | undefined;
    isStarted: (cell: IData) => boolean | undefined;
    isToday: (cell: IData) => boolean;
    weekRangeClick: () => void;
    cellClick: (cell: IData) => void;
    visibleChange: (tag: boolean) => void;
    handleChange: () => void;
    handleClose: () => void;
    handleOpen: () => void;
    isHover: (cell: IData) => boolean;
    isMonday: (cell: IData) => boolean;
    isSunday: (cell: IData) => boolean;
    onMouseHover: (cell: IData) => void;
    onMouseleave: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "visibleChange")[], "change" | "visibleChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
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
        default: () => never[];
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onVisibleChange?: ((...args: any[]) => any) | undefined;
}, {
    value: string[];
}, {}>;
export default _default;
