/* eslint-disable import/no-extraneous-dependencies */
import { IQrcodeUtil } from '@ibiz-template/runtime';
import QRCodeStyling from 'qr-code-styling';

/**
 * @description 二维码工具类
 * @export
 * @class QrcodeUtil
 * @implements {IQrcodeUtil}
 */
export class QrcodeUtil implements IQrcodeUtil {
  /**
   * @description 扫描二维码（pc端暂不实现）
   * @param {(IParams | undefined)} [options]
   * @returns {*}  {Promise<IData>}
   * @memberof QrcodeUtil
   */
  async scanQrcode(): Promise<IData> {
    throw new Error('Method not implemented.');
  }

  /**
   * @description 创建二维码
   * @param {string} value
   * @param {(IParams | undefined)} [options]
   * @returns {*}  {IParams}
   * @memberof QrcodeUtil
   */
  createQrcode(value: string, options?: IParams | undefined): IParams {
    return new QRCodeStyling({
      data: unescape(encodeURIComponent(value)),
      ...options,
    });
  }
}
