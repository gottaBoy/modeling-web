import { IUIActionGroupDetail } from '@ibiz/model-core';
import './grid-ua-column.scss';
import { GridUAColumnController, GridRowState } from '@ibiz-template/runtime';
export declare const GridUAColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof GridUAColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onStopPropagation: (e: MouseEvent) => void;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof GridUAColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}>>, {}, {}>;
export default GridUAColumn;
