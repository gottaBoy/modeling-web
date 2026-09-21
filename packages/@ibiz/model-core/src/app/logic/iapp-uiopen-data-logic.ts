import { IAppUILogic } from './iapp-uilogic';
import { IAppUILogicRefView } from './iapp-uilogic-ref-view';

/**
 *
 * 继承父接口类型值[APP_OPENDATA]
 * @export
 * @interface IAppUIOpenDataLogic
 */
export interface IAppUIOpenDataLogic extends IAppUILogic {
  /**
   * 默认打开数据视图
   *
   * @type {IAppUILogicRefView}
   * 来源  getOpenDataPSAppView
   */
  openDataAppView?: IAppUILogicRefView;

  /**
   * 多模式打开数据视图集合
   *
   * @type {IAppUILogicRefView[]}
   * 来源  getOpenDataPSAppViews
   */
  openDataAppViews?: IAppUILogicRefView[];

  /**
   * 编辑模式
   * @type {boolean}
   * 来源  isEditMode
   */
  editMode?: boolean;
}
