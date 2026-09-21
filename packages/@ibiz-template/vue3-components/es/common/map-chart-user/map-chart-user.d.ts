import { PropType } from 'vue';
import { IMapData, MapController } from '@ibiz-template/runtime';
import './map-chart-user.scss';
export declare const IBizMapChartUser: import("vue").DefineComponent<{
    areaData: {
        type: {
            (arrayLength: number): IMapData[];
            (...items: IMapData[]): IMapData[];
            new (arrayLength: number): IMapData[];
            new (...items: IMapData[]): IMapData[];
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
    pointData: {
        type: {
            (arrayLength: number): IMapData[];
            (...items: IMapData[]): IMapData[];
            new (arrayLength: number): IMapData[];
            new (...items: IMapData[]): IMapData[];
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
    options: {
        type: PropType<Partial<{
            strAreaCode: boolean;
            visualMap: {
                text: string[];
                min: number;
                max: number;
                rangeColor: string[];
            };
            areaColor: string;
            areaBorderColor: string;
            hoverAreaColor: string;
            pointSymbol: string;
            jsonBaseUrl: string;
            defaultAreaCode: string | number;
        }>>;
        default: () => {};
    };
    controller: {
        type: typeof MapController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    chartRef: import("vue").Ref<any>;
    historyNames: import("vue").Ref<string[]>;
    goBack: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    areaData: {
        type: {
            (arrayLength: number): IMapData[];
            (...items: IMapData[]): IMapData[];
            new (arrayLength: number): IMapData[];
            new (...items: IMapData[]): IMapData[];
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
    pointData: {
        type: {
            (arrayLength: number): IMapData[];
            (...items: IMapData[]): IMapData[];
            new (arrayLength: number): IMapData[];
            new (...items: IMapData[]): IMapData[];
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
    options: {
        type: PropType<Partial<{
            strAreaCode: boolean;
            visualMap: {
                text: string[];
                min: number;
                max: number;
                rangeColor: string[];
            };
            areaColor: string;
            areaBorderColor: string;
            hoverAreaColor: string;
            pointSymbol: string;
            jsonBaseUrl: string;
            defaultAreaCode: string | number;
        }>>;
        default: () => {};
    };
    controller: {
        type: typeof MapController;
        required: true;
    };
}>>, {
    options: Partial<{
        strAreaCode: boolean;
        visualMap: {
            text: string[];
            min: number;
            max: number;
            rangeColor: string[];
        };
        areaColor: string;
        areaBorderColor: string;
        hoverAreaColor: string;
        pointSymbol: string;
        jsonBaseUrl: string;
        defaultAreaCode: string | number;
    }>;
}, {}>;
export default IBizMapChartUser;
