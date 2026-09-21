import { IEncyptionUtil } from '../../interface';
/**
 * 加密工具类
 *
 * @export
 * @class EncyptionUtil
 * @implements {IEncyptionUtil}
 */
export declare class EncyptionUtil implements IEncyptionUtil {
    /**
     * 公钥pem
     *
     * @author tony001
     * @date 2024-12-25 20:12:41
     * @private
     * @type {string}
     */
    private publicKeyPem;
    /**
     * 获取公钥pem
     *
     * @author tony001
     * @date 2024-12-27 22:12:58
     * @private
     * @return {*}  {Promise<string>}
     */
    private getPublicKeyPem;
    /**
     * RSA加密
     *
     * @author tony001
     * @date 2024-12-25 20:12:23
     * @param {string} plainText
     * @return {*}  {Promise<string>}
     */
    encryptByRSA(plainText: string): Promise<string>;
}
//# sourceMappingURL=encryption-uitl.d.ts.map