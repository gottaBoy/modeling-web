export declare const IBizTaggedWall: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDEList>;
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
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import('./tagged-wall.controller').TaggedWallController;
    ns: Namespace;
    tags: import('vue').ComputedRef<any[][]>;
    tagList: import('vue').Ref<any[], any[] | IData[]>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDEList>;
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
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    mdctrlActiveMode: number;
    singleSelect: boolean;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>>;
