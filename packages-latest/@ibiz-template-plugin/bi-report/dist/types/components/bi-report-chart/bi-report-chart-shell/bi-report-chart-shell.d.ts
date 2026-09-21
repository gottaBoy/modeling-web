import { PropType } from 'vue';
import { IBIReportChartController } from '../../../interface';
declare const _default: import("vue").DefineComponent<{
    c: {
        type: PropType<IBIReportChartController>;
        required: true;
    };
}, {
    ns: Namespace;
    controller: IBIReportChartController;
    handleControllerAppear: (chartController: IData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    c: {
        type: PropType<IBIReportChartController>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
