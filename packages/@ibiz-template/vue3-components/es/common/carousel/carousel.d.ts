import { Ref, PropType } from 'vue';
import './carousel.scss';
export declare const IBizCarouselComponent: import("vue").DefineComponent<{
    carouselData: {
        type: {
            (arrayLength: number): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            (...items: {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][]): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            new (arrayLength: number): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            new (...items: {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][]): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    isAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeSpan: {
        type: NumberConstructor;
        default: number;
    };
    showMode: {
        type: PropType<"DEFAULT" | "CARD">;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    swipeData: Ref<IData[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    carouselData: {
        type: {
            (arrayLength: number): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            (...items: {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][]): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            new (arrayLength: number): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            new (...items: {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][]): {
                id?: string | undefined;
                name?: string | undefined;
                imgUrl?: string | undefined;
                linkPath?: string | undefined;
                cssClass?: string | undefined;
            }[][];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: true;
    };
    isAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeSpan: {
        type: NumberConstructor;
        default: number;
    };
    showMode: {
        type: PropType<"DEFAULT" | "CARD">;
        required: true;
    };
}>>, {
    isAuto: boolean;
    timeSpan: number;
}, {}>;
