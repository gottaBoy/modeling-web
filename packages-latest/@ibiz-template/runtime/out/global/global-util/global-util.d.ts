import { IApiGlobalUtil, IExcelUtil } from '../../interface';
import { UIActionUtil } from '../../ui-action';
import { TextUtil, LayoutPanelUtil, HandlebarsUtil, RawValueUtil, ThemeUtil, ErrorHandlerCenter, ViewStack, AnimeUtil, FileUtil, ShortCutUtil, BIReportUtil, RecordNavUtil, JsonSchemaUtil, Html2Canvas, VoiceUtil, EncyptionUtil, WaterMarkUtil, WeChatUtil, JsonUtil } from '../../utils';
/**
 * @description 全局工具方法或对象
 * @export
 * @class GlobalUtil
 * @implements {IApiGlobalUtil}
 */
export declare class GlobalUtil implements IApiGlobalUtil {
    /**
     * @description 布局面板
     * @memberof GlobalUtil
     */
    readonly layoutPanel: LayoutPanelUtil;
    /**
     * @description 主题设置工具
     * @memberof GlobalUtil
     */
    readonly theme: ThemeUtil;
    /**
     * @description 文本工具
     * @memberof GlobalUtil
     */
    readonly text: TextUtil;
    /**
     * @description handlebars 工具
     * @memberof GlobalUtil
     */
    readonly hbs: HandlebarsUtil;
    /**
     * @description base64工具
     * @memberof GlobalUtil
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
        fromUint8Array: (u8a: Uint8Array, urlsafe?: boolean | undefined) => string;
        toUint8Array: (a: string) => Uint8Array;
        extendString: () => void;
        extendUint8Array: () => void;
        extendBuiltins: () => void;
    };
    /**
     * @description md5工具
     * @author tony001
     * @date 2026-06-15 15:06:41
     * @memberof GlobalUtil
     */
    readonly md5: import("js-md5").Hash;
    /**
     * @description 直接值工具
     * @memberof GlobalUtil
     */
    readonly rawValue: RawValueUtil;
    /**
     * @description 执行界面行为
     * @memberof GlobalUtil
     */
    readonly action: typeof UIActionUtil;
    /**
     * @description 错误处理中心
     * @memberof GlobalUtil
     */
    readonly error: ErrorHandlerCenter;
    /**
     * @description 视图堆栈
     * @memberof GlobalUtil
     */
    readonly viewStack: ViewStack;
    /**
     * @description 动画工具类
     * @memberof GlobalUtil
     */
    readonly anime: AnimeUtil;
    /**
     * @description 最小化工具类
     * @memberof GlobalUtil
     */
    readonly shortCut: ShortCutUtil;
    /**
     * @description 文件工具类
     * @memberof GlobalUtil
     */
    readonly file: FileUtil;
    /**
     * @description Html2Canvas工具类
     * @memberof GlobalUtil
     */
    readonly html2canvas: Html2Canvas;
    /**
     * @description bi报表工具类
     * @memberof GlobalUtil
     */
    readonly biReport: BIReportUtil;
    /**
     * @description 记录导航工具类
     * @memberof GlobalUtil
     */
    readonly record: RecordNavUtil;
    /**
     * @description JsonSchema工具类
     * @memberof GlobalUtil
     */
    readonly jsonSchema: JsonSchemaUtil;
    /**
     * @description 语音工具类
     * @memberof GlobalUtil
     */
    readonly voice: VoiceUtil;
    /**
     * @description 加密工具类
     * @memberof GlobalUtil
     */
    readonly encryption: EncyptionUtil;
    /**
     * @description 水印工具类
     * @memberof GlobalUtil
     */
    readonly watermark: WaterMarkUtil;
    /**
     * @description 微信工具类
     * @memberof GlobalUtil
     */
    readonly weChat: WeChatUtil;
    /**
     * @description json工具类
     * @memberof GlobalUtil
     */
    readonly jsonUtil: JsonUtil;
    constructor();
    /**
     * @description 获取导出Excel工具类对象
     * @memberof GlobalUtil
     */
    getExcelUtil?: () => Promise<IExcelUtil>;
    /**
     * @description 显示应用级别的加载提示
     * @memberof GlobalUtil
     */
    showAppLoading(): void;
    /**
     * @description 隐藏应用级别的加载提示
     * @memberof GlobalUtil
     */
    hiddenAppLoading(): void;
    /**
     * @description 设置浏览器标签页标题
     * @param {string} title
     * @memberof GlobalUtil
     */
    setBrowserTitle(title: string): void;
    /**
     * @description 获取应用全局变量
     * @returns {*}  {IParams}
     * @memberof GlobalUtil
     */
    getGlobalParam(): IParams;
    /**
     * @description 获取视图路由参数变量，数组类型，基于路由解析出来的，每一个对象里面都有context和params
     * @returns {*}  {IParams[]}
     * @memberof GlobalUtil
     */
    getRouterParams(): IParams[];
    /**
     * @description 注册全局功能类扩展，用于替换预置能力
     * @param {keyof GlobalUtil} key
     * @param {*} value
     * @memberof GlobalUtil
     */
    registerExtension(key: keyof GlobalUtil, value: any): void;
}
//# sourceMappingURL=global-util.d.ts.map