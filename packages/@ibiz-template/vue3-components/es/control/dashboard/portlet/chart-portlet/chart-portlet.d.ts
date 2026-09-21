import { PropType } from 'vue';
import { ChartPortletController } from '@ibiz-template/runtime';
export declare const ChartPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ChartPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    chart: import("@ibiz/model-core").IControl | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ChartPortletController;
        required: true;
    };
}>>, {}, {}>;
