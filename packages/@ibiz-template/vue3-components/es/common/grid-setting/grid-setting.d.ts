import { PropType } from 'vue';
import { GridController, IColumnState } from '@ibiz-template/runtime';
import './grid-setting.scss';
export declare const IBizGridSetting: import("vue").DefineComponent<{
    columnStates: {
        type: PropType<IColumnState[]>;
        required: true;
    };
    controller: {
        type: PropType<GridController<import("@ibiz/model-core").IDEGrid, import("@ibiz-template/runtime").IGridState, import("@ibiz-template/runtime").IGridEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: GridController<import("@ibiz/model-core").IDEGrid, import("@ibiz-template/runtime").IGridState, import("@ibiz-template/runtime").IGridEvent>;
    dragColumnStates: import("vue").ComputedRef<{
        key: string;
        caption: string;
        hidden: boolean;
        hideMode: number;
        uaColumn: boolean;
        fixed?: "left" | "right" | undefined;
        adaptive?: boolean | undefined;
        columnWidth?: number | undefined;
    }[]>;
    isDraggable: import("vue").ComputedRef<boolean>;
    handleClick: (dragColumnState: IColumnState) => void;
    onDragChange: (evt: IData) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    columnStates: {
        type: PropType<IColumnState[]>;
        required: true;
    };
    controller: {
        type: PropType<GridController<import("@ibiz/model-core").IDEGrid, import("@ibiz-template/runtime").IGridState, import("@ibiz-template/runtime").IGridEvent>>;
        required: true;
    };
}>>, {}, {}>;
