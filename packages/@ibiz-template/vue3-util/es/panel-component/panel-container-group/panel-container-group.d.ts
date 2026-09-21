import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelContainerGroupController } from './panel-container-group.controller';
import './panel-container-group.scss';
export declare const PanelContainerGroup: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerGroupController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
    changeCollapse: () => void;
    isCollapse: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerGroupController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-container-group.d.ts.map