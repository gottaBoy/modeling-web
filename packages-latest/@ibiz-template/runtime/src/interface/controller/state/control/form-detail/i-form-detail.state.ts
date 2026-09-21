import { IApiFormDetailClass, IApiFormDetailState } from '../../../../api';
import { IColState } from '../../common';

/**
 * @description 表单成员状态
 * @export
 * @interface IFormDetailState
 * @extends {IApiFormDetailState}
 */
export interface IFormDetailState extends IColState, IApiFormDetailState {}

/**
 * @description 表单成员类名集合接口
 * @export
 * @interface IFormDetailClass
 * @extends {IApiFormDetailClass}
 */
export interface IFormDetailClass extends IApiFormDetailClass {}
