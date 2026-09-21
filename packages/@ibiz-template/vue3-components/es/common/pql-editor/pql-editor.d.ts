import { PropType, VNode } from 'vue';
import { IDomEditor } from '@wangeditor/editor';
import { ISchemaField } from '../../interface';
import './pql-editor.scss';
export declare const IBizPqlEditor: import("vue").DefineComponent<{
    fields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
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
    renderItem: {
        type: PropType<(_item: IData) => VNode>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    editorRef: import("vue").Ref<HTMLElement | undefined>;
    editor: IDomEditor | undefined;
    errorMsg: import("vue").Ref<string | undefined>;
    verify: () => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_value: string) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    fields: {
        type: PropType<ISchemaField[]>;
        default: () => never[];
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
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
    renderItem: {
        type: PropType<(_item: IData) => VNode>;
    };
}>> & {
    onChange?: ((_value: string) => any) | undefined;
}, {
    value: string;
    fields: ISchemaField[];
    readonly: boolean;
    placeholder: string;
}, {}>;
