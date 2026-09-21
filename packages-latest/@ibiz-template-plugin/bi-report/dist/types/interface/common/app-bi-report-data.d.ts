import { IAppBIReportItemData } from './app-bi-report-item-data';
/**
 * BI报表数据接口
 *
 * @author tony001
 * @date 2024-06-25 16:06:40
 * @export
 * @interface IAppBIReportData
 */
export interface IAppBIReportData {
    pssysbischemeid: string;
    pssysbireportitems: IAppBIReportItemData[];
    pssysbischemename?: string;
    pssysbicubeid: string;
    pssysbicubename?: string;
    bireporttag2?: string;
    memo?: string;
    bireportuimodel: string;
    bireporttag: string;
    bireportmodel?: string;
    pssysbireportid?: string;
    validflag: number;
    pssysbireportname: string;
    codename?: string;
}
