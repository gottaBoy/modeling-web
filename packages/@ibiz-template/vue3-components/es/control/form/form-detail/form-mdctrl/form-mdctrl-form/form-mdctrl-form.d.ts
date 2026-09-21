import { EventBase, FormMDCtrlFormController } from '@ibiz-template/runtime';
import './form-mdctrl-form.scss';
export declare const FormMDCtrlForm: import("vue").DefineComponent<{
    controller: {
        type: typeof FormMDCtrlFormController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    showActions: import("vue").ComputedRef<boolean>;
    onCreated: (id: string, event: EventBase) => void;
    renderAddBtn: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof FormMDCtrlFormController;
        required: true;
    };
}>>, {}, {}>;
