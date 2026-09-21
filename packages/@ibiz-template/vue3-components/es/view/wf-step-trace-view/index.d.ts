export declare const IBizWFStepTraceView: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<IData>;
    };
}, {
    c: import("@ibiz-template/runtime").WFStepTraceViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IWFStepTraceViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    viewClassNames: (string | undefined)[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<IData>;
    };
}>>, {
    params: IParams;
}, {}>>;
