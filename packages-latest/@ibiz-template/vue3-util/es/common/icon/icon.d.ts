import { PropType, VNode } from 'vue';
import { ISysImage } from '@ibiz/model-core';
import { IIcon } from '@ibiz-template/runtime';
import './icon.scss';
export declare const IBizIcon: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, () => VNode | null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & Readonly<{}>, {
    baseDir: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=icon.d.ts.map