import { PropType } from 'vue';
import { IDEFormItem } from '@ibiz/model-core';
import { FormItemController } from '@ibiz-template/runtime';
export declare const CompositeFormItem: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormItem>;
        required: true;
    };
    controller: {
        type: typeof FormItemController;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        required: false;
    };
}, {
    c: FormItemController;
    extraParams: import("vue").Ref<{}>;
    onValueChange: (val: unknown, name?: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormItem>;
        required: true;
    };
    controller: {
        type: typeof FormItemController;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        required: false;
    };
}>>, {}, {}>;
export default CompositeFormItem;
