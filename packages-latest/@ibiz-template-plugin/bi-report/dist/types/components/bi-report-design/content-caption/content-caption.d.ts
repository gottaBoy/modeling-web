import { PropType } from 'vue';
import { IChartConfig } from '../../../interface';
import { BIReportDesignController } from '../../../controller';
declare const _default: import("vue").DefineComponent<{
    config: {
        type: PropType<IChartConfig>;
        default: () => void;
    };
    controller: {
        type: PropType<BIReportDesignController>;
    };
}, {
    ns: Namespace;
    caption: import("vue").ComputedRef<any>;
    uiState: import("vue").Ref<{
        chartCaption: any;
        isFocus: boolean;
    }>;
    onFocus: () => void;
    onChange: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    config: {
        type: PropType<IChartConfig>;
        default: () => void;
    };
    controller: {
        type: PropType<BIReportDesignController>;
    };
}>>, {
    config: IChartConfig;
}, {}>;
export default _default;
