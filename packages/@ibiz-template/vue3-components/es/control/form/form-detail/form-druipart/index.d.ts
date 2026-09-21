export declare const IBizFormDRUIPart: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormDRUIPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormDRUIPartController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCreated: (event: import("@ibiz-template/runtime").EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormDRUIPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormDRUIPartController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormDRUIPart;
