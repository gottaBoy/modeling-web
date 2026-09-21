import { Namespace } from '@ibiz-template/core';
import { IAppMenu } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { AppMenuController, IControlProvider } from '@ibiz-template/runtime';
import './app-menu.scss';
export declare const AppMenuControl: import("vue").DefineComponent<{
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
    menuRef: Ref<any>;
    menus: Ref<IData[]>;
    c: AppMenuController;
    key: Ref<string>;
    onClick: (id: string, event?: MouseEvent) => Promise<void>;
    ns: Namespace;
    hasScroll: Ref<boolean>;
    defaultActive: Ref<string>;
    defaultOpens: Ref<string[]>;
    menuMode: import("vue").ComputedRef<"vertical" | "horizontal">;
    counterData: Ref<IData>;
    saveConfigs: Ref<IData[]>;
    configSaves: (saveConfig: IData[]) => void;
    configReset: () => void;
    isShowCollapse: import("vue").ComputedRef<boolean>;
    enableCustomized: import("vue").ComputedRef<boolean | undefined>;
    ellipsisSvg: () => JSX.Element;
    hideSeparator: Ref<string[]>;
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
