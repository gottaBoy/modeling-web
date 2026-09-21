import { IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 二维码工具
 * @export
 * @interface IApiQrcodeUtil
 */
export interface IApiQrcodeUtil {
  /**
   * @description 打开二维码扫描界面并返回扫描结果
   * @param {IApiParams} [options] 模态配置
   * @returns {*}  {Promise<IApiData>}
   * @memberof IApiQrcodeUtil
   */
  scanQrcode(options?: IApiParams): Promise<IApiData>;

  /**
   * @description 根据指定内容生成二维码配置数据
   * @param {string} value 创建二维码需要的文本值
   * @param {IApiParams} [options] 创建二维码参数配置
   * @returns {*}  {IApiParams}
   * @memberof IApiQrcodeUtil
   */
  createQrcode(value: string, options?: IApiParams): IApiParams;
}
