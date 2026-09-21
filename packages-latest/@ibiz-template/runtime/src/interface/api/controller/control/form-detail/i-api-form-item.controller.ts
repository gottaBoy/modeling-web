import { IApiData } from '@ibiz-template/core';
import { IApiFormItemState } from '../../../state';
import { IApiFormDetailController } from './i-api-form-detail.controller';
/**
 * @description 表单项控制器
 * @export
 * @interface IApiFormItemController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormItemController extends IApiFormDetailController {
  /**
   * @description 表单项状态对象（响应式），包含可见性、禁用状态、校验状态等
   * @type {IApiFormItemState}
   * @memberof IApiFormItemController
   */
  state: IApiFormItemState;

  /**
   * @description 值规则
   * @type {IApiData[]}
   * @memberof IApiFormItemController
   */
  rules: IApiData[];

  /**
   * @description 表单项名称
   * @type {string}
   * @memberof IApiFormItemController
   */
  readonly name: string;

  /**
   * @description 表单项值
   * @type {unknown}
   * @memberof IApiFormItemController
   */
  readonly value: unknown;

  /**
   * @description 值项名称（用于复杂控件绑定值）
   * @type {(string | undefined)}
   * @memberof IApiFormItemController
   */
  readonly valueItemName: string | undefined;

  /**
   * @description 表单项标签显示文本
   * @type {(string | undefined)}
   * @memberof IApiFormItemController
   */
  readonly labelCaption: string | undefined;

  /**
   * @description 单位名称（用于数值类字段显示）
   * @type {(string | undefined)}
   * @memberof IApiFormItemController
   */
  readonly unitName: string | undefined;

  /**
   * @description 值格式化
   * @type {(string | undefined)}
   * @memberof IApiFormItemController
   */
  readonly valueFormat: string | undefined;

  /**
   * @description 数据类型
   * @type {(number | undefined)}
   * @memberof IApiFormItemController
   */
  readonly dataType: number | undefined;

  /**
   * @description 校验当前表单项（若不可见则自动跳过校验）
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormItemController
   */
  validate(): Promise<boolean>;

  /**
   * @description 静默校验
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormItemController
   */
  silentValidate(): Promise<boolean>;

  /**
   * @description  设置表单数据的值
   * @param {unknown} value 要设置的值
   * @param {string} [name] 要设置的表单数据的属性名称
   * @param {boolean} [ignore] 是否忽略脏值检查，默认值为false
   * @returns {*}  {Promise<void>}
   * @memberof IApiFormItemController
   */
  setDataValue(value: unknown, name?: string, ignore?: boolean): Promise<void>;
}
