import { IPanelField } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelAppTitleController } from './panel-app-title.controller';
import './panel-app-title.scss';
export declare const PanelAppTitle: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    controller: {
        type: typeof PanelAppTitleController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelAppTitleController;
    menuAlign: import("vue").ComputedRef<string>;
    showImgOnly: import("vue").ComputedRef<boolean>;
    handleClick: () => Promise<void>;
    isCollapse: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    controller: {
        type: typeof PanelAppTitleController;
        required: true;
    };
}>>, {}, {}>;
export default PanelAppTitle;
