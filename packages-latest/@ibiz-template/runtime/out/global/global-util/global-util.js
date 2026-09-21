/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Base64 } from 'js-base64';
import { md5 } from 'js-md5';
import { RuntimeError } from '@ibiz-template/core';
import { UIActionUtil } from '../../ui-action';
import { TextUtil, LayoutPanelUtil, HandlebarsUtil, RawValueUtil, ThemeUtil, DefaultErrorHandler, ErrorHandlerCenter, ViewStack, AnimeUtil, FileUtil, ShortCutUtil, BIReportUtil, RecordNavUtil, JsonSchemaUtil, Html2Canvas, VoiceUtil, EncyptionUtil, WaterMarkUtil, WeChatUtil, JsonUtil, } from '../../utils';
/**
 * @description 全局工具方法或对象
 * @export
 * @class GlobalUtil
 * @implements {IApiGlobalUtil}
 */
export class GlobalUtil {
    constructor() {
        /**
         * @description 布局面板
         * @memberof GlobalUtil
         */
        this.layoutPanel = new LayoutPanelUtil();
        /**
         * @description 主题设置工具
         * @memberof GlobalUtil
         */
        this.theme = new ThemeUtil();
        /**
         * @description 文本工具
         * @memberof GlobalUtil
         */
        this.text = new TextUtil();
        /**
         * @description handlebars 工具
         * @memberof GlobalUtil
         */
        this.hbs = new HandlebarsUtil();
        /**
         * @description base64工具
         * @memberof GlobalUtil
         */
        this.base64 = Base64;
        /**
         * @description md5工具
         * @author tony001
         * @date 2026-06-15 15:06:41
         * @memberof GlobalUtil
         */
        this.md5 = md5;
        /**
         * @description 直接值工具
         * @memberof GlobalUtil
         */
        this.rawValue = new RawValueUtil();
        /**
         * @description 执行界面行为
         * @memberof GlobalUtil
         */
        this.action = UIActionUtil;
        /**
         * @description 错误处理中心
         * @memberof GlobalUtil
         */
        this.error = new ErrorHandlerCenter();
        /**
         * @description 视图堆栈
         * @memberof GlobalUtil
         */
        this.viewStack = new ViewStack();
        /**
         * @description 动画工具类
         * @memberof GlobalUtil
         */
        this.anime = new AnimeUtil();
        /**
         * @description 最小化工具类
         * @memberof GlobalUtil
         */
        this.shortCut = new ShortCutUtil();
        /**
         * @description 文件工具类
         * @memberof GlobalUtil
         */
        this.file = new FileUtil();
        /**
         * @description Html2Canvas工具类
         * @memberof GlobalUtil
         */
        this.html2canvas = new Html2Canvas();
        /**
         * @description bi报表工具类
         * @memberof GlobalUtil
         */
        this.biReport = new BIReportUtil();
        /**
         * @description 记录导航工具类
         * @memberof GlobalUtil
         */
        this.record = new RecordNavUtil();
        /**
         * @description JsonSchema工具类
         * @memberof GlobalUtil
         */
        this.jsonSchema = new JsonSchemaUtil();
        /**
         * @description 语音工具类
         * @memberof GlobalUtil
         */
        this.voice = new VoiceUtil();
        /**
         * @description 加密工具类
         * @memberof GlobalUtil
         */
        this.encryption = new EncyptionUtil();
        /**
         * @description 水印工具类
         * @memberof GlobalUtil
         */
        this.watermark = new WaterMarkUtil();
        /**
         * @description 微信工具类
         * @memberof GlobalUtil
         */
        this.weChat = new WeChatUtil();
        /**
         * @description json工具类
         * @memberof GlobalUtil
         */
        this.jsonUtil = new JsonUtil();
        this.error.register(new DefaultErrorHandler());
    }
    /**
     * @description 显示应用级别的加载提示
     * @memberof GlobalUtil
     */
    showAppLoading() {
        const el = document.getElementById('app-loading-x');
        if (el) {
            el.style.display = 'none';
        }
    }
    /**
     * @description 隐藏应用级别的加载提示
     * @memberof GlobalUtil
     */
    hiddenAppLoading() {
        setTimeout(() => {
            const el = document.getElementById('app-loading-x');
            if (el) {
                el.style.display = 'none';
            }
        }, 300);
    }
    /**
     * @description 设置浏览器标签页标题
     * @param {string} title
     * @memberof GlobalUtil
     */
    setBrowserTitle(title) {
        ibiz.platform.setBrowserTitle(title);
    }
    /**
     * @description 获取应用全局变量
     * @returns {*}  {IParams}
     * @memberof GlobalUtil
     */
    getGlobalParam() {
        throw new RuntimeError(ibiz.i18n.t('runtime.global.noImplemented'));
    }
    /**
     * @description 获取视图路由参数变量，数组类型，基于路由解析出来的，每一个对象里面都有context和params
     * @returns {*}  {IParams[]}
     * @memberof GlobalUtil
     */
    getRouterParams() {
        throw new RuntimeError(ibiz.i18n.t('runtime.global.noImplementedRouting'));
    }
    /**
     * @description 注册全局功能类扩展，用于替换预置能力
     * @param {keyof GlobalUtil} key
     * @param {*} value
     * @memberof GlobalUtil
     */
    registerExtension(key, value) {
        const self = this;
        self[key] = value;
    }
}
