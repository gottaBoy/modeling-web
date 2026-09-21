import { IDETBUIActionItem, IDEToolbar } from '@ibiz/model-core';
/**
 * 获取工具栏里面指定行为级别的界面行为项
 * @author lxm
 * @date 2023-12-19 03:07:51
 * @export
 * @param {IDEToolbar} toolbar 工具栏
 * @param {number} actionLevel 行为级别 {50：不常用、 100：一般操作、 200：常用操作、 250：关键操作 }
 * @return {*}  {IDETBUIActionItem[]}
 */
export declare function getUIActionItemsByActionLevel(toolbar: IDEToolbar, actionLevel: number): IDETBUIActionItem[];
//# sourceMappingURL=toolbar.d.ts.map