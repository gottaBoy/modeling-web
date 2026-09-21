import { IApiWFDynaEditViewState } from '../../../api';
import { IWFEditViewState } from './i-wf-edit-view.state';

/**
 * @description 实体工作流动态编辑视图UI状态
 * @export
 * @interface IWFDynaEditViewState
 * @extends {IWFEditViewState}
 * @extends {IApiWFDynaEditViewState}
 */
export interface IWFDynaEditViewState
  extends IWFEditViewState,
    IApiWFDynaEditViewState {}
