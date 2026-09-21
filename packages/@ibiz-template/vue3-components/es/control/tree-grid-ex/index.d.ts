export declare const IBizTreeGridExControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDETree>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
}, {
    c: import("@ibiz-template/runtime").TreeGridExController<import("@ibiz/model-core").IDETree, import("@ibiz-template/runtime").ITreeGridExState, import("@ibiz-template/runtime").ITreeGridExEvent>;
    ns: import("@ibiz-template/core").Namespace;
    tableRef: import("vue").Ref<IData | undefined>;
    elTableData: import("vue").ComputedRef<IData[]>;
    renderColumns: import("vue").ComputedRef<import("@ibiz/model-core").IDETreeColumn[]>;
    tableRefreshKey: import("vue").Ref<string>;
    renderNoData: () => false | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    loadData: (item: IData, treeNode: unknown, callback: (nodes: IData[]) => void) => Promise<void>;
    onRowClick: (data: IData, _column: IData, event: MouseEvent) => Promise<void>;
    onExpandChange: (row: IData, expanded: boolean) => void;
    renderPopover: () => JSX.Element[];
    handleRowClassName: ({ row }: {
        row: IData;
    }) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDETree>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>>;
export default IBizTreeGridExControl;
