import { LoginMode, MenuPermissionMode } from '../constant';
/**
 * 环境变量
 */
export const Environment = {
    dev: false,
    hub: true,
    enableMqtt: false,
    mqttUrl: '/portal/mqtt/mqtt',
    isEnableMultiLan: false,
    anonymousUser: '',
    anonymousPwd: '',
    enableAnonymous: false,
    logLevel: 'ERROR',
    baseUrl: '/api',
    appId: '',
    pluginBaseUrl: 'http://172.16.240.221',
    isLocalModel: false,
    remoteModelUrl: '/remotemodel',
    assetsUrl: './assets',
    dcSystem: '',
    // {cat} 会替换模型 IApplication的getDefaultOSSCat 参数 如果没有会截取掉/{cat}
    // getDefaultOSSCat 配置方法 系统应用-高级设置-自定义参数：DefaultOSSCat
    // 配置示例 DefaultOSSCat=cat
    downloadFileUrl: '/ibizutil/download/{cat}',
    uploadFileUrl: '/ibizutil/upload/{cat}',
    casLoginUrl: '',
    loginMode: LoginMode.DEFAULT,
    menuPermissionMode: MenuPermissionMode.MIXIN,
    enablePermission: true,
    routePlaceholder: '-',
    enableWfAllHistory: false,
    isMob: false,
    isSaaSMode: true,
    AppTitle: '',
    AppLabel: '',
    favicon: './favicon.ico',
    enableTitle: true,
    tokenHeader: '',
    tokenPrefix: '',
    customParams: {},
    oauthOpenAccessId: '',
    enableEncryption: false,
    cookieDomain: '',
    appLoadingTheme: 'DEFAULT',
    environmentTag: 'development',
    mobMenuShowMode: 'DEFAULT',
};
