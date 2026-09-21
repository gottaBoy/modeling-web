import { ViewMsgPosController } from './view-msg-pos.controller';
export { ViewMsgPosController };
export declare const IBizViewMsgPos: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof ViewMsgPosController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    view: import("@ibiz-template/runtime").IViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof ViewMsgPosController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizViewMsgPos;
