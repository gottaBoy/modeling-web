import { PropType } from 'vue';
import './badge.scss';
export declare const IBizBadge: import("vue").DefineComponent<{
    value: {
        type: NumberConstructor;
        required: true;
    };
    type: {
        type: PropType<"primary" | "success" | "warning" | "danger" | "info">;
        default: string;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    counterMode: {
        type: NumberConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: NumberConstructor;
        required: true;
    };
    type: {
        type: PropType<"primary" | "success" | "warning" | "danger" | "info">;
        default: string;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    counterMode: {
        type: NumberConstructor;
    };
}>>, {
    type: "primary" | "success" | "warning" | "danger" | "info";
    max: number;
}, {}>;
//# sourceMappingURL=badge.d.ts.map