import { IAppView } from '@ibiz/model-core';
import { CTX } from '../../controller';
import { IViewController } from '../controller';

/**
 * 视图适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IViewProvider
 */
export interface IViewProvider {
  /**
   * 视图组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;

  /**
   * 创建视图控制器
   *
   * @author lxm
   * @date 2023-09-15 11:49:26
   * @param {IAppView} model 视图模型
   * @param {IContext} context 上下文
   * @param {IParams} [params] 视图参数
   * @param {CTX} [ctx]
   * @return {*}  {IViewController}
   */
  createController?(
    model: IAppView,
    context: IContext,
    params?: IParams,
    ctx?: CTX,
  ): IViewController;
}
