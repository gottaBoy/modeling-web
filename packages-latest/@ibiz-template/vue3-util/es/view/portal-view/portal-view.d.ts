import { IModal, ViewController } from '@ibiz-template/runtime';
import { IAppPortalView } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const PortalView: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppPortalView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>, {
    c: ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[] | undefined;
    viewClassNames: (string | undefined)[];
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: PropType<IAppPortalView>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
    };
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=portal-view.d.ts.map