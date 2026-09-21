export declare const IBizEditFormControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEEditForm>;
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
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: import("vue").PropType<IData>;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import("@ibiz-template/runtime").EditFormController;
    ns: import("@ibiz-template/core").Namespace;
    anchorList: import("vue").Ref<IData[]>;
    anchorTargetRef: import("vue").Ref<IData | undefined>;
    calcNavBarConfig: () => {
        navBarPos: string | undefined;
        navBarSysCss: import("@ibiz/model-core").ISysCss | undefined;
        navBarWidth: number | undefined;
        navBarStyle: string | undefined;
        navbarHeight: number | undefined;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEEditForm>;
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
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    data: {
        type: import("vue").PropType<IData>;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>>;
export default IBizEditFormControl;
