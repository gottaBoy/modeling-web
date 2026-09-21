export * from './filter-portlet';
export declare const IBizFilterPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBFilterPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FilterPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleReset: () => void;
    handleSearch: () => void;
    renderFilter: () => (import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined)[] | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBFilterPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FilterPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFilterPortlet;
