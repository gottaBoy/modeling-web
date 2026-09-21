import { IGaugeData } from '../interface';
/**
 * 仪表盘配置
 */
export declare const GaugeChartConfig: {
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
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                editorStyle: string;
            }[];
            show?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            show: boolean;
            details: {
                id: string;
                caption: string;
                type: string;
                editorType: string;
                mode: string;
            }[];
        } | {
            id: string;
            caption: string;
            type: string;
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
            }[];
            show?: undefined;
        })[];
    };
};
/**
 * 仪表盘模型
 */
export declare const GaugeChartModel: {
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
        caption: string;
        catalogField: string;
        seriesType: string;
        valueField: string;
        id: string;
        appId: string;
    }[];
    fetchControlAction: {
        appDEMethodId: string;
        appDataEntityId: string;
        id: string;
        appId: string;
    };
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
/**
 * 仪表盘默认数据
 */
export declare const GaugeDefaultData: IGaugeData;
