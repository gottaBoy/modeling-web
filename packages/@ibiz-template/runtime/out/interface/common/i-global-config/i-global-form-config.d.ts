/**
 * 全局表单配置
 *
 * @author lxm
 * @date 2022-12-09 14:12:44
 * @export
 * @interface IGlobalFormConfig
 */
export interface IGlobalFormConfig {
    /**
     * 多数据部件删除前是否需要确认
     * @author lxm
     * @date 2023-11-24 10:40:28
     * @type {boolean}
     */
    mdCtrlConfirmBeforeRemove: boolean;
    /**
     * 是否展示表单项下方下划线
     * @author fangZhiHao
     * @date 2024-10-11 14:10:52
     * @type {boolean}
     */
    mobShowUnderLine: boolean;
    /**
     *  文本在输入框中的位置
     *
     * @author fangZhiHao
     * @date 2024-10-17 13:10:21
     * @type {('right' | 'left' | '')}
     */
    mobFormItemAlignMode: 'right' | 'left' | '';
    /**
     * @description 是否显示表单项边框
     * @type {boolean}
     * @memberof IGlobalFormConfig
     */
    mobShowEditorBorder: boolean;
    /**
     * 隐藏无值的单位
     *
     * @type {boolean}
     * @memberof IGlobalFormConfig
     */
    emptyHiddenUnit: boolean;
}
//# sourceMappingURL=i-global-form-config.d.ts.map