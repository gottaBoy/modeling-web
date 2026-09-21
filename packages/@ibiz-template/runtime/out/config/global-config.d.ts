import { IGlobalConfig, IGlobalGridConfig, IGlobalAppMenuConfig, IGlobalCodeListConfig, IGlobalViewConfig, IGlobalPickerEditorConfig, IGlobalFormConfig, IGlobalSearchFormConfig, IGlobalTreeConfig, IGlobalCommonConfig } from '../interface';
/**
 * 全局配置类,控制应用的功能开关。
 *
 * @author lxm
 * @date 2022-12-09 14:12:28
 * @export
 * @class GlobalConfig
 * @implements {IGlobalConfig}
 */
export declare class GlobalConfig implements IGlobalConfig {
    view: IGlobalViewConfig;
    grid: IGlobalGridConfig;
    appMenu: IGlobalAppMenuConfig;
    codeList: IGlobalCodeListConfig;
    form: IGlobalFormConfig;
    pickerEditor: IGlobalPickerEditorConfig;
    searchform: IGlobalSearchFormConfig;
    tree: IGlobalTreeConfig;
    common: IGlobalCommonConfig;
}
//# sourceMappingURL=global-config.d.ts.map