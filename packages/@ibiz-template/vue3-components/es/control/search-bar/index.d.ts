export declare const IBizSearchBarControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").ISearchBar>;
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
}, {
    c: import("@ibiz-template/runtime").SearchBarController;
    ns: import("@ibiz-template/core").Namespace;
    cssVars: import("vue").ComputedRef<Record<string, string>>;
    filterButtonRef: import("vue").Ref<any>;
    onClear: () => void;
    onSearch: () => void;
    onKeydown: (e: KeyboardEvent) => void;
    onGroupClick: (item: import("@ibiz/model-core").ISearchBarGroup) => void;
    triggerFilter: () => void;
    handleSave: () => void;
    renderAdvancedSearch: () => JSX.Element | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").ISearchBar>;
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
}>>, {
    params: IParams;
}, {}>>;
export default IBizSearchBarControl;
