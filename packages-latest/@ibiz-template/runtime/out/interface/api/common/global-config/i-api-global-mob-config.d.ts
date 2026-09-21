/**
 * @description 全局移动端配置
 * @export
 * @interface IApiGlobalMobConfig
 */
export interface IApiGlobalMobConfig {
    /**
     * @description 是否在移动端页面标题中显示应用名称；为 false 时浏览器标题仅显示视图标题
     * @type {boolean}
     * @default true
     * @platform mob
     * @memberof IApiGlobalConfig
     */
    mobShowAppTitle: boolean;
    /**
     * @description 移动端home视图路由替换模式，为replace时将会使用router.replace进行路由跳转，为default时使用router.push进行路由跳转
     * @type {('default' | 'replace')}
     * @default default
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobHomeRouteMode: 'default' | 'replace';
    /**
     * @description 获取微信授权签名请求路径
     * @type {string}
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobGetSignUrl: string;
    /**
     * @description 获取微信授权签名请求方式
     * @type {string}
     * @default post
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobGetSignMethod: string;
    /**
     * @description 是否开启微信调试模式
     * @type {boolean}
     * @default false
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobWeChatDebug: boolean;
    /**
     * @description 文件上传过程中是否显示全局 loading 提示
     * @type {boolean}
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    showUploadLoading: boolean;
    /**
     * @description 是否显示移动端返回顶部按钮
     * @type {boolean}
     * @default false
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobShowBackTop: boolean;
    /**
     * @description 是否启用移动端搜索栏搜索历史记录功能
     * @type {boolean}
     * @default false
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    mobEnableStoredQuery: boolean;
    /**
     * @description 工具栏显示模式：IMMEDIATE 立即展示；COLLAPSIBLE 支持折叠展开
     * @type {('IMMEDIATE' | 'COLLAPSIBLE')}
     * @default IMMEDIATE
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    toolbarShowMode: 'IMMEDIATE' | 'COLLAPSIBLE';
    /**
     * @description 工具栏分组展示方式：DEFAULT 气泡形式；ACTIONSHEET 抽屉列表形式
     * @type {('DEFAULT' | 'ACTIONSHEET')}
     * @default ACTIONSHEET
     * @platform mob
     * @memberof IApiGlobalMobConfig
     */
    toolbarGroupShowMode: 'DEFAULT' | 'ACTIONSHEET';
}
//# sourceMappingURL=i-api-global-mob-config.d.ts.map