/**
 * 加密工具类接口
 *
 * @export
 * @interface IEncyptionUtil
 */
export interface IEncyptionUtil {
    /**
     * RSA加密
     *
     * @param {string} plainText
     * @param {string} [publicKey]
     * @return {*}  {(Promise<string>)}
     * @memberof IEncyptionUtil
     */
    encryptByRSA(plainText: string, publicKey?: string): Promise<string>;
}
//# sourceMappingURL=i-encryption-uitl.d.ts.map