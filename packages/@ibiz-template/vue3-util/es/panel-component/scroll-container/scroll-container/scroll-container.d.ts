import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { ScrollContainerController } from './scroll-container.controller';
import './scroll-container.scss';
export declare const ScrollContainer: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof ScrollContainerController;
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
        type: typeof ScrollContainerController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=scroll-container.d.ts.map