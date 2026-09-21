import { IModal, IViewLayoutPanelController, IViewProvider, ViewController } from '@ibiz-template/runtime';
import { IAppView, IControl } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import './view.scss';
export declare const View: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 应用上下文
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
    };
    /**
     * @description 视图参数
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
     * @description 视图模型
     */
    modelData: {
        type: PropType<IAppView>;
        required: true;
    };
    /**
     * @description 视图模态操作对象，在模态等形式打开视图时，需给视图注入此对象
     */
    modal: {
        type: PropType<IModal>;
    };
    /**
     * @description 视图状态
     */
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
    /**
     * @description 视图适配器
     */
    provider: {
        type: PropType<IViewProvider>;
    };
}>, {
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
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 应用上下文
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
    };
    /**
     * @description 视图参数
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
     * @description 视图模型
     */
    modelData: {
        type: PropType<IAppView>;
        required: true;
    };
    /**
     * @description 视图模态操作对象，在模态等形式打开视图时，需给视图注入此对象
     */
    modal: {
        type: PropType<IModal>;
    };
    /**
     * @description 视图状态
     */
    state: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
    /**
     * @description 视图适配器
     */
    provider: {
        type: PropType<IViewProvider>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=view.d.ts.map