import { PropType } from 'vue';
import { BIReportDesignController } from '../../controller';
/** BI报表选择组件 */
declare const _default: import("vue").DefineComponent<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    searchInput: import("vue").Ref<any>;
    renderSelectHeader: () => JSX.Element;
    renderSelectContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
