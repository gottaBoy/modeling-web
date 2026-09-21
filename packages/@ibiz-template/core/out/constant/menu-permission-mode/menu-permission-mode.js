/* eslint-disable no-shadow */
/**
 * 菜单权限校验模式
 *
 * @author lxm
 * @date 2022-10-12 14:10:56
 * @export
 * @enum {number}
 */
export var MenuPermissionMode;
(function (MenuPermissionMode) {
    /**
     * 混合模式（默认）
     */
    MenuPermissionMode["MIXIN"] = "MIXIN";
    /**
     * 统一资源模式
     */
    MenuPermissionMode["RESOURCE"] = "RESOURCE";
    /**
     * RT模式
     */
    MenuPermissionMode["RT"] = "RT";
})(MenuPermissionMode || (MenuPermissionMode = {}));
