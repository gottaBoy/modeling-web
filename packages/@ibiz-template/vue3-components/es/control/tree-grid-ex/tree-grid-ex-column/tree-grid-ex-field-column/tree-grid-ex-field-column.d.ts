import { IUIActionGroupDetail } from '@ibiz/model-core';
import { TreeGridExFieldColumnController, TreeGridExRowState } from '@ibiz-template/runtime';
import './tree-grid-ex-field-column.scss';
export declare const TreeGridExFieldColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof TreeGridExFieldColumnController;
        required: true;
    };
    row: {
        type: typeof TreeGridExRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    nodeColumn: import("vue").ComputedRef<import("@ibiz-template/runtime").TreeGridExNodeColumnController | undefined>;
    fieldValue: import("vue").ComputedRef<any>;
    showText: import("vue").ComputedRef<any>;
    clickable: import("vue").ComputedRef<any>;
    tooltip: import("vue").ComputedRef<any>;
    onInfoTextChange: (text: string) => void;
    onTextClick: (event: MouseEvent) => void;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof TreeGridExFieldColumnController;
        required: true;
    };
    row: {
        type: typeof TreeGridExRowState;
        required: true;
    };
}>>, {}, {}>;
export default TreeGridExFieldColumn;
