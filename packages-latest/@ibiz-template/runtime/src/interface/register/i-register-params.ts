import {
  IAppDataEntity,
  IAppDELogic,
  IAppDEMethod,
  IAppMenuItem,
  IAppUIAction,
  IAppView,
  IControl,
  IControlItem,
  IDBPortletPart,
  IDELogicNode,
  IDEToolbarItem,
  IDEUILogic,
  IDEUILogicNode,
  IEditor,
} from '@ibiz/model-core';

/**
 * 自定义适配器注册参数接口
 */
export interface IRegisterParams {
  /**
   * @description 部件模型
   * @type {IControl}
   * @memberof IRegisterParams
   */
  control?: IControl;

  /**
   * @description 视图模型
   * @type {IAppView}
   * @memberof IRegisterParams
   */
  view?: IAppView;

  /**
   * @description 应用实体模型
   * @type {IAppDataEntity}
   * @memberof IRegisterParams
   */
  entity?: IAppDataEntity;

  /**
   * @description 逻辑模型
   * @type {(IDEUILogic | IAppDELogic)}
   * @memberof IRegisterParams
   */
  logic?: IDEUILogic | IAppDELogic;

  /**
   * @description 主模型
   * @type {(IAppView
   *     | IAppDataEntity
   *     | IAppUIAction
   *     | IControl
   *     | IControlItem
   *     | IAppDEMethod
   *     | IEditor
   *     | IDEUILogic
   *     | IAppDELogic
   *     | IAppMenuItem
   *     | IDBPortletPart
   *     | IDEToolbarItem
   *     | IDEUILogicNode
   *     | IDELogicNode)}
   * @memberof IRegisterParams
   */
  mainModel:
    | IAppView
    | IAppDataEntity
    | IAppUIAction
    | IControl
    | IControlItem
    | IAppDEMethod
    | IEditor
    | IDEUILogic
    | IAppDELogic
    | IAppMenuItem
    | IDBPortletPart
    | IDEToolbarItem
    | IDEUILogicNode
    | IDELogicNode;
}
