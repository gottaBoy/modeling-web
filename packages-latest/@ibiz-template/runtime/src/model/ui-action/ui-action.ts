import { IAppDEUIAction } from '@ibiz/model-core';

// 预定义界面行为映射关系
const sysUIActionMapping: Map<string, string> = new Map([
  ['login', 'app_login'],
  ['logout', 'app_logout'],
  ['relogin', 'app_relogin'],
  ['cancelchanges', 'data_cancelchanges'],
  ['createobject', 'data_createobject'],
  ['removeobject', 'data_removeobject'],
  ['savechanges', 'data_savechanges'],
  ['synchronize', 'data_synchronize'],
  ['copy', 'editview_copyaction'],
  ['exit', 'editview_exitaction'],
  ['firstrecord', 'editview_firstrecordaction'],
  ['help', 'editview_helpaction'],
  ['lastrecord', 'editview_lastrecordaction'],
  ['new', 'editview_newaction'],
  ['nextrecord', 'editview_nextrecordaction'],
  ['prevrecord', 'editview_prevrecordaction'],
  ['print', 'editview_printaction'],
  ['refresh', 'editview_refreshaction'],
  ['removeandexit', 'editview_removeandexitaction'],
  ['rollbackwf', 'editview_rollbackwfaction'],
  ['save', 'editview_saveaction'],
  ['saveandexit', 'editview_saveandexitaction'],
  ['saveandnew', 'editview_saveandnewaction'],
  ['saveandstart', 'editview_saveandstartwfaction'],
  ['viewwfstep', 'editview_viewwfstepactoraction'],
  ['copy', 'gridview_copyaction'],
  ['edit', 'gridview_editaction'],
  ['exportexcel', 'gridview_exportaction'],
  ['exportmodel', 'gridview_exportxmlaction'],
  ['help', 'gridview_helpaction'],
  ['import', 'gridview_importbar'],
  ['new', 'gridview_newaction'],
  ['newrow', 'gridview_newrowaction'],
  ['print', 'gridview_printaction'],
  ['refresh', 'gridview_refreshaction'],
  ['remove', 'gridview_removeaction'],
  ['togglerowedit', 'gridview_roweditaction'],
  ['saverow', 'gridview_saverowaction'],
  ['togglefilter', 'gridview_searchbar'],
  ['view', 'gridview_viewaction'],
  ['refreshall', 'treeview_refreshallaction'],
  ['refreshparent', 'treeview_refreshparentaction'],
  ['addall', 'util_addall'],
  ['addselection', 'util_addselection'],
  ['togglebottomnavzone', 'util_bottomnavzone'],
  ['collapse', 'util_collapse'],
  ['collapseall', 'util_collapseall'],
  ['expand', 'util_expand'],
  ['expandall', 'util_expandall'],
  ['finish', 'util_finish'],
  ['nextstep', 'util_nextstep'],
  ['prevstep', 'util_prevstep'],
  ['removeall', 'util_removeall'],
  ['removeselection', 'util_removeselection'],
  ['reset', 'util_reset'],
  ['togglerightnavzone', 'util_rightnavzone'],
  ['search', 'util_search'],
  ['cancel', 'view_cancelaction'],
  ['no', 'view_noaction'],
  ['ok', 'view_okaction'],
  ['useraction', 'view_useraction'],
  ['useraction2', 'view_useraction2'],
  ['useraction3', 'view_useraction3'],
  ['useraction4', 'view_useraction4'],
  ['useraction5', 'view_useraction5'],
  ['useraction6', 'view_useraction6'],
  ['yes', 'view_yesaction'],
]);

/**
 * 通过id获取界面行为模型方法
 *
 * @author chitanda
 * @date 2023-12-07 17:12:16
 * @export
 * @param {string} id
 * @param {string} appId
 * @return {*}  {(Promise<IAppDEUIAction | undefined>)}
 */
export async function getUIActionById(
  id: string,
  appId: string,
): Promise<IAppDEUIAction | undefined> {
  let app = ibiz.hub.getApp(appId);
  if (!app) {
    app = await ibiz.hub.getAppAsync(appId);
  }
  let uiAction = await app.getUIAction(id);
  if (!uiAction && sysUIActionMapping.has(id)) {
    uiAction = await app.getUIAction(sysUIActionMapping.get(id)!);
  }
  return uiAction;
}
