import { IUIActionGroupDetail } from '@ibiz/model-core';
import './tree-grid-ex-ua-column.scss';
import { TreeGridExUAColumnController, TreeGridExRowState } from '@ibiz-template/runtime';
export declare const TreeGridExUAColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof TreeGridExUAColumnController;
        required: true;
    };
    row: {
        type: typeof TreeGridExRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onStopPropagation: (e: MouseEvent) => void;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof TreeGridExUAColumnController;
        required: true;
    };
    row: {
        type: typeof TreeGridExRowState;
        required: true;
    };
}>>, {}, {}>;
export default TreeGridExUAColumn;
