import { IMultiSeriesColData } from '../interface';
export declare const MultiSeriesColChartConfig: {
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
                max: number;
                actions: {
                    id: string;
                    caption: string;
                }[];
            }[];
            showEmptyData?: undefined;
            switchEditMode?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            required: boolean;
            enableRemove: boolean;
            showEmptyData: boolean;
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
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                multiple: boolean;
                typeLimit: {
                    tag: string;
                    types: string[];
                };
                actions: {
                    id: string;
                    caption: string;
                }[];
            }[];
            required?: undefined;
            enableRemove?: undefined;
            showEmptyData?: undefined;
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
            showEmptyData?: undefined;
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
export declare const MultiSeriesColChartModel: {
    dechartLegend: {
        showLegend: boolean;
        id: string;
        appId: string;
    };
    dechartTitle: {
        showTitle: boolean;
        id: string;
        appId: string;
    };
    dechartSerieses: {
        catalogField: string;
        seriesType: string;
        valueField: string;
        id: string;
        appId: string;
        chartSeriesEncode: {
            chartXAxisId: string;
            chartYAxisId: string;
            id: string;
            appId: string;
        };
    }[];
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
    appDataEntityId: string;
    id: string;
    appId: string;
    name: string;
    readOnly: boolean;
    autoLoad: boolean;
    showBusyIndicator: boolean;
    codeName: string;
    controlType: string;
    logicName: string;
};
export declare const MultiSeriesColDefaultData: IMultiSeriesColData;
