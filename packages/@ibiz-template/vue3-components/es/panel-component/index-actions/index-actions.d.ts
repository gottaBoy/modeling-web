import { PanelContainerController } from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import './index-actions.scss';
export declare const IndexActions: import("vue").DefineComponent<{
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
    isCollapse: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>>, {}, {}>;
