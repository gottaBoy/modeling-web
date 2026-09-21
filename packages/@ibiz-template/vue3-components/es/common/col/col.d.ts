import { PropType } from 'vue';
import { ILayoutPos } from '@ibiz/model-core';
import { IColState } from '@ibiz-template/runtime';
import './col.scss';
export declare const IBizCol: import("vue").DefineComponent<{
    layoutPos: {
        type: PropType<ILayoutPos>;
        required: true;
    };
    state: {
        type: PropType<IColState>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    colClass: import("vue").ComputedRef<string[]>;
    gridAttrs: import("vue").ComputedRef<{
        xs?: undefined;
        sm?: undefined;
        md?: undefined;
        lg?: undefined;
    } | {
        xs: {
            span?: number | undefined;
            offset?: number | undefined;
        };
        sm: {
            span?: number | undefined;
            offset?: number | undefined;
        };
        md: {
            span?: number | undefined;
            offset?: number | undefined;
        };
        lg: {
            span?: number | undefined;
            offset?: number | undefined;
        };
    }>;
    cssVars: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    layoutPos: {
        type: PropType<ILayoutPos>;
        required: true;
    };
    state: {
        type: PropType<IColState>;
        required: true;
    };
}>>, {}, {}>;
