import { PropType } from 'vue';
import './devtool-select-option.scss';
export declare const OptionComponent: import("vue").DefineComponent<{
    label: {
        type: PropType<string>;
    };
    value: {
        type: PropType<string>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    clickItem: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: PropType<string>;
    };
    value: {
        type: PropType<string>;
    };
}>>, {}, {}>;
export default OptionComponent;
