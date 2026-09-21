import { IAppDataEntity, IAppDEDataImport } from '@ibiz/model-core';
import { PropType } from 'vue';
import './data-import.scss';
export declare const DataImport: import("vue").DefineComponent<{
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
    onLinkClick: () => Promise<void>;
    selectFile: () => Promise<void>;
    onCancelButtonClick: () => void;
    isLoading: import("vue").Ref<boolean>;
    message: import("vue").Ref<{
        state: 'ready' | 'over' | 'error';
        message: string;
    }>;
    errorMessage: import("vue").Ref<string>;
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
