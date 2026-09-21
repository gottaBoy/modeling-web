/**
 * 自定义主题控制器
 * @author zzq
 * @date 2024-05-09 14:18:14
 * @export
 * @class CustomThemeController
 */
export declare class CustomThemeController {
    /**
     * 自定义主题状态
     *
     * @type {IData}
     * @memberof CustomThemeController
     */
    state: IData;
    /**
     * 自定义配置模型
     *
     * @type {IData[]}
     * @memberof CustomThemeController
     */
    model: IData[];
    /**
     * 模型映射对象，key为value，value值为var对象
     *
     * @author tony001
     * @date 2024-12-27 10:12:57
     * @private
     * @type {IData}
     */
    private modelMapping;
    /**
     * 预定义类型
     *
     * @type {IData}
     * @memberof CustomThemeController
     */
    predefineType: IData[];
    /**
     * Creates an instance of CustomThemeController.
     * @author tony001
     * @date 2024-12-26 18:12:28
     */
    constructor();
    /**
     * 初始化模型映射
     *
     * @author tony001
     * @date 2024-12-27 13:12:53
     * @private
     * @param {IData} item
     */
    private initModelMapping;
    /**
     * 获取模型编辑数据
     *
     * @author tony001
     * @date 2024-12-27 13:12:48
     * @public
     * @return {*}  {IData}
     */
    getModelEditData(): IData;
    /**
     * 获取单个分组的模型数据
     *
     * @author tony001
     * @date 2024-12-27 13:12:05
     * @private
     * @param {IData} item
     * @param {IData} result
     */
    private getSingleGroupModelData;
    /**
     * 获取css变量
     *
     * @param {string} name
     * @return {*}  {string}
     * @memberof CustomThemeController
     */
    getCssVar(name: string, defaultVar?: string): string | number;
    /**
     * 处理主题变更
     *
     * @author tony001
     * @date 2024-12-26 15:12:57
     * @param {string} tag
     * @return {*}  {Promise<void>}
     */
    handleThemeChange(tag: string): Promise<void>;
    /**
     * 计算变更主题变量
     *
     * @author tony001
     * @date 2024-12-27 17:12:21
     * @param {IData} newData
     * @return {*}  {Promise<void>}
     */
    computeChangeThemeVars(newData: IData): Promise<void>;
    /**
     * 处理主题预览
     *
     * @author tony001
     * @date 2024-12-26 17:12:59
     * @return {*}  {Promise<void>}
     */
    handleThemePreview(isLoad: boolean): Promise<void>;
    /**
     * 处理主题保存
     *
     * @author tony001
     * @date 2024-12-26 18:12:44
     * @param {boolean} isShare
     * @return {*}  {Promise<void>}
     */
    handleThemeSave(isShare: boolean): Promise<void>;
    /**
     * 处理主题重置
     *
     * @author tony001
     * @date 2024-12-27 20:12:03
     * @param {boolean} isShare
     * @return {*}  {Promise<void>}
     */
    handleThemeReset(isShare: boolean): Promise<void>;
    /**
     * 计算尺寸改变，同类size批量更改
     *
     * @param {string} varName
     * @param {number} size
     * @memberof CustomThemeController
     */
    calcSizeChange(varName: string, size: number, item: IData): void;
}
