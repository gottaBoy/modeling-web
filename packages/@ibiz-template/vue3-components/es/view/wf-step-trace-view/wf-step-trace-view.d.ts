import { IModal, WFStepTraceViewController } from '@ibiz-template/runtime';
import { IAppView } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const WFStepTraceView: import("vue").DefineComponent<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<IData>;
    };
}, {
    c: WFStepTraceViewController<IAppView, import("@ibiz-template/runtime").IWFStepTraceViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    viewClassNames: (string | undefined)[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<IData>;
    };
}>>, {
    params: IParams;
}, {}>;
