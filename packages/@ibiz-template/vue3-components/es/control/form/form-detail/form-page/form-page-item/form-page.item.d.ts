import { FormPageController } from '@ibiz-template/runtime';
import { IDEFormPage } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const IBizFormPageItem: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormPage>;
        required: true;
    };
    controller: {
        type: typeof FormPageController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormPage>;
        required: true;
    };
    controller: {
        type: typeof FormPageController;
        required: true;
    };
}>>, {}, {}>;
