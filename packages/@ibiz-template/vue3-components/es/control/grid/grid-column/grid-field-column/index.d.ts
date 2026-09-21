export declare const IBizGridFieldColumn: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    controller: {
        type: typeof import("@ibiz-template/runtime").GridFieldColumnController;
        required: true;
    };
    row: {
        type: typeof import("@ibiz-template/runtime").GridRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCellClick: (event: MouseEvent) => void;
    onTextClick: (event: MouseEvent) => void;
    onInfoTextChange: (text: string) => void;
    onActionClick: (detail: import("@ibiz/model-core").IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
    CustomHtml: import("vue").Ref<string | undefined>;
    fieldValue: import("vue").ComputedRef<any>;
    formatValue: import("vue").ComputedRef<string>;
    percent: import("vue").ComputedRef<string>;
    codeListValue: import("vue").ComputedRef<string>;
    tooltip: import("vue").ComputedRef<string | undefined>;
    zIndex: number | undefined;
    codeListItems: import("vue").Ref<readonly IData[]>;
    hiddenEmpty: import("vue").ComputedRef<boolean>;
    findLayoutPanel: () => import("@ibiz/model-core").IPanel | undefined;
    renderPanelItemLayout: (item: IData, modelData: import("@ibiz/model-core").IPanel) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof import("@ibiz-template/runtime").GridFieldColumnController;
        required: true;
    };
    row: {
        type: typeof import("@ibiz-template/runtime").GridRowState;
        required: true;
    };
}>>, {}, {}>>;
export default IBizGridFieldColumn;
