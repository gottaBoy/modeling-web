import { ViewController } from '@ibiz-template/runtime';
import { IAppDERedirectView } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const DeRedirectView: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDERedirectView>;
        required: true;
    };
}, {
    c: ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    toViewId: import("vue").Ref<string | undefined>;
    toViewContext: import("vue").Ref<IContext | undefined>;
    toViewParams: import("vue").Ref<IParams | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDERedirectView>;
        required: true;
    };
}>>, {
    params: IParams;
}, {}>;
//# sourceMappingURL=de-redirect-view.d.ts.map