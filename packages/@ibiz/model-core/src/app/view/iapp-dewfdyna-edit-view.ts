import { IAppDEWFDynaActionView } from './iapp-dewfdyna-action-view';
import { IAppDEWFEditView } from './iapp-dewfedit-view';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 继承父接口类型值[DEWFDYNAEDITVIEW]
 * @export
 * @interface IAppDEWFDynaEditView
 */
export interface IAppDEWFDynaEditView
  extends IAppDEWFEditView,
    IAppDEWFDynaActionView {
  /**
   * 附加界面行为组集合
   *
   * @type {IUIActionGroup[]}
   * 来源  getPSUIActionGroups
   */
  uiactionGroups?: IUIActionGroup[];
}
