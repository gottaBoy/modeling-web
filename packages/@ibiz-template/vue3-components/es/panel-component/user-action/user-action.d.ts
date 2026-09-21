import { PropType } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import './user-action.scss';
export declare const UserAction: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    sysImage: import("@ibiz/model-core").ISysImage | undefined;
    onClick: (event: Event) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: PropType<PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}>>, {}, {}>;
