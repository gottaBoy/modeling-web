import { IApiWFDynaEditView3State } from '../../../api';
import { IWFDynaEditViewState } from './i-wf-dyna-edit-view.state';

/**
 * @description 实体工作流动态视图（分页关系）UI状态
 * @export
 * @interface IWFDynaEditView3State
 * @extends {IWFDynaEditViewState}
 * @extends {IApiWFDynaEditView3State}
 */
export interface IWFDynaEditView3State
  extends IWFDynaEditViewState,
    IApiWFDynaEditView3State {}
