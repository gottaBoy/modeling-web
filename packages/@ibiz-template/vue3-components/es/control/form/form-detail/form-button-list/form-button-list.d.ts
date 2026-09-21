import { FormButtonListController } from '@ibiz-template/runtime';
import { IDEFormButtonList } from '@ibiz/model-core';
import { PropType } from 'vue';
import './form-button-list.scss';
export declare const FormButtonList: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDEFormButtonList>;
        required: true;
    };
    controller: {
        type: typeof FormButtonListController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleClick: (e: MouseEvent, actionId: string) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDEFormButtonList>;
        required: true;
    };
    controller: {
        type: typeof FormButtonListController;
        required: true;
    };
}>>, {}, {}>;
export default FormButtonList;
