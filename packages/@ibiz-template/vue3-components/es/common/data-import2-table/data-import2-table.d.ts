import { PropType } from 'vue';
import { IAppDEField, IDEDataImportItem } from '@ibiz/model-core';
import './data-import2-table.scss';
interface ISharedProperties {
    logicName?: string;
    caption?: string;
}
type DataOption = (IAppDEField & ISharedProperties) | (IDEDataImportItem & ISharedProperties);
export declare const DataImport2Table: import("vue").DefineComponent<{
    previewinfo: {
        type: PropType<[string[]]>;
        required: true;
    };
    dataOption: {
        type: PropType<DataOption[]>;
        required: true;
    };
    selectValues: {
        type: PropType<string[]>;
        required: true;
    };
    columnMappingSave: {
        type: BooleanConstructor;
        required: true;
    };
    columnMap: {
        type: PropType<Map<string, IData>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderEmpty: () => JSX.Element;
    renderTable: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    previewinfo: {
        type: PropType<[string[]]>;
        required: true;
    };
    dataOption: {
        type: PropType<DataOption[]>;
        required: true;
    };
    selectValues: {
        type: PropType<string[]>;
        required: true;
    };
    columnMappingSave: {
        type: BooleanConstructor;
        required: true;
    };
    columnMap: {
        type: PropType<Map<string, IData>>;
        required: true;
    };
}>>, {}, {}>;
export {};
