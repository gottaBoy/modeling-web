export declare const IBizPickupViewPanelControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEViewPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import("@ibiz-template/runtime").PickupViewPanelController;
    ns: import("@ibiz-template/core").Namespace;
    onCreated: (event: import("@ibiz-template/runtime").EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEViewPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    singleSelect: boolean;
    noLoadDefault: boolean;
}, {}>>;
export default IBizPickupViewPanelControl;
