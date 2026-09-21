/* eslint-disable no-shadow */
/**
 * 搭载平台类型
 *
 * @author zk
 * @date 2023-11-20 03:11:28
 * @export
 * @enum {number}
 */
export var PlatformType;
(function (PlatformType) {
    /**
     * IOS
     */
    PlatformType["IOS"] = "IOS";
    /**
     * 安卓
     */
    PlatformType["ANDROID"] = "Android";
    /**
     * 微信
     */
    PlatformType["WECHAT"] = "WeChat";
    /**
     * 腾讯QQ
     */
    PlatformType["QQ"] = "QQ";
    /**
     * 钉钉
     */
    PlatformType["DINGTALK"] = "DingTalk";
    /**
     * 浏览器
     */
    PlatformType["BROWSER"] = "Browser";
    /**
     * 微信小程序
     */
    PlatformType["WCMP"] = "WeChatMiniProgram";
    /**
     * 桌面端
     */
    PlatformType["DESKTOP"] = "Desktop";
})(PlatformType || (PlatformType = {}));
