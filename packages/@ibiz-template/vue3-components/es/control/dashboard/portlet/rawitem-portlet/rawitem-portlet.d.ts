import { PropType } from 'vue';
import { IDBRawItemPortletPart } from '@ibiz/model-core';
import { RawItemPortletController } from '@ibiz-template/runtime';
export declare const RawItemPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBRawItemPortletPart>;
        required: true;
    };
    controller: {
        type: typeof RawItemPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    rawItem: IDBRawItemPortletPart;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBRawItemPortletPart>;
        required: true;
    };
    controller: {
        type: typeof RawItemPortletController;
        required: true;
    };
}>>, {}, {}>;
