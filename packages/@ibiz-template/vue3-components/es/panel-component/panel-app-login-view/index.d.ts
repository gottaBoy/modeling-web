import { PanelAppLoginViewState } from './panel-app-login-view.state';
import { PanelAppLoginViewController } from './panel-app-login-view.controller';
export { PanelAppLoginViewState, PanelAppLoginViewController };
export declare const IBizPanelAppLoginView: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelAppLoginViewController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    cssVars: import("vue").ComputedRef<Record<string, string>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelAppLoginViewController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelAppLoginView;
