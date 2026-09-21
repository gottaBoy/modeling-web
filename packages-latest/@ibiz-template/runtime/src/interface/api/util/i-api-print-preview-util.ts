import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description pdf导出参数
 * @export
 * @interface IApiPdfExportOptions
 */
export interface IApiPdfExportOptions {
  /**
   * @description 目标
   * @type {('portrait' | 'landscape')}
   * @default portrait
   * @memberof IApiPdfExportOptions
   */
  orientation?: 'portrait' | 'landscape';

  /**
   * @description 页面大小
   * @type {('a4' | 'a3' | 'letter')}
   * @default a4
   * @memberof IApiPdfExportOptions
   */
  pageSize?: 'a4' | 'a3' | 'letter';

  /**
   * @description 字体大小
   * @type {number}
   * @default 12
   * @memberof IApiPdfExportOptions
   */
  fontSize?: number;

  /**
   * @description 外边距
   * @type {{
   *     top: number;
   *     right: number;
   *     bottom: number;
   *     left: number;
   *   }}
   * @default {top: 20,right: 20,bottom: 20,left: 20}
   * @memberof IApiPdfExportOptions
   */
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  /**
   * @description 字体行高
   * @type {number}
   * @default 1.6
   * @memberof IApiPdfExportOptions
   */
  lineHeight?: number;

  /**
   * @description 字体对齐
   * @type {('left' | 'center' | 'right')}
   * @default left
   * @memberof IApiPdfExportOptions
   */
  textAlign?: 'left' | 'center' | 'right';

  /**
   * @description 字体颜色
   * @type {string}
   * @default #000000
   * @memberof IApiPdfExportOptions
   */
  textColor?: string;

  /**
   * @description 背景色
   * @type {string}
   * @default #FFFFFF
   * @memberof IApiPdfExportOptions
   */
  backgroundColor?: string;

  /**
   * @description 内容是否为html字符串
   * @type {boolean}
   * @default false
   * @memberof IApiPdfExportOptions
   */
  isHtml?: boolean;

  /**
   * @description 片段高度（pdf内容过大超出浏览器限制时，将内容分成多个片段后导出）
   * @type {number}
   * @default 8000
   * @memberof IApiPdfExportOptions
   */
  segmentHeight?: number;
}

/**
 * 打印预览功能类接口
 */
export interface IApiPrintPreviewUtil {
  /**
   * 执行打印
   * @param context
   * @param params
   * @param data
   * @returns 是否执行成功
   */
  execPrint(
    context: IApiContext,
    params: IApiParams,
    data: Blob,
  ): Promise<boolean>;

  /**
   * @description 将指定内容导出为 PDF 文件并触发打印或下载。
   * @param {string} filename pdf导出文件名，必须以.pdf结尾
   * @param {string} content pdf导出内容
   * @param {IApiPdfExportOptions} [options]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiPrintPreviewUtil
   */
  printPdf(
    filename: string,
    content: string,
    options?: IApiPdfExportOptions,
  ): Promise<boolean>;

  /**
   * @description 将指定内容导出为 HTML 文件。
   * @param {string} filename 导出html文件名，需以.html结尾
   * @param {string} content 导出html内容，为body标签中的html字符串
   * @param {IApiData} [style] 导出html样式，会添加到style标签中
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiPrintPreviewUtil
   */
  printHtml2(
    filename: string,
    content: string,
    style?: IApiData,
  ): Promise<boolean>;
}
