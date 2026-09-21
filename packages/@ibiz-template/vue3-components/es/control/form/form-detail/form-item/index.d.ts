export * from './form-item-container/form-item-container';
export declare const IBizFormItem: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormItemController;
        required: true;
    };
    attrs: {
        type: import("vue").PropType<IData>;
        required: false;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("@ibiz-template/runtime").FormItemController;
    extraParams: import("vue").Ref<{}>;
    onValueChange: (val: unknown, name?: string | undefined, ignore?: boolean) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormItemController;
        required: true;
    };
    attrs: {
        type: import("vue").PropType<IData>;
        required: false;
    };
}>>, {}, {}>>;
export default IBizFormItem;
