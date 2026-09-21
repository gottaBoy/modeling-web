export declare const CrossTableConfig: {
    data: {
        pagination: boolean;
        details: ({
            id: string;
            caption: string;
            type: string;
            isCollapse: boolean;
            allowClear: boolean;
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
            allowClear: boolean;
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
            allowClear: boolean;
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
            enableSwitch: boolean;
            details: ({
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                mode: string;
                editorStyle?: undefined;
                showCenter?: undefined;
            } | {
                id: string;
                caption: string;
                showCaption: boolean;
                type: string;
                editorType: string;
                editorStyle: string;
                showCenter: boolean;
                mode?: undefined;
            })[];
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
                items: {
                    id: string;
                    label: string;
                }[];
            }[];
            enableSwitch?: undefined;
        })[];
    };
};
export declare const CrossTableModel: {
    aggMode: string;
    columnEnableFilter: number;
    columnEnableLink: number;
    gridStyle: string;
    groupMode: string;
    pagingMode: number;
    pagingSize: number;
    sortMode: string;
    enableCustomized: boolean;
    enablePagingBar: boolean;
    singleSelect: boolean;
    fetchControlAction: {
        appDEMethodId: string;
        appDataEntityId: string;
        id: string;
        appId: string;
    };
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
export declare const CrossTableDefaultData: {
    caption: string;
    data: {
        measure: undefined;
        dimension: undefined;
        dimension_col: undefined;
        filter: never[];
        size: number;
    };
    style: {
        gridFont: {
            show: boolean;
            gridHeader: {
                fontWeight: string;
                fontStyle: string;
                fontSize: number;
                color: string;
            };
            gridHeaderAlign: string;
            gridBody: {
                fontWeight: string;
                fontStyle: string;
                fontSize: number;
                color: string;
            };
            gridBodyAlign: string;
        };
        agg: {
            show: boolean;
            rowPosition: string;
            colPosition: string;
        };
        function: {
            show: boolean;
            function: string[];
        };
    };
    extend: {};
};
