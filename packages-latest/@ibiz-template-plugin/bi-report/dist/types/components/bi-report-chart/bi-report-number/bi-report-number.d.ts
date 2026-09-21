import { PropType } from 'vue';
import { IBIReportChartController } from '../../../interface';
declare const _default: import("vue").DefineComponent<{
    c: {
        type: PropType<IBIReportChartController>;
        required: true;
    };
    enableDrillDetail: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: Namespace;
    controller: IBIReportChartController;
    uiState: import("vue").Ref<{
        visible: boolean;
        yoy: number;
        qoq: number;
        currentTotal: number;
        yoyTotal: number;
        qoqTotal: number;
    }>;
    style: import("vue").ComputedRef<IData>;
    renderUpDownResult: (baseValue: number, targetValue: number) => JSX.Element;
    miniStyle: import("vue").ComputedRef<IData>;
    reportUIModelStyle: import("vue").ComputedRef<any>;
    onDrillDetail: () => void;
    handleFormat: (value: number) => any;
    visibleComp: import("vue").WritableComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "drillDetail"[], "drillDetail", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    c: {
        type: PropType<IBIReportChartController>;
        required: true;
    };
    enableDrillDetail: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onDrillDetail?: ((...args: any[]) => any) | undefined;
}, {
    enableDrillDetail: boolean;
}, {}>;
export default _default;
