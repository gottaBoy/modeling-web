import { PropType } from 'vue';
import { ISysMap } from '@ibiz/model-core';
import './map.scss';
import { MapController, IControlProvider } from '@ibiz-template/runtime';
declare const MapControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<ISysMap>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: MapController;
    ns: import("@ibiz-template/core").Namespace;
    mapRef: import("vue").Ref<any>;
    mapOpts: import("vue").ComputedRef<Partial<{
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
    mapStyle: string | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<ISysMap>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    mdctrlActiveMode: number;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>;
export default MapControl;
