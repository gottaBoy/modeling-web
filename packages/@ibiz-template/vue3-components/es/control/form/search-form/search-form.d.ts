import { IControlProvider, SearchFormController } from '@ibiz-template/runtime';
import { IDESearchForm } from '@ibiz/model-core';
import { PropType } from 'vue';
import './search-form.scss';
export declare const SearchFormControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDESearchForm>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: SearchFormController;
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDESearchForm>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>;
