'use strict';

var qrCodeStyling = require('../../node_modules/.pnpm/qr-code-styling@1.9.2/node_modules/qr-code-styling/lib/qr-code-styling.cjs');

"use strict";
class QrcodeUtil {
  /**
   * @description 扫描二维码（pc端暂不实现）
   * @param {(IParams | undefined)} [options]
   * @returns {*}  {Promise<IData>}
   * @memberof QrcodeUtil
   */
  async scanQrcode() {
    throw new Error("Method not implemented.");
  }
  /**
   * @description 创建二维码
   * @param {string} value
   * @param {(IParams | undefined)} [options]
   * @returns {*}  {IParams}
   * @memberof QrcodeUtil
   */
  createQrcode(value, options) {
    return new qrCodeStyling.default({
      data: unescape(encodeURIComponent(value)),
      ...options
    });
  }
}

exports.QrcodeUtil = QrcodeUtil;
