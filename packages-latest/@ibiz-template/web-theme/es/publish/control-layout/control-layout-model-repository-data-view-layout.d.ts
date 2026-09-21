declare const _default: {
    viewProxyMode: boolean;
    layoutMode: string;
    layout: {
        layout: string;
    };
    rootPanelItems: ({
        actionGroupExtractMode: string;
        panelItems: ({
            rawItem: {
                caption: string;
                halign: string;
                valign: string;
                wrapMode: string;
                contentType: string;
                predefinedType: string;
                id: string;
            };
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                grow: number;
                shrink: number;
                layout: string;
                spacingBottom?: undefined;
                spacingLeft?: undefined;
                spacingRight?: undefined;
                spacingTop?: undefined;
            };
            showCaption: boolean;
            id: string;
        } | {
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
                layout: string;
                spacingBottom: string;
                spacingLeft: string;
                spacingRight: string;
                spacingTop: string;
                grow?: undefined;
            };
            showCaption: boolean;
            id: string;
            rawItem?: undefined;
        })[];
        layout: {
            align: string;
            dir: string;
            layout: string;
        };
        dataRegionType: string;
        caption: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            shrink: number;
            layout: string;
            spacingBottom: string;
            grow?: undefined;
        };
        id: string;
    } | {
        actionGroupExtractMode: string;
        panelItems: ({
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
            actionGroupExtractMode?: undefined;
            panelItems?: undefined;
            layout?: undefined;
            dataRegionType?: undefined;
        } | {
            actionGroupExtractMode: string;
            panelItems: {
                rawItem: {
                    caption: string;
                    halign: string;
                    renderMode: string;
                    valign: string;
                    wrapMode: string;
                    contentType: string;
                    predefinedType: string;
                    id: string;
                };
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
            showCaption?: undefined;
        })[];
        layout: {
            layout: string;
            align?: undefined;
            dir?: undefined;
        };
        dataRegionType: string;
        caption: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            grow: number;
            shrink: number;
            layout: string;
            spacingBottom?: undefined;
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
