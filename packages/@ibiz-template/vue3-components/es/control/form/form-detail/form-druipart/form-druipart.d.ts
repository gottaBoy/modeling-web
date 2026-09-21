import { PropType } from 'vue';
import { IDEFormDRUIPart } from '@ibiz/model-core';
import { EventBase, FormDRUIPartController } from '@ibiz-template/runtime';
import './form-druipart.scss';
export declare const FormDRUIPart: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormDRUIPart>;
        required: true;
    };
    controller: {
        type: typeof FormDRUIPartController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCreated: (event: EventBase) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormDRUIPart>;
        required: true;
    };
    controller: {
        type: typeof FormDRUIPartController;
        required: true;
    };
}>>, {}, {}>;
export default FormDRUIPart;
