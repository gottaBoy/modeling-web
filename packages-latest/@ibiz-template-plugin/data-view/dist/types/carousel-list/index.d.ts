export declare const IBizCarouselList: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
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
    c: import('./carousel-list.controller').CarouselListController;
    ns: Namespace;
    carouselContainer: import('vue').Ref<any, any>;
    infiniteScroll: import('vue').Ref<any, any>;
    renderListContent: () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
    renderNoData: () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }> | undefined;
    renderBatchToolBar: () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }> | undefined;
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
