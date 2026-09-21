import { PropType } from 'vue';
import './form-tab-page.scss';
import { IDEFormTabPage } from '@ibiz/model-core';
import { FormTabPageController } from '@ibiz-template/runtime';
export declare const FormTabPage: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormTabPage>;
        required: true;
    };
    controller: {
        type: typeof FormTabPageController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormTabPage>;
        required: true;
    };
    controller: {
        type: typeof FormTabPageController;
        required: true;
    };
}>>, {}, {}>;
export default FormTabPage;
