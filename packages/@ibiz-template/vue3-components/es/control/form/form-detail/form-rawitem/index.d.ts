export declare const IBizFormRawItem: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormRawItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    content: import("vue").Ref<string | number | undefined>;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormRawItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormRawItem;
