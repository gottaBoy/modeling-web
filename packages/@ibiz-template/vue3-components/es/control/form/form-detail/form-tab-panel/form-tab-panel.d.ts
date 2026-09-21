import { PropType } from 'vue';
import './form-tab-panel.scss';
import { IDEFormTabPanel } from '@ibiz/model-core';
import { FormTabPanelController } from '@ibiz-template/runtime';
export declare const FormTabPanel: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormTabPanel>;
        required: true;
    };
    controller: {
        type: typeof FormTabPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onTabClick: (tabIns: IData, event: MouseEvent) => void;
    counterData: IData;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormTabPanel>;
        required: true;
    };
    controller: {
        type: typeof FormTabPanelController;
        required: true;
    };
}>>, {}, {}>;
export default FormTabPanel;
