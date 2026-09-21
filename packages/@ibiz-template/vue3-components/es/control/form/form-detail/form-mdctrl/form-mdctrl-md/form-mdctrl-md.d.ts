import { EventBase, FormMDCtrlMDController } from '@ibiz-template/runtime';
import './form-mdctrl-md.scss';
export declare const FormMDCtrlMD: import("vue").DefineComponent<{
    controller: {
        type: typeof FormMDCtrlMDController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    showActions: import("vue").ComputedRef<boolean>;
    isSelected: import("vue").Ref<boolean>;
    onCreated: (event: EventBase) => void;
    onSelectionChange: (event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof FormMDCtrlMDController;
        required: true;
    };
}>>, {}, {}>;
