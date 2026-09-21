import { PropType } from 'vue';
import { ListPortletController } from '@ibiz-template/runtime';
export declare const ListPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ListPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    list: import("@ibiz/model-core").IControl | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ListPortletController;
        required: true;
    };
}>>, {}, {}>;
