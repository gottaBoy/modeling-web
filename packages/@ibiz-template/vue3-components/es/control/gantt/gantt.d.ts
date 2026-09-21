import { PropType, VNode, Ref } from 'vue';
import { IDEGantt, IDETreeColumn } from '@ibiz/model-core';
import { IControlProvider, GanttController, IGanttNodeData } from '@ibiz-template/runtime';
import { AllowDropType, NodeDropType } from 'element-plus/es/components/tree/src/tree.type';
import './gantt.scss';
export declare const GanttControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEGantt>;
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
    c: GanttController;
    ns: import("@ibiz-template/core").Namespace;
    ganttRef: Ref<IData | undefined>;
    isInited: Ref<boolean>;
    data: import("vue").ComputedRef<import("@ibiz-template/runtime").ITreeNodeData[]>;
    locale: import("vue").ComputedRef<string>;
    columns: import("vue").ComputedRef<IDETreeColumn[]>;
    onCheck: (state: boolean, item: IGanttNodeData) => void;
    loading: import("vue").ComputedRef<boolean>;
    ganttStyle: Ref<IData>;
    onNodeClick: (nodeData: IGanttNodeData, evt: MouseEvent) => void;
    onNodeDbClick: (nodeData: IGanttNodeData) => void;
    onNodeExpand: (nodeData: IGanttNodeData) => void;
    onNodeCollapse: (nodeData: IGanttNodeData) => void;
    renderContent: () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    renderSetting: () => JSX.Element | null;
    onSliderMove: (sliders: IData[]) => void;
    renderNoData: () => VNode | false;
    allowDrop: (draggingNode: IGanttNodeData, dropNode: IGanttNodeData, type: AllowDropType) => boolean;
    allowDrag: (draggingNode: IGanttNodeData) => boolean;
    handleDrop: (draggingNode: IGanttNodeData, dropNode: IGanttNodeData, dropType: NodeDropType) => void;
    onHeaderDragend: (index: number, width: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEGantt>;
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
}, {}>;
