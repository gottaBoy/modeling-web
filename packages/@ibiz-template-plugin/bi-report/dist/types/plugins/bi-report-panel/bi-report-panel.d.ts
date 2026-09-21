import { IPanelRawItem, IUIActionGroupDetail } from '@ibiz/model-core';
import { PropType } from 'vue';
import { BIReportPanelController } from './bi-report-panel.controller';
declare const _default: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof BIReportPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: BIReportPanelController;
    onActionClick: ({ detail, item, event, }: {
        detail: IUIActionGroupDetail;
        item: IData;
        event: MouseEvent;
    }) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof BIReportPanelController;
        required: true;
    };
}>>, {}, {}>;
export default _default;
