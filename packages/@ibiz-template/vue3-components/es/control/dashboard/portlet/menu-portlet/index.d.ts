export * from './menu-portlet';
export declare const IBizMenuPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBAppMenuPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").MenuPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    menu: import("@ibiz/model-core").IAppMenu | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBAppMenuPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").MenuPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizMenuPortlet;
