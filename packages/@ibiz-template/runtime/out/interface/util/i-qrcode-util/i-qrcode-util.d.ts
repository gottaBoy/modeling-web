/**
 * 二维码工具类
 *
 * @description 此实现类挂载在 ibiz.qrcodeUtil
 * @author ljx
 * @date 2024-12-11 09:12:50
 * @interface IQrcodeUtil
 */
export interface IQrcodeUtil {
    /**
     * 扫描二维码
     * @author ljx
     * @date 2024-12-11 09:12:50
     * @param {IParams | undefined} options 创建二维码参数配置
     * @return {*}  {Promise<IData>}
     */
    scanQrcode(options?: IParams | undefined): Promise<IData>;
    /**
     * 创建二维码
     * @author ljx
     * @date 2024-12-11 09:12:50
     * @param {string} value  创建二维码需要的文本值
     * @param {IParams | undefined} options 创建二维码参数配置
     * @return {*}  {IParams}
     */
    createQrcode(value: string, options?: IParams | undefined): IParams;
}
//# sourceMappingURL=i-qrcode-util.d.ts.map