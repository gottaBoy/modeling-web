/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Base64 } from 'js-base64';
import { RuntimeError } from '@ibiz-template/core';
import { UIActionUtil } from '../../ui-action';
import { TextUtil, LayoutPanelUtil, HandlebarsUtil, RawValueUtil, ThemeUtil, DefaultErrorHandler, ErrorHandlerCenter, ViewStack, AnimeUtil, FileUtil, ShortCutUtil, BIReportUtil, RecordNavUtil, JsonSchemaUtil, Html2Canvas, VoiceUtil, EncyptionUtil, } from '../../utils';
/**
 * 全局工具方法或对象
 *
 * @author chitanda
 * @date 2023-04-27 21:04:32
 * @export
 * @class GlobalUtil
 */
export class GlobalUtil {
    constructor() {
        /**
         * 布局面板
         *
         * @author chitanda
         * @date 2023-04-27 21:04:46
         */
        this.layoutPanel = new LayoutPanelUtil();
        /**
         * 主题设置工具
         *
         * @author chitanda
         * @date 2023-12-02 23:12:27
         */
        this.theme = new ThemeUtil();
        /**
         * 文本工具
         *
         * @author zhanghengfeng
         * @date 2023-08-24 11:08:28
         */
        this.text = new TextUtil();
        /**
         * handlebars 工具
         *
         * @author chitanda
         * @date 2023-08-28 23:08:59
         */
        this.hbs = new HandlebarsUtil();
        /**
         * base64工具
         *
         * @author tony001
         * @date 2024-11-22 15:11:36
         */
        this.base64 = Base64;
        /**
         * 直接值工具
         *
         * @author zhujiamin
         * @date 2023-08-24 11:08:28
         */
        this.rawValue = new RawValueUtil();
        /**
         * 执行界面行为
         *
         * @author chitanda
         * @date 2023-11-28 19:11:26
         */
        this.action = UIActionUtil;
        /**
         * 错误处理中心
         * @author lxm
         * @date 2023-09-26 05:04:26
         */
        this.error = new ErrorHandlerCenter();
        /**
         * 视图堆栈
         *
         * @author chitanda
         * @date 2024-01-18 14:01:23
         */
        this.viewStack = new ViewStack();
        /**
         * 动画工具类
         *
         * @author zk
         * @date 2024-01-22 09:01:33
         * @memberof GlobalUtil
         */
        this.anime = new AnimeUtil();
        /**
         *  最小化工具类
         *
         * @author fzh
         * @date 2024-04-22 09:01:33
         * @memberof GlobalUtil
         */
        this.shortCut = new ShortCutUtil();
        /**
         * 文件工具类
         *
         * @author zk
         * @date 2024-01-26 04:01:24
         * @memberof GlobalUtil
         */
        this.file = new FileUtil();
        /**
         * @description Html2Canvas对象
         * @memberof GlobalUtil
         */
        this.html2canvas = new Html2Canvas();
        /**
         * bi报表工具类
         *
         * @author tony001
         * @date 2024-06-30 11:06:13
         */
        this.biReport = new BIReportUtil();
        /**
         * 记录导航工具类
         *
         * @author tony001
         * @date 2024-07-15 13:07:51
         */
        this.record = new RecordNavUtil();
        /**
         * JsonSchema工具类
         *
         * @author tony001
         * @date 2024-07-25 00:07:31
         */
        this.jsonSchema = new JsonSchemaUtil();
        /**
         * 语音工具类
         *
         * @author ljx
         * @date 2024-12-20 15:07:31
         */
        this.voice = new VoiceUtil();
        /**
         * 加密工具类
         *
         * @memberof GlobalUtil
         */
        this.encryption = new EncyptionUtil();
        this.error.register(new DefaultErrorHandler());
    }
    /**
     * 显示应用级别的加载提示
     *
     * @author chitanda
     * @date 2023-09-08 10:09:43
     */
    showAppLoading() {
        const el = document.getElementById('app-loading-x');
        if (el) {
            el.style.display = 'none';
        }
    }
    /**
     * 隐藏应用级别的加载提示
     *
     * @author chitanda
     * @date 2023-09-08 10:09:15
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
     * 设置浏览器标签页标题
     *
     * @author chitanda
     * @date 2024-02-05 09:02:08
     * @param {string} title
     */
    setBrowserTitle(title) {
        ibiz.platform.setBrowserTitle(title);
    }
    /**
     * 获取应用全局变量
     * @author lxm
     * @date 2024-04-01 11:24:58
     * @return {*}  {IParams}
     */
    getGlobalParam() {
        throw new RuntimeError(ibiz.i18n.t('runtime.global.noImplemented'));
    }
    /**
     * 获取视图路由参数变量，数组类型，基于路由解析出来的，每一个对象里面都有context和params
     * @author lxm
     * @date 2024-04-01 11:24:58
     * @return {*}  {IParams}
     */
    getRouterParams() {
        throw new RuntimeError(ibiz.i18n.t('runtime.global.noImplementedRouting'));
    }
    /**
     * 注册全局功能类扩展，用于替换预置能力
     *
     * @author chitanda
     * @date 2023-04-28 05:44:47
     * @param {keyof GlobalUtil} key
     * @param {*} value
     */
    registerExtension(key, value) {
        const self = this;
        self[key] = value;
    }
}
