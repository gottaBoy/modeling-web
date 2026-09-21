import { GridGroupColumnController, GridRowState } from '@ibiz-template/runtime';
export declare const GridGroupColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof GridGroupColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof GridGroupColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}>>, {}, {}>;
export default GridGroupColumn;
