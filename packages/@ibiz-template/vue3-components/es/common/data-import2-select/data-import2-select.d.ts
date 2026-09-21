import { PropType } from 'vue';
import './data-import2-select.scss';
export declare const DataImport2Select: import("vue").DefineComponent<{
    previewinfo: {
        type: PropType<[string[]]>;
        required: true;
    };
    options: {
        type: PropType<{
            value: string;
            label: string;
            oldLabel: string;
            edit: boolean;
            checkmark: boolean;
            close: boolean;
        }[]>;
        required: true;
    };
    columnMappingListMap: {
        type: PropType<Map<string, IData>>;
        required: true;
    };
    listValue: {
        type: StringConstructor;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    inputClick: (e: Event) => void;
    editLabel: (e: Event, item: IData) => void;
    saveLabel: (e: Event, item: IData) => Promise<void>;
    notSaveLabel: (e: Event, item: IData) => void;
    handleDeleteOption: (e: Event, str: string) => Promise<void>;
    valueChange: (data: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    previewinfo: {
        type: PropType<[string[]]>;
        required: true;
    };
    options: {
        type: PropType<{
            value: string;
            label: string;
            oldLabel: string;
            edit: boolean;
            checkmark: boolean;
            close: boolean;
        }[]>;
        required: true;
    };
    columnMappingListMap: {
        type: PropType<Map<string, IData>>;
        required: true;
    };
    listValue: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, {}>;
