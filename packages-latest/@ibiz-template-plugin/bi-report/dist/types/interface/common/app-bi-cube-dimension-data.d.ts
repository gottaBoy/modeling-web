/**
 * 维度数据接口
 *
 * @export
 * @interface IAppBICubeDimensionData
 */
export interface IAppBICubeDimensionData {
    allhierarchyflag: number;
    bidimensiontype: string;
    codename: string;
    pscodelistid: string;
    defaultflag: number;
    dynamodelflag: number;
    psdefid: string;
    psdefname: string;
    pssysbicubedimensionid: string;
    pssysbicubedimensionname: string;
    pssysbicubeid: string;
    pssysbicubename: string;
    pssysbischemeid: string;
    validflag: number;
    valueformat?: string;
    birepitemparams?: string;
    parampsdeuiactiontag?: string;
}
