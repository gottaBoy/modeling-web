import { IControl } from '../icontrol';
import { IControlAction } from '../icontrol-action';

/**
 *
 * 实体工作流编辑表单模型基础对象接口
 * 继承父接口类型值[FORM]
 * @export
 * @interface IWFEditForm
 */
export interface IWFEditForm extends IControl {
  /**
   * 流程启动行为
   *
   * @type {IControlAction}
   * 来源  getWFStartPSControlAction
   */
  wfstartControlAction?: IControlAction;

  /**
   * 流程提交行为
   *
   * @type {IControlAction}
   * 来源  getWFSubmitPSControlAction
   */
  wfsubmitControlAction?: IControlAction;
}
