import { PropType } from 'vue';
import { ReportPanelController } from '@ibiz-template/runtime';
import './user-report-panel.scss';
export declare const UserReportPanel: import("vue").DefineComponent<{
    controller: {
        type: PropType<ReportPanelController>;
    };
}, {
    c: ReportPanelController | undefined;
    ns: import("@ibiz-template/core").Namespace;
    generator: import("@ibiz-template/runtime/out/controller/control/report-panel/generator/base-generator").ReportPanelBaseGenerator | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<ReportPanelController>;
    };
}>>, {}, {}>;
