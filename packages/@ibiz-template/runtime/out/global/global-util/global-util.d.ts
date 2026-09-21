import { IExcelUtil } from '../../interface';
import { UIActionUtil } from '../../ui-action';
import { TextUtil, LayoutPanelUtil, HandlebarsUtil, RawValueUtil, ThemeUtil, ErrorHandlerCenter, ViewStack, AnimeUtil, FileUtil, ShortCutUtil, BIReportUtil, RecordNavUtil, JsonSchemaUtil, Html2Canvas, VoiceUtil, EncyptionUtil } from '../../utils';
/**
 * 全局工具方法或对象
 *
 * @author chitanda
 * @date 2023-04-27 21:04:32
 * @export
 * @class GlobalUtil
 */
export declare class GlobalUtil {
    /**
     * 布局面板
     *
     * @author chitanda
     * @date 2023-04-27 21:04:46
     */
    readonly layoutPanel: LayoutPanelUtil;
    /**
     * 主题设置工具
     *
     * @author chitanda
     * @date 2023-12-02 23:12:27
     */
    readonly theme: ThemeUtil;
    /**
     * 文本工具
     *
     * @author zhanghengfeng
     * @date 2023-08-24 11:08:28
     */
    readonly text: TextUtil;
    /**
     * handlebars 工具
     *
     * @author chitanda
     * @date 2023-08-28 23:08:59
     */
    readonly hbs: HandlebarsUtil;
    /**
     * base64工具
     *
     * @author tony001
     * @date 2024-11-22 15:11:36
     */
    readonly base64: {
        version: string;
        VERSION: string;
        atob: (asc: string) => string;
        atobPolyfill: (asc: string) => string;
        btoa: (bin: string) => string;
        btoaPolyfill: (bin: string) => string;
        fromBase64: (src: string) => string;
        toBase64: (src: string, urlsafe?: boolean | undefined) => string;
        encode: (src: string, urlsafe?: boolean | undefined) => string;
        encodeURI: (src: string) => string;
        encodeURL: (src: string) => string;
        utob: (u: string) => string;
        btou: (b: string) => string;
        decode: (src: string) => string;
        isValid: (src: any) => boolean;
        /**
         * 显示应用级别的加载提示
         *
         * @author chitanda
         * @date 2023-09-08 10:09:43
         */
        fromUint8Array: (u8a: Uint8Array, urlsafe?: boolean | undefined) => string;
        toUint8Array: (a: string) => Uint8Array;
        extendString: () => void;
        extendUint8Array: () => void;
        extendBuiltins: () => void;
    };
    /**
     * 直接值工具
     *
     * @author zhujiamin
     * @date 2023-08-24 11:08:28
     */
    readonly rawValue: RawValueUtil;
    /**
     * 执行界面行为
     *
     * @author chitanda
     * @date 2023-11-28 19:11:26
     */
    readonly action: typeof UIActionUtil;
    /**
     * 错误处理中心
     * @author lxm
     * @date 2023-09-26 05:04:26
     */
    readonly error: ErrorHandlerCenter;
    /**
     * 视图堆栈
     *
     * @author chitanda
     * @date 2024-01-18 14:01:23
     */
    readonly viewStack: ViewStack;
    /**
     * 动画工具类
     *
     * @author zk
     * @date 2024-01-22 09:01:33
     * @memberof GlobalUtil
     */
    readonly anime: AnimeUtil;
    /**
     *  最小化工具类
     *
     * @author fzh
     * @date 2024-04-22 09:01:33
     * @memberof GlobalUtil
     */
    readonly shortCut: ShortCutUtil;
    /**
     * 文件工具类
     *
     * @author zk
     * @date 2024-01-26 04:01:24
     * @memberof GlobalUtil
     */
    readonly file: FileUtil;
    /**
     * @description Html2Canvas对象
     * @memberof GlobalUtil
     */
    readonly html2canvas: Html2Canvas;
    /**
     * bi报表工具类
     *
     * @author tony001
     * @date 2024-06-30 11:06:13
     */
    readonly biReport: BIReportUtil;
    /**
     * 记录导航工具类
     *
     * @author tony001
     * @date 2024-07-15 13:07:51
     */
    readonly record: RecordNavUtil;
    /**
     * JsonSchema工具类
     *
     * @author tony001
     * @date 2024-07-25 00:07:31
     */
    readonly jsonSchema: JsonSchemaUtil;
    /**
     * 语音工具类
     *
     * @author ljx
     * @date 2024-12-20 15:07:31
     */
    readonly voice: VoiceUtil;
    /**
     * 加密工具类
     *
     * @memberof GlobalUtil
     */
    readonly encryption: EncyptionUtil;
    constructor();
    /**
     * 获取导出Excel工具类对象
     * @author lxm
     * @date 2023-08-24 10:47:06
     */
    getExcelUtil?: () => Promise<IExcelUtil>;
    /**
     * 显示应用级别的加载提示
     *
     * @author chitanda
     * @date 2023-09-08 10:09:43
     */
    showAppLoading(): void;
    /**
     * 隐藏应用级别的加载提示
     *
     * @author chitanda
     * @date 2023-09-08 10:09:15
     */
    hiddenAppLoading(): void;
    /**
     * 设置浏览器标签页标题
     *
     * @author chitanda
     * @date 2024-02-05 09:02:08
     * @param {string} title
     */
    setBrowserTitle(title: string): void;
    /**
     * 获取应用全局变量
     * @author lxm
     * @date 2024-04-01 11:24:58
     * @return {*}  {IParams}
     */
    getGlobalParam(): IParams;
    /**
     * 获取视图路由参数变量，数组类型，基于路由解析出来的，每一个对象里面都有context和params
     * @author lxm
     * @date 2024-04-01 11:24:58
     * @return {*}  {IParams}
     */
    getRouterParams(): IParams[];
    /**
     * 注册全局功能类扩展，用于替换预置能力
     *
     * @author chitanda
     * @date 2023-04-28 05:44:47
     * @param {keyof GlobalUtil} key
     * @param {*} value
     */
    registerExtension(key: keyof GlobalUtil, value: any): void;
}
//# sourceMappingURL=global-util.d.ts.map