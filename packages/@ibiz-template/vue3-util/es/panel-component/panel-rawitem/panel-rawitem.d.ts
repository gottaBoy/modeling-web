import { IPanelRawItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { PanelRawItemController } from './panel-rawitem.controller';
import './panel-rawitem.scss';
export declare const PanelRawItem: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelRawItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: Ref<string>;
    content: Ref<string | number | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelRawItemController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-rawitem.d.ts.map