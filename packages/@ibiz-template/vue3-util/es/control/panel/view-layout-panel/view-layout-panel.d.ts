import { PropType, VNode } from 'vue';
import { IPanelItem, IViewLayoutPanel } from '@ibiz/model-core';
import './view-layout-panel.scss';
import { IController, IControlProvider, IPanelItemController, IPanelItemProvider, ViewLayoutPanelController } from '@ibiz-template/runtime';
/**
 * 视图布局面板组件
 */
export declare const ViewLayoutPanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IViewLayoutPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    container: {
        type: PropType<IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: PropType<IData>;
}, {
    c: ViewLayoutPanelController;
    ns: import("@ibiz-template/core").Namespace;
    renderPanelItem: (panelItem: IPanelItem, options?: {
        providers: {
            [key: string]: IPanelItemProvider;
        };
        panelItems: {
            [key: string]: IPanelItemController;
        };
    }) => VNode | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IViewLayoutPanel>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
    container: {
        type: PropType<IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: PropType<IData>;
}>>, {
    params: IParams;
}, {}>;
//# sourceMappingURL=view-layout-panel.d.ts.map