import { IApiParams } from '@ibiz-template/core';
import { Base64 } from 'js-base64';
import { IApiHandlebarsUtil } from './i-api-handlebars-util';
import { IApiTextUtil } from './i-api-text-util';
import { IApiThemeUtil } from './i-api-theme-util';
import { IApiRawValueUtil } from './i-api-raw-value-util';
import { IApiShortCutUtil } from './i-api-short-cut-util';
import { IApiFileUtil } from './i-api-file-util';
import { IApiHtml2canvasUtil } from './i-api-html2canvas-util';
import { IApiVoiceUtil } from './i-api-voice-util';
import { IApiWaterMarkUtil } from './i-api-water-mark-util';
import { IApiWeChatUtil } from './i-api-wechat-util';
import { IApiJsonUtil } from './i-api-json-util';
import { IApiUIActionUtil } from './i-api-ui-action-util';
import { IApiErrorHandlerCenter } from './i-api-error-handle-center';
import { IApiEncryptionUtil } from './i-api-encryption-util';
import { IApiExcelUtil } from './i-api-excel-util';
import { Hash } from './i-api-md5-util';
/**
 * @description 全局工具接口
 * @export
 * @interface IApiGlobalUtil
 */
export interface IApiGlobalUtil {
    /**
     * @description 主题工具，用于管理应用主题切换及自定义主题配置
     * @type {IApiThemeUtil}
     * @memberof IApiGlobalUtil
     */
    readonly theme: IApiThemeUtil;
    /**
     * @description 文本处理工具，提供字符串格式化、检测及转换能力
     * @type {IApiTextUtil}
     * @memberof IApiGlobalUtil
     */
    readonly text: IApiTextUtil;
    /**
     * @description handlebars 工具
     * @type {IApiHandlebarsUtil}
     * @memberof IApiGlobalUtil
     */
    readonly hbs: IApiHandlebarsUtil;
    /**
     * @description base64 工具
     * @type {typeof Base64}
     * @memberof IApiGlobalUtil
     */
    readonly base64: typeof Base64;
    /**
     * @description md5 工具
     * @type {Hash}
     * @memberof IApiGlobalUtil
     */
    readonly md5: Hash;
    /**
     * @description 原始值处理工具，用于解析和转换字符串类型的基础数据
     * @type {IApiRawValueUtil}
     * @memberof IApiGlobalUtil
     */
    readonly rawValue: IApiRawValueUtil;
    /**
     * @description 界面行为工具，用于执行 UI 行为或逻辑操作
     * @type {IApiUIActionUtil}
     * @memberof IApiGlobalUtil
     */
    readonly action: IApiUIActionUtil;
    /**
     * @description 错误处理工具
     * @type {IApiErrorHandlerCenter}
     * @memberof IApiGlobalUtil
     */
    readonly error: IApiErrorHandlerCenter;
    /**
     * @description 最小化工具类
     * @type {IApiShortCutUtil}
     * @memberof IApiGlobalUtil
     */
    readonly shortCut: IApiShortCutUtil;
    /**
     * @description 文件处理工具，提供文件上传、下载及选择等能力
     * @type {IApiFileUtil}
     * @memberof IApiGlobalUtil
     */
    readonly file: IApiFileUtil;
    /**
     * @description DOM 转 Canvas 工具，用于页面截图或导出图像
     * @type {IApiHtml2canvasUtil}
     * @memberof IApiGlobalUtil
     */
    readonly html2canvas: IApiHtml2canvasUtil;
    /**
     * @description 语音工具类
     * @type {IApiVoiceUtil}
     * @memberof IApiGlobalUtil
     */
    readonly voice: IApiVoiceUtil;
    /**
     * @description 加密工具类
     * @type {IApiEncryptionUtil}
     * @memberof IApiGlobalUtil
     */
    readonly encryption: IApiEncryptionUtil;
    /**
     * @description 水印处理工具，用于动态挂载或移除页面水印
     * @type {IApiWaterMarkUtil}
     * @memberof IApiGlobalUtil
     */
    readonly watermark: IApiWaterMarkUtil;
    /**
     * @description 微信工具类
     * @type {IApiWeChatUtil}
     * @memberof IApiGlobalUtil
     */
    readonly weChat: IApiWeChatUtil;
    /**
     * @description json工具类
     * @type {IApiJsonUtil}
     * @memberof IApiGlobalUtil
     */
    readonly jsonUtil: IApiJsonUtil;
    /**
     * @description 获取Excel工具类
     * @memberof IApiGlobalUtil
     */
    getExcelUtil?: () => Promise<IApiExcelUtil>;
    /**
     * @description 显示应用级全局加载提示，通常用于长时间操作开始时
     * @memberof IApiGlobalUtil
     */
    showAppLoading(): void;
    /**
     * @description 隐藏应用级全局加载提示
     * @memberof IApiGlobalUtil
     */
    hiddenAppLoading(): void;
    /**
     * @description 设置浏览器页面标题
     * @param {string} title 浏览器标题
     * @memberof IApiGlobalUtil
     */
    setBrowserTitle(title: string): void;
    /**
     * @description 获取应用全局变量
     * @returns {*}  {IApiParams}
     * @memberof IApiGlobalUtil
     */
    getGlobalParam(): IApiParams;
    /**
     * @description 获取当前视图的路由参数集合，基于路由解析出来的，每个对象里面都有context和params属性
     * @returns {*}  {IApiParams[]}
     * @memberof IApiGlobalUtil
     */
    getRouterParams(): IApiParams[];
    /**
     * @description 注册全局功能类扩展，用于替换预置能力
     * @param {keyof IApiGlobalUtil} key 全局功能名称
     * @param {*} value 全局功能实现
     * @memberof IApiGlobalUtil
     */
    registerExtension(key: keyof IApiGlobalUtil, value: any): void;
}
//# sourceMappingURL=i-api-global-util.d.ts.map