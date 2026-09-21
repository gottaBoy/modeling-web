import { LogLevelDesc } from 'loglevel';
import { LoginMode, MenuPermissionMode } from '../../constant';
import { IDevToolConfig } from '../i-devtool-config/i-devtool-config';
/**
 * 配置参数
 *
 * @author chitanda
 * @date 2022-07-19 18:07:29
 * @export
 * @interface IEnvironment
 */
export interface IEnvironment {
    /**
     * 命名空间
     *
     * @author chitanda
     * @date 2022-09-06 11:09:32
     * @type {string}
     */
    namespace?: string;
    /**
     * 是否为开发模式
     *
     * @default false
     * @author chitanda
     * @date 2022-10-21 11:10:29
     * @type {boolean}
     */
    dev: boolean;
    /**
     * 是否为多应用 hub 基座模式
     *
     * @author chitanda
     * @date 2022-12-20 10:12:45
     * @type {boolean}
     */
    hub: boolean;
    /**
     * 是否启用 mqtt 异步消息(ws模式消息)
     *
     * @author chitanda
     * @date 2023-10-23 15:10:01
     * @type {boolean}
     */
    enableMqtt: boolean;
    /**
     * mqtt 默认连接地址
     *
     * @description emq 服务地址 /portal/mqtt/mqtt, rebbitmq 服务地址 /portal/mqtt/ws
     * @author chitanda
     * @date 2023-10-23 15:10:54
     * @type {string}
     */
    mqttUrl: string;
    /**
     * 默认应用的应用标识
     *
     * @author chitanda
     * @date 2022-12-22 15:12:35
     * @type {string}
     */
    appId: string;
    /**
     * 日志级别
     *
     * @author chitanda
     * @date 2022-10-25 20:10:55
     * @type {LogLevelDesc}
     */
    logLevel: LogLevelDesc;
    /**
     * 请求根路径
     *
     * @author chitanda
     * @date 2022-07-19 18:07:58
     * @type {string}
     */
    baseUrl: string;
    /**
     * 插件默认所在目录
     *
     * @author chitanda
     * @date 2022-10-31 14:10:49
     * @type {string}
     */
    pluginBaseUrl: string;
    /**
     * 登录模式
     *
     * @author lxm
     * @date 2022-10-12 14:10:51
     * @type {LoginMode}
     */
    loginMode: LoginMode;
    /**
     * oauth 开放接入标识
     *
     * @author tony001
     * @date 2024-12-22 10:12:02
     * @type {string}
     */
    oauthOpenAccessId: string;
    /**
     * 中央认证登录地址
     *
     * @author lxm
     * @date 2022-10-11 12:10:21
     * @type {string}
     */
    casLoginUrl: string;
    /**
     * 模型是否为本地模型(走静态资源模式)
     *
     * @author chitanda
     * @date 2023-07-06 15:07:19
     * @type {boolean}
     */
    isLocalModel: boolean;
    /**
     * 远程模型路径
     *
     * @author chitanda
     * @date 2022-09-22 18:09:25
     * @type {string}
     */
    remoteModelUrl: string;
    /**
     * 资源文件根路径
     *
     * @author lxm
     * @date 2022-08-25 14:08:08
     * @type {string}
     */
    assetsUrl: string;
    /**
     * 中心系统标识
     *
     * @author chitanda
     * @date 2022-08-22 23:08:46
     * @type {string}
     */
    dcSystem: string;
    /**
     * 文件下载url
     *
     * @author chitanda
     * @date 2022-08-22 23:08:46
     * @type {string}
     */
    downloadFileUrl: string;
    /**
     * 文件上传url
     *
     * @author chitanda
     * @date 2022-08-22 23:08:46
     * @type {string}
     */
    uploadFileUrl: string;
    /**
     * 是否启用权限校验（默认true）
     *
     * @author lxm
     * @date 2022-10-12 18:10:25
     * @type {boolean}
     */
    enablePermission: boolean;
    /**
     * 菜单权限校验模式（默认MIXIN）
     *
     * @author lxm
     * @date 2022-10-12 18:10:27
     * @type {MenuPermissionMode}
     */
    menuPermissionMode: MenuPermissionMode;
    /**
     * 路由占位符
     *
     * @type {string}
     * @memberof IEnvironment
     */
    routePlaceholder: string;
    /**
     * 是否让所有工作流history接口走all
     *
     * @type {boolean}
     * @memberof IEnvironment
     */
    enableWfAllHistory: boolean;
    /**
     * 是否启用加密
     *
     * @type {boolean}
     * @memberof IEnvironment
     */
    enableEncryption: boolean;
    /**
     * 应用加载主题
     *
     * @type {('DEFAULT' | 'DARK' | 'LIGHT')}
     * @memberof IEnvironment
     */
    appLoadingTheme: 'DEFAULT' | 'DARK' | 'LIGHT';
    /**
     * 应用标题
     *
     * @type {string}
     * @memberof IEnvironment
     */
    AppTitle?: string;
    /**
     * 应用标记
     *
     * @author tony001
     * @date 2025-01-09 18:01:14
     * @type {string}
     */
    AppLabel?: string;
    /**
     * 是否为 SaaS 模式
     *
     * @author chitanda
     * @date 2023-07-11 16:07:23
     * @type {boolean}
     */
    isSaaSMode?: boolean;
    /**
     * 是否为移动端应用
     *
     * @author chitanda
     * @date 2023-06-20 12:06:15
     * @type {boolean}
     */
    isMob?: boolean;
    /**
     * 应用图标地址
     *
     * @author chitanda
     * @date 2023-07-17 17:07:23
     * @type {string}
     */
    favicon?: string;
    /**
     * 是否启用多语言
     *
     * @description 此值是默认加载后，根据应用模型中的配置来决定是否启用多语言。请勿手动修改此值
     * @author chitanda
     * @date 2023-08-25 15:08:28
     * @type {boolean}
     */
    isEnableMultiLan?: boolean;
    /**
     * 匿名用户名
     *
     * @author chitanda
     * @date 2023-12-27 14:12:01
     * @type {string}
     */
    anonymousUser?: string;
    /**
     * 匿名用户密码
     *
     * @author chitanda
     * @date 2023-12-27 14:12:06
     * @type {string}
     */
    anonymousPwd?: string;
    /**
     * 启用匿名模式
     * @author lxm
     * @date 2024-01-03 05:12:45
     * @type {boolean}
     */
    enableAnonymous?: boolean;
    /**
     * 市场地址
     * @author: zhujiamin
     * @date 2024-01-04 16:11:17
     * @type {string}
     */
    marketAddress?: string;
    /**
     * devtool的配置对象
     * @author lxm
     * @date 2024-01-29 11:30:15
     * @type {IDevToolConfig}
     */
    devtoolConfig?: IDevToolConfig;
    /**
     * 是否启用title
     * @author fzh
     * @date 2024-07-02 20:59:47
     * @type {boolean}
     */
    enableTitle?: boolean;
    /**
     * @description token头
     * @type {string}
     * @memberof IEnvironment
     */
    tokenHeader?: string;
    /**
     * @description token前缀
     * @memberof IEnvironment
     */
    tokenPrefix?: string;
    /**
     * 自定义动态参数，格式如：{\"XXX\":\"YYY\",\"AAA\":\"BBB\"}
     *
     * @author tony001
     * @date 2024-11-18 21:11:12
     * @type {IParams}
     */
    customParams?: IParams;
    /**
     * 定义cookie作用域
     *
     * @author tony001
     * @date 2025-01-06 16:01:41
     * @type {string}
     */
    cookieDomain?: string;
    /**
     * 环境类型
     *
     * @author tony001
     * @date 2025-01-17 13:01:38
     * @type {('development' | 'test' | 'production')}
     */
    environmentTag?: 'development' | 'test' | 'production';
    /**
     * 移动端菜单呈现模式，DEFAULT：菜单映射的页面菜单显示，非菜单映射的页面菜单不显示；ALWAYS：所有页面菜单都显示,默认：DEFAULT
     *
     * @author tony001
     * @date 2025-01-21 16:01:27
     * @type {'DEFAULT'}
     */
    mobMenuShowMode?: 'DEFAULT' | 'ALWAYS';
}
//# sourceMappingURL=i-environment.d.ts.map