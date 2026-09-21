import { IApiDEPortalViewState } from '../../../api';
import { IPortalViewState } from './i-portal-view.state';

/**
 * @description  实体数据看板视图UI状态
 * @export
 * @interface IDEPortalViewState
 * @extends {IPortalViewState}
 * @extends {IApiDEPortalViewState}
 */
export interface IDEPortalViewState
  extends IPortalViewState,
    IApiDEPortalViewState {}
