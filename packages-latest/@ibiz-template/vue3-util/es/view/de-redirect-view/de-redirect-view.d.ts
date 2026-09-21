import { ViewController } from '@ibiz-template/runtime';
import { IAppDERedirectView } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const DeRedirectView: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDERedirectView>;
        required: true;
    };
    isEmbedCtrlNav: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    c: ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    toViewId: import("vue").Ref<string | undefined, string | undefined>;
    toViewContext: import("vue").Ref<import("@ibiz-template/core").IApiContext | undefined, import("@ibiz-template/core").IApiContext | undefined>;
    toViewParams: import("vue").Ref<import("@ibiz-template/core").IApiParams | undefined, import("@ibiz-template/core").IApiParams | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDERedirectView>;
        required: true;
    };
    isEmbedCtrlNav: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
    isEmbedCtrlNav: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=de-redirect-view.d.ts.map