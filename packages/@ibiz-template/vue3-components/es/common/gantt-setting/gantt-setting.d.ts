import { PropType } from 'vue';
import { IModal, IColumnState } from '@ibiz-template/runtime';
import './gantt-setting.scss';
type ListType = 'optional' | 'selected';
export declare const IBizGanttSetting: import("vue").DefineComponent<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    columnStates: {
        type: PropType<IColumnState[]>;
        required: true;
    };
    mustShowColumns: {
        type: PropType<string[]>;
        required: true;
        default: () => string[];
    };
    limitsize: {
        type: NumberConstructor;
        default: number;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    optionalInput: import("vue").Ref<string>;
    selectedInput: import("vue").Ref<string>;
    states: import("vue").Ref<{
        key: string;
        caption: string;
        hidden: boolean;
        hideMode: number;
        uaColumn: boolean;
        fixed?: "left" | "right" | undefined;
        adaptive?: boolean | undefined;
        columnWidth?: number | undefined;
    }[]>;
    renderSearchList: (listData?: IColumnState[], type?: ListType) => JSX.Element;
    onClose: () => void;
    onConfirm: () => void;
    onResultDefault: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    columnStates: {
        type: PropType<IColumnState[]>;
        required: true;
    };
    mustShowColumns: {
        type: PropType<string[]>;
        required: true;
        default: () => string[];
    };
    limitsize: {
        type: NumberConstructor;
        default: number;
    };
}>> & {}, {
    mustShowColumns: string[];
    limitsize: number;
}, {}>;
export {};
