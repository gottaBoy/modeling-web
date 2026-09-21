import { ConfigService } from '../../service';
import { ThemeUtil } from './theme-util';
/**
 * 自定义主题工具类
 *
 * @author zzq
 * @date 2024-05-10 23:12:15
 * @export
 * @class CustomThemeUtil
 */
export declare class CustomThemeUtil {
    protected themeUtil: ThemeUtil;
    /**
     * 自定义主题参数
     *
     * @author tony001
     * @date 2024-12-26 16:12:54
     * @type {Record<string, string>}
     */
    themeVars: Record<string, string>;
    /**
     * Creates an instance of CustomThemeUtil.
     * @author tony001
     * @date 2024-12-26 15:12:39
     * @param {ThemeUtil} themeUtil
     */
    constructor(themeUtil: ThemeUtil);
    /**
     * 获取应用主题存储服务
     *
     * @author tony001
     * @date 2024-12-26 18:12:52
     * @param {string} themeTag 主题标识
     * @param {boolean} [isShare=false] 是否分享
     * @return {*}  {ConfigService}
     */
    getConfigService(themeTag: string, isShare?: boolean): ConfigService;
    /**
     * 加载自定义主题
     *
     * @author tony001
     * @date 2024-12-26 18:12:18
     * @private
     * @param {string} themeTag 主题标识
     * @return {*}  {(Promise<IData | undefined>)}
     */
    private loadCustomTheme;
    /**
     * 初始化主题
     *
     * @author tony001
     * @date 2024-12-26 15:12:14
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 清除自定义主题参数
     *
     * @author tony001
     * @date 2024-12-26 17:12:40
     * @param {string} themeTag
     */
    clearCustomThemeParams(themeTag: string): void;
    /**
     * 预览自定义主题
     *
     * @author tony001
     * @date 2024-12-26 18:12:25
     * @param {string} themeTag
     * @param {Record<string, string>} [themeVars={}]
     * @param {boolean} [isLoad=true]
     * @return {*}  {Promise<IData>}
     */
    previewCustomTheme(themeTag: string, themeVars?: Record<string, string>, isLoad?: boolean): Promise<IData>;
    /**
     * 保存自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:10
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @param {boolean} isShare
     * @return {*}  {Promise<IData>}
     */
    saveCustomTheme(themeTag: string, themeVars: Record<string, string>, isShare: boolean): Promise<IData>;
    /**
     * 重置自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:33
     * @param {string} themeTag
     * @return {*}  {Promise<IData>}
     */
    resetCustomTheme(themeTag: string, isShare: boolean): Promise<IData>;
    /**
     * 转换自定义变量
     *
     * @param {Record<string, string>} themeVars
     * @return {string}
     * @memberof CustomThemeUtil
     */
    transCustomVars(themeVars: Record<string, string>): string;
    /**
     * 设置自定义主题测试
     *
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @memberof CustomThemeUtil
     */
    setCustomThemeParams(themeTag: string, themeVars: Record<string, string>): void;
}
//# sourceMappingURL=custom-theme-util.d.ts.map