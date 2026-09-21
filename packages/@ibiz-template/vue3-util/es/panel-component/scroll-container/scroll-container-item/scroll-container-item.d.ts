import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { ScrollContainerItemController } from './scroll-container-item.controller';
import './scroll-container-item.scss';
export declare const ScrollContainerItem: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof ScrollContainerItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof ScrollContainerItemController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=scroll-container-item.d.ts.map