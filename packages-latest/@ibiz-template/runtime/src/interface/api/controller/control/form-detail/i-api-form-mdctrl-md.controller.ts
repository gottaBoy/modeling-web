import { IApiMDControlController } from '../i-api-md-control.controller';
import { IApiFormMDCtrlController } from './i-api-form-mdctrl.controller';

/**
 * @description 表单多数据部件(引用实体多数据部件模型)控制器 (类型是列表，卡片，表格时)
 * @export
 * @interface IApiFormMDCtrlMDController
 * @extends {IApiFormMDCtrlController}
 */
export interface IApiFormMDCtrlMDController extends IApiFormMDCtrlController {
  /**
   * @description 多数据部件控制器
   * @type {IApiMDControlController}
   * @memberof IApiFormMDCtrlMDController
   */
  mdController: IApiMDControlController;

  /**
   * @description 删除多数据选中的数据
   * @returns {*}  {Promise<void>}
   * @memberof IApiFormMDCtrlMDController
   */
  remove(): void;

  /**
   * @description 新建一条数据
   * @memberof IApiFormMDCtrlMDController
   */
  create(): void;
}
