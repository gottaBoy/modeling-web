import { IPanelTabPanel } from '@ibiz/model-core';
import { PropType } from 'vue';
import './panel-tab-panel.scss';
import { PanelTabPanelController } from './panel-tab-panel.controller';
export declare const PanelTabPanel: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelTabPanel>;
        required: true;
    };
    controller: {
        type: typeof PanelTabPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    state: import("./panel-tab-panel.state").PanelTabPanelState;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    onTabClick: (tabIns: IData, event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelTabPanel>;
        required: true;
    };
    controller: {
        type: typeof PanelTabPanelController;
        required: true;
    };
}>>, {}, {}>;
