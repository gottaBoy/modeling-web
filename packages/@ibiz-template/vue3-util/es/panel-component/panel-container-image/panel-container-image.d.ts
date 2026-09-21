import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelContainerImageController } from './panel-container-image.controller';
import './panel-container-image.scss';
export declare const PanelContainerImage: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    backgroundStyle: import("vue").ComputedRef<{}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}>>, {}, {}>;
//# sourceMappingURL=panel-container-image.d.ts.map