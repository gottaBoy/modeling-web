import { IPanelButtonList } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelButtonListController } from './panel-button-list.controller';
import './panel-button-list.scss';
export declare const PanelButtonList: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelButtonList>;
        required: true;
    };
    controller: {
        type: typeof PanelButtonListController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleClick: (e: MouseEvent, actionId: string) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelButtonList>;
        required: true;
    };
    controller: {
        type: typeof PanelButtonListController;
        required: true;
    };
}>>, {}, {}>;
export default PanelButtonList;
