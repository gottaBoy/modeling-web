import { IModal, IViewLayoutPanelController, IViewProvider, ViewController } from '@ibiz-template/runtime';
import { IAppView, IControl } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import './view.scss';
export declare const View: import("vue").DefineComponent<{
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
    provider: {
        type: PropType<IViewProvider>;
    };
}, {
    c: ViewController<IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: IControl[];
    teleportControls: IControl[];
    viewClassNames: import("vue").ComputedRef<(string | string[] | undefined)[]>;
    onLayoutPanelCreated: (controller: IViewLayoutPanelController) => void;
    getCtrlProps: (ctrl: IControl, slotProps?: IData) => IParams;
    renderControl: (ctrl: IControl, slotProps?: IData) => VNode;
    getCtrlTeleportTag: (ctrl: IControl) => string | undefined;
    getControlStyle: () => {};
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    provider: {
        type: PropType<IViewProvider>;
    };
}>>, {
    params: IParams;
}, {}>;
//# sourceMappingURL=view.d.ts.map