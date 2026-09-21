import {
  IApiFormButtonController,
  IApiFormButtonListController,
  IApiFormDruipartController,
  IApiFormGroupPanelController,
  IApiFormItemController,
  IApiFormMDCtrlFormController,
  IApiFormMDCtrlMDController,
  IApiFormMDCtrlRepeaterController,
  IApiFormPageController,
  IApiFormRawItemController,
  IApiFormTabPageController,
  IApiFormTabPanelController,
} from '../control';

/**
 * @description 表单成员映射
 * @export
 * @interface IApiFormDetailMapping
 */
export interface IApiFormDetailMapping {
  /**
   * @description 表单按钮
   * @type {IApiFormButtonController}
   * @memberof IApiFormDetailMapping
   */
  BUTTON: IApiFormButtonController;

  /**
   * @description 表单按钮组
   * @type {IApiFormButtonListController}
   * @memberof IApiFormDetailMapping
   */
  BUTTONLIST: IApiFormButtonListController;

  /**
   * @description 表单关系界面
   * @type {IApiFormDruipartController}
   * @memberof IApiFormDetailMapping
   */
  DRUIPART: IApiFormDruipartController;

  /**
   * @description 表单分组
   * @type {IApiFormGroupPanelController}
   * @memberof IApiFormDetailMapping
   */
  GROUPPANEL: IApiFormGroupPanelController;

  /**
   * @description 表单项
   * @type {IApiFormItemController}
   * @memberof IApiFormDetailMapping
   */
  FORMITEM: IApiFormItemController;

  /**
   * @description 表单多数据部件（列表）
   * @type {IApiFormMDCtrlMDController}
   * @memberof IApiFormDetailMapping
   */
  MDCTRL_LIST: IApiFormMDCtrlMDController;

  /**
   * @description 表单多数据部件（表格）
   * @type {IApiFormMDCtrlMDController}
   * @memberof IApiFormDetailMapping
   */
  MDCTRL_GRID: IApiFormMDCtrlMDController;

  /**
   * @description 表单多数据部件（卡片）
   * @type {IApiFormMDCtrlMDController}
   * @memberof IApiFormDetailMapping
   */
  MDCTRL_DATAVIEW: IApiFormMDCtrlMDController;

  /**
   * @description 表单多数据部件（表单）
   * @type {IApiFormMDCtrlFormController}
   * @memberof IApiFormDetailMapping
   */
  MDCTRL_FORM: IApiFormMDCtrlFormController;

  /**
   * @description  表单多数据部件（重复器）
   * @type {IApiFormMDCtrlRepeaterController}
   * @memberof IApiFormDetailMapping
   */
  MDCTRL_REPEATER: IApiFormMDCtrlRepeaterController;

  /**
   * @description 表单分页
   * @type {IApiFormPageController}
   * @memberof IApiFormDetailMapping
   */
  FORMPAGE: IApiFormPageController;

  /**
   * @description 表单直接内容
   * @type {IApiFormRawItemController}
   * @memberof IApiFormDetailMapping
   */
  RAWITEM: IApiFormRawItemController;

  /**
   * @description 表单分页部件分页
   * @type {IApiFormTabPageController}
   * @memberof IApiFormDetailMapping
   */
  TABPAGE: IApiFormTabPageController;

  /**
   * @description 表单分页部件控制器
   * @type {IApiFormTabPanelController}
   * @memberof IApiFormDetailMapping
   */
  TABPANEL: IApiFormTabPanelController;
}
