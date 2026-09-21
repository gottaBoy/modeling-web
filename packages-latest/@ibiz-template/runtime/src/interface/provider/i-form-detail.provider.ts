/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDEFormDetail } from '@ibiz/model-core';
import {
  IFormController,
  IFormDetailContainerController,
  IFormDetailController,
} from '../controller';

/**
 * 表单成员适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IFormDetailProvider
 */
export interface IFormDetailProvider {
  /**
   * 表单成员组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建表单成员控制器
   *
   * @author lxm
   * @date 2022-09-20 10:09:57
   * @param {FormDetailModel} editorModel 表单成员模型
   * @param {unknown} parentController 父控制器
   * @returns {*}  {Promise<T>}
   */
  createController(
    detailModel: IDEFormDetail,
    form: IFormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<IFormDetailController>;
}
