import { PropType } from 'vue';
import { GridFieldEditColumnController, GridRowState } from '@ibiz-template/runtime';
import './grid-field-edit-column.scss';
export declare const GridFieldEditColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof GridFieldEditColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        required: false;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: GridFieldEditColumnController;
    componentRef: import("vue").Ref<any>;
    tooltip: import("vue").ComputedRef<string | undefined>;
    rowDataChange: (val: unknown, name?: string, ignore?: boolean) => Promise<void>;
    onInfoTextChange: (text: string) => void;
    gridEditItemProps: IData;
    editorProps: IData;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof GridFieldEditColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        required: false;
    };
}>>, {}, {}>;
export default GridFieldEditColumn;
