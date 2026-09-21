import { IApiWizardViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体向导视图UI状态
 * @export
 * @interface IWizardViewState
 * @extends {IViewState}
 * @extends {IApiWizardViewState}
 */
export interface IWizardViewState extends IViewState, IApiWizardViewState {}
