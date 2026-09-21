import { PropType, VNode } from 'vue';
import { IBIReportGridController } from '../../../interface';
declare const _default: import("vue").DefineComponent<{
    c: {
        type: PropType<IBIReportGridController>;
        required: true;
    };
}, {
    ns: Namespace;
    controller: IBIReportGridController;
    handleControllerAppear: (chartController: IData) => void;
    renderNoData: () => VNode | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    c: {
        type: PropType<IBIReportGridController>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
