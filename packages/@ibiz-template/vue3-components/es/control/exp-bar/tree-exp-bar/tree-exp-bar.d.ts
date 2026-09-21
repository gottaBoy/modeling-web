import { PropType, VNode } from 'vue';
import './tree-exp-bar.scss';
import { IControlProvider, TreeExpBarController } from '@ibiz-template/runtime';
export declare const TreeExpBarControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IExpBar>;
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
    srfnav: {
        type: StringConstructor;
        required: false;
    };
    noNeedNavView: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: TreeExpBarController;
    ns: import("@ibiz-template/core").Namespace;
    navigational: import("vue").ComputedRef<boolean | "" | undefined>;
    renderTitle: () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
    renderSearchBar: () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IExpBar>;
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
    srfnav: {
        type: StringConstructor;
        required: false;
    };
    noNeedNavView: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    loadDefault: boolean;
    noNeedNavView: boolean;
}, {}>;
