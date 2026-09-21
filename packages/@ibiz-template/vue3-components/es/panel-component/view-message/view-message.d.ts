import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
export declare const ViewMessage: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    view: import("@ibiz-template/runtime").IViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
