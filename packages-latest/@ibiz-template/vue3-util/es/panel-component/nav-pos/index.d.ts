import { NavPosState } from './nav-pos.state';
import { NavPosController } from './nav-pos.controller';
export { NavPosState, NavPosController };
export declare const IBizNavPos: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    c: NavPosController;
    isPresetView: import("vue").Ref<boolean, boolean>;
    onViewCreated: (event: import("@ibiz-template/runtime").EventBase) => void;
    semanticClass: import("../..").UseSemanticClassReturn;
    semanticStyle: import("../..").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizNavPos;
//# sourceMappingURL=index.d.ts.map