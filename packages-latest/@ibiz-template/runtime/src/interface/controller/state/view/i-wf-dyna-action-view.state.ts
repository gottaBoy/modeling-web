import { IApiWFDynaActionViewState } from '../../../api';
import { IWFDynaEditViewState } from './i-wf-dyna-edit-view.state';

/**
 * @description 实体工作流动态操作视图UI状态
 * @export
 * @interface IWFDynaActionViewState
 * @extends {IWFDynaEditViewState}
 * @extends {IApiWFDynaActionViewState}
 */
export interface IWFDynaActionViewState
  extends IWFDynaEditViewState,
    IApiWFDynaActionViewState {}
