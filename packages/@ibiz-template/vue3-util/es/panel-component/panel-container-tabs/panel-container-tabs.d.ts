import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import './panel-container-tabs.scss';
import { PanelContainerController } from '../panel-container/panel-container.controller';
export declare const PanelContainerTabs: import("vue").DefineComponent<{
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
//# sourceMappingURL=panel-container-tabs.d.ts.map