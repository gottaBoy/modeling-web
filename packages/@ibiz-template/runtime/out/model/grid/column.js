/**
 * 找到指定codeName的编辑项模型
 * @author lxm
 * @date 2023-05-30 11:10:51
 * @export
 * @param {IDEGrid} grid
 * @param {string} codeName
 * @return {*}
 */
export function findEditItem(grid, codeName) {
    var _a;
    return (_a = grid.degridEditItems) === null || _a === void 0 ? void 0 : _a.find(item => {
        return item.codeName === codeName;
    });
}
