import { PanelContainerGroupState } from './panel-container-group.state';
import { PanelContainerGroupController } from './panel-container-group.controller';
export { PanelContainerGroupState, PanelContainerGroupController };
export declare const IBizPanelContainerGroup: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerGroupController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
    changeCollapse: () => void;
    isCollapse: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerGroupController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelContainerGroup;
//# sourceMappingURL=index.d.ts.map