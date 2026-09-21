export declare const IBizScreenDashboard: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDashboard>;
        required: true;
    };
    context: {
        type: import('vue').PropType<IContext>;
        required: true;
    };
    params: {
        type: import('vue').PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import('vue').PropType<import('@ibiz-template/runtime').IControlProvider>;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    tempModelData: import('vue').Ref<import('@ibiz/model-core').IDashboard, import('@ibiz/model-core').IDashboard>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDashboard>;
        required: true;
    };
    context: {
        type: import('vue').PropType<IContext>;
        required: true;
    };
    params: {
        type: import('vue').PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import('vue').PropType<import('@ibiz-template/runtime').IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>>;
