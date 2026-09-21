import { PropType } from 'vue';
import { ISchemaField } from '../../../../interface';
declare const _default: import("vue").DefineComponent<{
    fields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    fieldIconMap: {
        type: PropType<Map<string, string>>;
        default: () => Map<any, any>;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    currentValue: import("vue").Ref<string>;
    pqlEditor: import("vue").Ref<any>;
    handleChange: (value: string) => void;
    handleCancel: (e: MouseEvent) => void;
    handleConfirm: (e: MouseEvent) => void;
    renderItem: (item: IData) => JSX.Element[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: () => true;
    confirm: (_value: string) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    fields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    fieldIconMap: {
        type: PropType<Map<string, string>>;
        default: () => Map<any, any>;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
    };
}>> & {
    onConfirm?: ((_value: string) => any) | undefined;
    onCancel?: (() => any) | undefined;
}, {
    value: string;
    fields: ISchemaField[];
    fieldIconMap: Map<string, string>;
}, {}>;
export default _default;
