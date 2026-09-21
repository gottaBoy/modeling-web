import { IGlobalCodeListConfig } from './i-global-codelist-config';
import { IGlobalGridConfig } from './i-global-grid-config';
import { IGlobalAppMenuConfig } from './i-global-app-menu-config';
import { IGlobalViewConfig } from './i-global-view-config';
import { IGlobalFormConfig } from './i-global-form-config';
import { IGlobalPickerEditorConfig } from './i-global-picker-editor-config';
import { IGlobalSearchFormConfig } from './i-global-search-form-config';
import { IGlobalTreeConfig } from './i-global-tree-config';
import { IGlobalCommonConfig } from './i-global-common-config';
/**
 * 全局配置类,控制应用的功能开关。
 *
 * @author lxm
 * @date 2022-12-09 14:12:44
 * @export
 * @interface IGlobalConfig
 */
export interface IGlobalConfig {
    /**
     * 设置应用主题
     *
     * @author chitanda
     * @date 2023-10-30 21:10:01
     * @type {string}
     */
    theme?: string;
    /**
     * 全局视图配置
     * @return {*}
     * @author: zhujiamin
     */
    view: IGlobalViewConfig;
    /**
     * 全局表格配置
     * @return {*}
     * @author: zhujiamin
     */
    grid: IGlobalGridConfig;
    /**
     * 全局菜单配置
     * @return {*}
     * @author: zhujiamin
     */
    appMenu: IGlobalAppMenuConfig;
    /**
     * 全局代码表配置
     * @return {*}
     * @author: zhujiamin
     */
    codeList: IGlobalCodeListConfig;
    /**
     * 全局表单配置
     * @author lxm
     * @date 2023-11-24 10:40:55
     * @type {IGlobalFormConfig}
     */
    form: IGlobalFormConfig;
    /**
     * 全局下拉选择类编辑器配置
     *
     * @author zhanghengfeng
     * @date 2024-04-15 18:04:52
     * @type {IGlobalPickerEditorConfig}
     */
    pickerEditor: IGlobalPickerEditorConfig;
    /**
     * 全局搜索表单配置
     *
     * @author tony001
     * @date 2024-11-13 16:11:09
     * @type {IGlobalSearchFormConfig}
     */
    searchform: IGlobalSearchFormConfig;
    /**
     * 全局树配置
     *
     * @type {IGlobalTreeConfig}
     * @memberof IGlobalConfig
     */
    tree: IGlobalTreeConfig;
    /**
     * 全局通用配置
     *
     * @author zhanghengfeng
     * @date 2025-02-05 19:02:18
     * @type {IGlobalCommonConfig}
     */
    common: IGlobalCommonConfig;
}
//# sourceMappingURL=i-global-config.d.ts.map