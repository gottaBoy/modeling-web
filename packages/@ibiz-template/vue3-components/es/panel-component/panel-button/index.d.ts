export * from './panel-button.controller';
export declare const IBizPanelButton: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelButton>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-button.controller").PanelButtonController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isText: boolean;
    captionText: import("vue").ComputedRef<any>;
    buttonType: import("vue").ComputedRef<"success" | "warning" | "info" | "primary" | "danger" | null>;
    showCaption: boolean | undefined;
    sysImage: import("@ibiz/model-core").ISysImage | undefined;
    codeName: string | undefined;
    state: import("./panel-button.state").PanelButtonState;
    tooltip: string | undefined;
    handleButtonClick: (event: MouseEvent) => Promise<void>;
    buttonCssStyle: string | undefined;
    tempStyle: import("vue").Ref<string>;
    itemStyle: string | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelButton>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-button.controller").PanelButtonController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelButton;
