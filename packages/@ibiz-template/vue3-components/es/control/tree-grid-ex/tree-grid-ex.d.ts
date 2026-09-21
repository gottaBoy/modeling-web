import { PropType, VNode } from 'vue';
import { IDETreeColumn } from '@ibiz/model-core';
import { IControlProvider, TreeGridExController } from '@ibiz-template/runtime';
import './tree-grid-ex.scss';
export declare const TreeGridExControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDETree>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}, {
    c: TreeGridExController<import("@ibiz/model-core").IDETree, import("@ibiz-template/runtime").ITreeGridExState, import("@ibiz-template/runtime").ITreeGridExEvent>;
    ns: import("@ibiz-template/core").Namespace;
    tableRef: import("vue").Ref<IData | undefined>;
    elTableData: import("vue").ComputedRef<IData[]>;
    renderColumns: import("vue").ComputedRef<IDETreeColumn[]>;
    tableRefreshKey: import("vue").Ref<string>;
    renderNoData: () => VNode | false;
    loadData: (item: IData, treeNode: unknown, callback: (nodes: IData[]) => void) => Promise<void>;
    onRowClick: (data: IData, _column: IData, event: MouseEvent) => Promise<void>;
    onExpandChange: (row: IData, expanded: boolean) => void;
    renderPopover: () => JSX.Element[];
    handleRowClassName: ({ row }: {
        row: IData;
    }) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDETree>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>;
