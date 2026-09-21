import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';
export interface INumberData {
    caption: string;
    data: {
        measure: IAppBICubeMeasureData[] | undefined;
        period: IAppBICubeDimensionData[] | undefined;
        filter: IAppBICubeDimensionData[] | undefined;
    };
    style: {
        font: {
            show: Boolean;
            font: {
                fontWeight: 'normal' | 'bold';
                fontStyle: 'normal' | 'italic';
                fontSize: number;
                color: string;
            };
        };
        yoy: {
            show: Boolean;
            yoy: Array<string>;
        };
        qoq: {
            show: Boolean;
            qoq: Array<string>;
        };
    };
    extend: IData;
}
