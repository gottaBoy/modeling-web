import { IApiWFDynaStartViewState } from '../../../api';
import { IWFEditViewState } from './i-wf-edit-view.state';

/**
 * @description 实体工作流动态启动视图UI状态
 * @export
 * @interface IWFDynaStartViewState
 * @extends {IWFEditViewState}
 * @extends {IApiWFDynaStartViewState}
 */
export interface IWFDynaStartViewState
  extends IWFEditViewState,
    IApiWFDynaStartViewState {}
