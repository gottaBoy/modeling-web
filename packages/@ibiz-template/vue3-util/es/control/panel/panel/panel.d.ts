import { PropType } from 'vue';
import { IPanel } from '@ibiz/model-core';
import './panel.scss';
import { IControlProvider, IController, PanelController } from '@ibiz-template/runtime';
/**
 * 视图布局面板组件
 */
export declare const PanelControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanel>;
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
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: PanelController<IPanel, import("@ibiz-template/runtime").IPanelState, import("@ibiz-template/runtime").IPanelEvent>;
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanel>;
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
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    loadDefault: boolean;
}, {}>;
//# sourceMappingURL=panel.d.ts.map