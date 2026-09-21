import { PropType } from 'vue';
import './not-supported-editor.scss';
import { IEditor } from '@ibiz/model-core';
export declare const NotSupportedEditor: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IEditor>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IEditor>;
        required: true;
    };
}>>, {}, {}>;
