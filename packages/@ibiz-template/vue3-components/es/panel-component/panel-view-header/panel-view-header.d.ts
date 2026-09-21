import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import './panel-view-header.scss';
export declare const PanelViewHeader: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isCollapse: import("vue").Ref<boolean>;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    changeCollapse: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
