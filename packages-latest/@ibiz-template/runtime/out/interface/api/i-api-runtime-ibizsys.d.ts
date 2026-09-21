import { IApiAppHubService } from './app';
import { IApiGlobalConfig } from './common';
import { IApiAppUtil, IApiConfirmUtil, IApiFullscreenUtil, IApiGlobalUtil, IApiMessageUtil, IApiModalUtil, IApiNotificationUtil, IApiPrintPreviewUtil, IApiQrcodeUtil } from './util';
import { IApiOpenViewUtil } from './util/i-api-open-view-util';
/**
 * @description 运行时总集
 * @export
 * @interface IApiRuntimeIbizsys
 */
export interface IApiRuntimeIbizsys {
    /**
     * @description 应用中心服务，用于应用级资源调度、服务注册与统一访问入口
     * @type {IApiAppHubService}
     * @memberof IApiRuntimeIbizsys
     */
    hub: IApiAppHubService;
    /**
     * @description 全局配置对象，用于获取系统级配置、运行环境参数及全局变量
     * @type {IApiGlobalConfig}
     * @memberof IApiRuntimeIbizsys
     */
    config: IApiGlobalConfig;
    /**
     * @description 模态框工具服务，用于弹出对话框（如信息提示、表单弹窗等）
     * @type {IApiModalUtil}
     * @memberof IApiRuntimeIbizsys
     */
    modal: IApiModalUtil;
    /**
     * @description 确认框服务，用于触发用户确认操作（如删除确认、操作二次确认等）
     * @type {IApiConfirmUtil}
     * @memberof IApiRuntimeIbizsys
     */
    confirm: IApiConfirmUtil;
    /**
     * @description 消息提示服务，用于在页面顶部居中展示轻量级反馈信息（如成功、警告、错误提示）
     * @type {IApiMessageUtil}
     * @memberof IApiRuntimeIbizsys
     */
    message: IApiMessageUtil;
    /**
     * @description 全局通知服务，用于展示系统级通知（支持持久化或可关闭通知）
     * @type {IApiNotificationUtil}
     * @memberof IApiRuntimeIbizsys
     */
    notification: IApiNotificationUtil;
    /**
     * @description 视图打开服务，用于打开或跳转至指定视图（支持路由、模态、抽屉等多种方式）
     * @type {IApiOpenViewUtil}
     * @memberof IApiRuntimeIbizsys
     */
    openView: IApiOpenViewUtil;
    /**
     * @description 全局工具服务，提供通用方法（如自定义主题、文本格式化等）
     * @type {IApiGlobalUtil}
     * @memberof IApiRuntimeIbizsys
     */
    util: IApiGlobalUtil;
    /**
     * @description 全屏工具服务，用于控制页面或指定元素进入/退出全屏模式
     * @type {IApiFullscreenUtil}
     * @memberof IApiRuntimeIbizsys
     */
    fullscreenUtil: IApiFullscreenUtil;
    /**
     * @description 二维码工具服务，用于生成或解析二维码内容
     * @type {IApiQrcodeUtil}
     * @memberof IApiRuntimeIbizsys
     */
    qrcodeUtil: IApiQrcodeUtil;
    /**
     * @description 应用级工具服务，提供调整整个应用状态的功能（如登录、登出、切换主题等）
     * @type {IApiAppUtil}
     * @memberof IApiRuntimeIbizsys
     */
    appUtil: IApiAppUtil;
    /**
     * @description 打印预览服务，用于生成并展示打印预览内容，支持导出或打印操作
     */
    printPreview: IApiPrintPreviewUtil;
}
//# sourceMappingURL=i-api-runtime-ibizsys.d.ts.map