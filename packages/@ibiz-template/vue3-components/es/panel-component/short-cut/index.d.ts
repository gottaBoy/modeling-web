export declare const IBizShortCut: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    data: {
        key: string;
        caption: string;
        appViewId: string;
        context: {
            [x: string]: any;
            [x: symbol]: any;
            srfsessionid: string;
            srfappid: string;
            srfsimple?: boolean | undefined;
            srfnavctrlid?: string | undefined;
        };
        params: IParams;
        openMode: string;
        fullPath: string;
        icon?: {
            codeName?: string | undefined;
            cssClass?: string | undefined;
            cssClassX?: string | undefined;
            glyph?: string | undefined;
            height?: number | undefined;
            imagePath?: string | undefined;
            imagePathX?: string | undefined;
            rawContent?: string | undefined;
            width?: number | undefined;
            appId: string;
            id?: string | undefined;
            name?: string | undefined;
            userParam?: Record<string, string> | undefined;
            modelId?: string | undefined;
            modelType?: string | undefined;
        } | undefined;
    }[];
    isShowToolbar: import("vue").Ref<boolean>;
    onChange: (evt: IData) => void;
    renderDraggable: (isVertical: boolean) => JSX.Element;
    renderMore: () => JSX.Element;
    renderRecover: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizShortCut;
