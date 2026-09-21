import { IViewProvider, RedrawViewEvent, CTX, EventBase, IViewShellHooks } from '@ibiz-template/runtime';
import { PropType, Ref } from 'vue';
import { IAppView } from '@ibiz/model-core';
import './view-shell.scss';
export declare const IBizViewShell: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
    };
    modelData: {
        type: PropType<IAppView>;
    };
    viewId: {
        type: StringConstructor;
    };
    ctx: {
        type: PropType<CTX<import("@ibiz-template/runtime").IViewController<IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>>>;
    };
    viewShellHooks: {
        type: PropType<IViewShellHooks>;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    errMsg: Ref<string, string>;
    provider: Ref<IViewProvider | undefined, IViewProvider | undefined>;
    isComplete: Ref<boolean, boolean>;
    hasAuthority: Ref<boolean, boolean>;
    viewModelData: Ref<IAppView | undefined, IAppView | undefined>;
    redrawView: (event: RedrawViewEvent) => Promise<void>;
    onCreated: (event: EventBase) => void;
    curContext: Ref<import("@ibiz-template/core").IApiContext, import("@ibiz-template/core").IApiContext>;
    curParams: Ref<import("@ibiz-template/core").IApiParams, import("@ibiz-template/core").IApiParams>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
    };
    modelData: {
        type: PropType<IAppView>;
    };
    viewId: {
        type: StringConstructor;
    };
    ctx: {
        type: PropType<CTX<import("@ibiz-template/runtime").IViewController<IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>>>;
    };
    viewShellHooks: {
        type: PropType<IViewShellHooks>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=view-shell.d.ts.map