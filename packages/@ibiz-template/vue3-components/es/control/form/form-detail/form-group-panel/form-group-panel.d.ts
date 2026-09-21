import { FormGroupPanelController } from '@ibiz-template/runtime';
import { IDEFormGroupPanel, IUIActionGroupDetail } from '@ibiz/model-core';
import { PropType } from 'vue';
import './form-group-panel.scss';
export declare const FormGroupPanel: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormGroupPanel>;
        required: true;
    };
    controller: {
        type: typeof FormGroupPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
    changeCollapse: () => void;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormGroupPanel>;
        required: true;
    };
    controller: {
        type: typeof FormGroupPanelController;
        required: true;
    };
}>>, {}, {}>;
export default FormGroupPanel;
