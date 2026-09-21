export declare const IBizToolbarControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEToolbar>;
        required: true;
    };
    runMode: {
        type: import("vue").PropType<"DESIGN" | "RUNTIME">;
        default: string;
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
    manualCalcButtonState: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import("@ibiz-template/runtime").ToolbarController<import("@ibiz/model-core").IControl, import("@ibiz-template/runtime").IToolbarState, import("@ibiz-template/runtime").IToolbarEvent>;
    btnSize: import("vue").Ref<string>;
    ns: import("@ibiz-template/core").Namespace;
    toolbarStyle: string | undefined;
    handleClick: (item: import("@ibiz/model-core").IDEToolbarItem, event: MouseEvent, params?: IData | undefined) => Promise<void>;
    renderExtraButtons: (extraButtons: import("@ibiz-template/runtime").IExtraButton[]) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    renderToolbarItem: (item: import("@ibiz/model-core").IDEToolbarItem) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEToolbar>;
        required: true;
    };
    runMode: {
        type: import("vue").PropType<"DESIGN" | "RUNTIME">;
        default: string;
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
    manualCalcButtonState: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    params: IParams;
    runMode: "DESIGN" | "RUNTIME";
    manualCalcButtonState: boolean;
}, {}>>;
export default IBizToolbarControl;
