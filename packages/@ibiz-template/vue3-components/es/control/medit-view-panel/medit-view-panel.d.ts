import { PropType, Ref } from 'vue';
import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { IPanelUiItem, MEditViewPanelController } from '@ibiz-template/runtime';
import './medit-view-panel.scss';
export declare const MEditViewPanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEMultiEditViewPanel>;
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
}, {
    c: MEditViewPanelController;
    ns: import("@ibiz-template/core").Namespace;
    panelContent: Ref<Element | null>;
    handleDelete: (item: IPanelUiItem) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEMultiEditViewPanel>;
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
}>>, {
    params: IParams;
}, {}>;
