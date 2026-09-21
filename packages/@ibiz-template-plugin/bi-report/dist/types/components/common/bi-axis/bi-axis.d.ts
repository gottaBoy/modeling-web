import { IModal } from '@ibiz-template/runtime';
import { PropType } from 'vue';
export declare const BIAxis: import("vue").DefineComponent<{
    value: {
        type: StringConstructor;
        default: string;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderSelectIcon: () => JSX.Element;
    onClick: (tag: 'LEFT' | 'RIGHT') => void;
    onMouseLevel: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    value: string;
}, {}>;
