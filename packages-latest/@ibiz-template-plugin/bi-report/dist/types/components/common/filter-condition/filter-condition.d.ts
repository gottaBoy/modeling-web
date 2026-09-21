import { PropType } from 'vue';
import { IFilterNodeGroup } from '@ibiz-template/runtime';
import { IFilterCondition, ISchemaField } from '../../../interface';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<IFilterNodeGroup>;
    };
    schemaFields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    borderMode: {
        type: PropType<"BORDER" | "DEFAULT">;
        default: string;
    };
}, {
    ns: Namespace;
    items: import("vue").Ref<{
        key: string;
        connection: string;
        field: string;
        valueOP: string;
        value?: unknown;
        editor?: any;
        editorProvider?: any;
    }[]>;
    connectionItems: import("vue").Ref<{
        text: string;
        value: string;
    }[]>;
    filterModeMap: Map<string, string>;
    schemaFieldMap: import("vue").Ref<Map<string, ISchemaField>>;
    handleAdd: () => Promise<void>;
    handleRemove: (index: number) => void;
    renderEditor: (item: IFilterCondition) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null | undefined;
    handleConnectionChange: (item: IFilterCondition) => void;
    handleFieldChange: (item: IFilterCondition) => Promise<void>;
    handleValueOPChange: (item: IFilterCondition) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: IFilterNodeGroup | null) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<IFilterNodeGroup>;
    };
    schemaFields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
    borderMode: {
        type: PropType<"BORDER" | "DEFAULT">;
        default: string;
    };
}>> & {
    onChange?: ((_value: any) => any) | undefined;
}, {
    schemaFields: ISchemaField[];
    disabled: boolean;
    borderMode: "BORDER" | "DEFAULT";
}, {}>;
export default _default;
