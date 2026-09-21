import { PropType } from 'vue';
import { BIReportDesignController } from '../../../controller';
declare const _default: import("vue").DefineComponent<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    caption: import("vue").ComputedRef<any>;
    onSave: () => void;
    onClose: () => Promise<void>;
    onReset: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
