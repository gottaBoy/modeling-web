import { PropType } from 'vue';
import './coop-alert.scss';
export declare const IBizCoopAlert: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
    };
    type: {
        type: PropType<"success" | "warning" | "error" | "info">;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    type: {
        type: PropType<"success" | "warning" | "error" | "info">;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    type: "success" | "warning" | "error" | "info";
    showIcon: boolean;
    closable: boolean;
}, {}>;
