import { IPanelField } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelFieldController } from './panel-field.controller';
import './panel-field.scss';
export declare const PanelField: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    controller: {
        type: typeof PanelFieldController;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        require: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    onValueChange: (val: unknown, name?: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    controller: {
        type: typeof PanelFieldController;
        required: true;
    };
    attrs: {
        type: PropType<IData>;
        require: boolean;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-field.d.ts.map