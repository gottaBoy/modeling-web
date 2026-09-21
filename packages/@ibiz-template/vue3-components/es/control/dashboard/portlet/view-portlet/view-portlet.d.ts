import { PropType } from 'vue';
import { IDBAppViewPortletPart } from '@ibiz/model-core';
import { ViewPortletController } from '@ibiz-template/runtime';
export declare const ViewPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBAppViewPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ViewPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    view: import("@ibiz/model-core").IAppView | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBAppViewPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ViewPortletController;
        required: true;
    };
}>>, {}, {}>;
