export * from './container-portlet';
export declare const IBizContainerPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBContainerPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ContainerPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBContainerPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ContainerPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizContainerPortlet;
