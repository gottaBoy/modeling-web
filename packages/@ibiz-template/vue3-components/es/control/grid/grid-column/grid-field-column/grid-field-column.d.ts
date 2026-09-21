import { ILayoutPanel, IPanel, IUIActionGroupDetail } from '@ibiz/model-core';
import { Ref, VNode } from 'vue';
import { GridFieldColumnController, GridRowState } from '@ibiz-template/runtime';
import './grid-field-column.scss';
export declare const GridFieldColumn: import("vue").DefineComponent<{
    controller: {
        type: typeof GridFieldColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCellClick: (event: MouseEvent) => void;
    onTextClick: (event: MouseEvent) => void;
    onInfoTextChange: (text: string) => void;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
    CustomHtml: Ref<string | undefined>;
    fieldValue: import("vue").ComputedRef<any>;
    formatValue: import("vue").ComputedRef<string>;
    percent: import("vue").ComputedRef<string>;
    codeListValue: import("vue").ComputedRef<string>;
    tooltip: import("vue").ComputedRef<string | undefined>;
    zIndex: number | undefined;
    codeListItems: Ref<readonly IData[]>;
    hiddenEmpty: import("vue").ComputedRef<boolean>;
    findLayoutPanel: () => IPanel | undefined;
    renderPanelItemLayout: (item: IData, modelData: ILayoutPanel) => VNode;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof GridFieldColumnController;
        required: true;
    };
    row: {
        type: typeof GridRowState;
        required: true;
    };
}>>, {}, {}>;
export default GridFieldColumn;
