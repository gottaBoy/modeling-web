import { PropType, VNode } from 'vue';
import './pql-editor-suggestion.scss';
export declare const IBizPqlEditorSuggestion: import("vue").DefineComponent<{
    items: {
        type: PropType<IData[]>;
        default: () => never[];
    };
    renderItem: {
        type: PropType<(_item: IData) => VNode>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleClick: (item: IData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (_item: IData) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<IData[]>;
        default: () => never[];
    };
    renderItem: {
        type: PropType<(_item: IData) => VNode>;
    };
}>> & {
    onSelect?: ((_item: IData) => any) | undefined;
}, {
    items: IData[];
}, {}>;
