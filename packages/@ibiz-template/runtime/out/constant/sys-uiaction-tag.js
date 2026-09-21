/* eslint-disable no-shadow */
/**
 * 系统预置界面行为标识
 * @author lxm
 * @date 2023-05-08 07:56:46
 * @export
 * @enum {number}
 */
export var SysUIActionTag;
(function (SysUIActionTag) {
    /**
     * 打开新建数据视图
     */
    SysUIActionTag["NEW"] = "New";
    /**
     * 打开编辑数据视图
     */
    SysUIActionTag["EDIT"] = "Edit";
    /**
     * 刷新视图
     */
    SysUIActionTag["REFRESH"] = "Refresh";
    /**
     * 关闭视图
     */
    SysUIActionTag["EXIT"] = "Exit";
    /**
     * 保存并关闭
     */
    SysUIActionTag["SAVE_AND_EXIT"] = "SaveAndExit";
    /**
     * 保存并新建
     */
    SysUIActionTag["SAVE_AND_NEW"] = "SaveAndNew";
    /**
     * 保存
     */
    SysUIActionTag["SAVE"] = "Save";
    /**
     * 保存行
     */
    SysUIActionTag["SAVE_ROW"] = "SaveRow";
    /**
     * 删除
     */
    SysUIActionTag["REMOVE"] = "Remove";
    /**
     * 删除并关闭
     */
    SysUIActionTag["REMOVE_AND_EXIT"] = "RemoveAndExit";
    /**
     * 新建行
     */
    SysUIActionTag["NEW_ROW"] = "NewRow";
    /**
     * 切换搜索表单显示
     */
    SysUIActionTag["TOGGLE_FILTER"] = "ToggleFilter";
    /**
     * 数据导入
     */
    SysUIActionTag["IMPORT"] = "Import";
    /**
     * 数据导出
     */
    SysUIActionTag["EXPORT_EXCEL"] = "ExportExcel";
    /**
     * 工作流启动
     */
    SysUIActionTag["SAVE_AND_START"] = "SaveAndStart";
    /**
     * 工作流提交
     */
    SysUIActionTag["VIEW_WF_STEP"] = "ViewWFStep";
    /**
     * 否
     */
    SysUIActionTag["NO"] = "No";
    /**
     * 是
     */
    SysUIActionTag["YES"] = "Yes";
    /**
     * 取消
     */
    SysUIActionTag["CANCEL"] = "Cancel";
    /**
     * 确定
     */
    SysUIActionTag["OK"] = "Ok";
    /**
     * 搜索
     */
    SysUIActionTag["SEARCH"] = "Search";
    /**
     * 重置
     */
    SysUIActionTag["RESET"] = "Reset";
    /**
     * 完成
     */
    SysUIActionTag["FINISH"] = "Finish";
    /**
     * 下一步
     */
    SysUIActionTag["NEXT_STEP"] = "NextStep";
    /**
     * 上一步
     */
    SysUIActionTag["PREV_STEP"] = "PrevStep";
    /**
     * 添加选中
     */
    SysUIActionTag["ADD_SELECTION"] = "AddSelection";
    /**
     * 移出选中
     */
    SysUIActionTag["REMOVE_SELECTION"] = "RemoveSelection";
    /**
     * 移出全部
     */
    SysUIActionTag["REMOVE_ALL"] = "RemoveAll";
    /**
     * 添加全部
     */
    SysUIActionTag["ADD_ALL"] = "AddAll";
    /**
     * 登出
     */
    SysUIActionTag["LOGOUT"] = "Logout";
    /**
     * 登录
     */
    SysUIActionTag["LOGIN"] = "Login";
    /**
     * 取消变更
     */
    SysUIActionTag["CANCEL_CHANGES"] = "CancelChanges";
    /**
     * 拷贝
     */
    SysUIActionTag["COPY"] = "Copy";
    /**
     * 查看
     */
    SysUIActionTag["VIEW"] = "View";
    /**
     * 行编辑
     */
    SysUIActionTag["TOGGLE_ROW_EDIT"] = "ToggleRowEdit";
    /**
     * 树界面_刷新全部操作
     */
    SysUIActionTag["REFRESH_ALL"] = "RefreshAll";
    /**
     * 树界面_刷新父节点操作
     */
    SysUIActionTag["REFRESH_PARENT"] = "RefreshParent";
    /**
     * 第一个记录
     */
    SysUIActionTag["FIRST_RECORD"] = "FirstRecord";
    /**
     * 最后一个记录
     */
    SysUIActionTag["LAST_RECORD"] = "LastRecord";
    /**
     * 上一个记录
     */
    SysUIActionTag["PREV_RECORD"] = "PrevRecord";
    /**
     * 下一个记录
     */
    SysUIActionTag["NEXT_RECORD"] = "NextRecord";
    // 非预置界面行为 Start
    /**
     * 加载更多
     */
    SysUIActionTag["LOAD_MORE"] = "LoadMore";
    /**
     * 快捷方式(最小化)
     */
    SysUIActionTag["SHOTR_CUT"] = "ShortCut";
    // 非预置界面行为 End
    /**
     * 展开
     */
    SysUIActionTag["EXPAND"] = "Expand";
    /**
     * 折叠
     */
    SysUIActionTag["COLLAPSE"] = "Collapse";
    /**
     * 全部展开
     */
    SysUIActionTag["EXPANDALL"] = "ExpandAll";
    /**
     * 全部收缩
     */
    SysUIActionTag["COLLAPSEALL"] = "CollapseAll";
})(SysUIActionTag || (SysUIActionTag = {}));
