export * from './form-page-item/form-page.item';
export declare const IBizFormPage: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEForm>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").FormController<import("@ibiz/model-core").IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    position: string;
    onTabChange: (name: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEForm>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").FormController<import("@ibiz/model-core").IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormPage;
