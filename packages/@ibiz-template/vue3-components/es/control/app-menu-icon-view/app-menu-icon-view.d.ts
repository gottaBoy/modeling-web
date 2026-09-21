import { AppMenuIconViewController, IControlProvider } from '@ibiz-template/runtime';
import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { PropType, Ref, VNode } from 'vue';
import './app-menu-icon-view.scss';
export declare const AppMenuIconViewControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IAppMenu>;
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
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}, {
    c: AppMenuIconViewController;
    ns: import("@ibiz-template/core").Namespace;
    defaultActive: Ref<string>;
    defaultOpens: Ref<string[]>;
    onClick: (key: string, event: MouseEvent) => Promise<void>;
    renderGroup: (item: IAppMenuItem) => VNode | null;
    renderItem: (item: IAppMenuItem) => VNode | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IAppMenu>;
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
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}>>, {
    params: IParams;
    collapse: boolean;
}, {}>;
