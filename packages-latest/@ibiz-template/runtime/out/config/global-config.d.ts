import { IGlobalConfig, IGlobalGridConfig, IGlobalAppMenuConfig, IGlobalCodeListConfig, IGlobalViewConfig, IGlobalPickerEditorConfig, IGlobalUploadEditorConfig, IGlobalFormConfig, IGlobalSearchFormConfig, IGlobalTreeConfig, IGlobalCommonConfig, IApiGlobalKanbanConfig, IGlobalFlowDrtabConfig, IApiGlobalWaterMarkConfig, IGlobalMobConfig, IGlobalImgCompressConfig } from '../interface';
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
    kanban: IApiGlobalKanbanConfig;
    pickerEditor: IGlobalPickerEditorConfig;
    uploadEditor: IGlobalUploadEditorConfig;
    searchform: IGlobalSearchFormConfig;
    tree: IGlobalTreeConfig;
    common: IGlobalCommonConfig;
    drtab: IGlobalFlowDrtabConfig;
    mdctrldefaultsort: string;
    mdctrlrefreshmode: 'nocache' | 'cache';
    pickerdefaultsort: string;
    tooltiprendermode: 'none' | 'md' | 'html';
    watermark: IApiGlobalWaterMarkConfig;
    /**
     * @description 全局移动端配置
     * @type {IGlobalMobConfig}
     * @memberof GlobalConfig
     */
    mob: IGlobalMobConfig;
    /**
     * @description 图片压缩配置
     * @type {IGlobalImgCompressConfig}
     * @memberof GlobalConfig
     */
    imgCompressConfig: IGlobalImgCompressConfig;
}
//# sourceMappingURL=global-config.d.ts.map