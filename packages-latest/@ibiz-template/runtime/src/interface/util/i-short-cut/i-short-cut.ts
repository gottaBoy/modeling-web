import { IApiShortCutData } from '../../api';

/**
 * @description 快捷方式数据
 * @export
 * @interface IShortCutData
 * @extends {IApiShortCutData}
 */
export interface IShortCutData extends IApiShortCutData {}

/**
 * 快捷方式
 *
 * @export
 * @interface IShortCut
 */
export interface IShortCut {
  /**
   * 快捷方式数据集合
   *
   * @type {IShortCutData[]}
   * @memberof IShortCut
   */
  items: IShortCutData[];

  /**
   * 快捷方式模式
   *
   * @type {('horizontal' | 'vertical')}
   * @memberof IShortCut
   */
  mode: 'horizontal' | 'vertical';
}
