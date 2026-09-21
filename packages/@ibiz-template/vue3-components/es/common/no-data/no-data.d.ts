import { PropType } from 'vue';
import { ILanguageRes } from '@ibiz/model-core';
import './no-data.scss';
export declare const IBizNoData: import("vue").DefineComponent<{
    text: {
        type: StringConstructor;
        default: string;
    };
    emptyTextLanguageRes: {
        type: PropType<ILanguageRes>;
        default: undefined;
    };
    hideNoDataImage: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    label: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    text: {
        type: StringConstructor;
        default: string;
    };
    emptyTextLanguageRes: {
        type: PropType<ILanguageRes>;
        default: undefined;
    };
    hideNoDataImage: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    text: string;
    emptyTextLanguageRes: ILanguageRes;
    hideNoDataImage: boolean;
}, {}>;
