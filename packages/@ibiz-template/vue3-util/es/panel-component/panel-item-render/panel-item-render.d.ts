import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelItemRenderController } from './panel-item-render.controller';
export declare const PanelItemRender: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelItemRenderController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    htmlCode: import("vue").ComputedRef<string | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelItemRenderController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-item-render.d.ts.map