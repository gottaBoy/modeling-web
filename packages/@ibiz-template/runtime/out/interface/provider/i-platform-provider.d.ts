/**
 * 搭载平台适配器接口
 *
 * @author zk
 * @date 2023-11-20 02:11:24
 * @export
 * @interface IPlatformProvider
 */
export interface IPlatformProvider {
    /**
     * 登录
     *
     * @author zk
     * @date 2023-11-20 03:11:10
     * @param {string} loginName 账号!
     * @param {string} passWord 密码!
     * @param {string} [verificationCode] 验证码?
     * @return {*}  {Promise<boolean>}
     * @memberof IPlatformProvider
     */
    login(loginName: string, passWord: string, verificationCode?: string): Promise<boolean>;
    /**
     * 下载
     *
     * @author zk
     * @date 2023-11-20 04:11:54
     * @param {string} url 下载地址
     * @param {string} name 文件名称
     * @memberof IPlatformProvider
     */
    download(url: string, name: string): Promise<boolean>;
    /**
     * 初始化
     *
     * @author zk
     * @date 2023-11-21 11:11:57
     * @memberof IPlatformProvider
     */
    init(): Promise<void>;
    /**
     * @description 销毁
     * @memberof IPlatformProvider
     */
    destroyed(): Promise<void>;
    /**
     * 返回
     *
     * @author zk
     * @date 2023-11-21 08:11:36
     * @memberof IPlatformProvider
     */
    back(): void;
    /**
     * @description 设置浏览器标题
     * @param {string} title
     * @memberof IPlatformProvider
     */
    setBrowserTitle(title: string): void;
}
//# sourceMappingURL=i-platform-provider.d.ts.map