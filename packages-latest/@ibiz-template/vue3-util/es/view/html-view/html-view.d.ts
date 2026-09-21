import { IAppDEHtmlView } from '@ibiz/model-core';
import { HtmlViewController } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './html-view.scss';
export declare const HtmlView: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDEHtmlView>;
        required: true;
    };
    modal: {
        type: PropType<IAppDEHtmlView>;
    };
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>, {
    c: HtmlViewController<IAppDEHtmlView, import("@ibiz-template/runtime").IHtmlViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[] | undefined;
    viewClassNames: (string | undefined)[];
    isLoading: import("vue").Ref<boolean, boolean>;
    onLoad: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppDEHtmlView>;
        required: true;
    };
    modal: {
        type: PropType<IAppDEHtmlView>;
    };
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=html-view.d.ts.map