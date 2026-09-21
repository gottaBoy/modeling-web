import { IDEFormRawItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { FormRawItemController } from '@ibiz-template/runtime';
import './form-rawitem.scss';
export declare const FormRawItem: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormRawItem>;
        required: true;
    };
    controller: {
        type: typeof FormRawItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    content: Ref<string | number | undefined>;
    showFormDefaultContent: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormRawItem>;
        required: true;
    };
    controller: {
        type: typeof FormRawItemController;
        required: true;
    };
}>>, {}, {}>;
export default FormRawItem;
