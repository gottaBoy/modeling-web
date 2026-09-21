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
                layout: string;
            };
            dataRegionType: string;
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
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
                grow: number;
                shrink: number;
                layout: string;
            };
            showCaption: boolean;
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
            grow: number;
            shrink: number;
            layout: string;
        };
        id: string;
    })[];
    layoutPanel: boolean;
    controls: {
        capLanguageRes: {
            lanResTag: string;
        };
        caption: string;
        codeName: string;
        controlType: string;
        appDataEntityId: string;
        controlParam: {};
        name: string;
        id: string;
    }[];
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
