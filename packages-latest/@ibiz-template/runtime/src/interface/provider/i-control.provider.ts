import { IControl } from '@ibiz/model-core';
import { CTX } from '../../controller';
import { IControlController } from '../controller';

/**
 * 部件适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IControlProvider
 */
export interface IControlProvider {
  /**
   * 部件组件
   *GridControlProvider
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建部件控制器
   *
   * @author lxm
   * @date 2023-09-15 11:52:22
   * @param {IControl} model 部件模型
   * @param {IContext} context 上下文
   * @param {IParams} [params] 视图参数
   * @param {CTX} [ctx]
   * @return {*}  {IControlController}
   */
  createController?(
    model: IControl,
    context: IContext,
    params: IParams,
    ctx: CTX,
  ): IControlController;
}
