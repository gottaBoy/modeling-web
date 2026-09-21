import { IApiPortletClass, IApiPortletState } from '../../../../api';
import { IColState } from '../../common';

/**
 * @description 门户状态接口
 * @export
 * @interface IPortletState
 * @extends {IColState}
 * @extends {IApiPortletState}
 */
export interface IPortletState extends IColState, IApiPortletState {}

/**
 * @description 门户样式接口
 * @export
 * @interface IPortletClass
 * @extends {IApiPortletClass}
 */
export interface IPortletClass extends IApiPortletClass {}
