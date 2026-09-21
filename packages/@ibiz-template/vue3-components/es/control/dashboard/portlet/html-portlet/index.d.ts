export * from './html-portlet';
export declare const IBizHtmlPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBHtmlPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").HtmlPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBHtmlPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").HtmlPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizHtmlPortlet;
