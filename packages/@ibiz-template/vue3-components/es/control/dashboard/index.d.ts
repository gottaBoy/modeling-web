export * from './portlet';
export declare const IBizDashboardControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDashboard>;
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
}, {
    c: import("@ibiz-template/runtime").DashboardController;
    ns: import("@ibiz-template/core").Namespace;
    customModelDatas: import("vue").Ref<IModel>;
    anchorList: import("vue").Ref<IData[]>;
    dashboardRef: import("vue").Ref<any>;
    calcNavBarConfig: () => {
        navBarPos: string | undefined;
        navBarSysCss: import("@ibiz/model-core").ISysCss | undefined;
        navBarWidth: number | undefined;
        navBarStyle: string | undefined;
        navbarHeight: number | undefined;
    };
    handleCustomModelChange: (args: IData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDashboard>;
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
}>>, {
    params: IParams;
}, {}>>;
export default IBizDashboardControl;
