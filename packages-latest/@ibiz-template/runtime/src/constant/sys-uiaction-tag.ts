/* eslint-disable no-shadow */
/**
 * 系统预置界面行为标识
 * @author lxm
 * @date 2023-05-08 07:56:46
 * @export
 * @enum {number}
 */
export enum SysUIActionTag {
  /**
   * 打开新建数据视图
   */
  'NEW' = 'New',
  /**
   * 打开编辑数据视图
   */
  'EDIT' = 'Edit',
  /**
   * 刷新视图
   */
  'REFRESH' = 'Refresh',
  /**
   * 关闭视图
   */
  'EXIT' = 'Exit',
  /**
   * 保存并关闭
   */
  'SAVE_AND_EXIT' = 'SaveAndExit',
  /**
   * 保存并新建
   */
  'SAVE_AND_NEW' = 'SaveAndNew',
  /**
   * 保存
   */
  'SAVE' = 'Save',
  /**
   * 保存行
   */
  'SAVE_ROW' = 'SaveRow',
  /**
   * 删除
   */
  'REMOVE' = 'Remove',
  /**
   * 删除并关闭
   */
  'REMOVE_AND_EXIT' = 'RemoveAndExit',
  /**
   * 新建行
   */
  'NEW_ROW' = 'NewRow',
  /**
   * 切换搜索表单显示
   */
  'TOGGLE_FILTER' = 'ToggleFilter',
  /**
   * 数据导入
   */
  'IMPORT' = 'Import',
  /**
   * 数据导出
   */
  'EXPORT_EXCEL' = 'ExportExcel',
  /**
   * 工作流启动
   */
  'SAVE_AND_START' = 'SaveAndStart',
  /**
   * 工作流提交
   */
  'VIEW_WF_STEP' = 'ViewWFStep',
  /**
   * 否
   */
  'NO' = 'No',
  /**
   * 是
   */
  'YES' = 'Yes',
  /**
   * 取消
   */
  'CANCEL' = 'Cancel',
  /**
   * 确定
   */
  'OK' = 'Ok',
  /**
   * 搜索
   */
  'SEARCH' = 'Search',
  /**
   * 重置
   */
  'RESET' = 'Reset',
  /**
   * 完成
   */
  'FINISH' = 'Finish',
  /**
   * 下一步
   */
  'NEXT_STEP' = 'NextStep',
  /**
   * 上一步
   */
  'PREV_STEP' = 'PrevStep',
  /**
   * 添加选中
   */
  'ADD_SELECTION' = 'AddSelection',
  /**
   * 移出选中
   */
  'REMOVE_SELECTION' = 'RemoveSelection',
  /**
   * 移出全部
   */
  'REMOVE_ALL' = 'RemoveAll',
  /**
   * 添加全部
   */
  'ADD_ALL' = 'AddAll',
  /**
   * 登出
   */
  'LOGOUT' = 'Logout',
  /**
   * 登录
   */
  'LOGIN' = 'Login',
  /**
   * 取消变更
   */
  'CANCEL_CHANGES' = 'CancelChanges',
  /**
   * 拷贝
   */
  'COPY' = 'Copy',
  /**
   * 查看
   */
  'VIEW' = 'View',
  /**
   * 行编辑
   */
  'TOGGLE_ROW_EDIT' = 'ToggleRowEdit',
  /**
   * 树界面_刷新全部操作
   */
  'REFRESH_ALL' = 'RefreshAll',
  /**
   * 树界面_刷新父节点操作
   */
  'REFRESH_PARENT' = 'RefreshParent',
  /**
   * 第一个记录
   */
  'FIRST_RECORD' = 'FirstRecord',
  /**
   * 最后一个记录
   */
  'LAST_RECORD' = 'LastRecord',
  /**
   * 上一个记录
   */
  'PREV_RECORD' = 'PrevRecord',
  /**
   * 下一个记录
   */
  'NEXT_RECORD' = 'NextRecord',

  // 非预置界面行为 Start

  /**
   * 加载更多
   */
  'LOAD_MORE' = 'LoadMore',

  /**
   * 快捷方式(最小化)
   */
  'SHOTR_CUT' = 'ShortCut',
  // 非预置界面行为 End

  /**
   * 展开
   */
  'EXPAND' = 'Expand',

  /**
   * 折叠
   */
  'COLLAPSE' = 'Collapse',

  /**
   * 全部展开
   */
  'EXPANDALL' = 'ExpandAll',

  /**
   * 全部收缩
   */
  'COLLAPSEALL' = 'CollapseAll',
}
