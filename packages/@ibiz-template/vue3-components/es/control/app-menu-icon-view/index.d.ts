export declare const IBizAppMenuIconViewControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppMenu>;
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
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}, {
    c: import("@ibiz-template/runtime").AppMenuIconViewController;
    ns: import("@ibiz-template/core").Namespace;
    defaultActive: import("vue").Ref<string>;
    defaultOpens: import("vue").Ref<string[]>;
    onClick: (key: string, event: MouseEvent) => Promise<void>;
    renderGroup: (item: import("@ibiz/model-core").IAppMenuItem) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
    renderItem: (item: import("@ibiz/model-core").IAppMenuItem) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppMenu>;
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
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}>>, {
    params: IParams;
    collapse: boolean;
}, {}>>;
export default IBizAppMenuIconViewControl;
