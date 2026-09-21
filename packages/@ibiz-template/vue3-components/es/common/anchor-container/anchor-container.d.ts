import { PropType, Ref } from 'vue';
import './anchor-container.scss';
export interface navBarConfig {
    /**
     * 导航栏位置
     *
     * @type {string}
     * @memberof navBarConfig
     */
    navBarPos: string;
    /**
     * 导航栏样式表
     *
     * @type {string}
     * @memberof navBarConfig
     */
    navBarSysCss: string;
    /**
     * 导航栏宽
     *
     * @type {number}
     * @memberof navBarConfig
     */
    navBarWidth: number;
    /**
     * 导航栏样式
     *
     * @type {string}
     * @memberof navBarConfig
     */
    navBarStyle: string;
    /**
     *导航栏高
     *
     * @type {number}
     * @memberof navBarConfig
     */
    navbarHeight: number;
}
export declare const IBizAnchorContainer: import("vue").DefineComponent<{
    anchorList: {
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
        default: never[];
    };
    anchorTargetEle: {
        type: PropType<IData>;
        required: true;
    };
    navBarConfig: {
        type: PropType<navBarConfig>;
        default: () => void;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    selected: Ref<string>;
    navBarPos: string;
    navBarStyle: string;
    navBarSysCss: string;
    style: () => IData;
    onSelect: (key: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    anchorList: {
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
        default: never[];
    };
    anchorTargetEle: {
        type: PropType<IData>;
        required: true;
    };
    navBarConfig: {
        type: PropType<navBarConfig>;
        default: () => void;
    };
}>>, {
    anchorList: IData[];
    navBarConfig: navBarConfig;
}, {}>;
