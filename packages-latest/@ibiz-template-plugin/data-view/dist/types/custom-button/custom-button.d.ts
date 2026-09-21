import { IPanelRawItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { CustomBtnController } from './custom-button.controller';

export declare const CustomButton: import('vue').DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof CustomBtnController;
        required: true;
    };
}, {
    ns: Namespace;
    classArr: import('vue').ComputedRef<(string | false)[]>;
    tempStyle: Ref<string, string>;
    content: Ref<string | number | undefined, string | number | undefined>;
    svgShape: Ref<string, string>;
    svgStyle: Ref<{}, {}>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof CustomBtnController;
        required: true;
    };
}>>, {}, {}>;
