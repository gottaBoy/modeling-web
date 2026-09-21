import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelContainerController } from './panel-container.controller';
import './panel-container.scss';
export declare const PanelContainer: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
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
        type: typeof PanelContainerController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-container.d.ts.map