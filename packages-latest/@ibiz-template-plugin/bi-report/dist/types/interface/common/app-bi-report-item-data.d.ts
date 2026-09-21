/**
 * BI报表项数据接口
 *
 * @author tony001
 * @date 2024-06-25 17:06:02
 * @export
 * @interface IAppBIReportItemData
 */
export interface IAppBIReportItemData {
    pssysbicubename: string;
    pssysbicubemeasurename?: string;
    pssysbicubedimensionname?: string;
    birepitemtype: 'MEASURE' | 'DIMENSION' | 'USER';
    pssysbireportname?: string;
    pssysbischemeid: string;
    pssysbireportid?: string;
    pssysbireportitemname?: string;
    pssysbireportitemid?: string;
    pssysbicubemeasureid?: string;
    pssysbicubeid: string;
    pssysbicubedimensionid?: string;
    valueformat?: string;
    validflag: number;
}
