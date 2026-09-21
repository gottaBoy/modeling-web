import { IModal, ViewController } from '@ibiz-template/runtime';
import { IAppPortalView } from '@ibiz/model-core';
import { PropType } from 'vue';
export declare const PortalView: import("vue").DefineComponent<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
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
        type: PropType<IData>;
    };
}, {
    c: ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[] | undefined;
    viewClassNames: (string | undefined)[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: PropType<IContext>;
    params: {
        type: PropType<IParams>;
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
        type: PropType<IData>;
    };
}>>, {
    params: IParams;
}, {}>;
//# sourceMappingURL=portal-view.d.ts.map