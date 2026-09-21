declare const _default: {
    viewProxyMode: boolean;
    layoutMode: string;
    layout: {
        layout: string;
    };
    rootPanelItems: ({
        actionGroupExtractMode: string;
        panelItems: {
            actionGroupExtractMode: string;
            panelItems: {
                actionGroupExtractMode: string;
                panelItems: {
                    caption: string;
                    itemStyle: string;
                    itemType: string;
                    layoutPos: {
                        shrink: number;
                        layout: string;
                    };
                    showCaption: boolean;
                    id: string;
                }[];
                layout: {
                    align: string;
                    layout: string;
                };
                dataRegionType: string;
                caption: string;
                itemStyle: string;
                itemType: string;
                layoutPos: {
                    shrink: number;
                    heightMode: string;
                    layout: string;
                };
                id: string;
            }[];
            layout: {
                layout: string;
            };
            dataRegionType: string;
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
                heightMode: string;
                layout: string;
            };
            id: string;
        }[];
        predefinedType: string;
        layout: {
            align: string;
            dir: string;
            layout: string;
            valign: string;
        };
        dataRegionType: string;
        caption: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            shrink: number;
            layout: string;
            grow?: undefined;
        };
        id: string;
    } | {
        actionGroupExtractMode: string;
        panelItems: {
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
                layout: string;
            };
            showCaption: boolean;
            id: string;
        }[];
        layout: {
            dir: string;
            layout: string;
            align?: undefined;
            valign?: undefined;
        };
        dataRegionType: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            shrink: number;
            layout: string;
            grow?: undefined;
        };
        id: string;
        predefinedType?: undefined;
        caption?: undefined;
    } | {
        actionGroupExtractMode: string;
        panelItems: {
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                grow: number;
                shrink: number;
                layout: string;
            };
            showCaption: boolean;
            id: string;
        }[];
        layout: {
            layout: string;
            align?: undefined;
            dir?: undefined;
            valign?: undefined;
        };
        dataRegionType: string;
        caption: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            grow: number;
            shrink: number;
            layout: string;
        };
        id: string;
        predefinedType?: undefined;
    })[];
    layoutPanel: boolean;
    appViewLogics: ({
        logicTrigger: string;
        logicType: string;
        builtinAppUILogic: {
            actionAfterWizard: string;
            builtinLogic: boolean;
            logicType: string;
            viewLogicType: string;
            id: string;
            editMode?: undefined;
        };
        builtinLogic: boolean;
        id: string;
    } | {
        logicTrigger: string;
        logicType: string;
        builtinAppUILogic: {
            editMode: boolean;
            builtinLogic: boolean;
            logicType: string;
            viewLogicType: string;
            id: string;
            actionAfterWizard?: undefined;
        };
        builtinLogic: boolean;
        id: string;
    })[];
    controls: ({
        aggMode: string;
        columnEnableFilter: number;
        columnEnableLink: number;
        groupMode: string;
        groupStyle: string;
        pagingSize: number;
        sortMode: string;
        enableCustomized: boolean;
        navViewPos: string;
        fetchControlAction: {
            appDEMethodId: string;
            appDataEntityId: string;
            id: string;
        };
        removeControlAction: {
            appDEMethodId: string;
            appDataEntityId: string;
            id: string;
        };
        autoLoad: boolean;
        showBusyIndicator: boolean;
        codeName: string;
        controlType: string;
        appDataEntityId: string;
        controlParam: {
            id: string;
        };
        modelId: string;
        modelType: string;
        name: string;
        id: string;
        quickSearchMode?: undefined;
        enableQuickSearch?: undefined;
        capLanguageRes?: undefined;
        caption?: undefined;
    } | {
        groupMode: string;
        quickSearchMode: number;
        enableQuickSearch: boolean;
        controlType: string;
        appDataEntityId: string;
        controlParam: {
            id: string;
        };
        id: string;
        aggMode?: undefined;
        columnEnableFilter?: undefined;
        columnEnableLink?: undefined;
        groupStyle?: undefined;
        pagingSize?: undefined;
        sortMode?: undefined;
        enableCustomized?: undefined;
        navViewPos?: undefined;
        fetchControlAction?: undefined;
        removeControlAction?: undefined;
        autoLoad?: undefined;
        showBusyIndicator?: undefined;
        codeName?: undefined;
        modelId?: undefined;
        modelType?: undefined;
        name?: undefined;
        capLanguageRes?: undefined;
        caption?: undefined;
    } | {
        capLanguageRes: {
            lanResTag: string;
        };
        caption: string;
        codeName: string;
        controlType: string;
        appDataEntityId: string;
        controlParam: {
            id?: undefined;
        };
        name: string;
        id: string;
        aggMode?: undefined;
        columnEnableFilter?: undefined;
        columnEnableLink?: undefined;
        groupMode?: undefined;
        groupStyle?: undefined;
        pagingSize?: undefined;
        sortMode?: undefined;
        enableCustomized?: undefined;
        navViewPos?: undefined;
        fetchControlAction?: undefined;
        removeControlAction?: undefined;
        autoLoad?: undefined;
        showBusyIndicator?: undefined;
        modelId?: undefined;
        modelType?: undefined;
        quickSearchMode?: undefined;
        enableQuickSearch?: undefined;
    })[];
    codeName: string;
    controlType: string;
    logicName: string;
    appDataEntityId: string;
    controlParam: {};
    modelId: string;
    modelType: string;
    name: string;
    id: string;
};
export default _default;
