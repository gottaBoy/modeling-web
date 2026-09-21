import { IPanel, IAppView, IControl, IAppViewRef, IModelObject, ISysPFPlugin, IAppDEMethod, IAppDataEntity, IDEUIActionGroupDetail, IUIActionGroupDetail, IAppDEUIActionGroupDetail, IDEUIActionGroup } from '@ibiz/model-core';
/**
 * 在数据模型中查找对应 id 模型
 *
 * @author chitanda
 * @date 2023-04-22 15:04:49
 * @export
 * @param {IModelObject[]} models
 * @param {string} id
 * @return {*}  {(IModelObject | null)}
 */
export declare function findModelChild(models: IModelObject[], id: string): IModelObject | null;
/**
 * 从视图里面获取部件模型
 * @author lxm
 * @date 2023-06-06 10:53:27
 * @export
 * @param {IAppView} view 视图模型
 * @param {string} key 先匹配name，后是codeName, 最后才是id
 * @return {*}
 */
export declare function getControl(view: IAppView, key: string): IControl | undefined;
/**
 * 从视图里找关联视图引用
 * @author lxm
 * @date 2023-07-04 03:26:34
 * @export
 * @param {IAppView} view
 * @param {string} key
 * @return {*}
 */
export declare function getAppViewRef(view: IAppView, key: string): IAppViewRef | undefined;
/**
 * 解析用户参数
 * @author lxm
 * @date 2023-07-05 06:11:27
 * @export
 * @param {Record<string, string>} userParams
 */
export declare function parseUserParams(userParams: Record<string, string>): {
    navigateContexts: IParams;
    navigateParams: IParams;
    other: IParams;
};
/**
 * 从应用里面获取插件配置参数
 *
 * @author chitanda
 * @date 2023-11-21 14:11:06
 * @export
 * @param {string} id 插件标识
 * @param {string} [appId] 当前所在应用标识
 * @return {*}  {ISysPFPlugin}
 */
export declare function getPFPlugin(id: string, appId: string): ISysPFPlugin;
/**
 * 获取部件布局面板
 * @author lxm
 * @date 2023-11-28 11:07:49
 * @export
 * @param {IControl} control
 * @return {*}  {(IPanel | undefined)}
 */
export declare function getControlPanel(control: IControl): IPanel | undefined;
/**
 * 在应用实体模型中查找对应 id 应用方法
 * 解决应用实体方法名和行为，数据集方法不一致的问题
 * @author lionlau
 * @date 2024-03-09 18:04:21
 * @export
 * @param {IAppDataEntity} appDataEntity
 * @param {string} id
 * @return {*}  {(IAppDEMethod | null)}
 */
export declare function findAppDEMethod(appDataEntity: IAppDataEntity, id: string): IAppDEMethod | null;
/**
 * 获取部件的Teleport参数
 * @author lxm
 * @date 2024-03-27 02:02:09
 * @export
 * @param {IControl} control
 * @return {*}  {(string | undefined)}
 */
export declare function getCtrlTeleportParams(control: IControl): {
    teleportTag: string | undefined;
    teleportFlag: boolean;
};
/**
 * @description 计算单个动态界面行为组项数据
 * @export
 * @param {IData} refUIActionGroup
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IAppDEUIActionGroupDetail[]>}
 */
export declare function calcDyUiactionGroup(refUIActionGroup: IData, context: IContext, params: IParams): Promise<IAppDEUIActionGroupDetail[]>;
/**
 * @description 处理界面行为组（替换动态行为组模型为实际的行为项集合）
 * @export
 * @param {IUIActionGroupDetail[]} uiactionGroupDetails
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IUIActionGroupDetail[]>}
 */
export declare function calcUIActionDetails(uiactionGroupDetails: IUIActionGroupDetail[], context: IContext, params: IParams): Promise<IUIActionGroupDetail[]>;
/**
 * @description 递归获取所有界面行为项（处理多层嵌套的动态行为组、替换动态行为组模型为实际的行为项集合）
 * @export
 * @param {IDEUIActionGroupDetail[]} details
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IDEUIActionGroupDetail[]>}
 */
export declare function calcAllUIActionDetails(details: IDEUIActionGroupDetail[], context: IContext, params: IParams): Promise<IDEUIActionGroupDetail[]>;
/**
 * @description 处理界面行为组，动态界面行为组需请求数据并生成成员项模型
 * @export
 * @param {IDEUIActionGroup} uiactionGroup
 * @param {IContext} context
 * @param {IParams} params
 * @returns {*}  {Promise<IDEUIActionGroup>}
 */
export declare function calcUIActionGroup(uiactionGroup: IDEUIActionGroup, context: IContext, params: IParams): Promise<IDEUIActionGroup>;
/**
 * @description 获取所有的界面行为项模型集合
 * @export
 * @param {IDEUIActionGroupDetail[]} details
 * @returns {*}  {IDEUIActionGroupDetail[]}
 */
export declare function getAllUIActionItems(details?: IDEUIActionGroupDetail[]): IDEUIActionGroupDetail[];
//# sourceMappingURL=util.d.ts.map