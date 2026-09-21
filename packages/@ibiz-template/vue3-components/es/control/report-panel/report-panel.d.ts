import { IControlProvider, ReportPanelController } from '@ibiz-template/runtime';
import { PropType, VNode } from 'vue';
import { IDEReportPanel } from '@ibiz/model-core';
import './report-panel.scss';
export declare const ReportPanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEReportPanel>;
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
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: ReportPanelController;
    ns: import("@ibiz-template/core").Namespace;
    renderContent: () => VNode | false;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEReportPanel>;
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
    noLoadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    noLoadDefault: boolean;
}, {}>;
