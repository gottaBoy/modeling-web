import { IApiAppPortalViewState } from '../../../api';
import { IPortalViewState } from './i-portal-view.state';

/**
 * @description 应用看板视图UI状态
 * @export
 * @interface IAppPortalViewState
 * @extends {IPortalViewState}
 * @extends {IApiAppPortalViewState}
 */
export interface IAppPortalViewState
  extends IPortalViewState,
    IApiAppPortalViewState {}
