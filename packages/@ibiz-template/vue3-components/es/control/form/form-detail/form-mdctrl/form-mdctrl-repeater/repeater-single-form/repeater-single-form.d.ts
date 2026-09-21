import { PropType } from 'vue';
import { EventBase, FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
import './repeater-single-form.scss';
export declare const RepeaterSingleForm: import("vue").DefineComponent<{
    data: {
        type: PropType<IData>;
        required: true;
    };
    controller: {
        type: typeof FormMDCtrlRepeaterController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onFormDataChange: (event: EventBase) => void;
    onCreated: (event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: IData) => true;
    created: (_value: EventBase) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<IData>;
        required: true;
    };
    controller: {
        type: typeof FormMDCtrlRepeaterController;
        required: true;
    };
}>> & {
    onChange?: ((_value: IData) => any) | undefined;
    onCreated?: ((_value: EventBase) => any) | undefined;
}, {}, {}>;
