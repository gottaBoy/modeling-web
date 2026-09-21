declare const _default: {
    layoutBodyOnly: boolean;
    viewProxyMode: boolean;
    layoutMode: string;
    layout: {
        layout: string;
    };
    rootPanelItems: {
        actionGroupExtractMode: string;
        panelItems: {
            actionGroupExtractMode: string;
            panelItems: ({
                rawItem: {
                    sysImage: {
                        rawContent: string;
                    };
                    contentType: string;
                    predefinedType: string;
                    rawItemHeight: number;
                    rawItemWidth: number;
                    id: string;
                    caption?: undefined;
                    halign?: undefined;
                    renderMode?: undefined;
                    valign?: undefined;
                    wrapMode?: undefined;
                };
                caption: string;
                contentHeight: number;
                contentWidth: number;
                height: number;
                itemStyle: string;
                itemType: string;
                layoutPos: {
                    shrink: number;
                    halignSelf: string;
                    height: number;
                    heightMode: string;
                    layout: string;
                    spacingBottom: string;
                    valignSelf: string;
                    width: number;
                    widthMode: string;
                };
                sysImage: {
                    rawContent: string;
                };
                width: number;
                showCaption: boolean;
                id: string;
            } | {
                rawItem: {
                    caption: string;
                    halign: string;
                    renderMode: string;
                    valign: string;
                    wrapMode: string;
                    contentType: string;
                    predefinedType: string;
                    id: string;
                    sysImage?: undefined;
                    rawItemHeight?: undefined;
                    rawItemWidth?: undefined;
                };
                caption: string;
                itemStyle: string;
                itemType: string;
                layoutPos: {
                    shrink: number;
                    halignSelf: string;
                    layout: string;
                    valignSelf: string;
                    height?: undefined;
                    heightMode?: undefined;
                    spacingBottom?: undefined;
                    width?: undefined;
                    widthMode?: undefined;
                };
                showCaption: boolean;
                id: string;
                contentHeight?: undefined;
                contentWidth?: undefined;
                height?: undefined;
                sysImage?: undefined;
                width?: undefined;
            })[];
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
    layoutPanel: boolean;
    controls: {
        caption: string;
        codeName: string;
        controlType: string;
        controlParam: {};
        id: string;
    }[];
    codeName: string;
    controlType: string;
    logicName: string;
    controlParam: {};
    modelId: string;
    modelType: string;
    id: string;
};
export default _default;
