import { IDEGrid, IDEGridEditItem } from '@ibiz/model-core';

/**
 * 找到指定codeName的编辑项模型
 * @author lxm
 * @date 2023-05-30 11:10:51
 * @export
 * @param {IDEGrid} grid
 * @param {string} codeName
 * @return {*}
 */
export function findEditItem(
  grid: IDEGrid,
  codeName: string,
): IDEGridEditItem | undefined {
  return grid.degridEditItems?.find(item => {
    return item.codeName === codeName;
  });
}
