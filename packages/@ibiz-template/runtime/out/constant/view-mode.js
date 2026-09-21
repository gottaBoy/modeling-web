/* eslint-disable no-shadow */
/**
 * 视图打开方式
 *
 * @author lxm
 * @date 2022-09-01 10:09:04
 * @export
 * @enum {number}
 */
export var ViewMode;
(function (ViewMode) {
    /**
     * 路由(默认)
     */
    ViewMode["ROUTE"] = "ROUTE";
    /**
     * 模态路由
     */
    ViewMode["ROUTE_MODAL"] = "ROUTE_MODAL";
    /**
     * 模态
     */
    ViewMode["MODAL"] = "MODAL";
    /**
     * 抽屉
     */
    ViewMode["DRAWER"] = "DRAWER";
    /**
     * 嵌入
     */
    ViewMode["EMBED"] = "EMBED";
    /**
     * 气泡
     */
    ViewMode["POPOVER"] = "POPOVER";
})(ViewMode || (ViewMode = {}));
