import { PropType, Ref } from 'vue';
import { IAppDEUIActionGroupDetail, IDEContextMenu, IDETBUIActionItem, IDETreeNode } from '@ibiz/model-core';
import './context-menu.scss';
import { ContextMenuController, ITreeNodeData } from '@ibiz-template/runtime';
export declare const ContextMenuControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEContextMenu>;
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
    mode: {
        type: PropType<"dropdown" | "buttons">;
        default: string;
    };
    groupLevelKeys: {
        type: PropType<number[]>;
        default: number[];
    };
    nodeData: {
        type: PropType<ITreeNodeData>;
        required: true;
    };
    nodeModel: {
        type: PropType<IDETreeNode>;
        required: true;
    };
    actionCallBack: {
        type: FunctionConstructor;
    };
}, {
    c: ContextMenuController;
    ns: import("@ibiz-template/core").Namespace;
    expandDetails: Ref<IDETBUIActionItem[]>;
    groupDetails: Ref<IDETBUIActionItem[]>;
    groupButtonRef: Ref<any>;
    dropdownRef: Ref<any>;
    popoverVisible: Ref<boolean>;
    handleClick: (detail: IDETBUIActionItem, e: MouseEvent) => Promise<void>;
    renderActions: (items: IDETBUIActionItem[], isExpand?: boolean) => (JSX.Element | (false | JSX.Element | undefined)[] | ((false | JSX.Element | undefined)[] | null)[] | null | undefined)[];
    renderActionButton: (detail: IAppDEUIActionGroupDetail, isExpand?: boolean) => (false | JSX.Element | undefined)[] | null;
    calcActionItemClass: (item: IDETBUIActionItem) => string[];
    actionDetails: IDETBUIActionItem[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEContextMenu>;
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
    mode: {
        type: PropType<"dropdown" | "buttons">;
        default: string;
    };
    groupLevelKeys: {
        type: PropType<number[]>;
        default: number[];
    };
    nodeData: {
        type: PropType<ITreeNodeData>;
        required: true;
    };
    nodeModel: {
        type: PropType<IDETreeNode>;
        required: true;
    };
    actionCallBack: {
        type: FunctionConstructor;
    };
}>>, {
    mode: "dropdown" | "buttons";
    groupLevelKeys: number[];
    params: IParams;
}, {}>;
