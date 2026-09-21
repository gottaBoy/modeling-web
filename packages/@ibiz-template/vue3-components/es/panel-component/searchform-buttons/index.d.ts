export declare const IBizSearchFormButtons: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./searchform-buttons.controller").SearchFormButtonsController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("./searchform-buttons.controller").SearchFormButtonsController;
    onSearchButtonClick: () => void;
    onResetButtonClick: () => void;
    saveFilterConfirm: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./searchform-buttons.controller").SearchFormButtonsController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizSearchFormButtons;
