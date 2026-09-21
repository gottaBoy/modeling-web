import { PropType } from 'vue';
import { ReportPortletController } from '@ibiz-template/runtime';
export declare const ReportPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ReportPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    report: import("@ibiz/model-core").IControl | undefined;
    linkAction: import("vue").ComputedRef<import("@ibiz/model-core").IUIActionGroupDetail | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ReportPortletController;
        required: true;
    };
}>>, {}, {}>;
