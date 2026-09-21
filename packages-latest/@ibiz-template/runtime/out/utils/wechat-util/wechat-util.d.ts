import { IApiWeChatUtil } from '../../interface';
/**
 * @description 微信工具类
 * @export
 * @class WeChatUtil
 * @implements {IApiWeChatUtil}
 */
export declare class WeChatUtil implements IApiWeChatUtil {
    /**
     * @description 获取微信授权签名数据
     * @param {IData} data
     * @returns {*}  {(Promise<IData | undefined>)}
     * @memberof WeChatUtil
     */
    getSign(data: IData): Promise<IData | undefined>;
    /**
     * @description 配置微信授权
     * @param {string[]} [jsApiList=[]] 使用js-sdk的api列表
     * @param {IData} signData 获取授权签名请求数据
     * @param {IData} [fieldMap={}] 授权签名数据与ws.config的属性映射表,分别为timestamp（时间戳属性）、nonceStr（随机字符串属性）、signature（签名属性）
     * @returns {*}  {Promise<IData>}
     * @memberof WeChatUtil
     */
    config(jsApiList?: string[], signData?: IData, fieldMap?: IData): Promise<IData>;
}
//# sourceMappingURL=wechat-util.d.ts.map