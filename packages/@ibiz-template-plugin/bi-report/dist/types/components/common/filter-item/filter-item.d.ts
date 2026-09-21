import { PropType } from 'vue';
import { IFilterNodeField, IModal } from '@ibiz-template/runtime';
import { ISchemaField } from '../../../interface';
export declare const FilterItem: import("vue").DefineComponent<{
    field: {
        type: PropType<ISchemaField>;
        required: true;
    };
    condition: {
        type: PropType<IFilterNodeField>;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    type: {
        type: PropType<"STATIC" | "DYNAMIC">;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onClose: () => void;
    onConfirm: () => void;
    renderContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_filter: IData) => true;
    mateChange: (_type: 'DYNAMIC' | 'STATIC') => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    field: {
        type: PropType<ISchemaField>;
        required: true;
    };
    condition: {
        type: PropType<IFilterNodeField>;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    type: {
        type: PropType<"STATIC" | "DYNAMIC">;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}>> & {
    onChange?: ((_filter: IData) => any) | undefined;
    onMateChange?: ((_type: "STATIC" | "DYNAMIC") => any) | undefined;
}, {}, {}>;
