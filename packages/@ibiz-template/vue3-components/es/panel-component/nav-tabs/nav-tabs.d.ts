import { PropType } from 'vue';
import './nav-tabs.scss';
import { TabsPaneContext } from 'element-plus';
import { IPanelRawItem } from '@ibiz/model-core';
import { NavTabsController } from './nav-tabs.controller';
export interface dropdownAction {
    text: string;
    value?: string;
}
export declare const NavTabs: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavTabsController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    actions: dropdownAction[];
    changePage: (pane: TabsPaneContext) => void;
    onTabRemove: (key: string) => void;
    handleCommand: (command: dropdownAction) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavTabsController;
        required: true;
    };
}>>, {}, {}>;
