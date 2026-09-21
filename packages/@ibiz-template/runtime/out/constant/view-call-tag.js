/* eslint-disable no-shadow */
/**
 * 视图调用call的标识
 * @author lxm
 * @date 2023-09-08 11:08:44
 * @export
 * @enum {number}
 */
export var ViewCallTag;
(function (ViewCallTag) {
    /**
     * 视图加载（特指初始化加载）
     */
    ViewCallTag["LOAD"] = "Load";
    /**
     * 获取数据（多数据指选中数据）
     */
    ViewCallTag["GET_DATA"] = "GetData";
    /**
     * 获取所有数据（多数据专用，获取全部数据）
     */
    ViewCallTag["GET_ALL_DATA"] = "GetAllData";
    /**
     * 校验数据（编辑视图才用）
     */
    ViewCallTag["VALIDATE"] = "Validate";
    /**
     * 切换折叠（首页视图才用）
     */
    ViewCallTag["TOGGLE_COLLAPSE"] = "ToggleCollapse";
    /**
     * 流程撤回
     */
    ViewCallTag["WF_WITHDRAW"] = "WFWithdraw";
    /**
     * 拷贝路径
     */
    ViewCallTag["COPY_PATH"] = "CopyPath";
})(ViewCallTag || (ViewCallTag = {}));
