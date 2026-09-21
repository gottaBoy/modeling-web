/**
 * @description 导出参数
 * @export
 * @interface IApiExportParams
 */
export interface IApiExportParams {
    /**
     * @description 导出类型，activatedPage: 导出当前页，selectedRows: 导出当前选中，maxRowCount: 导出全部，customPage: 自定义导出页
     * @type {('activatedPage' | 'selectedRows' | 'maxRowCount' | 'customPage')}
     * @memberof IApiExportParams
     */
    type?: 'activatedPage' | 'selectedRows' | 'maxRowCount' | 'customPage';
    /**
     * @description 自定义导出开始页，type为customPage时必填
     * @type {number}
     * @memberof IApiExportParams
     */
    startPage?: number;
    /**
     * @description 自定义导出结束页，type为customPage时必填
     * @type {number}
     * @memberof IApiExportParams
     */
    endPage?: number;
    /**
     * @description 自定义导出数据主键属性
     * @type {string}
     * @memberof IApiExportParams
     */
    srfexportdatakey?: string;
    /**
     * @description 自定义导出数据集
     * @type {string}
     * @memberof IApiExportParams
     */
    srfexportdataset?: string;
    /**
     * @description 自定义导出模型对象
     * @type {IData}
     * @memberof IApiExportParams
     */
    srfdataexport?: IData;
    /**
     * @description 自定义导出数据类型
     * @type {string}
     * @memberof IApiExportParams
     */
    srfdatatype?: string;
    /**
     * @description 自定义导出参数
     * @type {IData}
     * @memberof IApiExportParams
     */
    srfexportparams?: IData;
}
//# sourceMappingURL=i-api-export-params.d.ts.map