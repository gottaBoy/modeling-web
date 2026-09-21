import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';
export interface IGaugeData {
    caption: string;
    data: {
        measure: IAppBICubeMeasureData[] | undefined;
        filter: IAppBICubeDimensionData[] | undefined;
    };
    style: {
        graphics: {
            colorScheme: 'default' | 'template';
            color: string | string[];
        };
        fontSetting: {
            show: boolean;
            font: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
        };
        featureSetting: {
            endpoint: number;
        };
    };
    extend: IData;
}
