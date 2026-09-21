/* eslint-disable import/no-extraneous-dependencies */
import JSEncrypt from 'jsencrypt';
import { IEncyptionUtil } from '../../interface';

/**
 * 加密工具类
 *
 * @export
 * @class EncyptionUtil
 * @implements {IEncyptionUtil}
 */
export class EncyptionUtil implements IEncyptionUtil {
  /**
   * 公钥pem
   *
   * @author tony001
   * @date 2024-12-25 20:12:41
   * @private
   * @type {string}
   */
  private publicKeyPem: string = '';

  /**
   * 获取公钥pem
   *
   * @author tony001
   * @date 2024-12-27 22:12:58
   * @private
   * @return {*}  {Promise<string>}
   */
  private async getPublicKeyPem(): Promise<string> {
    if (this.publicKeyPem) {
      return this.publicKeyPem;
    }
    const res = await ibiz.net.get('/uaa/publickeypem');
    if (res.ok) {
      this.publicKeyPem = res.data as unknown as string;
      return this.publicKeyPem;
    }
    throw new Error(
      ibiz.i18n.t('runtime.controller.utils.encyptionUtil.publicKeyPemError'),
    );
  }

  /**
   * RSA加密
   *
   * @author tony001
   * @date 2024-12-25 20:12:23
   * @param {string} plainText
   * @return {*}  {Promise<string>}
   */
  async encryptByRSA(plainText: string): Promise<string> {
    const publicKeyPem = await this.getPublicKeyPem();
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKeyPem);
    const result = encryptor.encrypt(plainText);
    if (!result) {
      throw new Error(
        ibiz.i18n.t('runtime.controller.utils.encyptionUtil.encryptionError'),
      );
    }
    return result;
  }
}
