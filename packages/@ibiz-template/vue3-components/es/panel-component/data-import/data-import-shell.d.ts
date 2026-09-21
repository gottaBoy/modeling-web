import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
import './data-import-shell.scss';
export declare const DataImportShell: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: PanelItemController<import("@ibiz/model-core").IPanelItem>;
    onDismiss: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
