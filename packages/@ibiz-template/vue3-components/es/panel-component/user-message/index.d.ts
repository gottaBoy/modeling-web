export declare const IBizUserMessage: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>;
    noticeController: import("@ibiz-template/runtime").INoticeController;
    noticeNum: import("vue").Ref<number>;
    popoverRef: import("vue").Ref<any>;
    showPopover: import("vue").Ref<boolean>;
    sysImage: import("@ibiz/model-core").ISysImage | {
        imagePath: string;
    };
    currentTab: import("vue").Ref<string>;
    hiddenPopover: () => void;
    onBatchReadClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}>>, {}, {}>>;
export default IBizUserMessage;
