export declare const IBizGanttControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEGantt>;
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
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
}, {
    c: import("@ibiz-template/runtime").GanttController;
    ns: import("@ibiz-template/core").Namespace;
    ganttRef: import("vue").Ref<IData | undefined>;
    isInited: import("vue").Ref<boolean>;
    data: import("vue").ComputedRef<import("@ibiz-template/runtime").ITreeNodeData[]>;
    locale: import("vue").ComputedRef<string>;
    columns: import("vue").ComputedRef<import("@ibiz/model-core").IDETreeColumn[]>;
    onCheck: (state: boolean, item: import("@ibiz-template/runtime").IGanttNodeData) => void;
    loading: import("vue").ComputedRef<boolean>;
    ganttStyle: import("vue").Ref<IData>;
    onNodeClick: (nodeData: import("@ibiz-template/runtime").IGanttNodeData, evt: MouseEvent) => void;
    onNodeDbClick: (nodeData: import("@ibiz-template/runtime").IGanttNodeData) => void;
    onNodeExpand: (nodeData: import("@ibiz-template/runtime").IGanttNodeData) => void;
    onNodeCollapse: (nodeData: import("@ibiz-template/runtime").IGanttNodeData) => void;
    renderContent: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    renderSetting: () => JSX.Element | null;
    onSliderMove: (sliders: IData[]) => void;
    renderNoData: () => false | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    allowDrop: (draggingNode: import("@ibiz-template/runtime").IGanttNodeData, dropNode: import("@ibiz-template/runtime").IGanttNodeData, type: import("element-plus/es/components/tree/src/tree.type").AllowDropType) => boolean;
    allowDrag: (draggingNode: import("@ibiz-template/runtime").IGanttNodeData) => boolean;
    handleDrop: (draggingNode: import("@ibiz-template/runtime").IGanttNodeData, dropNode: import("@ibiz-template/runtime").IGanttNodeData, dropType: import("element-plus/es/components/tree/src/tree.type").NodeDropType) => void;
    onHeaderDragend: (index: number, width: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEGantt>;
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
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    singleSelect: {
        type: BooleanConstructor;
        default: undefined;
    };
}>>, {
    params: IParams;
    mdctrlActiveMode: number;
    singleSelect: boolean;
    loadDefault: boolean;
}, {}>>;
export default IBizGanttControl;
