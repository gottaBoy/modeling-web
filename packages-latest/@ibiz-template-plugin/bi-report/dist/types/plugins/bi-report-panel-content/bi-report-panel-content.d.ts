import { IPanelRawItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import { BIReportPanelContentController } from './bi-report-panel-content.controller';
import { IBIReportChartController } from '../../interface';
declare const _default: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof BIReportPanelContentController;
        required: true;
    };
}, {
    ns: Namespace;
    c: BIReportPanelContentController;
    value: import("vue").Ref<string[]>;
    showAgg: import("vue").Ref<boolean>;
    showPercent: import("vue").Ref<boolean>;
    chartRef: import("vue").Ref<any>;
    isActive: import("vue").Ref<boolean>;
    handleShowAggChange: (value: boolean) => Promise<void>;
    handleShowPercentChange: (value: boolean) => void;
    handleGridInit: (grid: IBIReportChartController) => void;
    handleChartInit: (chart: IBIReportChartController) => void;
    openFilterPopover: (e: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof BIReportPanelContentController;
        required: true;
    };
}>>, {}, {}>;
export default _default;
