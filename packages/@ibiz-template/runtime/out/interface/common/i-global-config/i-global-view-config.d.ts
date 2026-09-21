/**
 * 全局视图配置
 *
 * @author lxm
 * @date 2022-12-09 14:12:44
 * @export
 * @interface IGlobalViewConfig
 */
export interface IGlobalViewConfig {
    /**
     * 是否启用信息栏
     * - true：后才会识别模型的isShowDataInfoBar来控制是否显示信息栏
     * - false：则一律不显示信息栏
     *
     * @default true
     * @author lxm
     * @date 2022-12-09 14:12:13
     * @type {boolean}
     */
    enableDataInfoBar: boolean;
    /**
     * 用于控制全局哪些导航部件启用缓存，全大写。TABEXPPANEL:GRIDEXPBAR: - :分隔每个导航部件的缓存开关，必须用:结尾，如：TABEXPPANEL:开启表格导航部件缓存，GRIDEXPBAR:开启分页导航部件缓存
     *
     * @default 'TABEXPPANEL:'
     * @description 判断时将使用 `部件类型:` 的方式进行判断，如：TABEXPPANEL:，表示开启表格导航视图的缓存
     * @author chitanda
     * @date 2023-09-15 12:09:09
     * @type {string}
     */
    expCacheMode: string;
    /**
     * 首页是否不采用分页导航模式
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-12 17:40:44
     */
    disableHomeTabs: boolean;
    /**
     *  移动端是否展示返回按键
     *
     * @author fangZhiHao
     * @date 2024-09-26 11:09:41
     * @type {boolean}
     */
    mobShowPresetBack: boolean;
}
//# sourceMappingURL=i-global-view-config.d.ts.map