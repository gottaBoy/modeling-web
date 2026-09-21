export declare const IBizAppMenuControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppMenu>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}, {
    menuRef: import("vue").Ref<any>;
    menus: import("vue").Ref<IData[]>;
    c: import("@ibiz-template/runtime").AppMenuController;
    key: import("vue").Ref<string>;
    onClick: (id: string, event?: MouseEvent | undefined) => Promise<void>;
    ns: import("@ibiz-template/core").Namespace;
    hasScroll: import("vue").Ref<boolean>;
    defaultActive: import("vue").Ref<string>;
    defaultOpens: import("vue").Ref<string[]>;
    menuMode: import("vue").ComputedRef<"vertical" | "horizontal">;
    counterData: import("vue").Ref<IData>;
    saveConfigs: import("vue").Ref<IData[]>;
    configSaves: (saveConfig: IData[]) => void;
    configReset: () => void;
    isShowCollapse: import("vue").ComputedRef<boolean>;
    enableCustomized: import("vue").ComputedRef<boolean | undefined>;
    ellipsisSvg: () => JSX.Element;
    hideSeparator: import("vue").Ref<string[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppMenu>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    collapse: BooleanConstructor;
    currentPath: StringConstructor;
}>>, {
    params: IParams;
    collapse: boolean;
}, {}>>;
export default IBizAppMenuControl;
