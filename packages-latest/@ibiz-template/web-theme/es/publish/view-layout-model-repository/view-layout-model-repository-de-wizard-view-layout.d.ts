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
        predefinedType?: undefined;
        layout?: undefined;
        dataRegionType?: undefined;
    } | {
        actionGroupExtractMode: string;
        panelItems: {
            caption: string;
            contentHeight: number;
            height: number;
            itemStyle: string;
            itemType: string;
            layoutPos: {
                shrink: number;
                height: number;
                heightMode: string;
                layout: string;
            };
            showCaption: boolean;
            id: string;
        }[];
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
