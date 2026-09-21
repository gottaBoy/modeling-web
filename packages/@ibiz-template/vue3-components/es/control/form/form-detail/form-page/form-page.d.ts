import { PropType } from 'vue';
import './form-page.scss';
import { IDEForm } from '@ibiz/model-core';
import { FormController } from '@ibiz-template/runtime';
export declare const FormPage: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEForm>;
        required: true;
    };
    controller: {
        type: PropType<FormController<IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    position: string;
    onTabChange: (name: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEForm>;
        required: true;
    };
    controller: {
        type: PropType<FormController<IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}>>, {}, {}>;
export default FormPage;
