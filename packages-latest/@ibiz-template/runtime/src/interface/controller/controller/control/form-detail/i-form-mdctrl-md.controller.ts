import { IApiFormMDCtrlMDController } from '../../../../api';
import { IFormMDCtrlController } from './i-form-mdctrl.controller';

/**
 * @description 表单多数据部件(引用实体多数据部件模型)控制器 (类型是列表，卡片，表格时)
 * @export
 * @interface IFormMDCtrlMDController
 * @extends {IFormMDCtrlController}
 * @extends {IApiFormMDCtrlMDController}
 */
export interface IFormMDCtrlMDController
  extends IFormMDCtrlController,
    IApiFormMDCtrlMDController {}
