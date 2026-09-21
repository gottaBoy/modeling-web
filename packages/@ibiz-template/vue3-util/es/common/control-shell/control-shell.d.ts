import { IControlProvider } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './control-shell.scss';
import { IControl } from '@ibiz/model-core';
export declare const IBizControlShell: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IControl>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isComplete: import("vue").Ref<boolean>;
    errMsg: import("vue").Ref<string>;
    provider: import("vue").Ref<IControlProvider | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IControl>;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=control-shell.d.ts.map