/**
 * 全局配置类,控制应用的功能开关。
 *
 * @author lxm
 * @date 2022-12-09 14:12:28
 * @export
 * @class GlobalConfig
 * @implements {IGlobalConfig}
 */
export class GlobalConfig {
    constructor() {
        // 全局视图配置
        this.view = {
            enableDataInfoBar: true,
            expCacheMode: 'TABEXPPANEL:',
            disableHomeTabs: false,
            mobShowPresetBack: true,
        };
        // 全局表格配置
        this.grid = {
            editShowMode: 'row',
            editSaveMode: 'cell-blur',
            saveErrorHandleMode: 'default',
            overflowMode: 'wrap',
            emptyHiddenUnit: true,
        };
        // 全局菜单配置
        this.appMenu = {
            enableEcho: true,
        };
        // 全局代码表配置
        this.codeList = {
            timeout: 60 * 60 * 1000,
        };
        // 全局表单配置
        this.form = {
            mdCtrlConfirmBeforeRemove: true,
            mobShowUnderLine: true,
            mobFormItemAlignMode: '',
            mobShowEditorBorder: false,
            emptyHiddenUnit: true,
        };
        // 全局下拉选择类编辑器配置
        this.pickerEditor = {
            overflowMode: 'auto',
        };
        // 全局搜索表单配置
        this.searchform = {
            enableStoredFilters: true,
        };
        // 全局树配置
        this.tree = {
            contextMenuRightClickInvoke: true,
        };
        // 全局通用配置
        this.common = {
            emptyText: '-',
        };
    }
}
