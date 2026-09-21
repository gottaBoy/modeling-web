import { PanelContainerImageState } from './panel-container-image.state';
import { PanelContainerImageController } from './panel-container-image.controller';
export { PanelContainerImageState, PanelContainerImageController };
export declare const IBizPanelContainerImage: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    backgroundStyle: import("vue").ComputedRef<{}>;
    semanticClass: import("../..").UseSemanticClassReturn;
    semanticStyle: import("../..").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizPanelContainerImage;
//# sourceMappingURL=index.d.ts.map