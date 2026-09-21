/**
 * 指标数据接口
 *
 * @export
 * @interface IAppBICubeMeasureData
 */
export interface IAppBICubeMeasureData {
    aggtype: string;
    bimeasuretype: string;
    codename: string;
    dynamodelflag: number;
    hiddendataitem: number;
    psdefid: string;
    psdefname: string;
    pssysbicubeid: string;
    pssysbicubemeasureid: string;
    pssysbicubemeasurename: string;
    pssysbicubename: string;
    pssysbischemeid: string;
    validflag: number;
    valueformat?: string;
    birepitemparams?: string;
    parampsdeuiactiontag?: string;
}
