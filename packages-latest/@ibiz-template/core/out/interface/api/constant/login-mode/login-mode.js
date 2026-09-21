/* eslint-disable no-shadow */
/**
 * @description 登录模式
 * @export
 * @enum {number}
 */
export var LoginMode;
(function (LoginMode) {
    /**
     * 默认标准登录
     */
    LoginMode["DEFAULT"] = "DEFAULT";
    /**
     * 自定义登录
     */
    LoginMode["CUSTOM"] = "CUSTOM";
    /**
     * 中央认证登录
     */
    LoginMode["CAS"] = "CAS";
    /**
     * oauth登录
     */
    LoginMode["OAUTH"] = "OAUTH";
})(LoginMode || (LoginMode = {}));
