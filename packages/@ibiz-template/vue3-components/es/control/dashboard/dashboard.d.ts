import { PropType, Ref } from 'vue';
import { IDashboard } from '@ibiz/model-core';
import './dashboard.scss';
import { DashboardController, IControlProvider } from '@ibiz-template/runtime';
export declare const DashboardControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDashboard>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}, {
    c: DashboardController;
    ns: import("@ibiz-template/core").Namespace;
    customModelDatas: Ref<IModel>;
    anchorList: Ref<IData[]>;
    dashboardRef: Ref<any>;
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
        type: PropType<IDashboard>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>;
