export * from './rawitem-portlet';
export declare const IBizRawItemPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBRawItemPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").RawItemPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    rawItem: import("@ibiz/model-core").IDBRawItemPortletPart;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBRawItemPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").RawItemPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizRawItemPortlet;
