import { PropType } from 'vue';
import './searchform-buttons.scss';
import { IPanelRawItem } from '@ibiz/model-core';
import { SearchFormButtonsController } from './searchform-buttons.controller';
export declare const SearchFormButtons: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof SearchFormButtonsController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: SearchFormButtonsController;
    onSearchButtonClick: () => void;
    onResetButtonClick: () => void;
    saveFilterConfirm: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof SearchFormButtonsController;
        required: true;
    };
}>>, {}, {}>;
