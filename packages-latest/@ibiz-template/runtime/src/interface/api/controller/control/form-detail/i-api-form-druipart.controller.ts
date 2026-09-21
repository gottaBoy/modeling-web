import { IApiFormDruipartState } from '../../../state';
import { IApiViewController } from '../../view';
import { IApiFormDetailController } from './i-api-form-detail.controller';

/**
 * @description 表单关系界面控制器
 * @export
 * @interface IApiFormDruipartController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormDruipartController extends IApiFormDetailController {
  /**
   * @description 表单关系界面状态
   * @type {IApiFormDruipartState}
   * @memberof IApiFormDruipartController
   */
  state: IApiFormDruipartState;
  /**
   * @description 嵌入视图控制器
   * @type {(IApiViewController | undefined)}
   * @memberof IApiFormDruipartController
   */
  embedView: IApiViewController | undefined;

  /**
   * @description 是否是新建数据（即无主键）
   * @type {boolean}
   * @memberof IApiFormDruipartController
   */
  isNewData: boolean;

  /**
   * @description 计算视图上下文和视图参数, 调用该方法一定会刷新视图
   * @memberof IApiFormDruipartController
   */
  calcViewParams(): void;

  /**
   * @description 校验关系界面
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormDruipartController
   */
  validate(): Promise<boolean>;

  /**
   * @description 静默校验关系界面
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormDruipartController
   */
  silentValidate(): Promise<boolean>;
}
