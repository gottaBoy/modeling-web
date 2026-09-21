export * from './list-portlet';
export declare const IBizListPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ListPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    list: import("@ibiz/model-core").IControl | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ListPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizListPortlet;
