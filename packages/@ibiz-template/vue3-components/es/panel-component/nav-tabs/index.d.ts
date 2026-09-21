export * from './nav-tabs.controller';
export * from './nav-tabs.state';
export declare const IBizNavTabs: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./nav-tabs.controller").NavTabsController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    actions: import("./nav-tabs").dropdownAction[];
    changePage: (pane: {
        uid: number;
        slots: Readonly<{
            [name: string]: import("vue").Slot<any> | undefined;
        }>;
        props: {
            readonly disabled: boolean;
            readonly label: string;
            readonly closable: boolean;
            readonly lazy: boolean;
            readonly name?: import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
        };
        paneName: string | number | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
    }) => void;
    onTabRemove: (key: string) => void;
    handleCommand: (command: import("./nav-tabs").dropdownAction) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./nav-tabs.controller").NavTabsController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizNavTabs;
