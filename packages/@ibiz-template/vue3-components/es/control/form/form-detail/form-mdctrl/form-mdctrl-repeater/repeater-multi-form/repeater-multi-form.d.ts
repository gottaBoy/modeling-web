import { EventBase, FormMDCtrlRepeaterController } from '@ibiz-template/runtime';
export declare const RepeaterMultiForm: import("vue").DefineComponent<{
    controller: {
        type: typeof FormMDCtrlRepeaterController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onValueChange: (value: IData, index: number) => void;
    onCreated: (index: number, event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: IData[]) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof FormMDCtrlRepeaterController;
        required: true;
    };
}>> & {
    onChange?: ((_value: IData[]) => any) | undefined;
}, {}, {}>;
