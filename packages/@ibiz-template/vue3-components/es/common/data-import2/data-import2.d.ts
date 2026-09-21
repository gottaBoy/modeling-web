import { IAppDataEntity, IAppDEDataImport, IAppDEField, IDEDataImportItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import './data-import2.scss';
interface ISharedProperties {
    logicName?: string;
    caption?: string;
}
type DataOption = (IAppDEField & ISharedProperties) | (IDEDataImportItem & ISharedProperties);
type Options = {
    [key: string]: string | boolean;
};
type columnMapValueType = {
    name: string;
    index: number;
    caption: string;
};
type columnMappingListMapValueType = {
    create_date: string;
    create_man: string;
    data_entity_tag: string;
    fields?: [{
        caption: string;
        id: string;
        index: number;
        name: string;
    }];
    id: string;
    import_tag: string;
    name: string;
    owner_type: string;
    system_tag: string;
    update_date: string;
    update_man: string;
};
export declare const DataImport2: import("vue").DefineComponent<{
    dismiss: {
        type: PropType<() => void>;
        required: true;
    };
    appDataEntity: {
        type: PropType<IAppDataEntity>;
        required: true;
    };
    dataImport: {
        type: PropType<IAppDEDataImport>;
        required: false;
    };
    context: {
        type: PropType<IContext>;
        required: false;
    };
    params: {
        type: PropType<IParams>;
        required: false;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onButtonColumnMappingImportClick: () => Promise<void>;
    onButtonImportClick: () => Promise<void>;
    onCancelButtonClick: () => void;
    isLoading: Ref<boolean>;
    UploadUrl: import("vue").ComputedRef<string>;
    headers: Ref<IData>;
    onSuccess: (response: IData, _file: IData, _fileList: []) => void;
    previewinfo: Ref<[string[]]>;
    selectValues: Ref<string[]>;
    beforeUpload: () => void;
    dataimport2: Ref<HTMLDivElement | undefined>;
    listValue: Ref<string>;
    options: Ref<Options[]>;
    select: Ref<HTMLDivElement | undefined>;
    isNoPersonel: Ref<boolean>;
    fileName: Ref<string>;
    dataOption: Ref<DataOption[]>;
    ColumnMappingSave: Ref<boolean>;
    columnMap: Map<string, columnMapValueType>;
    columnMappingSaveChange: (data: boolean) => void;
    selectValuesChange: (index: number, item: string) => void;
    columnMapChange: (key: string, data: columnMapValueType) => void;
    columnMappingListMap: Map<string, columnMappingListMapValueType>;
    listValueChange: (data: string) => void;
    columnMappingListMapChange: (key: string, data?: columnMappingListMapValueType) => void;
    optionsChange: (str: string, data?: Options) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    dismiss: {
        type: PropType<() => void>;
        required: true;
    };
    appDataEntity: {
        type: PropType<IAppDataEntity>;
        required: true;
    };
    dataImport: {
        type: PropType<IAppDEDataImport>;
        required: false;
    };
    context: {
        type: PropType<IContext>;
        required: false;
    };
    params: {
        type: PropType<IParams>;
        required: false;
    };
}>>, {}, {}>;
export {};
