import { IThirdAuthResult, IThirdAuthService } from '../../../interface';
export declare class ThirdAuthService implements IThirdAuthService {
    /**
     * 第三方授权
     *
     * @author tony001
     * @date 2024-11-18 14:11:58
     * @param {('DINGTALK' | 'WXWORK' | 'OAUTH'  |string)} type 授权类型：钉钉 | 企业微信 | OAUTH | 自定义
     * @param {('EMBED' | 'THIRD')} mode
     * @param {IData} [params]
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    auth(type: 'DINGTALK' | 'WXWORK' | 'OAUTH' | string, mode: 'EMBED' | 'THIRD', params?: IData): Promise<IThirdAuthResult>;
    /**
     * 清空权限数据
     *
     * @author tony001
     * @date 2024-11-18 17:11:31
     * @private
     */
    private clearAuthData;
    /**
     * 获取需要的location部分
     *
     * @author tony001
     * @date 2024-11-18 17:11:31
     * @private
     * @return {*}  {string}
     */
    private getNeedLocation;
    /**
     * 钉钉嵌入授权
     *
     * @author tony001
     * @date 2024-11-18 14:11:30
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    dingTalkEmbedAuth(): Promise<IThirdAuthResult>;
    /**
     * 钉钉扫码授权
     *
     * @author tony001
     * @date 2024-11-18 14:11:40
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    dingTalkThirddAuth(): Promise<IThirdAuthResult>;
    /**
     * 企业微信嵌入授权
     *
     * @author tony001
     * @date 2024-11-18 14:11:55
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    wxWorkEmbedAuth(): Promise<IThirdAuthResult>;
    /**
     * 企业微信扫码授权
     *
     * @author tony001
     * @date 2024-11-18 14:11:04
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    wxWorkThirddAuth(): Promise<IThirdAuthResult>;
    /**
     * oauth 登录
     *
     * @author tony001
     * @date 2024-12-22 11:12:56
     * @param {IData} [params={}]
     * @return {*}  {Promise<IThirdAuthResult>}
     */
    oauthThirdAuth(params?: IData): Promise<IThirdAuthResult>;
}
//# sourceMappingURL=third-auth.service.d.ts.map