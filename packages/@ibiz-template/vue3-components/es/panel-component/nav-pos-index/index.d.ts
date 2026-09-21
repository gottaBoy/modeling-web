import { NavPosIndexState } from './nav-pos-index.state';
import { NavPosIndexController } from './nav-pos-index.controller';
export { NavPosIndexState, NavPosIndexController };
export declare const IBizNavPosIndex: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosIndexController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onViewCreated: (event: import("@ibiz-template/runtime").EventBase) => void;
    c: NavPosIndexController;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavPosIndexController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizNavPosIndex;
