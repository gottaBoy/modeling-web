export declare const IBizContextMenuControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEContextMenu>;
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
    mode: {
        type: import("vue").PropType<"dropdown" | "buttons">;
        default: string;
    };
    groupLevelKeys: {
        type: import("vue").PropType<number[]>;
        default: number[];
    };
    nodeData: {
        type: import("vue").PropType<import("@ibiz-template/runtime").ITreeNodeData>;
        required: true;
    };
    nodeModel: {
        type: import("vue").PropType<import("@ibiz/model-core").IDETreeNode>;
        required: true;
    };
    actionCallBack: {
        type: FunctionConstructor;
    };
}, {
    c: import("@ibiz-template/runtime").ContextMenuController;
    ns: import("@ibiz-template/core").Namespace;
    expandDetails: import("vue").Ref<import("@ibiz/model-core").IDETBUIActionItem[]>;
    groupDetails: import("vue").Ref<import("@ibiz/model-core").IDETBUIActionItem[]>;
    groupButtonRef: import("vue").Ref<any>;
    dropdownRef: import("vue").Ref<any>;
    popoverVisible: import("vue").Ref<boolean>;
    handleClick: (detail: import("@ibiz/model-core").IDETBUIActionItem, e: MouseEvent) => Promise<void>;
    renderActions: (items: import("@ibiz/model-core").IDETBUIActionItem[], isExpand?: boolean) => (JSX.Element | (false | JSX.Element | undefined)[] | ((false | JSX.Element | undefined)[] | null)[] | null | undefined)[];
    renderActionButton: (detail: import("@ibiz/model-core").IAppDEUIActionGroupDetail, isExpand?: boolean) => (false | JSX.Element | undefined)[] | null;
    calcActionItemClass: (item: import("@ibiz/model-core").IDETBUIActionItem) => string[];
    actionDetails: import("@ibiz/model-core").IDETBUIActionItem[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEContextMenu>;
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
    mode: {
        type: import("vue").PropType<"dropdown" | "buttons">;
        default: string;
    };
    groupLevelKeys: {
        type: import("vue").PropType<number[]>;
        default: number[];
    };
    nodeData: {
        type: import("vue").PropType<import("@ibiz-template/runtime").ITreeNodeData>;
        required: true;
    };
    nodeModel: {
        type: import("vue").PropType<import("@ibiz/model-core").IDETreeNode>;
        required: true;
    };
    actionCallBack: {
        type: FunctionConstructor;
    };
}>>, {
    mode: "dropdown" | "buttons";
    groupLevelKeys: number[];
    params: IParams;
}, {}>>;
export default IBizContextMenuControl;
