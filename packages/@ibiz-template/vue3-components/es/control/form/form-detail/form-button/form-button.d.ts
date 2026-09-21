import { FormButtonController } from '@ibiz-template/runtime';
import { IDEFormButton } from '@ibiz/model-core';
import { PropType } from 'vue';
import './form-button.scss';
export declare const FormButton: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormButton>;
        required: true;
    };
    controller: {
        type: typeof FormButtonController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormButton>;
        required: true;
    };
    controller: {
        type: typeof FormButtonController;
        required: true;
    };
}>>, {}, {}>;
export default FormButton;
