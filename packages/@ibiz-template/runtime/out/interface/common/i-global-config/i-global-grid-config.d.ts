/**
 * 全局表格配置
 *
 * @author lxm
 * @date 2022-12-09 14:12:44
 * @export
 * @interface IGlobalGridConfig
 */
export interface IGlobalGridConfig {
    /**
     *  表格行编辑呈现模式
     * - cell 每次只呈现悬浮点击之后的一个单元格的编辑态
     * - row 每次呈现编辑中的那一行所有单元格的编辑态 TODO
     * - all 呈现所有编辑项的编辑态
     *
     * @default cell
     * @author lxm
     * @date 2023-03-06 09:42:44
     * @type {('cell' | 'row' | 'all')}
     * @memberof IGlobalConfig
     */
    editShowMode: 'cell' | 'row' | 'all';
    /**
     *  表格行编辑保存模式
     * - cell-blur 单元格失焦时保存整行数据
     * - auto 自动保存，值变更之后一段时间保存整行数据
     * - manual 手动保存，由界面行为调用表格整体保存或行保存。
     *
     * @default cell-blur
     * @author lxm
     * @date 2023-03-06 03:33:35
     * @type {('cell-blur' | 'auto' | 'manual')}
     * @memberof IGlobalConfig
     */
    editSaveMode: 'cell-blur' | 'auto' | 'manual';
    /**
     * 表格保存错误处理模式
     *
     * @author tony001
     * @date 2025-01-02 11:01:16
     * @type {('default' | 'reset')} default：表格保存失败，界面弹出错误信息，编辑错误项切换为错误状态（红色边框、hover显示错误信息）；reset：表格保存失败，界面弹出错误信息，编辑错误项还原为保存之前的值
     */
    saveErrorHandleMode: 'default' | 'reset';
    /**
     * 单元格超出呈现模式
     * - wrap 换行，高度自动增高
     * - ellipsis 省略，出...，悬浮出tooltip
     * @author lxm
     * @date 2023-11-17 11:17:39
     * @type {('wrap' | 'ellipsis')}
     */
    overflowMode: 'wrap' | 'ellipsis';
    /**
     * 隐藏无值的单位
     *
     * @type {boolean}
     * @memberof IGlobalGridConfig
     */
    emptyHiddenUnit: boolean;
}
//# sourceMappingURL=i-global-grid-config.d.ts.map