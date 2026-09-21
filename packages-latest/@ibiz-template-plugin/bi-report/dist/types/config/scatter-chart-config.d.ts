import { IScatterData } from '../interface';
export declare const ScatterChartConfig: {
    data: {
        pagination: boolean;
        details: ({
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            required: boolean;
            enableRemove: boolean;
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                multiple: boolean;
                actions: {
                    id: string;
                    caption: string;
                }[];
            }[];
            switchEditMode?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            required: boolean;
            enableRemove: boolean;
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                multiple: boolean;
                max: number;
                actions: {
                    id: string;
                    caption: string;
                }[];
            }[];
            switchEditMode?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            enableRemove: boolean;
            switchEditMode: boolean;
            details: {
                id: string;
                caption: string;
                subCaption: string;
                disableCalcField: boolean;
                showCaption: boolean;
                type: string;
                editorType: string;
                multiple: boolean;
                actions: {
                    id: string;
                    caption: string;
                }[];
                expandActions: {
                    id: string;
                    caption: string;
                }[];
            }[];
            required?: undefined;
        })[];
    };
    style: {
        details: ({
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                editorStyle: string;
            }[];
            enableSwitch?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            enableSwitch: boolean;
            details: ({
                id: string;
                caption: string;
                type: string;
                editorType: string;
                mode?: undefined;
                showCaption?: undefined;
            } | {
                id: string;
                caption: string;
                type: string;
                editorType: string;
                mode: string;
                showCaption?: undefined;
            } | {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                mode?: undefined;
            })[];
            isCollapse?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            enableSwitch: boolean;
            details: ({
                id: string;
                caption: string;
                type: string;
                editorType: string;
                mode: string;
                showCaption?: undefined;
                items?: undefined;
            } | {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                items: {
                    id: string;
                    label: string;
                }[];
                mode?: undefined;
            })[];
            isCollapse?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            enableSwitch: boolean;
            details: ({
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                mode: string;
                editorStyle?: undefined;
            } | {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                editorStyle: string;
                mode?: undefined;
            })[];
            isCollapse?: undefined;
        })[];
    };
};
export declare const ScatterDefaultData: IScatterData;
export declare const ScatterChartModel: {
    coordinateSystem: string;
    chartCoordinateSystems: {
        chartGrid: {
            chartGridXAxis0Id: string;
            chartGridYAxis0Id: string;
            chartCoordinateSystemId: string;
            type: string;
            name: string;
            id: string;
            appId: string;
        };
        echartsType: string;
        type: string;
        name: string;
        id: string;
        appId: string;
    }[];
    dechartDataGrid: {
        id: string;
        appId: string;
    };
    dechartLegend: {
        showLegend: boolean;
        id: string;
        appId: string;
    };
    dechartSerieses: {
        catalogField: string;
        echartsType: string;
        chartCoordinateSystemId: string;
        chartDataSetId: string;
        chartSeriesEncode: {
            chartXAxisId: string;
            chartYAxisId: string;
            x: string[];
            y: string[];
            itemId: string;
            itemName: string;
            type: string;
            name: string;
            id: string;
            appId: string;
        };
        seriesField: string;
        seriesLayoutBy: string;
        seriesType: string;
        valueField: string;
        enableChartDataSet: boolean;
        id: string;
        appId: string;
    }[];
    dechartTitle: {
        title: string;
        showTitle: boolean;
        id: string;
        appId: string;
    };
    chartDataSetGroups: {
        appDEDataSetId: string;
        appDataEntityId: string;
        name: string;
        id: string;
        appId: string;
    }[];
    chartDataSets: never[];
    chartXAxises: {
        echartsPos: string;
        echartsType: string;
        position: string;
        type: string;
        name: string;
        id: string;
        appId: string;
    }[];
    chartYAxises: {
        echartsPos: string;
        echartsType: string;
        position: string;
        type: string;
        name: string;
        id: string;
        appId: string;
    }[];
    fetchControlAction: {
        appDEMethodId: string;
        appDataEntityId: string;
        id: string;
        appId: string;
    };
    readOnly: boolean;
    autoLoad: boolean;
    showBusyIndicator: boolean;
    codeName: string;
    controlType: string;
    logicName: string;
    appDataEntityId: string;
    controlParam: {
        id: string;
        appId: string;
    };
    modelId: string;
    modelType: string;
    name: string;
    id: string;
    appId: string;
};
