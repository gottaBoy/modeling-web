import { PropType } from 'vue';
import './badge.scss';
export declare const IBizBadge: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
    };
    counterMode: {
        type: NumberConstructor;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    maxValue: import("vue").ComputedRef<number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    };
    counterMode: {
        type: NumberConstructor;
    };
}>> & Readonly<{}>, {
    type: "primary" | "success" | "warning" | "danger" | "info";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=badge.d.ts.map