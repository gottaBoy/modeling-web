import { PropType } from 'vue';
import { ITabExpPanel } from '@ibiz/model-core';
import './tab-exp-panel.scss';
import { IControlProvider, TabExpPanelController } from '@ibiz-template/runtime';
export declare const TabExpPanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<ITabExpPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    defaultTabName: {
        type: StringConstructor;
        required: false;
    };
}, {
    c: TabExpPanelController;
    ns: import("@ibiz-template/core").Namespace;
    tabPosition: string;
    handleTabChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<ITabExpPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    defaultTabName: {
        type: StringConstructor;
        required: false;
    };
}>>, {
    params: IParams;
}, {}>;
