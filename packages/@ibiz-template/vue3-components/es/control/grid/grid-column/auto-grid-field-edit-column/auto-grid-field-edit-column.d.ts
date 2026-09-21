import { PropType } from 'vue';
import { GridFieldEditColumnController, GridRowState } from '@ibiz-template/runtime';
export declare const AutoGridFieldEditColumn: import("vue").DefineComponent<{
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
    c: GridFieldEditColumnController;
    ns: import("@ibiz-template/core").Namespace;
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
export default AutoGridFieldEditColumn;
