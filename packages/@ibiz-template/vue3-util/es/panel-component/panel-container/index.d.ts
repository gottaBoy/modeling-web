import { PanelContainerState } from './panel-container.state';
import { PanelContainerController } from './panel-container.controller';
export { PanelContainerState, PanelContainerController };
export declare const IBizPanelContainer: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelContainer;
//# sourceMappingURL=index.d.ts.map