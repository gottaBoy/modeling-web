import { PropType } from 'vue';
import { IDBHtmlPortletPart } from '@ibiz/model-core';
import { HtmlPortletController } from '@ibiz-template/runtime';
import './html-portlet.scss';
export declare const HtmlPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBHtmlPortletPart>;
        required: true;
    };
    controller: {
        type: typeof HtmlPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBHtmlPortletPart>;
        required: true;
    };
    controller: {
        type: typeof HtmlPortletController;
        required: true;
    };
}>>, {}, {}>;
