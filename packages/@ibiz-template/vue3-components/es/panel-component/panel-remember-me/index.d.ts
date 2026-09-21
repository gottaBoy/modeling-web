import { PanelRememberMeState } from './panel-remember-me.state';
import { PanelRememberMeController } from './panel-remember-me.controller';
export { PanelRememberMeState, PanelRememberMeController };
export declare const IBizPanelRememberMe: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelRememberMeController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    c: PanelRememberMeController;
    isRemember: import("vue").WritableComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelRememberMeController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelRememberMe;
