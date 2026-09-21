export declare const IBizFormButton: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormButton>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormButtonController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormButton>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormButtonController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormButton;
