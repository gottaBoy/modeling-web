import { INumberData } from '../interface';
export declare const NumberChartConfig: {
    data: {
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
            details: {
                id: string;
                caption: string;
                subCaption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                multiple: boolean;
                disableCalcField: boolean;
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
                showCaption: boolean;
                type: string;
                editorType: string;
                disableCalcField: boolean;
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
                type: string;
                editorType: string;
                mode: string;
                fontMax: number;
            }[];
            enableSwitch?: undefined;
        } | {
            id: string;
            caption: string;
            type: string;
            enableSwitch: boolean;
            details: {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                items: {
                    id: string;
                    label: string;
                }[];
            }[];
        })[];
    };
};
export declare const NumberDefaultData: INumberData;
