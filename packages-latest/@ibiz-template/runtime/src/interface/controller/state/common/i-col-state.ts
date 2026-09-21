import { IApiColState, IApiLayoutState } from '../../../api';

/**
 * @description 布局子成员的通用UI属性
 * @export
 * @interface ILayoutState
 * @extends {IApiLayoutState}
 */
export interface ILayoutState extends IApiLayoutState {}

/**
 * @description 界面布局需要用到的成员通用状态
 * @export
 * @interface IColState
 * @extends {IApiColState}
 */
export interface IColState extends IApiColState {}
