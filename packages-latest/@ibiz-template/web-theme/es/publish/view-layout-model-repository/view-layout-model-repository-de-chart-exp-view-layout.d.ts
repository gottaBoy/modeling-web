declare const _default: {
    layoutMode: string;
    layout: {
        layout: string;
    };
    rootPanelItems: ({
        rawItem: {
            rawItemParams: {
                key: string;
                value: string;
            }[];
            predefinedType: string;
            id: string;
        };
        caption: string;
        itemStyle: string;
        itemType: string;
        layoutPos: {
            shrink: number;
            layout: string;
            grow?: undefined;
        };
        showCaption: boolean;
        id: string;
        actionGroupExtractMode?: undefined;
        panelItems?: undefined;
        layout?: undefined;
        dataRegionType?: undefined;
    } | {
        actionGroupExtractMode: string;
        panelItems: ({
            rawItem: {
                rawItemParams: {
                    key: string;
                    value: string;
                }[];
                predefinedType: string;
                id: string;
            };
            caption: string;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
                layout: string;
                grow?: undefined;
            };
            showCaption: boolean;
            id: string;
            actionGroupExtractMode?: undefined;
            panelItems?: undefined;
            predefinedType?: undefined;
            layout?: undefined;
            dataRegionType?: undefined;
        } | {
            actionGroupExtractMode: string;
            panelItems: ({
                actionGroupExtractMode: string;
                panelItems: {
                    caption: string;
                    itemStyle: string;
                    itemType: string;
                    layoutPos: {
                        colMD: number;
                        heightMode: string;
                        layout: string;
                    };
                    showCaption: boolean;
                    id: string;
                }[];
                layout: {
                    columnCount: number;
                    layout: string;
                };
                dataRegionType: string;
                caption: string;
                contentWidth: number;
                itemStyle: string;
                itemType: string;
                layoutPos: {
                    shrink: number;
                    layout: string;
                    width: number;
                    widthMode: string;
                };
                width: number;
                id: string;
            } | {
                actionGroupExtractMode: string;
                panelItems: {
                    rawItem: {
                        predefinedType: string;
                        id: string;
                    };
                    caption: string;
                    itemStyle: string;
                    itemType: string;
                    layoutPos: {
                        colMD: number;
                        heightMode: string;
                        layout: string;
                    };
                    showCaption: boolean;
                    id: string;
                }[];
                layout: {
                    columnCount: number;
                    layout: string;
                };
                dataRegionType: string;
                caption: string;
                itemStyle: string;
                itemType: string;
                layoutPos: {
                    shrink: number;
                    layout: string;
                    width?: undefined;
                    widthMode?: undefined;
                };
                id: string;
                contentWidth?: undefined;
                width?: undefined;
            })[];
            predefinedType: string;
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
            rawItem?: undefined;
            showCaption?: undefined;
        })[];
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
        rawItem?: undefined;
        showCaption?: undefined;
    })[];
    layoutPanel: boolean;
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
