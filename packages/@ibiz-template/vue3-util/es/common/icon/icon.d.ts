import { PropType, VNode } from 'vue';
import { ISysImage } from '@ibiz/model-core';
import { IIcon } from '@ibiz-template/runtime';
import './icon.scss';
export declare const IBizIcon: import("vue").DefineComponent<{
    icon: {
        type: PropType<ISysImage | IIcon>;
    };
    size: {
        type: PropType<"small" | "medium" | "large">;
    };
    baseDir: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    icon: {
        type: PropType<ISysImage | IIcon>;
    };
    size: {
        type: PropType<"small" | "medium" | "large">;
    };
    baseDir: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    baseDir: string;
}, {}>;
//# sourceMappingURL=icon.d.ts.map