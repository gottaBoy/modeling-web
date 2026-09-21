import { IFilterNodeGroup, IFilterNodeField, IFilterNode, SearchBarFilterController, SearchBarFilterItemsController, IFilterNodeItems } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './filter-tree.scss';
/** 不需要编辑器的OP */
export declare const ExcludeOPs: string[];
export declare const FilterTreeControl: import("vue").DefineComponent<{
    /**
     * 过滤项控制器集合
     */
    filterControllers: {
        type: PropType<SearchBarFilterController[]>;
        required: true;
    };
    /**
     * 过滤项树节点数据集合
     */
    filterNodes: {
        type: PropType<IFilterNode[]>;
        required: true;
    };
    /**
     * 父容器
     */
    parent: {
        type: StringConstructor;
        required: true;
    };
    filterMode: {
        type: PropType<"default" | "pql">;
        default: string;
    };
    customCond: {
        type: StringConstructor;
        default: string;
    };
    context: {
        type: PropType<IContext>;
    };
    params: {
        type: PropType<IParams>;
    };
    schemaEntityMap: {
        type: PropType<Map<string, string | undefined>>;
        default: () => Map<any, any>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderFilterGroup: (node: IFilterNodeGroup | IFilterNodeItems, itemsC?: SearchBarFilterItemsController, root?: boolean) => any;
    renderFilterItem: (node: IFilterNodeField, itemsC?: SearchBarFilterItemsController) => JSX.Element | undefined;
    onConfirm: () => void;
    onCancel: () => void;
    isInSearchBar: import("vue").ComputedRef<boolean>;
    UiFilterNodes: import("vue").ComputedRef<IFilterNode[]>;
    pqlEditor: import("vue").Ref<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("confirm" | "cancel" | "change" | "customCondChange")[], "confirm" | "cancel" | "change" | "customCondChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * 过滤项控制器集合
     */
    filterControllers: {
        type: PropType<SearchBarFilterController[]>;
        required: true;
    };
    /**
     * 过滤项树节点数据集合
     */
    filterNodes: {
        type: PropType<IFilterNode[]>;
        required: true;
    };
    /**
     * 父容器
     */
    parent: {
        type: StringConstructor;
        required: true;
    };
    filterMode: {
        type: PropType<"default" | "pql">;
        default: string;
    };
    customCond: {
        type: StringConstructor;
        default: string;
    };
    context: {
        type: PropType<IContext>;
    };
    params: {
        type: PropType<IParams>;
    };
    schemaEntityMap: {
        type: PropType<Map<string, string | undefined>>;
        default: () => Map<any, any>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onCustomCondChange?: ((...args: any[]) => any) | undefined;
}, {
    customCond: string;
    filterMode: "default" | "pql";
    schemaEntityMap: Map<string, string | undefined>;
}, {}>;
