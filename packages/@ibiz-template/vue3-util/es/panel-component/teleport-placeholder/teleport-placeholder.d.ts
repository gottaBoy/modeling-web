import { IPanelRawItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import './teleport-placeholder.scss';
import { TeleportPlaceholderController } from './teleport-placeholder.controller';
export declare const TeleportPlaceholder: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<TeleportPlaceholderController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<TeleportPlaceholderController>;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=teleport-placeholder.d.ts.map