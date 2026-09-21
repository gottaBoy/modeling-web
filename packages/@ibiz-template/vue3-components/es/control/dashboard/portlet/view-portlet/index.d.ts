export * from './view-portlet';
export declare const IBizViewPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBAppViewPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ViewPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    view: import("@ibiz/model-core").IAppView | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBAppViewPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ViewPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizViewPortlet;
