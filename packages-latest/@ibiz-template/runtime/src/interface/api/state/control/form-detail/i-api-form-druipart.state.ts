import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单关系界面状态
 * @export
 * @interface IApiFormDruipartState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormDruipartState extends IApiFormDetailState {
  /**
   * @description 关系界面组件绑的key，用来触发强制刷新
   * @type {string}
   * @memberof IApiFormDruipartState
   */
  viewComponentKey?: string;

  /**
   * @description 是否显示遮罩
   * @type {boolean}
   * @memberof IApiFormDruipartState
   */
  showMask: boolean;
}
